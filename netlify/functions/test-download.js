// netlify/functions/test-download.js
//
// Sirve un PDF guardado en Netlify Blobs.
// GET /.netlify/functions/test-download?key=M01/169...-archivo.pdf
//   ver en el navegador (para "Ver")
// GET /.netlify/functions/test-download?key=...&dl=1
//   forzar descarga (para "Descargar")

const { getStore } = require("@netlify/blobs");

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
    const store = getStore("resultados-test");
    const info = await store.getMetadata(key);
    if (!info) {
      return { statusCode: 404, body: "No se encontró ese archivo" };
    }
    const buffer = await store.get(key, { type: "arrayBuffer" });
    if (!buffer) {
      return { statusCode: 404, body: "No se encontró ese archivo" };
    }
    const filename = (info.metadata && info.metadata.filename) || "resultado.pdf";
    const disposition = qs.dl ? "attachment" : "inline";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
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
