// netlify/functions/lineamientos-participantes-set.js
//
// Guarda el "Código de Honor para participantes" completo (arreglo de
// [titulo, texto]) — se edita desde el portal de Facilitador y así queda
// visible de inmediato, para todas, en Asistentes y Administradora.
// Reemplaza el viejo mecanismo de overrides/extras solo-en-localStorage
// que nunca salía del navegador donde se editaba.
//
// POST body: { items: [[titulo, texto], ...] }

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

  if (!Array.isArray(payload.items)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta items (arreglo)" }) };
  }

  try {
    const store = abrirStore("lineamientos");
    const registro = { items: payload.items, fecha: new Date().toISOString() };
    await store.setJSON("participantes", registro);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, registro }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo guardar: " + (e.message || e) }) };
  }
};
