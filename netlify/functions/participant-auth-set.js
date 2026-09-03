// netlify/functions/participant-auth-set.js
//
// Guarda (o reemplaza) el correo, contraseña y celular de UNA participante,
// para su login individual al portal de asistentes. Usa Netlify Blobs
// (store "participantes-auth"), igual que los PDFs del Test Trimetrix.
//
// POST body: { adminKey, participanteId, email, password, telefono }
//
// "adminKey" debe ser igual a la contraseña de administradora del sitio
// (ver assets/js/auth.js) — NO es seguridad real (la contraseña vive en el
// código del sitio, visible para quien la busque), solo evita que cualquiera
// con la URL de esta función la use sin conocerla, igual que el resto del
// sitio.

const { getStore } = require("@netlify/blobs");

const ADMIN_KEY = "RUBI2026";

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

  const { adminKey, participanteId, email, password, telefono } = payload;

  if (adminKey !== ADMIN_KEY) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: "No autorizado" }) };
  }
  if (!participanteId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta participanteId" }) };
  }

  const registro = {
    email: String(email || "").trim().toLowerCase(),
    password: String(password || ""),
    telefono: String(telefono || "").trim(),
    actualizado: new Date().toISOString(),
  };

  try {
    const store = getStore("participantes-auth");
    await store.setJSON(String(participanteId), registro);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo guardar: " + (e.message || e) }) };
  }
};
