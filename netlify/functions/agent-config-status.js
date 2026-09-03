// netlify/functions/agent-config-status.js
//
// Dice si ya hay una API key de Claude guardada (y sus últimos 4
// caracteres, nada más) — para que el panel de administradora muestre
// "configurada" sin volver a exponer la key completa.
//
// GET /.netlify/functions/agent-config-status?adminKey=...

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
    const store = abrirStore("config");
    const val = await store.get("claude-agent", { type: "json" });
    if (!val || !val.apiKey) {
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, configured: false }) };
    }
    const ultimos4 = val.apiKey.slice(-4);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, configured: true, ultimos4, actualizado: val.actualizado || null }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo consultar: " + (e.message || e) }) };
  }
};
