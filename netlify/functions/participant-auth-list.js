// netlify/functions/participant-auth-list.js
//
// Devuelve el correo/contraseña/celular guardados de TODAS las participantes
// (solo para el panel de administradora). Ver participant-auth-set.js para
// la nota sobre "adminKey".
//
// GET /.netlify/functions/participant-auth-list?adminKey=...

const { abrirStore } = require("./_blobs");

const ADMIN_KEY = "RUBI2026";

exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { ...headers, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET, OPTIONS" } };
  }
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  const adminKey = (event.queryStringParameters || {}).adminKey;
  if (adminKey !== ADMIN_KEY) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: "No autorizado" }) };
  }

  try {
    const store = abrirStore("participantes-auth");
    const { blobs } = await store.list();
    const items = {};
    await Promise.all(
      blobs.map(async (b) => {
        const val = await store.get(b.key, { type: "json" });
        if (val) items[b.key] = val;
      })
    );
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, items }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo listar: " + (e.message || e) }) };
  }
};
