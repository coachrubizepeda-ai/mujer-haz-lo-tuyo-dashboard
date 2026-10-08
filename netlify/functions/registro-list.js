// netlify/functions/registro-list.js
//
// Lee los registros de asistentes (store "registros-asistentes").
// Sin parámetros regresa todos (panel de administración); con
// ?participanteId=M01 regresa solo el de esa persona (para precargar
// "Mi registro" y mostrarle lo que ya envió).

const { abrirStore } = require("./_blobs");

exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json", "Cache-Control": "no-store" };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { ...headers, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET, OPTIONS" } };
  }
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  const participanteId = (event.queryStringParameters || {}).participanteId;

  try {
    const store = abrirStore("registros-asistentes");

    if (participanteId) {
      const registro = await store.get(String(participanteId), { type: "json" });
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, registro: registro || null }) };
    }

    const { blobs } = await store.list();
    const todos = {};
    for (const b of blobs) {
      const registro = await store.get(b.key, { type: "json" });
      if (registro) todos[b.key] = registro;
    }
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, todos }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo leer: " + (e.message || e) }) };
  }
};
