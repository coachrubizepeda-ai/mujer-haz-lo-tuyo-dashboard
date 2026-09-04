// netlify/functions/feedback-modulo-submit.js
//
// Guarda una respuesta de "Retroalimentación del módulo" (formato oficial de
// 16 preguntas en escala 1-5 + 2 abiertas). Función PÚBLICA — la llaman las
// asistentes desde su portal, sin login de admin (mismo criterio de
// seguridad que el resto del sitio: ver nota en participant-auth-set.js).
//
// Todas las respuestas se guardan en un solo arreglo (store "retroalimentacion",
// key "todas") — el volumen esperado (participantes x módulos) es pequeño,
// así que no hace falta partirlo por módulo.
//
// POST body: {
//   moduloId, moduloTema, fecha, facilitador,   // autocompletados por el navegador desde MODULOS (data.js)
//   nombre,                                      // opcional
//   respuestas: { "1": 5, "2": 4, ... "16": 3 }, // las 16 preguntas, 1-5
//   valioso, cambiar                             // texto libre, opcional
// }

const { abrirStore } = require("./_blobs");

const TOTAL_PREGUNTAS = 16;

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

  const moduloId = String(payload.moduloId || "").trim();
  const moduloTema = String(payload.moduloTema || "").trim();
  const fecha = String(payload.fecha || "").trim();
  const facilitador = String(payload.facilitador || "").trim();
  const nombre = String(payload.nombre || "").trim().slice(0, 120);
  const valioso = String(payload.valioso || "").trim().slice(0, 2000);
  const cambiar = String(payload.cambiar || "").trim().slice(0, 2000);

  if (!moduloId || !moduloTema) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Falta el módulo" }) };
  }

  const respuestasRaw = payload.respuestas && typeof payload.respuestas === "object" ? payload.respuestas : {};
  const respuestas = {};
  for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
    const v = parseInt(respuestasRaw[String(i)], 10);
    if (v >= 1 && v <= 5) respuestas[String(i)] = v;
  }
  if (Object.keys(respuestas).length === 0) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Faltan las calificaciones" }) };
  }

  const registro = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    moduloId,
    moduloTema,
    fecha,
    facilitador,
    nombre,
    respuestas,
    valioso,
    cambiar,
    creado: new Date().toISOString(),
  };

  try {
    const store = abrirStore("retroalimentacion");
    const actuales = (await store.get("todas", { type: "json" })) || [];
    actuales.push(registro);
    await store.setJSON("todas", actuales);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: "No se pudo guardar: " + (e.message || e) }) };
  }
};
