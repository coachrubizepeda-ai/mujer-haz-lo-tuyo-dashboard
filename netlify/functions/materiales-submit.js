// netlify/functions/materiales-submit.js
//
// Guarda UN material compartido por un facilitador (archivo o liga) en
// Netlify Blobs, para que quede visible al instante para TODAS las
// asistentes, facilitadores y administradora — sin depender de Netlify
// Forms (invisible para el propio sitio) ni de localStorage (solo visible
// en el navegador de quien lo compartió).
//
// POST /.netlify/functions/materiales-submit
//   Liga:    { modulo, ponente, tipo:"liga", nombre_o_url }
//   Archivo: { modulo, ponente, tipo:"archivo", filename, contentBase64 }

const { abrirStore } = require("./_blobs");

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB por archivo

function slug(nombre) {
  return String(nombre || "archivo")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .slice(0, 120);
}
function nuevoId() {
  return "mat_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
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

  const { modulo, ponente, tipo, es_presentacion } = payload;
  if (!modulo || !tipo) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta modulo o tipo" }) };
  }

  const id = nuevoId();
  const fecha = new Date().toISOString();
  // es_presentacion marca este material como LA presentación oficial del
  // módulo (ver diseño con Rubí, sep-2026): solo uno por módulo puede
  // tener la marca — se desmarca cualquier otro más abajo, sin borrarlo.
  const registro = { id, modulo, ponente: ponente || "", tipo, fecha, es_presentacion: !!es_presentacion };

  try {
    const storeIndice = abrirStore("materiales-compartidos");

    if (tipo === "archivo") {
      const { filename, contentBase64 } = payload;
      if (!filename || !contentBase64) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta filename o contentBase64" }) };
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
      const fileKey = `${id}-${safeName}`;
      const storeArchivos = abrirStore("materiales-archivos");
      await storeArchivos.set(fileKey, buffer, { metadata: { filename: safeName } });
      registro.nombre_o_url = safeName;
      registro.fileKey = fileKey;
    } else {
      const { nombre_o_url } = payload;
      if (!nombre_o_url) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta nombre_o_url" }) };
      }
      registro.nombre_o_url = nombre_o_url;
    }

    const actuales = (await storeIndice.get("todas", { type: "json" })) || [];
    if (registro.es_presentacion) {
      actuales.forEach((x) => { if (x.modulo === modulo) x.es_presentacion = false; });
    }
    actuales.push(registro);
    await storeIndice.setJSON("todas", actuales);
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo guardar: " + (e.message || e) }) };
  }

  return { statusCode: 200, headers, body: JSON.stringify({ ok: true, id, registro }) };
};
