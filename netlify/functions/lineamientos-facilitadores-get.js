// netlify/functions/lineamientos-facilitadores-get.js
//
// Lee el "Código de Honor para facilitadores" guardado en Netlify Blobs
// (store "lineamientos", key "facilitadores"). Si todavía no se ha
// guardado nada, regresa items:null para que quien llama use el
// placeholder de assets/js/data.js (CODIGO_HONOR) como respaldo.

const { abrirStore } = require("./_blobs");

exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { ...headers, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET, OPTIONS" } };
  }
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  try {
    const store = abrirStore("lineamientos");
    const registro = await store.get("facilitadores", { type: "json" });
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, items: (registro && registro.items) || null, fecha: (registro && registro.fecha) || null }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo leer: " + (e.message || e) }) };
  }
};
