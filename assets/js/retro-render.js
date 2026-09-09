/* ============================================================
   Mujer, Haz lo Tuyo — resultados de "Retroalimentación del módulo"
   -------------------------------------------------------------
   Compartido por Facilitador y Administradora: arma el HTML de
   resultados (promedios por categoría + comentarios) a partir de lo
   que regresa /.netlify/functions/feedback-modulo-list. Requiere que
   retro-preguntas.js (RETRO_CATEGORIAS/RETRO_PREGUNTAS) ya esté cargado.
   ============================================================ */

async function mjhtCargarRetroalimentacion(moduloId) {
  const qs = moduloId ? "?moduloId=" + encodeURIComponent(moduloId) : "";
  const resp = await fetch("/.netlify/functions/feedback-modulo-list" + qs);
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data.items || [];
}

function mjhtPromedioPreguntas(items, idsPreguntas) {
  let suma = 0, n = 0;
  items.forEach((r) => {
    idsPreguntas.forEach((id) => {
      const v = r.respuestas && r.respuestas[String(id)];
      if (v) { suma += v; n++; }
    });
  });
  return n ? suma / n : null;
}

function renderRetroResultadosHTML(items) {
  if (!items || !items.length) {
    return '<div class="callout">Todavía no hay respuestas de retroalimentación registradas para mostrar aquí.</div>';
  }

  const grupos = {};
  items.forEach((r) => {
    const k = String(r.moduloId);
    (grupos[k] = grupos[k] || []).push(r);
  });

  let orden = Object.keys(grupos);
  if (typeof MODULOS !== "undefined") {
    const idsModulos = MODULOS.map((m) => String(m.id));
    orden = idsModulos.filter((id) => grupos[id]).concat(orden.filter((id) => !idsModulos.includes(id)));
  }

  const todasIds = RETRO_PREGUNTAS.map((p) => p.id);

  return orden
    .map((moduloId) => {
      const grupo = grupos[moduloId];
      const primero = grupo[0];
      const promedioGeneral = mjhtPromedioPreguntas(grupo, todasIds);

      const categoriasHTML = RETRO_CATEGORIAS.map((cat) => {
        const prom = mjhtPromedioPreguntas(grupo, cat.preguntas.map((p) => p.id));
        const pct = prom ? Math.round((prom / 5) * 100) : 0;
        return `
          <div class="retro-cat-row">
            <div class="retro-cat-label">${cat.nombre}</div>
            <div class="retro-cat-bar"><div class="retro-cat-fill" style="width:${pct}%"></div></div>
            <div class="retro-cat-val">${prom ? prom.toFixed(1) : "—"}</div>
          </div>`;
      }).join("");

      // Promedio por pregunta (las 16, una por una) — para ver de un
      // vistazo cuál pregunta específica salió más baja, no solo la
      // categoría completa.
      const promedioPorPreguntaHTML = `
        <div class="table-wrap" style="margin-top:6px;">
          <table>
            <thead><tr><th>#</th><th>Pregunta</th><th>Promedio</th></tr></thead>
            <tbody>
              ${RETRO_PREGUNTAS.map((p) => {
                const prom = mjhtPromedioPreguntas(grupo, [p.id]);
                return `<tr><td>${p.id}</td><td>${p.texto}</td><td>${prom ? prom.toFixed(1) : "—"}</td></tr>`;
              }).join("")}
            </tbody>
          </table>
        </div>`;

      // Resultados de cada evaluadora — una fila por respuesta, una
      // columna por pregunta, para revisar respuestas individuales sin
      // tener que abrir Microsoft Forms.
      const porEvaluadoraHTML = `
        <div class="table-wrap" style="margin-top:6px;">
          <table>
            <thead><tr><th>Evaluadora</th><th>Fecha</th>${todasIds.map((id) => `<th>Q${id}</th>`).join("")}</tr></thead>
            <tbody>
              ${grupo
                .map((r, i) => {
                  const fecha = r.creado ? new Date(r.creado).toLocaleDateString("es-MX") : "";
                  return `<tr><td>${r.nombre ? r.nombre : "Anónima " + (i + 1)}</td><td>${fecha}</td>${todasIds
                    .map((id) => `<td>${(r.respuestas && r.respuestas[String(id)]) || "—"}</td>`)
                    .join("")}</tr>`;
                })
                .join("")}
            </tbody>
          </table>
        </div>`;

      const comentarios =
        grupo
          .filter((r) => (r.valioso || "").trim() || (r.cambiar || "").trim())
          .map((r) => {
            const fecha = r.creado ? new Date(r.creado).toLocaleDateString("es-MX") : "";
            return `
            <div class="retro-comentario">
              <div class="retro-comentario-nombre">${r.nombre ? r.nombre : "Anónima"}${fecha ? `<small>${fecha}</small>` : ""}</div>
              ${r.valioso ? `<p><b>Lo más valioso:</b> ${r.valioso}</p>` : ""}
              ${r.cambiar ? `<p><b>Cambiaría:</b> ${r.cambiar}</p>` : ""}
            </div>`;
          })
          .join("") || '<p style="color:var(--gris-claro);margin:0;font-size:.87rem;">Sin comentarios de texto en este módulo todavía.</p>';

      const numLabel = isNaN(parseInt(moduloId, 10)) ? "" : "Módulo " + moduloId + " · ";

      return `
        <div class="retro-modulo">
          <div class="retro-modulo-head">
            <h4>${numLabel}${primero.moduloTema || ""}</h4>
            <small>${primero.fecha || ""}${primero.facilitador ? " · Facilitador(a): " + primero.facilitador : ""} · ${grupo.length} respuesta${grupo.length === 1 ? "" : "s"} · Promedio general: ${promedioGeneral ? promedioGeneral.toFixed(1) + "/5" : "—"}</small>
          </div>
          <div class="retro-modulo-body">
            ${categoriasHTML}
            <h5 style="margin:18px 0 6px;font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;color:var(--gris-claro);">Promedio por pregunta</h5>
            ${promedioPorPreguntaHTML}
            <h5 style="margin:18px 0 6px;font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;color:var(--gris-claro);">Resultados de cada evaluadora</h5>
            ${porEvaluadoraHTML}
            <h5 style="margin:18px 0 6px;font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;color:var(--gris-claro);">En sus palabras</h5>
            ${comentarios}
          </div>
        </div>`;
    })
    .join("");
}
