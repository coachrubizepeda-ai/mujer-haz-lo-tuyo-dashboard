// netlify/functions/tarea-video-submit.js
//
// Marca que una asistente YA ENVIÓ sus videos de tarea (por WhatsApp,
// fuera del sitio) para un módulo. No se sube ningún archivo aquí —
// solo se guarda el estado "entregado" con fecha, igual de ligero que
// una semblanza o una lectura previa, pero sin texto.
//
// POST body: { participanteId, nombre, modulo }

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

  const participanteId = String(payload.participanteId || "").trim();
  const nombre = String(payload.nombre || "").trim();
  const modulo = String(payload.modulo || "").trim();

  if (!participanteId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta participanteId" }) };
  }
  if (!modulo) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta el módulo" }) };
  }

  try {
    const store = abrirStore("tareas-video-asistentes");
    const clave = `${participanteId}__${modulo}`;
    const registro = {
      participanteId,
      nombre,
      modulo,
      fecha: new Date().toISOString(),
    };
    await store.setJSON(clave, registro);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, registro }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo guardar: " + (e.message || e) }) };
  }
};
