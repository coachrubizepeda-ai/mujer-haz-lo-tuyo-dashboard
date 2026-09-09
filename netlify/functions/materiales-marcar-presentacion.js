// netlify/functions/materiales-marcar-presentacion.js
//
// Marca (o desmarca) un material ya compartido como LA presentación
// oficial de su módulo. Solo puede haber un material marcado por módulo:
// al marcar uno, se desmarca automáticamente cualquier otro del mismo
// módulo — no se borra nada, solo cambia la marca (ver diseño con Rubí,
// sep-2026: el botón "Descargar presentación" de las asistentes depende
// de esta marca, ya no de un archivo fijo en data.js).
//
// POST /.netlify/functions/materiales-marcar-presentacion
//   body: { id, modulo, valor: true|false }

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
  const valor = !!payload.valor;
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
    if (valor) {
      actuales.forEach((x) => { if (x.modulo === modulo) x.es_presentacion = false; });
    }
    item.es_presentacion = valor;
    await store.setJSON("todas", actuales);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo actualizar: " + (e.message || e) }) };
  }
};
