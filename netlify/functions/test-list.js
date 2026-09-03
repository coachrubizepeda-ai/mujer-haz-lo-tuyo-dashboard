// netlify/functions/test-list.js
//
// Lista los resultados del Test Trimetrix guardados en Netlify Blobs.
// GET /.netlify/functions/test-list                     -> todos
// GET /.netlify/functions/test-list?participanteId=M01  -> solo esa persona

const { getStore } = require("@netlify/blobs");

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
    const store = getStore("resultados-test");
    const { blobs } = await store.list({ prefix: participanteId ? `${participanteId}/` : undefined });

    const items = await Promise.all(
      blobs.map(async (b) => {
        let meta = {};
        try {
          const info = await store.getMetadata(b.key);
          meta = (info && info.metadata) || {};
        } catch (e) {
          meta = {};
        }
        return {
          key: b.key,
          filename: meta.filename || b.key.split("/").pop(),
          participanteId: meta.participanteId || b.key.split("/")[0],
          participanteNombre: meta.participanteNombre || "",
          subidoPor: meta.subidoPor || "",
          fecha: meta.fecha || null,
        };
      })
    );

    items.sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, items }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo listar: " + (e.message || e) }) };
  }
};
