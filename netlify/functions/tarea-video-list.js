// netlify/functions/tarea-video-list.js
//
// Lee quién ya marcó "ya envié mis videos" (store "tareas-video-asistentes").
// Sin parámetros regresa todas (para el panel de admin y el de
// facilitador); con ?modulo= filtra por módulo; con ?participanteId=
// regresa solo la de esa persona (para precargar su estado al volver
// a entrar al portal).

const { abrirStore } = require("./_blobs");

exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { ...headers, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET, OPTIONS" } };
  }
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  const { modulo, participanteId } = event.queryStringParameters || {};

  try {
    const store = abrirStore("tareas-video-asistentes");
    const { blobs } = await store.list();
    let items = [];
    for (const b of blobs) {
      const registro = await store.get(b.key, { type: "json" });
      if (registro) items.push(registro);
    }
    if (modulo) items = items.filter((x) => x.modulo === modulo);
    if (participanteId) items = items.filter((x) => x.participanteId === participanteId);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, items }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo leer: " + (e.message || e) }) };
  }
};
