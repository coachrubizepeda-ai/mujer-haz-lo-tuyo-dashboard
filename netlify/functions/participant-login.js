// netlify/functions/participant-login.js
//
// Verifica el correo + contraseña de una participante contra lo que guardó
// la administradora (participant-auth-set.js) y, si coincide, devuelve su
// participanteId (M01, M02, ...) para que el portal de asistentes sepa
// quién entró — sin depender de una contraseña compartida ni del navegador
// de nadie más. Función pública (la necesita cualquier participante desde
// su propio celular/laptop), por eso NO pide "adminKey".
//
// POST body: { email, password }

const { getStore } = require("@netlify/blobs");

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

  const email = String(payload.email || "").trim().toLowerCase();
  const password = String(payload.password || "");

  if (!email || !password) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Falta correo o contraseña" }) };
  }

  try {
    const store = getStore("participantes-auth");
    const { blobs } = await store.list();
    for (const b of blobs) {
      const val = await store.get(b.key, { type: "json" });
      if (val && val.email === email && val.password === password) {
        return { statusCode: 200, headers, body: JSON.stringify({ ok: true, participanteId: b.key }) };
      }
    }
    return { statusCode: 200, headers, body: JSON.stringify({ ok: false, error: "Correo o contraseña incorrectos" }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: "No se pudo verificar: " + (e.message || e) }) };
  }
};
