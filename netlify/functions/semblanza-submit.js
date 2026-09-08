// netlify/functions/semblanza-submit.js
//
// Guarda (o actualiza) la semblanza de UNA asistente como un documento
// vivo: cada envío GUARDA EL TEXTO COMPLETO actual (no un solo párrafo
// suelto), pero antes de sobreescribir mueve la versión anterior a un
// historial, así nunca se pierde nada. Esto reemplaza el viejo mecanismo
// que solo guardaba en localStorage (invisible entre navegadores/dispositivos)
// y no dejaba ver ni seguir editando lo ya escrito.
//
// POST body: { participanteId, nombre, texto }

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
  const texto = String(payload.texto || "").trim();

  if (!participanteId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta participanteId" }) };
  }
  if (!texto) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta el texto de la semblanza" }) };
  }

  try {
    const store = abrirStore("semblanzas-asistentes");
    const anterior = await store.get(participanteId, { type: "json" });
    const historial = (anterior && Array.isArray(anterior.historial)) ? anterior.historial : [];
    if (anterior && anterior.texto && anterior.texto !== texto) {
      historial.push({ texto: anterior.texto, fecha: anterior.fecha });
    }
    const registro = {
      participanteId,
      nombre: nombre || (anterior && anterior.nombre) || "",
      texto,
      historial,
      fecha: new Date().toISOString(),
    };
    await store.setJSON(participanteId, registro);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, registro }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo guardar: " + (e.message || e) }) };
  }
};
