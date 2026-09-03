// netlify/functions/agent-config-set.js
//
// Guarda (o borra) la API key de Claude que usa el agente flotante del
// dashboard. Se guarda en Netlify Blobs (store "config", key "claude-agent")
// — NUNCA se regresa completa al navegador, ni siquiera a la administradora
// (solo agent-config-status.js regresa los últimos 4 caracteres, para que
// sepa que sí quedó guardada sin exponerla).
//
// POST body: { adminKey, apiKey }  -> apiKey "" o ausente = borra la key
// "adminKey" debe ser igual a la contraseña de administradora (ver nota en
// participant-auth-set.js sobre por qué esto no es seguridad real).

const { abrirStore } = require("./_blobs");

const ADMIN_KEY = "RUBI2026";

exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { ...headers, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "POST, OPTIONS" } };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "JSON inválido" }) };
  }

  const { adminKey, apiKey } = payload;
  if (adminKey !== ADMIN_KEY) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: "No autorizado" }) };
  }

  const key = String(apiKey || "").trim();

  try {
    const store = abrirStore("config");
    if (!key) {
      await store.delete("claude-agent");
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, configured: false }) };
    }
    await store.setJSON("claude-agent", { apiKey: key, actualizado: new Date().toISOString() });
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, configured: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo guardar: " + (e.message || e) }) };
  }
};
