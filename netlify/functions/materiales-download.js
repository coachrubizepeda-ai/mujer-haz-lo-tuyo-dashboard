// netlify/functions/materiales-download.js
//
// Sirve un archivo de material compartido guardado en Netlify Blobs.
// GET /.netlify/functions/materiales-download?key=mat_xxx-nombre.pdf        -> ver
// GET /.netlify/functions/materiales-download?key=mat_xxx-nombre.pdf&dl=1   -> descargar

const { abrirStore } = require("./_blobs");

function contentTypeDe(filename) {
  const ext = String(filename || "").split(".").pop().toLowerCase();
  const tipos = {
    pdf: "application/pdf",
    zip: "application/zip",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    key: "application/octet-stream",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    csv: "text/csv",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  return tipos[ext] || "application/octet-stream";
}

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  const qs = event.queryStringParameters || {};
  const key = qs.key;
  if (!key) {
    return { statusCode: 400, body: "Falta el parámetro key" };
  }

  try {
    const store = abrirStore("materiales-archivos");
    const info = await store.getMetadata(key);
    if (!info) {
      return { statusCode: 404, body: "No se encontró ese archivo" };
    }
    const buffer = await store.get(key, { type: "arrayBuffer" });
    if (!buffer) {
      return { statusCode: 404, body: "No se encontró ese archivo" };
    }
    const filename = (info.metadata && info.metadata.filename) || "material";
    // Solo PDF se puede ver dentro del navegador; el resto (Excel, Word,
    // CSV, ZIP, PPT, Keynote) se descarga directo para que no abra una
    // pestaña en blanco.
    const extArchivo = String(filename).split(".").pop().toLowerCase();
    const disposition = (qs.dl || extArchivo !== "pdf") ? "attachment" : "inline";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentTypeDe(filename),
        "Content-Disposition": `${disposition}; filename="${filename.replace(/"/g, "")}"`,
        "Cache-Control": "private, max-age=0, no-cache",
      },
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (e) {
    return { statusCode: 500, body: "No se pudo descargar: " + (e.message || e) };
  }
};
