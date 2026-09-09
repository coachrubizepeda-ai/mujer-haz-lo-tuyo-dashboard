// netlify/functions/tareas-submit.js
//
// Guarda (o actualiza) la descripción de la tarea de un módulo. Cada
// facilitador(a) escribe la tarea de SU módulo desde el portal de
// Facilitador ("Subir tarea"); se guarda una sola tarea vigente por
// módulo (si ya existía una para ese módulo, se reemplaza — no se
// acumulan versiones).
//
// POST body: { modulo, ponente, descripcion }
//   modulo      -> misma clave que usa "materiales" ("${m.id} - ${m.tema}")
//   ponente     -> nombre del facilitador(a) que la escribió (informativo)
//   descripcion -> texto libre con lo que debe hacer la participante

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
  const ponente = String(payload.ponente || "").trim();
  const descripcion = String(payload.descripcion || "").trim().slice(0, 4000);

  if (!modulo) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Falta el módulo" }) };
  }
  if (!descripcion) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Falta la descripción de la tarea" }) };
  }

  try {
    const store = abrirStore("tareas-modulo");
    const actuales = (await store.get("todas", { type: "json" })) || [];
    const existente = actuales.find((t) => t.modulo === modulo);
    const ahora = new Date().toISOString();
    if (existente) {
      existente.descripcion = descripcion;
      existente.ponente = ponente;
      existente.actualizado = ahora;
    } else {
      actuales.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        modulo,
        ponente,
        descripcion,
        creado: ahora,
        actualizado: ahora,
      });
    }
    await store.setJSON("todas", actuales);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: "No se pudo guardar: " + (e.message || e) }) };
  }
};
