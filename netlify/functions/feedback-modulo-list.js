// netlify/functions/feedback-modulo-list.js
//
// Lista las respuestas de "Retroalimentación del módulo" guardadas en
// Netlify Blobs. Función PÚBLICA de solo lectura (mismo criterio que
// test-list.js) — la usan los portales de Facilitador y Administradora
// para mostrar los resultados; el portal de Participante no la llama.
//
// GET /.netlify/functions/feedback-modulo-list                 -> todas
// GET /.netlify/functions/feedback-modulo-list?moduloId=3       -> solo ese módulo

const { abrirStore } = require("./_blobs");

exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { ...headers, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET, OPTIONS" } };
  }
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  const moduloId = (event.queryStringParameters || {}).moduloId;

  try {
    const store = abrirStore("retroalimentacion");
    let items = (await store.get("todas", { type: "json" })) || [];
    if (moduloId) items = items.filter((r) => String(r.moduloId) === String(moduloId));
    items.sort((a, b) => (b.creado || "").localeCompare(a.creado || ""));
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, items }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo listar: " + (e.message || e) }) };
  }
};
