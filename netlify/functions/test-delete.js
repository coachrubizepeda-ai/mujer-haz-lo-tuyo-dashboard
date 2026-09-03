// netlify/functions/test-delete.js
//
// Elimina un PDF de resultados guardado en Netlify Blobs.
// POST /.netlify/functions/test-delete   body: { "key": "M01/169...-archivo.pdf" }
//
// Nota: igual que el resto del sitio, esta función no tiene autenticación
// propia (el sitio no maneja cuentas reales) — el botón de eliminar solo
// aparece en el panel de administradora.

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

  const { key } = payload;
  if (!key) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta key" }) };
  }

  try {
    const store = abrirStore("resultados-test");
    await store.delete(key);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo eliminar: " + (e.message || e) }) };
  }
};
