// netlify/functions/materiales-list.js
//
// Lista los materiales compartidos por facilitadores (archivos y ligas).
// GET /.netlify/functions/materiales-list                -> todos
// GET /.netlify/functions/materiales-list?modulo=1%20-%20Tema -> solo ese módulo

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
    const store = abrirStore("materiales-compartidos");
    let items = (await store.get("todas", { type: "json" })) || [];
    if (modulo) items = items.filter((x) => String(x.modulo) === String(modulo));
    items.sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, items }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo listar: " + (e.message || e) }) };
  }
};
