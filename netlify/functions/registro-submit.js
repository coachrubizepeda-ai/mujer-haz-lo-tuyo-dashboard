// netlify/functions/registro-submit.js
//
// Guarda (o actualiza) el registro de UNA asistente en Netlify Blobs
// (store "registros-asistentes", llave = participanteId). Así el registro
// queda visible para la administradora y para la propia asistente desde
// cualquier dispositivo — antes solo se guardaba en el localStorage del
// navegador de quien lo llenaba.
//
// POST body: { participanteId, nombre, email, empresa, cargo, telefono,
//              entero, redes_sociales, comentarios }

const { abrirStore } = require("./_blobs");

const CAMPOS = ["nombre", "email", "empresa", "cargo", "telefono", "entero", "redes_sociales", "comentarios"];

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
  if (!participanteId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta participanteId" }) };
  }

  const registro = { participanteId, fecha: new Date().toISOString() };
  CAMPOS.forEach((c) => { registro[c] = String(payload[c] || "").trim().slice(0, 2000); });

  if (!registro.email || !registro.telefono) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Faltan correo o teléfono" }) };
  }

  try {
    const store = abrirStore("registros-asistentes");
    await store.setJSON(participanteId, registro);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, registro }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo guardar: " + (e.message || e) }) };
  }
};
