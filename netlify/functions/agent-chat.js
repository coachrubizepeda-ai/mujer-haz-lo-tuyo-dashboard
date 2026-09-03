// netlify/functions/agent-chat.js
//
// Función PÚBLICA (la usa el widget flotante desde cualquier portal, sin
// login de admin) que recibe un mensaje + un poco de contexto del sitio
// (armado en el navegador a partir de data.js/roster.js — ver
// assets/js/agent-widget.js) y lo reenvía a la API de Claude usando la
// API key que la administradora guardó desde su panel (agent-config-set.js,
// store "config" en Netlify Blobs). La key NUNCA viaja al navegador — solo
// entra y sale de aquí.
//
// POST body: { message, history: [{role,content}], context, portal }
//
// v1 = solo responde preguntas (no llena formularios ni escribe en el
// sitio todavía — eso es fase 2, pendiente).

const { abrirStore } = require("./_blobs");

const MODEL = "claude-haiku-4-5-20251001";
const MAX_HISTORY = 12; // últimos N mensajes (no se guarda nada en servidor, lo manda el navegador)
const MAX_MESSAGE_LEN = 4000;
const MAX_CONTEXT_LEN = 12000;

const SYSTEM_BASE = `Eres el asistente del dashboard del diplomado "Mujer, Haz lo Tuyo" (The Ok People, facilitado por Rubí Zepeda).
Contestas en español de México, de forma breve, cálida y directa — como alguien del equipo del diplomado, no como un bot genérico.
Solo usas la información del "CONTEXTO DEL SITIO" que te paso abajo (calendario, módulos, facilitadores, datos de contacto) — si algo no está ahí, dilo con honestidad ("no tengo ese dato, pregúntale a Rubí") en vez de inventarlo.
No dabas ni inventas contraseñas, correos o datos personales de otras participantes que no estén explícitamente en el contexto que te dieron para ESTA conversación.
Por ahora solo puedes responder preguntas — todavía no puedes editar ni guardar nada en el dashboard (eso viene en una siguiente versión), así que si te piden que "llenes" o "guardes" algo, explica que por ahora solo puedes ayudar a consultar información y que se hace manualmente en el panel correspondiente.
Cierra con calidez cuando aplique, pero sin relleno innecesario — respuestas cortas y útiles.`;

async function leerApiKey() {
  const store = abrirStore("config");
  const val = await store.get("claude-agent", { type: "json" });
  return val && val.apiKey ? val.apiKey : null;
}

exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { ...headers, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "POST, OPTIONS" } };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, error: "Método no permitido" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "JSON inválido" }) };
  }

  const message = String(payload.message || "").trim().slice(0, MAX_MESSAGE_LEN);
  const context = String(payload.context || "").slice(0, MAX_CONTEXT_LEN);
  const portal = String(payload.portal || "").slice(0, 40);
  let history = Array.isArray(payload.history) ? payload.history : [];
  history = history
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, MAX_MESSAGE_LEN) }));

  if (!message) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Falta el mensaje" }) };
  }

  let apiKey;
  try {
    apiKey = await leerApiKey();
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: "No se pudo leer la configuración: " + (e.message || e) }) };
  }
  if (!apiKey) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: false, error: "El agente todavía no está activado — pídele a Rubí que ponga su API key de Claude en Administrador → Agente Claude." }),
    };
  }

  const systemPrompt = SYSTEM_BASE + (portal ? `\n\nEstás respondiendo dentro del portal de: ${portal}.` : "") + (context ? `\n\nCONTEXTO DEL SITIO:\n${context}` : "\n\n(No se recibió contexto del sitio en esta consulta.)");

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: systemPrompt,
        messages: [...history, { role: "user", content: message }],
      }),
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      const detalle = (data && data.error && data.error.message) || `HTTP ${resp.status}`;
      return { statusCode: 200, headers, body: JSON.stringify({ ok: false, error: "Claude respondió con un error: " + detalle }) };
    }

    const texto = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim() || "(sin respuesta)";

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, reply: texto }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: "No se pudo contactar a Claude: " + (e.message || e) }) };
  }
};
