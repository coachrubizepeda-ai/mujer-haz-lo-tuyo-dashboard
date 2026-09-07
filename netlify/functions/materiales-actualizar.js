// netlify/functions/materiales-actualizar.js
//
// Cambia el módulo asignado a un material ya compartido (por si cayó en el
// módulo equivocado). No mueve el archivo real, solo el índice.
// POST /.netlify/functions/materiales-actualizar   body: { id, modulo }

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

  const { id, modulo } = payload;
  if (!id || !modulo) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta id o modulo" }) };
  }

  try {
    const store = abrirStore("materiales-compartidos");
    const actuales = (await store.get("todas", { type: "json" })) || [];
    const item = actuales.find((x) => x.id === id);
    if (!item) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: "No se encontró ese material" }) };
    }
    item.modulo = modulo;
    await store.setJSON("todas", actuales);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo actualizar: " + (e.message || e) }) };
  }
};
