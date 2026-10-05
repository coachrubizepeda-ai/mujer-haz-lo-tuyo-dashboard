// netlify/functions/tarea-video-liga-submit.js
//
// Guarda la liga de Drive (o donde sea) con los videos de tarea YA
// organizados por la administradora, para un módulo. El facilitador
// de ese módulo la ve en su portal como botón "Ver videos".
//
// POST body: { modulo, liga }

const { abrirStore } = require("./_blobs");

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

  const modulo = String(payload.modulo || "").trim();
  const liga = String(payload.liga || "").trim();

  if (!modulo) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta el módulo" }) };
  }
  if (!liga) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta la liga" }) };
  }

  try {
    const store = abrirStore("tareas-video-ligas");
    const registro = { modulo, liga, fecha: new Date().toISOString() };
    await store.setJSON(modulo, registro);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, registro }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo guardar: " + (e.message || e) }) };
  }
};
