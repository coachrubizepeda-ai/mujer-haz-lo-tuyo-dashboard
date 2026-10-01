// netlify/functions/biblioteca-actualizar.js
//
// Actualiza una lectura/liga ya guardada en la Biblioteca: el módulo (por
// si quedó mal asignada) y/o cualquiera de sus datos (título, autor, tipo,
// liga, notas) — para poder corregirla sin tener que borrarla y volver a
// escribirla. Mismo patrón que materiales-actualizar.js.
// POST /.netlify/functions/biblioteca-actualizar
//   body: { id, modulo?, titulo?, autor?, tipo?, liga?, notas? }
//   - id es obligatorio; el resto son opcionales, solo se cambia lo que venga.

const { abrirStore } = require("./_blobs");

const CAMPOS_EDITABLES = ["modulo", "titulo", "autor", "tipo", "liga", "notas"];

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

  const { id } = payload;
  if (!id) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Falta id" }) };
  }

  const cambios = {};
  CAMPOS_EDITABLES.forEach((campo) => {
    if (payload[campo] !== undefined && payload[campo] !== null) {
      cambios[campo] = String(payload[campo]).trim();
    }
  });
  if (!Object.keys(cambios).length) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "No hay ningún cambio que guardar" }) };
  }
  if (cambios.titulo === "") {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "El título no puede quedar vacío" }) };
  }

  try {
    const store = abrirStore("biblioteca-modulos");
    const actuales = (await store.get("todas", { type: "json" })) || [];
    const item = actuales.find((x) => x.id === id);
    if (!item) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: "No se encontró esa lectura" }) };
    }
    Object.assign(item, cambios);
    await store.setJSON("todas", actuales);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, registro: item }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "No se pudo actualizar: " + (e.message || e) }) };
  }
};
