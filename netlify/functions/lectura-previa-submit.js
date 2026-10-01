// netlify/functions/lectura-previa-submit.js
//
// Guarda (o actualiza) el texto de "Lectura previa" de un módulo. Cada
// facilitador(a) lo escribe desde su portal ("Compartir contenido"); se
// guarda una sola versión vigente por módulo (si ya existía una para ese
// módulo, se reemplaza — no se acumulan versiones). Mismo patrón que
// tareas-submit.js.
//
// POST body: { modulo, ponente, texto }
//   modulo -> misma clave que usa "materiales" ("${m.id} - ${m.tema}")
//   ponente -> nombre del facilitador(a) que lo escribió (informativo)
//   texto -> texto libre con la lectura previa al módulo

const { abrirStore } = require("./_blobs");

exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { ...headers, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "POST, OPTIONS" } };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, error: "Método no permitido" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "JSON inválido" }) };
  }

  const modulo = String(payload.modulo || "").trim();
  const ponente = String(payload.ponente || "").trim();
  const texto = String(payload.texto || "").trim().slice(0, 6000);

  if (!modulo) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Falta el módulo" }) };
  }
  if (!texto) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Falta el texto de la lectura previa" }) };
  }

  try {
    const store = abrirStore("lectura-previa-modulo");
    const actuales = (await store.get("todas", { type: "json" })) || [];
    const existente = actuales.find((t) => t.modulo === modulo);
    const ahora = new Date().toISOString();
    if (existente) {
      existente.texto = texto;
      existente.ponente = ponente;
      existente.actualizado = ahora;
    } else {
      actuales.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        modulo,
        ponente,
        texto,
        creado: ahora,
        actualizado: ahora,
      });
    }
    await store.setJSON("todas", actuales);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: "No se pudo guardar: " + (e.message || e) }) };
  }
};
