// netlify/functions/retro-completado-marcar.js
//
// Registra que una participante ya contestó la liga externa de
// retroalimentación (Microsoft Forms) para un módulo. Es un "sello" de
// "ya la hice" — no guarda las respuestas (esas viven en Microsoft
// Forms, fuera de este sitio), solo quién y cuándo dijo que ya la llenó,
// para que el facilitador/Rubí puedan ver el avance sin perseguir a nadie.
//
// Se guarda como máximo un registro por (módulo, participante): si ya
// existía, solo se actualiza la fecha (permite volver a marcar sin
// duplicar filas).
//
// POST body: { modulo, moduloTema, participanteId, participanteNombre }

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
  const moduloTema = String(payload.moduloTema || "").trim();
  const participanteId = String(payload.participanteId || "").trim();
  const participanteNombre = String(payload.participanteNombre || "").trim().slice(0, 120);

  if (!modulo) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Falta el módulo" }) };
  }
  if (!participanteNombre && !participanteId) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Falta identificar a la participante" }) };
  }

  try {
    const store = abrirStore("retro-completado");
    const actuales = (await store.get("todas", { type: "json" })) || [];
    const ahora = new Date().toISOString();
    const existente = actuales.find(
      (r) => r.modulo === modulo && (participanteId ? r.participanteId === participanteId : r.participanteNombre === participanteNombre)
    );
    if (existente) {
      existente.creado = ahora;
      existente.moduloTema = moduloTema || existente.moduloTema;
    } else {
      actuales.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        modulo,
        moduloTema,
        participanteId,
        participanteNombre,
        creado: ahora,
      });
    }
    await store.setJSON("todas", actuales);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: "No se pudo guardar: " + (e.message || e) }) };
  }
};
