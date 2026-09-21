// netlify/functions/biblioteca-submit.js
//
// Guarda UNA lectura/libro/artículo recomendado para un módulo, en
// Netlify Blobs — visible al instante para asistentes, facilitadores
// y administradora. Mismo patrón que materiales-submit.js.
//
// POST /.netlify/functions/biblioteca-submit
//   body: { modulo, titulo, autor, tipo, liga, notas }
//   - modulo y titulo y autor son obligatorios.
//   - tipo: "Libro" | "Artículo" | "Otro" (default "Libro").
//   - liga y notas son opcionales.

const { abrirStore } = require("./_blobs");

function nuevoId() {
  return "bib_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

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

  const { modulo, titulo, autor, tipo, liga, notas } = payload;
  if (!modulo || !String(titulo || "").trim() || !String(autor || "").trim()) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta módulo, título o autor" }) };
  }

  const registro = {
    id: nuevoId(),
    modulo,
    titulo: String(titulo).trim(),
    autor: String(autor).trim(),
    tipo: (tipo && String(tipo).trim()) || "Libro",
    liga: (liga && String(liga).trim()) || "",
    notas: (notas && String(notas).trim()) || "",
    fecha: new Date().toISOString(),
  };

  try {
    const store = abrirStore("biblioteca-modulos");
    const actuales = (await store.get("todas", { type: "json" })) || [];
    actuales.push(registro);
    await store.setJSON("todas", actuales);
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo guardar: " + (e.message || e) }) };
  }

  return { statusCode: 200, headers, body: JSON.stringify({ ok: true, id: registro.id, registro }) };
};
