// netlify/functions/expectativas-submit.js
//
// Guarda las "Expectativas previas al módulo" que llena la Participante
// (antes llamado "Cuestionario previo"). Origen: Participante. Destino:
// Facilitador (las ve en su propio portal, en la pestaña "Expectativas").
//
// POST body: { modulo, participanteId, participanteNombre, expectativas, enfoque, dudas }
//   modulo -> misma clave que usa "materiales"/"tareas" ("${m.id} - ${m.tema}")

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
  const participanteId = String(payload.participanteId || "").trim();
  const participanteNombre = String(payload.participanteNombre || "").trim().slice(0, 120);
  const expectativas = String(payload.expectativas || "").trim().slice(0, 2000);
  const enfoque = String(payload.enfoque || "").trim().slice(0, 2000);
  const dudas = String(payload.dudas || "").trim().slice(0, 2000);

  if (!modulo) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Falta el módulo" }) };
  }
  if (!participanteNombre) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Falta el nombre" }) };
  }

  const registro = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    modulo,
    participanteId,
    participanteNombre,
    expectativas,
    enfoque,
    dudas,
    creado: new Date().toISOString(),
  };

  try {
    const store = abrirStore("expectativas-previas");
    const actuales = (await store.get("todas", { type: "json" })) || [];
    actuales.push(registro);
    await store.setJSON("todas", actuales);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: "No se pudo guardar: " + (e.message || e) }) };
  }
};
