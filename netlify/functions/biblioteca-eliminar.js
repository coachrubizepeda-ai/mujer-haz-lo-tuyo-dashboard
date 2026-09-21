// netlify/functions/biblioteca-eliminar.js
//
// Elimina una entrada de la bibliografía.
// POST /.netlify/functions/biblioteca-eliminar   body: { id }

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

  const { id } = payload;
  if (!id) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta id" }) };
  }

  try {
    const store = abrirStore("biblioteca-modulos");
    const actuales = (await store.get("todas", { type: "json" })) || [];
    const restantes = actuales.filter((x) => x.id !== id);
    await store.setJSON("todas", restantes);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo eliminar: " + (e.message || e) }) };
  }
};
