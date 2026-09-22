// netlify/functions/materiales-actualizar.js
//
// Actualiza campos de un material ya compartido: el módulo asignado (por si
// cayó en el módulo equivocado), y/o — solo para ligas — su título o la URL,
// por si el facilitador se equivocó o quiere ponerle un título después.
// POST /.netlify/functions/materiales-actualizar
//   body: { id, modulo? , titulo?, nombre_o_url? }  (al menos uno de los tres)

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

  const { id, modulo, titulo, nombre_o_url } = payload;
  if (!id || (!modulo && titulo === undefined && nombre_o_url === undefined)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta id y al menos un campo a cambiar" }) };
  }

  try {
    const store = abrirStore("materiales-compartidos");
    const actuales = (await store.get("todas", { type: "json" })) || [];
    const item = actuales.find((x) => x.id === id);
    if (!item) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: "No se encontró ese material" }) };
    }
    if (modulo) item.modulo = modulo;
    if (titulo !== undefined) {
      const limpio = String(titulo).trim();
      if (limpio) item.titulo = limpio; else delete item.titulo;
    }
    if (nombre_o_url !== undefined && item.tipo === "liga") {
      const limpio = String(nombre_o_url).trim();
      if (limpio) item.nombre_o_url = limpio;
    }
    await store.setJSON("todas", actuales);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, registro: item }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo actualizar: " + (e.message || e) }) };
  }
};
