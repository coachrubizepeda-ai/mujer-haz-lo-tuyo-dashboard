// netlify/functions/test-upload.js
//
// Recibe un PDF de resultados del Test Trimetrix (en base64, dentro de un
// JSON) y lo guarda en Netlify Blobs — un almacenamiento de archivos
// incluido automáticamente con cualquier sitio en Netlify (no requiere
// cuenta ni configuración extra, solo que el sitio esté desplegado ahí).
//
// Una vez guardado, el archivo queda disponible al instante para
// test-list.js (listarlo) y test-download.js (verlo/descargarlo) — desde
// cualquier navegador, de cualquier persona, sin pasar por localStorage
// ni por Netlify Forms.

const { abrirStore } = require("./_blobs");

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB por archivo

function slug(nombre) {
  return String(nombre || "archivo.pdf")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .slice(0, 120);
}

exports.handler = async (event) => {
  const headers = { "Access-Control-Allow-Origin": "*" };

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

  const { participanteId, participanteNombre, filename, contentBase64, subidoPor } = payload;

  if (!participanteId || !filename || !contentBase64) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta participanteId, filename o contentBase64" }) };
  }

  let buffer;
  try {
    buffer = Buffer.from(contentBase64, "base64");
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "contentBase64 no es base64 válido" }) };
  }

  if (buffer.length === 0) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "El archivo llegó vacío" }) };
  }
  if (buffer.length > MAX_BYTES) {
    return { statusCode: 413, headers, body: JSON.stringify({ error: `El archivo pesa más de ${MAX_BYTES / (1024 * 1024)} MB` }) };
  }

  const safeName = slug(filename);
  const key = `${slug(participanteId)}/${Date.now()}-${safeName}`;
  const fecha = new Date().toISOString();

  try {
    const store = abrirStore("resultados-test");
    await store.set(key, buffer, {
      metadata: {
        filename: safeName,
        participanteId: String(participanteId),
        participanteNombre: participanteNombre || "",
        subidoPor: subidoPor || "",
        fecha,
      },
    });
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo guardar el archivo: " + (e.message || e) }) };
  }

  return {
    statusCode: 200,
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true, key, filename: safeName, fecha }),
  };
};
