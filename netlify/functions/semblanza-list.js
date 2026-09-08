// netlify/functions/semblanza-list.js
//
// Lee las semblanzas guardadas (store "semblanzas-asistentes"). Sin
// parámetros regresa todas (para el directorio y el panel de admin);
// con ?participanteId=M01 regresa solo la de esa persona (para
// precargar "Mi semblanza" con lo que ya escribió, en cualquier
// dispositivo).

const { abrirStore } = require("./_blobs");

exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { ...headers, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET, OPTIONS" } };
  }
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  const participanteId = (event.queryStringParameters || {}).participanteId;

  try {
    const store = abrirStore("semblanzas-asistentes");

    if (participanteId) {
      const registro = await store.get(String(participanteId), { type: "json" });
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, registro: registro || null }) };
    }

    const { blobs } = await store.list();
    const todas = {};
    for (const b of blobs) {
      const registro = await store.get(b.key, { type: "json" });
      if (registro) todas[b.key] = registro;
    }
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, todas }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo leer: " + (e.message || e) }) };
  }
};
