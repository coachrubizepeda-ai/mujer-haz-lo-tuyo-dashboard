// netlify/functions/tareas-list.js
//
// Lista las tareas guardadas por módulo. Función PÚBLICA de solo lectura,
// la usan tanto el portal de Participante (para mostrar la tarea vigente
// de cada módulo) como el de Facilitador (para mostrar lo que ya subió).
//
// GET /.netlify/functions/tareas-list                       -> todas
// GET /.netlify/functions/tareas-list?modulo=1%20-%20Tema    -> solo ese módulo

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
    const store = abrirStore("tareas-modulo");
    let items = (await store.get("todas", { type: "json" })) || [];
    if (modulo) items = items.filter((t) => String(t.modulo) === String(modulo));
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, items }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo listar: " + (e.message || e) }) };
  }
};
