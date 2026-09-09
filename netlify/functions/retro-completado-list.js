// netlify/functions/retro-completado-list.js
//
// Lista quién ya marcó "ya la contesté" para la liga externa de
// retroalimentación (Microsoft Forms). Función PÚBLICA de solo lectura,
// la usa el portal de Facilitador para ver el avance por módulo.
//
// GET /.netlify/functions/retro-completado-list                    -> todas
// GET /.netlify/functions/retro-completado-list?modulo=1%20-%20Tema -> solo ese módulo

const { abrirStore } = require("./_blobs");

exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { ...headers, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET, OPTIONS" } };
  }
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  const modulo = (event.queryStringParameters || {}).modulo;

  try {
    const store = abrirStore("retro-completado");
    let items = (await store.get("todas", { type: "json" })) || [];
    if (modulo) items = items.filter((r) => String(r.modulo) === String(modulo));
    items.sort((a, b) => (b.creado || "").localeCompare(a.creado || ""));
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, items }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo listar: " + (e.message || e) }) };
  }
};
