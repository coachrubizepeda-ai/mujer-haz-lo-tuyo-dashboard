// netlify/functions/tarea-video-liga-list.js
//
// Lee las ligas de Drive guardadas por módulo (store "tareas-video-ligas").
// Sin parámetros regresa todas; con ?modulo= regresa solo la de ese módulo.

const { abrirStore } = require("./_blobs");

exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { ...headers, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET, OPTIONS" } };
  }
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  const { modulo } = event.queryStringParameters || {};

  try {
    const store = abrirStore("tareas-video-ligas");
    if (modulo) {
      const registro = await store.get(modulo, { type: "json" });
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, items: registro ? [registro] : [] }) };
    }
    const { blobs } = await store.list();
    const items = [];
    for (const b of blobs) {
      const registro = await store.get(b.key, { type: "json" });
      if (registro) items.push(registro);
    }
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, items }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo leer: " + (e.message || e) }) };
  }
};
