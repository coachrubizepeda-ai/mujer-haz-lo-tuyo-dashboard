/* Utilidades compartidas: tabs, acordeón, formularios Netlify por fetch */

/* Set de íconos de línea (sin emojis) — currentColor, listos para insertar inline */
const ICONS = {
  mail: '<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  phone: '<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  instagram: '<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1"/></svg>',
  linkedin: '<svg class="icon-inline" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-1.74.33-3.42 2.48-3.42 2.12 0 2.15 1.98 2.15 3.53V21H22v-7.18c0-3.86-.83-6.83-5.34-6.83-2.16 0-3.6 1.19-4.2 2.31h-.06z"/></svg>',
  x: '<svg class="icon-inline" viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 3H21l-6.5 7.43L22 21h-6.24l-4.88-6.4L5.24 21H2.47l7-8L2 3h6.4l4.4 5.86L18.24 3zm-1.1 16h1.66L7.9 4.9H6.13L17.14 19z"/></svg>',
  globe: '<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z"/></svg>',
  headphones: '<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="15" y="14" width="5" height="7" rx="1.5"/><rect x="4" y="14" width="5" height="7" rx="1.5"/></svg>',
  briefcase: '<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v1a7 7 0 0 0 14 0v-1"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>',
  grad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>',
  check: '<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.5 2.5L16 9.5"/></svg>'
};

function initTabs(){
  const btns = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");
  btns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      btns.forEach(b=>b.classList.remove("active"));
      panels.forEach(p=>p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
      history.replaceState(null,"","#"+btn.dataset.tab);
      window.scrollTo({top:0,behavior:"smooth"});
      mjhtCerrarMenuMovil();
    });
  });
  const hash = location.hash.replace("#","");
  if(hash && document.getElementById(hash)){
    document.querySelector('.tab-btn[data-tab="'+hash+'"]')?.click();
  }
}

/* ---------- Menú móvil (hoja deslizable con la lista de pestañas) ----------
   En pantallas angostas el listado de pestañas deja de ser una franja
   horizontal (confundía: no se notaba que había más opciones y las
   etiquetas de grupo parecían otra pestaña) y se vuelve una lista vertical
   oculta por default, que se abre con el botón "Menú" y se cierra sola al
   elegir una opción, con un fondo oscuro detrás para poder cerrarla
   tocando afuera. */
function mjhtAbrirMenuMovil(){
  const nav = document.getElementById("mjhtSideNav");
  const backdrop = document.getElementById("mjhtNavBackdrop");
  const toggle = document.getElementById("mjhtNavToggle");
  if(!nav) return;
  nav.classList.add("open");
  backdrop?.classList.add("open");
  toggle?.setAttribute("aria-expanded","true");
}
function mjhtCerrarMenuMovil(){
  const nav = document.getElementById("mjhtSideNav");
  const backdrop = document.getElementById("mjhtNavBackdrop");
  const toggle = document.getElementById("mjhtNavToggle");
  nav?.classList.remove("open");
  backdrop?.classList.remove("open");
  toggle?.setAttribute("aria-expanded","false");
}
function initMobileNav(){
  const toggle = document.getElementById("mjhtNavToggle");
  const backdrop = document.getElementById("mjhtNavBackdrop");
  const nav = document.getElementById("mjhtSideNav");
  if(!toggle || !nav) return;
  toggle.addEventListener("click", ()=>{
    nav.classList.contains("open") ? mjhtCerrarMenuMovil() : mjhtAbrirMenuMovil();
  });
  backdrop?.addEventListener("click", mjhtCerrarMenuMovil);
}

// Delegado a nivel documento e idempotente: se puede llamar tantas veces como
// se quiera después de reconstruir listas dinámicas (perfiles, roster, etc.)
// sin duplicar listeners ni cancelar el toggle.
function initAccordion(){
  if(initAccordion._bound) return;
  initAccordion._bound = true;
  document.addEventListener("click", (e)=>{
    const head = e.target.closest(".acc-head");
    if(!head) return;
    const item = head.closest(".acc-item");
    if(item) item.classList.toggle("open");
  });
}

// Envía un <form data-netlify="true"> por fetch para no recargar la página,
// y muestra un mensaje de éxito/():error dentro del propio formulario.
function wireNetlifyForm(form){
  const msg = form.querySelector(".form-msg");
  const isMultipart = (form.getAttribute("enctype")||"").includes("multipart");
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const opts = isMultipart
      ? { method:"POST", body:data }
      : { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:new URLSearchParams(data).toString() };
    fetch("/", opts).then(()=>{
      if(msg){ msg.textContent = "¡Listo! Se envió correctamente. Gracias."; msg.className="form-msg show ok"; }
      form.reset();
    }).catch(()=>{
      if(msg){ msg.textContent = "No se pudo enviar. Revisa tu conexión e intenta de nuevo, o escribe directo a hazlotuyo@theokpeople.com."; msg.className="form-msg show err"; }
    });
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  initTabs();
  initMobileNav();
  initAccordion();
  document.querySelectorAll("form[data-netlify]").forEach(wireNetlifyForm);
});

/* ---------- Barra de avance del diplomado ---------- */
// Requiere que MODULOS (data.js) ya esté cargado. Se usa en Inicio de cada portal.
function renderCourseProgress(containerId){
  const el = document.getElementById(containerId);
  if(!el || typeof MODULOS === "undefined") return;
  const hoy = new Date();
  const total = MODULOS.length;
  let hechos = 0, siguienteIdx = -1;
  MODULOS.forEach((m,i)=>{
    if(new Date(m.fecha+"T14:00:00") <= hoy) hechos++;
    else if(siguienteIdx === -1) siguienteIdx = i;
  });
  const pct = Math.round((hechos/total)*100);
  const dots = MODULOS.map((m,i)=>{
    const cls = i < hechos ? "done" : (i === siguienteIdx ? "next" : "");
    return `<div class="cp-dot ${cls}" title="${m.tema}"></div>`;
  }).join("");
  el.innerHTML = `
    <div class="cp-top">
      <b>Avance del diplomado</b>
      <span>${hechos} de ${total} sesiones realizadas · ${pct}%</span>
    </div>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="cp-modulos">${dots}</div>
  `;
}

/* ---------- Marcador de módulo (número o birrete para el cierre) ---------- */
function moduloNum(m){
  return typeof m.id === "number" ? String(m.id).padStart(2,"0") : ICONS.grad;
}

/* ============================================================
   Calendario: filas combinadas (módulos + sesión especial),
   agrupadas visualmente por "grupo" (Identidad Interna / Proyección
   y marca personal / Estrategia / Experiencia de cierre) en lugar
   del antiguo "Eje 1/2/3" o el color por rango de fechas.
   ============================================================ */
function buildCalendarRows(){
  const rows = (typeof MODULOS !== "undefined" ? MODULOS : []).map(m=>Object.assign({tipo:"modulo"}, m));
  if(typeof SESION_ESPECIAL !== "undefined"){
    rows.push(Object.assign({tipo:"especial"}, SESION_ESPECIAL));
  }
  rows.sort((a,b)=> a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0);
  return rows;
}

function calendarLegendHTML(){
  const grupos = typeof GRUPO_LABEL !== "undefined" ? GRUPO_LABEL : {};
  return `<div class="cal-legend">
    <span class="cal-legend-item"><span class="dot dot-identidad"></span>${grupos.identidad||""}</span>
    <span class="cal-legend-item"><span class="dot dot-proyeccion"></span>${grupos.proyeccion||""}</span>
    <span class="cal-legend-item"><span class="dot dot-estrategia"></span>${grupos.estrategia||""}</span>
    <span class="cal-legend-item"><span class="dot dot-cierre"></span>${grupos.cierre||""}</span>
  </div>`;
}

// Dibuja el cuerpo de una tabla de calendario con un encabezado de grupo
// (con borde/fondo de color de marca) cada vez que cambia el grupo, y una
// clase por fila para el marco de color y la tipografía distinta de la
// sesión especial. `buildCells(fila)` regresa el HTML interno de las <td>
// de esa fila (sin la etiqueta <tr>).
function renderCalendarBody(tbody, buildCells, colspan){
  if(!tbody) return;
  tbody.innerHTML = "";
  const hoy = new Date();
  let lastGrupo = null;
  buildCalendarRows().forEach(m=>{
    const grupo = m.grupo || "identidad";
    if(grupo !== lastGrupo){
      const divider = document.createElement("tr");
      divider.className = "cal-group-row cal-grp-"+grupo;
      const label = (typeof GRUPO_LABEL !== "undefined" && GRUPO_LABEL[grupo]) || "";
      divider.innerHTML = `<td colspan="${colspan}">${label}</td>`;
      tbody.appendChild(divider);
      lastGrupo = grupo;
    }
    const tr = document.createElement("tr");
    const esPasado = m.tipo==="modulo" && new Date(m.fecha+"T09:00:00") < hoy;
    let cls = "cal-grp-"+grupo;
    if(esPasado) cls += " past";
    if(m.tipo==="especial") cls += " cal-especial";
    tr.className = cls;
    tr.innerHTML = buildCells(m);
    tbody.appendChild(tr);
  });
}

/* ---------- Número de participante (ID único por asistente) ----------
   Cada entrada de ASISTENTES (roster.js) trae un campo "id" fijo (M01, M02…)
   que identifica a la persona sin importar cómo esté escrito su nombre en
   ese momento. asistenteEtiqueta() arma la etiqueta "ID · Nombre" que se usa
   en pase de lista, perfiles, dropdowns y el directorio. buscarAsistentePorNombre()
   permite recuperar el id de alguien a partir de su nombre (cruzando por
   coincidencia exacta con "nombre" o con "perfil"), con "—" si no se encuentra. */
function buscarAsistentePorNombre(nombre){
  if(typeof ASISTENTES === "undefined" || !ASISTENTES.length || !nombre) return null;
  return ASISTENTES.find(a=>a.nombre===nombre || a.perfil===nombre) || null;
}
function asistenteEtiqueta(a, nombreMostrar){
  if(!a) return "—";
  const nombre = nombreMostrar || a.nombre;
  return a.id ? `${a.id} · ${nombre}` : nombre;
}

/* ---------- Chips de redes sociales de un ponente ---------- */
function socialChipsHTML(redes){
  if(!redes) return "";
  const items = [];
  if(redes.linkedin) items.push(`<a class="social-chip" href="${redes.linkedin}" target="_blank" rel="noopener">${ICONS.linkedin}LinkedIn</a>`);
  if(redes.instagram) items.push(`<a class="social-chip" href="${redes.instagram}" target="_blank" rel="noopener">${ICONS.instagram}Instagram</a>`);
  if(redes.x) items.push(`<a class="social-chip" href="${redes.x}" target="_blank" rel="noopener">${ICONS.x}X</a>`);
  if(!items.length) return "";
  return `<div class="social-row">${items.join("")}</div>`;
}

/* ============================================================
   Reporte de asistencia (local)
   -------------------------------------------------------------
   Cada envío del formulario "Pasar lista" (asistencia-modulo, en el
   portal de facilitadores) guarda además una copia en localStorage,
   bajo la clave mjht_asistencia_registros: un arreglo de registros
   {modulo, fecha_envio, ponente, presentes:[ids "M0X"]}. Esto es
   SOLO un espejo local (por navegador) para armar una vista rápida
   en los portales de facilitadores y administradora — el registro
   real y completo de todos los envíos de todas las personas sigue
   viviendo en Netlify Forms.
   ============================================================ */
const LS_KEY_ASISTENCIA = "mjht_asistencia_registros";

function getAsistenciaRegistros(){
  try { return JSON.parse(localStorage.getItem(LS_KEY_ASISTENCIA) || "[]"); }
  catch(e){ return []; }
}

function guardarAsistenciaRegistro(registro){
  const registros = getAsistenciaRegistros();
  registros.push(registro);
  try { localStorage.setItem(LS_KEY_ASISTENCIA, JSON.stringify(registros)); } catch(e){}
  return registros;
}

// Arma: una tabla por módulo con quién estuvo presente (id + nombre), y un
// resumen por participante con cuántas sesiones acumuladas de asistencia
// tiene (cuántos módulos distintos aparecen marcados en algún registro).
// Busca en MODULOS la fecha OFICIAL de la sesión a la que corresponde un
// registro de asistencia — usa r.moduloId si el registro ya lo trae (nuevos
// envíos), y si no, intenta reconocerlo a partir del texto guardado en
// r.modulo (registros viejos, antes de que se guardara moduloId).
function fechaOficialModulo(r){
  if(typeof MODULOS === "undefined") return null;
  let mod = null;
  if(r.moduloId !== undefined && r.moduloId !== null && r.moduloId !== ""){
    mod = MODULOS.find(m=>String(m.id)===String(r.moduloId));
  }
  if(!mod && r.modulo){
    const matchNum = String(r.modulo).match(/[Mm]ódulo\s+(\d+)/);
    if(matchNum) mod = MODULOS.find(m=>String(m.id)===matchNum[1]);
    else if(/cierre/i.test(r.modulo)) mod = MODULOS.find(m=>m.id==="cierre");
  }
  return mod ? mod.fechaLabel : null;
}

// Resuelve a qué módulo de MODULOS corresponde un registro de asistencia
// (mismo criterio que fechaOficialModulo: moduloId si viene, si no el número
// dentro del texto guardado en r.modulo, o "cierre"). Devuelve el objeto de
// MODULOS o null si no se pudo reconocer.
function moduloDeRegistro(r){
  if(typeof MODULOS === "undefined") return null;
  let mod = null;
  if(r.moduloId !== undefined && r.moduloId !== null && r.moduloId !== ""){
    mod = MODULOS.find(m=>String(m.id)===String(r.moduloId));
  }
  if(!mod && r.modulo){
    const matchNum = String(r.modulo).match(/[Mm]ódulo\s+(\d+)/);
    if(matchNum) mod = MODULOS.find(m=>String(m.id)===matchNum[1]);
    else if(/cierre/i.test(r.modulo)) mod = MODULOS.find(m=>m.id==="cierre");
  }
  return mod || null;
}

// Fecha corta dd/mm a partir de un ISO datetime (fecha de envío del formulario).
function fechaCorta(iso){
  if(!iso) return "—";
  const d = new Date(iso);
  if(isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("es-MX", { day:"2-digit", month:"2-digit" });
}

// Matriz de asistencia: participantes (eje Y) × módulos en los que ya se
// pasó lista (eje X, derivados de `registros` — solo columnas con al menos
// un envío), con un check + la fecha en que se pasó lista en cada celda
// donde la persona estuvo presente, y una columna de total de sesiones
// acumuladas al final. Si el mismo módulo se pasó lista más de una vez,
// ambos envíos comparten la misma columna (se apilan las fechas/checks en
// la celda) para no desbordar la tabla con columnas repetidas.
//
// opts.editable=true (solo se pasa desde el panel de administradora) agrega,
// junto a cada envío dentro del encabezado de su columna, dos controles:
// ✏️ Editar (abre un modal para marcar/desmarcar presentes de ESE envío) y
// 🗑️ Eliminar (borra ese envío por completo, con confirmación). Ambos
// controles llaman a mjhtAsistenciaAbrirEdicion()/mjhtAsistenciaEliminarRegistro()
// (definidos más abajo en este mismo archivo) usando el índice real del
// envío dentro del arreglo de mjht_asistencia_registros, para poder editarlo
// o borrarlo sin afectar los demás. Cuando se llama sin opts (o con
// editable=false/ausente) — como desde el portal de ponentes — el resultado
// es idéntico al de antes: una tabla de solo lectura.
function renderAsistenciaReporteHTML(registros, opts){
  const editable = !!(opts && opts.editable);
  if(!registros || !registros.length){
    return `<div class="callout">Todavía no se ha registrado ninguna asistencia desde este navegador.</div>`;
  }

  // 1. Agrupa los registros en columnas: una por módulo reconocido (o por
  //    texto exacto de r.modulo si no se pudo reconocer), en orden de
  //    aparición. Cada envío conserva su índice real dentro de `registros`
  //    (idx) para poder editarlo/eliminarlo puntualmente en modo editable.
  const columnas = []; // { key, mod, titulo, registros:[{r, idx}] }
  registros.forEach((r, idx)=>{
    const mod = moduloDeRegistro(r);
    const key = mod ? "mod:"+mod.id : "txt:"+(r.modulo || "Sin especificar");
    let col = columnas.find(c=>c.key===key);
    if(!col){
      col = { key, mod, titulo: r.modulo || "Sin especificar", registros: [] };
      columnas.push(col);
    }
    col.registros.push({ r, idx });
  });

  // 2. Reordena cronológicamente según MODULOS cuando se pudo reconocer el
  //    módulo; las columnas no reconocidas quedan al final, en el orden en
  //    que aparecieron.
  const ordenModulos = typeof MODULOS !== "undefined" ? MODULOS.map(m=>m.id) : [];
  columnas.sort((a,b)=>{
    const ia = a.mod ? ordenModulos.indexOf(a.mod.id) : Infinity;
    const ib = b.mod ? ordenModulos.indexOf(b.mod.id) : Infinity;
    return ia - ib;
  });

  // 3. Encabezados de columna: "Módulo N" (o "Cierre") + fecha oficial si
  //    se reconoció el módulo; si no, el texto tal cual llegó del formulario.
  //    En modo editable, agrega debajo un control ✏️/🗑️ por cada envío que
  //    comparte esa columna.
  const encabezadosHTML = columnas.map(col=>{
    const tituloHTML = col.mod
      ? `<b>${col.mod.id === "cierre" ? "Cierre" : "Módulo "+col.mod.id}</b><br><small style="font-weight:500;color:var(--gris-claro);">${col.mod.fechaLabel || ""}</small>`
      : `<b>${col.titulo}</b>`;
    const controlesHTML = editable ? `<div class="att-admin-col">${col.registros.map(({r, idx})=>`
        <div class="att-admin-ctrl">
          <span>${fechaCorta(r.fecha_envio)}</span>
          <button type="button" class="btn-edit-nombre" title="Editar este envío" onclick="mjhtAsistenciaAbrirEdicion(${idx})">✏️</button>
          <button type="button" class="btn-edit-nombre" title="Eliminar este envío" onclick="mjhtAsistenciaEliminarRegistro(${idx})">🗑️</button>
        </div>`).join("")}</div>` : "";
    return `<th>${tituloHTML}${controlesHTML}</th>`;
  }).join("");

  // 4. Filas: cada participante del roster, en su orden natural (M01..M10).
  const idsOrdenados = (typeof ASISTENTES !== "undefined" ? ASISTENTES.map(a=>a.id) : []);
  const filasHTML = idsOrdenados.map(id=>{
    const a = (typeof ASISTENTES !== "undefined") ? ASISTENTES.find(x=>x.id===id) : null;
    const nombreMostrar = a ? (typeof nombreMostrado === "function" ? nombreMostrado(a.nombre) : a.nombre) : id;
    let total = 0;
    const celdasHTML = columnas.map(col=>{
      const envios = col.registros.filter(({r})=>(r.presentes||[]).includes(id));
      if(!envios.length) return `<td class="att-cell-empty">–</td>`;
      total++;
      const chips = envios.map(({r})=>`<span class="att-chip">✓ ${fechaCorta(r.fecha_envio)}</span>`).join("");
      return `<td class="att-cell-ok">${chips}</td>`;
    }).join("");
    return `<tr><td><b>${id}</b></td><td>${nombreMostrar}</td>${celdasHTML}<td class="att-cell-total"><b>${total}</b></td></tr>`;
  }).join("");

  return `
    <div class="table-wrap" style="margin-bottom:20px;">
      <table class="att-matrix">
        <thead><tr><th>ID</th><th>Participante</th>${encabezadosHTML}<th>Total</th></tr></thead>
        <tbody>${filasHTML}</tbody>
      </table>
    </div>`;
}

/* ---------- Edición/eliminación de registros de asistencia (solo admin) ----------
   Estas funciones son de uso general (no dependen de un contenedor fijo):
   después de guardar el cambio en localStorage, llaman a
   window.mjhtRerenderAsistenciaAdmin() si el panel de administradora la
   definió, para volver a pintar la matriz. Se cargan siempre en app.js pero
   solo se disparan desde botones que renderAsistenciaReporteHTML dibuja
   cuando se le pasa {editable:true} — es decir, solo en admin/index.html. */
function mjhtAsistenciaAbrirEdicion(idx){
  const registros = getAsistenciaRegistros();
  const r = registros[idx];
  if(!r) return;
  const asistentes = typeof ASISTENTES !== "undefined" ? ASISTENTES : [];
  const presentes = new Set(r.presentes || []);
  const overlay = document.createElement("div");
  overlay.className = "gate-overlay att-edit-overlay";
  overlay.innerHTML = `
    <div class="gate-box att-edit-box">
      <h3 style="margin-bottom:4px;">Editar asistencia</h3>
      <p style="color:var(--gris-claro);font-size:.85rem;margin-bottom:14px;">${r.modulo || "Módulo"} · enviado ${fechaCorta(r.fecha_envio)}${r.ponente ? " · "+r.ponente : ""}</p>
      <div class="att-edit-list">
        ${asistentes.map(a=>`
          <label class="check-row">
            <input type="checkbox" value="${a.id}" ${presentes.has(a.id) ? "checked" : ""}>
            <span>${asistenteEtiqueta(a, typeof nombreMostrado === "function" ? nombreMostrado(a.nombre) : a.nombre)}</span>
          </label>`).join("")}
      </div>
      <div style="display:flex;gap:10px;margin-top:16px;">
        <button type="button" class="btn btn-outline btn-block" id="att-edit-cancel">Cancelar</button>
        <button type="button" class="btn btn-primary btn-block" id="att-edit-save">Guardar cambios</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const cerrar = ()=> overlay.remove();
  overlay.querySelector("#att-edit-cancel").addEventListener("click", cerrar);
  overlay.addEventListener("click", (e)=>{ if(e.target === overlay) cerrar(); });
  overlay.querySelector("#att-edit-save").addEventListener("click", ()=>{
    const marcados = Array.from(overlay.querySelectorAll('.att-edit-list input[type="checkbox"]:checked')).map(c=>c.value);
    const actuales = getAsistenciaRegistros();
    if(actuales[idx]){
      actuales[idx] = Object.assign({}, actuales[idx], { presentes: marcados });
      try { localStorage.setItem(LS_KEY_ASISTENCIA, JSON.stringify(actuales)); } catch(e){}
    }
    cerrar();
    if(typeof window.mjhtRerenderAsistenciaAdmin === "function") window.mjhtRerenderAsistenciaAdmin();
  });
}
window.mjhtAsistenciaAbrirEdicion = mjhtAsistenciaAbrirEdicion;

function mjhtAsistenciaEliminarRegistro(idx){
  if(!confirm("¿Eliminar este envío de asistencia? Esta acción no se puede deshacer (solo afecta este navegador).")) return;
  const registros = getAsistenciaRegistros();
  registros.splice(idx, 1);
  try { localStorage.setItem(LS_KEY_ASISTENCIA, JSON.stringify(registros)); } catch(e){}
  if(typeof window.mjhtRerenderAsistenciaAdmin === "function") window.mjhtRerenderAsistenciaAdmin();
}
window.mjhtAsistenciaEliminarRegistro = mjhtAsistenciaEliminarRegistro;

function mjhtAsistenciaReiniciarTodo(){
  if(!confirm("¿Reiniciar TODA la asistencia? Se van a borrar TODOS los envíos guardados en este navegador (todas las listas pasadas hasta ahora).")) return;
  if(!confirm("Esta acción no se puede deshacer. ¿Confirmas que quieres borrar por completo el historial de asistencia?")) return;
  try { localStorage.setItem(LS_KEY_ASISTENCIA, JSON.stringify([])); } catch(e){}
  if(typeof window.mjhtRerenderAsistenciaAdmin === "function") window.mjhtRerenderAsistenciaAdmin();
}
window.mjhtAsistenciaReiniciarTodo = mjhtAsistenciaReiniciarTodo;

/* ============================================================
   Perfiles de asistentes: parser del formulario pegado
   ============================================================ */
const PERFIL_FIELD_DEFS = [
  { raw: "rango edad", resumen: "edad" },
  { raw: "anos experiencia", resumen: "experiencia" },
  { raw: "grado estudios", resumen: "estudios" },
  { raw: "m1 motivacion", modulo: 1, label: "Motivación" },
  { raw: "m1 momento actual", modulo: 1, label: "Momento actual" },
  { raw: "m1 area atencion", modulo: 1, label: "Área de atención" },
  { raw: "m1 claridad direccion", modulo: 1, label: "Claridad de dirección" },
  { raw: "m1 valio la pena", modulo: 1, label: "¿Qué haría que valiera la pena?" },
  { raw: "m2 estado civil", modulo: 2, label: "Estado civil" },
  { raw: "m2 padres viven", modulo: 2, label: "¿Padres viven?" },
  { raw: "m2 num hijos", modulo: 2, label: "Número de hijos" },
  { raw: "m2 influencia historia", modulo: 2, label: "Influencia de su historia" },
  { raw: "m2 limites", modulo: 2, label: "Pone límites" },
  { raw: "m2 patrones", modulo: 2, label: "Reconoce patrones" },
  { raw: "m2 temas impacto", modulo: 2, label: "Temas con más impacto" },
  { raw: "m2 resignificar", modulo: 2, label: "Qué le gustaría resignificar" },
  { raw: "m3 alineacion imagen", modulo: 3, label: "Alineación con su imagen (1–5)" },
  { raw: "m3 seguridad profesional", modulo: 3, label: "Seguridad profesional" },
  { raw: "m3 presencia fortalecer", modulo: 3, label: "Presencia a fortalecer" },
  { raw: "m3 impacto espacio", modulo: 3, label: "Impacto al entrar a un espacio" },
  { raw: "m4 decision vestir", modulo: 4, label: "Decisión al vestir" },
  { raw: "m4 asesoria imagen", modulo: 4, label: "Asesoría de imagen que le interesa" },
  { raw: "m4 frecuencia compra", modulo: 4, label: "Frecuencia de compra" },
  { raw: "m4 closet", modulo: 4, label: "Su clóset" },
  { raw: "m4 proyectar", modulo: 4, label: "Qué quiere proyectar" },
  { raw: "m5 relacion alimentacion", modulo: 5, label: "Relación con la alimentación" },
  { raw: "m5 relacion comer sentir", modulo: 5, label: "Relación comer / sentir" },
  { raw: "m5 factor habitos", modulo: 5, label: "Factores en sus hábitos" },
  { raw: "m5 senales cuerpo", modulo: 5, label: "Escucha señales del cuerpo" },
  { raw: "m5 transformar", modulo: 5, label: "Qué le gustaría transformar" },
  { raw: "m6 forma comunicar", modulo: 6, label: "Forma de comunicar" },
  { raw: "m6 consciencia tono", modulo: 6, label: "Consciencia de su tono" },
  { raw: "m6 dificultad comunicar", modulo: 6, label: "Dificultad al comunicar" },
  { raw: "m6 reaccion desacuerdo", modulo: 6, label: "Reacción ante el desacuerdo" },
  { raw: "m6 meta comunicacion", modulo: 6, label: "Meta de comunicación" },
  { raw: "m7 conocimiento finanzas", modulo: 7, label: "Conocimiento de finanzas" },
  { raw: "m7 curso finanzas", modulo: 7, label: "¿Ha tomado curso de finanzas?" },
  { raw: "m7 control finanzas", modulo: 7, label: "Control de sus finanzas" },
  { raw: "m7 retos financieros", modulo: 7, label: "Retos financieros" },
  { raw: "m7 retos otros", modulo: 7, label: "Otros retos financieros" },
  { raw: "m7 decisiones alineadas", modulo: 7, label: "Decisiones alineadas a sus metas" },
  { raw: "m7 esperado modulo", modulo: 7, label: "Qué espera del módulo" },
  { raw: "m7 tema profundizar", modulo: 7, label: "Temas a profundizar" },
  { raw: "m7 frase dinero", modulo: 7, label: "Frase sobre el dinero" },
  { raw: "m7 cambiar finanzas", modulo: 7, label: "Qué quiere cambiar en sus finanzas" },
  { raw: "m8 marca personal clara", modulo: 8, label: "Claridad de marca personal" },
  { raw: "m8 alineacion identidad", modulo: 8, label: "Alineación con su identidad" },
  { raw: "m8 construccion marca", modulo: 8, label: "Trabajo en su marca" },
  { raw: "m8 elementos comunican", modulo: 8, label: "Elementos que la comunican" },
  { raw: "m8 percepcion deseada", modulo: 8, label: "Percepción deseada" },
  { raw: "m9 cambiar redes", modulo: 9, label: "Qué cambiaría de sus redes" },
  { raw: "m9 consciencia compartir", modulo: 9, label: "Consciencia al compartir en redes" },
  { raw: "m9 tiempo redes", modulo: 9, label: "Tiempo en redes" },
  { raw: "m9 impacto bienestar", modulo: 9, label: "Impacto en su bienestar" },
  { raw: "m9 contenido consumido", modulo: 9, label: "Contenido que más consume" },
  { raw: "m10 familiaridad ia", modulo: 10, label: "Familiaridad con la IA" },
  { raw: "m10 uso ia", modulo: 10, label: "Uso actual de IA" },
  { raw: "m10 sensacion ia", modulo: 10, label: "Sensación frente a la IA" },
  { raw: "m10 meta ia", modulo: 10, label: "Meta con la IA" }
];
// clave técnica derivada del texto crudo, para poder agregar/comparar entre perfiles
PERFIL_FIELD_DEFS.forEach(f=>{ f.key = f.raw.replace(/\s+/g,"_"); });

function normalizaEtiqueta(s){
  return s.replace(/\[\]\s*$/,"").trim().toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g,""); // quita acentos para comparar
}

const PERFIL_LOOKUP = {};
PERFIL_FIELD_DEFS.forEach(f=>{ PERFIL_LOOKUP[normalizaEtiqueta(f.raw)] = f; });

// Convierte el texto pegado del formulario (Google Forms) en {resumen, campos}
function parsePerfilPegado(raw){
  const lines = raw.split("\n").map(l=>l.trim()).filter(l=>l.length);
  const resumen = {};
  const campos = [];
  let i = 0;
  while(i < lines.length){
    const norm = normalizaEtiqueta(lines[i].replace(/^\d+\.\s*/,""));
    const def = PERFIL_LOOKUP[norm];
    if(!def){ i++; continue; }
    let valor = "";
    if(i+1 < lines.length){
      const siguienteEsEtiqueta = !!PERFIL_LOOKUP[normalizaEtiqueta(lines[i+1].replace(/^\d+\.\s*/,""))];
      if(!siguienteEsEtiqueta){ valor = lines[i+1]; i += 2; }
      else { i += 1; }
    } else { i += 1; }
    if(!valor) continue;
    if(def.resumen){ resumen[def.resumen] = valor; }
    else { campos.push({ modulo: def.modulo, label: def.label, valor, key: def.key }); }
  }
  if(!campos.length && !Object.keys(resumen).length) return null;
  return { resumen, campos };
}

function extraeNumero(str){
  if(!str) return null;
  const m = String(str).match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}

// Agrupa los perfiles cargados (base + pegados) en un resumen del grupo
function computePerfilGrupal(perfiles){
  const edades = perfiles.map(p=>extraeNumero(p.resumen && p.resumen.edad)).filter(n=>n!==null);
  const experiencias = perfiles.map(p=>extraeNumero(p.resumen && p.resumen.experiencia)).filter(n=>n!==null);
  const estudiosCount = {};
  perfiles.forEach(p=>{
    const e = p.resumen && p.resumen.estudios;
    if(e) estudiosCount[e] = (estudiosCount[e]||0) + 1;
  });

  const clavesInteres = [
    ["m1_momento_actual", "Momento actual"],
    ["m1_claridad_direccion", "Claridad de dirección"],
    ["m7_conocimiento_finanzas", "Conocimiento de finanzas"],
    ["m8_marca_personal_clara", "Claridad de marca personal"],
    ["m9_tiempo_redes", "Tiempo en redes"],
    ["m10_familiaridad_ia", "Familiaridad con la IA"]
  ];
  const distribuciones = clavesInteres.map(([key,label])=>{
    const counts = {};
    perfiles.forEach(p=>{
      const campo = (p.campos||[]).find(c=>c.key===key);
      if(campo) counts[campo.valor] = (counts[campo.valor]||0) + 1;
    });
    const entradas = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
    return { label, entradas };
  }).filter(d=>d.entradas.length);

  // Todas las preguntas (no solo las de "clavesInteres"), agrupadas por
  // módulo — usa el campo "modulo" que ya trae cada campo del perfil, para
  // poder filtrar la vista por módulo sin tocar el contenido de las
  // respuestas. Estructura: { [modulo]: [{label, entradas:[[valor,count]]}] }
  const porModuloMap = {};
  const ordenModulos = [];
  perfiles.forEach(p=>{
    (p.campos||[]).forEach(c=>{
      const modKey = c.modulo != null ? c.modulo : "otro";
      if(!(modKey in porModuloMap)){ porModuloMap[modKey] = {}; ordenModulos.push(modKey); }
      if(!(c.key in porModuloMap[modKey])){ porModuloMap[modKey][c.key] = { label: c.label, counts: {} }; }
      porModuloMap[modKey][c.key].counts[c.valor] = (porModuloMap[modKey][c.key].counts[c.valor]||0) + 1;
    });
  });
  ordenModulos.sort((a,b)=>{
    if(a==="otro") return 1;
    if(b==="otro") return -1;
    return a - b;
  });
  const porModulo = ordenModulos.map(modKey=>{
    const preguntas = Object.values(porModuloMap[modKey]).map(q=>({
      label: q.label,
      entradas: Object.entries(q.counts).sort((a,b)=>b[1]-a[1])
    }));
    return { modulo: modKey, preguntas };
  });

  return { n: perfiles.length, edades, experiencias, estudiosCount, distribuciones, porModulo };
}

// filtroModulo: id de módulo (número, o "otro") para mostrar solo ese grupo
// de preguntas, o "" / undefined para mostrar todos los módulos.
function renderPerfilGrupalHTML(g, filtroModulo){
  if(!g.n){
    return `<div class="callout">Todavía no hay respuestas suficientes para armar el perfil general del grupo.</div>`;
  }
  const edadTxt = g.edades.length ? `${Math.min(...g.edades)}–${Math.max(...g.edades)} años` : "sin datos suficientes";
  const expProm = g.experiencias.length ? Math.round(g.experiencias.reduce((a,b)=>a+b,0)/g.experiencias.length) : null;
  const estudiosTxt = Object.entries(g.estudiosCount).sort((a,b)=>b[1]-a[1])
    .map(([k,v])=>`${k} (${v})`).join(", ") || "sin datos suficientes";

  const resumenCard = `
    <div class="card">
      <h4>Perfil general del grupo <small style="font-weight:400;color:var(--gris-claro);">— con base en ${g.n} respuesta${g.n===1?"":"s"}</small></h4>
      <div class="grid grid-3" style="margin:14px 0 18px;">
        <div class="stat"><b>${edadTxt}</b><span>rango de edad</span></div>
        <div class="stat"><b>${expProm!==null?expProm+" años":"—"}</b><span>experiencia promedio</span></div>
        <div class="stat"><b style="font-size:1rem;line-height:1.3;">${estudiosTxt}</b><span>grado de estudios</span></div>
      </div>
    </div>`;

  const modulosAMostrar = (g.porModulo||[]).filter(bloque=>
    !filtroModulo || String(bloque.modulo) === String(filtroModulo)
  );

  const porModuloHTML = modulosAMostrar.map(bloque=>{
    const modInfo = (bloque.modulo!=="otro" && typeof MODULOS !== "undefined") ? MODULOS.find(m=>m.id===bloque.modulo) : null;
    const titulo = bloque.modulo==="otro" ? "Otras respuestas" : `Módulo ${bloque.modulo}${modInfo ? " — "+modInfo.tema : ""}`;
    const preguntasHTML = bloque.preguntas.map(q=>`
      <div class="perfil-campo">
        <span class="mtag">·</span>
        <span class="txt"><b>${q.label}:</b> ${q.entradas.map(([v,c])=>`${v} (${c})`).join(", ")}</span>
      </div>`).join("");
    return `<div class="card"><h4 style="margin-bottom:10px;">${titulo}</h4>${preguntasHTML}</div>`;
  }).join("");

  return resumenCard + (porModuloHTML || `<div class="callout">No hay respuestas registradas para ese módulo todavía.</div>`);
}

/* ============================================================
   Resumen ejecutivo del admin — espejos locales por sección
   -------------------------------------------------------------
   El sitio no tiene backend ni base de datos compartida: los
   formularios se guardan en Netlify Forms (solo la administradora
   los ve en su panel de Netlify) y todo lo que se guarda aquí con
   localStorage SOLO es visible en el navegador donde se guardó. Las
   funciones de esta sección reutilizan siempre el mismo patrón: la
   clave de localStorage se llena desde el portal donde ocurre la
   acción (asistentes/ponentes) y se lee desde aquí (renderX en
   admin) — para que, si algún día se usa el mismo navegador o se
   migra a una base de datos real, ya quede todo conectado.
   ============================================================ */

/* ---------- 1/2. Registro y semblanzas de asistentes ---------- */
// "Mi registro" (portal de asistentes) ya no crea una base de datos paralela:
// al enviarlo, cada participante guarda sus correcciones/datos adicionales
// (empresa, cargo, teléfono, email, redes sociales, comentarios) como
// "overrides" ligados a su ID de roster (M01–M10), bajo esta misma clave —
// mismo patrón que mjht_nombres_editados. renderRegistroAsistentesHTML() (el
// "Registro de asistentes" del admin) lee el roster BASE + estos overrides
// fusionados, para reflejar siempre la versión más reciente sin duplicar la
// fuente de verdad.
const LS_KEY_REGISTRO_OVERRIDES = "mjht_registro_overrides";
function getRegistroOverrides(){
  try { return JSON.parse(localStorage.getItem(LS_KEY_REGISTRO_OVERRIDES) || "{}"); }
  catch(e){ return {}; }
}
function guardarRegistroOverride(id, campos){
  if(!id) return getRegistroOverrides();
  const todos = getRegistroOverrides();
  todos[id] = Object.assign({}, todos[id], campos, { fecha: new Date().toISOString() });
  try { localStorage.setItem(LS_KEY_REGISTRO_OVERRIDES, JSON.stringify(todos)); } catch(e){}
  return todos;
}
// Combina un asistente del roster base con sus overrides guardados (si los
// tiene) — los overrides ganan sobre el valor base cuando no vienen vacíos.
function asistenteConOverrides(a){
  const overrides = getRegistroOverrides();
  const ov = overrides[a.id];
  if(!ov) return a;
  const merged = Object.assign({}, a);
  ["empresa","cargo","telefono","email","redes_sociales","comentarios"].forEach(campo=>{
    if(ov[campo]) merged[campo] = ov[campo];
  });
  return merged;
}
function renderRegistroAsistentesHTML(){
  if(typeof ASISTENTES === "undefined" || !ASISTENTES.length){
    return `<div class="callout">Todavía no has cargado el roster de asistentes en <code>assets/js/roster.js</code>.</div>`;
  }
  const filas = ASISTENTES.map(a0=>{
    const a = asistenteConOverrides(a0);
    return `<tr><td><b>${a.id}</b></td><td>${a.nombre}</td><td>${a.cargo || "—"}</td><td>${a.empresa || "—"}</td><td>${a.telefono || "—"}</td><td>${a.email || "—"}</td></tr>`;
  }).join("");
  return `<div class="table-wrap"><table>
    <thead><tr><th>ID</th><th>Nombre</th><th>Cargo</th><th>Empresa</th><th>Teléfono</th><th>Email</th></tr></thead>
    <tbody>${filas}</tbody>
  </table></div>`;
}

// Semblanza de asistentes — documento vivo con backend real (Netlify
// Blobs, ver netlify/functions/semblanza-submit.js y semblanza-list.js).
// Reemplaza el viejo mecanismo de localStorage: ahora cada quien puede
// seguir viendo y editando lo que ya escribió desde cualquier dispositivo,
// y cada envío guarda el texto completo actualizado (sin perder versiones
// anteriores, que quedan en "historial").
async function getSemblanzasAsistentes(){
  try {
    const resp = await fetch("/.netlify/functions/semblanza-list");
    const data = await resp.json();
    if(!resp.ok || !data.ok) throw new Error(data.error || "Error al leer semblanzas");
    return data.todas || {};
  } catch(e){
    console.error("getSemblanzasAsistentes:", e);
    return {};
  }
}
async function getSemblanzaAsistente(participanteId){
  if(!participanteId) return null;
  try {
    const resp = await fetch("/.netlify/functions/semblanza-list?participanteId=" + encodeURIComponent(participanteId));
    const data = await resp.json();
    if(!resp.ok || !data.ok) throw new Error(data.error || "Error al leer la semblanza");
    return data.registro || null;
  } catch(e){
    console.error("getSemblanzaAsistente:", e);
    return null;
  }
}
// Código de Honor para participantes — real backend (Netlify Blobs) para
// que lo que se edite en el portal de Facilitador se vea de inmediato,
// para todas, en Asistentes y Administradora (antes solo vivía en
// localStorage del navegador donde se editaba, por eso Asistentes nunca
// lo veía completo). Si nunca se ha guardado nada, cae al placeholder de
// assets/js/data.js (CODIGO_HONOR_PARTICIPANTES).
// Lineamientos genéricos: mismo mecanismo (Netlify Blobs, store
// "lineamientos") para los 3 bloques que usan los 3 portales —
// "participantes", "facilitadores" y "operativos". Antes solo
// "participantes" tenía backend real; los otros dos vivían solo en
// localStorage del navegador donde se editaban, por eso Administradora y
// Participante nunca veían lo que Facilitador editaba. Con esto los 3
// bloques se editan en cualquier portal con acceso y se ven igual, para
// todas, en los 3 portales.
const LINEAMIENTOS_TIPOS = {
  participantes: { endpointGet: "lineamientos-participantes-get", endpointSet: "lineamientos-participantes-set", fallback: () => (typeof CODIGO_HONOR_PARTICIPANTES !== "undefined") ? CODIGO_HONOR_PARTICIPANTES : [] },
  facilitadores: { endpointGet: "lineamientos-facilitadores-get", endpointSet: "lineamientos-facilitadores-set", fallback: () => (typeof CODIGO_HONOR !== "undefined") ? CODIGO_HONOR : [] },
  operativos:    { endpointGet: "lineamientos-operativos-get",    endpointSet: "lineamientos-operativos-set",    fallback: () => (typeof LINEAMIENTOS_OP !== "undefined") ? LINEAMIENTOS_OP : [] },
};
async function getLineamientos(tipo){
  const cfg = LINEAMIENTOS_TIPOS[tipo];
  if(!cfg) return [];
  try {
    const resp = await fetch("/.netlify/functions/" + cfg.endpointGet);
    const data = await resp.json();
    if(!resp.ok || !data.ok) throw new Error(data.error || "Error al leer lineamientos");
    if(data.items && data.items.length) return data.items;
  } catch(e){
    console.error("getLineamientos(" + tipo + "):", e);
  }
  return cfg.fallback();
}
async function guardarLineamientos(tipo, items){
  const cfg = LINEAMIENTOS_TIPOS[tipo];
  if(!cfg) throw new Error("Tipo de lineamiento desconocido: " + tipo);
  const resp = await fetch("/.netlify/functions/" + cfg.endpointSet, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok || !data.ok) throw new Error((data && data.error) || "No se pudo guardar");
  return data.registro;
}
function lineamientosParticipantesItemHTML(titulo, texto){
  return `<div class="lineamiento-item"><h4>${titulo}</h4><p>${texto}</p></div>`;
}
async function renderLineamientosHTML(tipo){
  const items = await getLineamientos(tipo);
  if(!items.length) return `<p class="file-hint">Todavía no hay lineamientos cargados.</p>`;
  return items.map(([titulo, texto])=>lineamientosParticipantesItemHTML(titulo, texto)).join("");
}
// Wrappers con el nombre original, para no romper lo que ya llama a estas
// funciones directamente (equivalen a getLineamientos("participantes"), etc).
async function getLineamientosParticipantes(){ return getLineamientos("participantes"); }
async function guardarLineamientosParticipantes(items){ return guardarLineamientos("participantes", items); }
async function renderLineamientosParticipantesHTML(){ return renderLineamientosHTML("participantes"); }
async function guardarSemblanzaAsistente(id, nombre, texto){
  const resp = await fetch("/.netlify/functions/semblanza-submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ participanteId: id, nombre, texto }),
  });
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok || !data.ok) throw new Error((data && data.error) || "No se pudo guardar la semblanza");
  return data.registro;
}
async function renderSemblanzasAsistentesHTML(){
  if(typeof ASISTENTES === "undefined" || !ASISTENTES.length){
    return `<div class="callout">Todavía no has cargado el roster de asistentes.</div>`;
  }
  const guardadas = await getSemblanzasAsistentes();
  const filas = ASISTENTES.map(a=>{
    const s = guardadas[a.id];
    return `<tr><td><b>${a.id}</b></td><td>${a.nombre}</td>
      <td>${s ? "✅ Semblanza registrada" : "⏳ Pendiente"}</td>
      <td>${s ? new Date(s.fecha).toLocaleDateString("es-MX") : "—"}</td></tr>`;
  }).join("");
  return `<div class="table-wrap"><table>
    <thead><tr><th>ID</th><th>Nombre</th><th>Estado</th><th>Última actualización</th></tr></thead>
    <tbody>${filas}</tbody>
  </table></div>`;
}

/* ---------- 3. Semblanza de facilitadores ---------- */
const LS_KEY_SEMBLANZAS_FACILITADORES = "mjht_semblanzas_facilitadores";
function getSemblanzasFacilitadores(){
  try { return JSON.parse(localStorage.getItem(LS_KEY_SEMBLANZAS_FACILITADORES) || "{}"); }
  catch(e){ return {}; }
}
function guardarSemblanzaFacilitador(nombre, semblanza){
  if(!nombre) return getSemblanzasFacilitadores();
  const todas = getSemblanzasFacilitadores();
  todas[nombre] = { semblanza, fecha: new Date().toISOString() };
  try { localStorage.setItem(LS_KEY_SEMBLANZAS_FACILITADORES, JSON.stringify(todas)); } catch(e){}
  return todas;
}
function renderSemblanzasFacilitadoresHTML(){
  if(typeof MODULOS === "undefined") return "";
  const ponentesUnicos = [...new Set(MODULOS.map(m=>m.ponente))];
  const guardadas = getSemblanzasFacilitadores();
  return ponentesUnicos.map(p=>{
    const oficial = MODULOS.find(m=>m.ponente===p && m.semblanza)?.semblanza || "Sin semblanza registrada todavía en assets/js/data.js.";
    const nueva = guardadas[p];
    return `<div class="card">
      <h4 style="margin-bottom:6px;">${p}</h4>
      <p style="margin-bottom:${nueva ? "10px" : "0"};"><b>Semblanza oficial (data.js):</b> ${oficial}</p>
      ${nueva ? `<div class="callout warn"><b>🆕 Actualización pendiente de revisar</b> — enviada el ${new Date(nueva.fecha).toLocaleDateString("es-MX")} desde "Mi semblanza" en el portal de facilitadores (este navegador):<br>${nueva.semblanza}</div>` : ""}
    </div>`;
  }).join("");
}

/* ---------- 4. Cuestionarios previos subidos por módulo (admin) ---------- */
const LS_KEY_CUESTIONARIOS_SUBIDOS = "mjht_cuestionarios_previos_subidos";
function getCuestionariosPreviosSubidos(){
  try { return JSON.parse(localStorage.getItem(LS_KEY_CUESTIONARIOS_SUBIDOS) || "{}"); }
  catch(e){ return {}; }
}
function guardarCuestionarioPrevioSubido(moduloId, archivoNombre){
  const todos = getCuestionariosPreviosSubidos();
  todos[moduloId] = { archivo_nombre: archivoNombre, fecha: new Date().toISOString() };
  try { localStorage.setItem(LS_KEY_CUESTIONARIOS_SUBIDOS, JSON.stringify(todos)); } catch(e){}
  return todos;
}
function renderCuestionariosPreviosEstadoHTML(){
  if(typeof MODULOS === "undefined") return "";
  const subidos = getCuestionariosPreviosSubidos();
  const filas = MODULOS.map(m=>{
    const s = subidos[m.id];
    const label = typeof m.id==="number" ? "Módulo "+m.id : "Cierre";
    return `<tr><td>${label}</td><td>${m.tema}</td>
      <td>${s ? "✅ Cargado" : "⏳ Pendiente"}</td>
      <td>${s ? (s.archivo_nombre || "—") : "—"}</td>
      <td>${s ? new Date(s.fecha).toLocaleDateString("es-MX") : "—"}</td></tr>`;
  }).join("");
  return `<div class="table-wrap"><table>
    <thead><tr><th>Módulo</th><th>Tema</th><th>Estado</th><th>Archivo</th><th>Fecha de carga</th></tr></thead>
    <tbody>${filas}</tbody>
  </table></div>`;
}

/* ---------- 5. Cuestionario previo — respuestas de participantes ---------- */
const LS_KEY_CUESTIONARIO_RESPUESTAS = "mjht_cuestionarios_previos_respuestas";
function getCuestionarioRespuestas(){
  try { return JSON.parse(localStorage.getItem(LS_KEY_CUESTIONARIO_RESPUESTAS) || "[]"); }
  catch(e){ return []; }
}
function guardarCuestionarioRespuesta(registro){
  const arr = getCuestionarioRespuestas();
  arr.push(registro);
  try { localStorage.setItem(LS_KEY_CUESTIONARIO_RESPUESTAS, JSON.stringify(arr)); } catch(e){}
  return arr;
}
function renderCuestionarioRespuestasHTML(){
  if(typeof MODULOS === "undefined") return "";
  const arr = getCuestionarioRespuestas();
  if(!arr.length){
    return `<div class="callout">Todavía no se ha registrado ningún cuestionario contestado desde este navegador.</div>`;
  }
  const grupos = MODULOS.map(m=>{
    const label = typeof m.id==="number" ? "Módulo "+m.id : "Cierre";
    const claveModulo = `${m.id} - ${m.tema}`;
    const entregas = arr.filter(r=>r.modulo === claveModulo);
    if(!entregas.length) return "";
    return `<div class="card"><h4 style="margin-bottom:8px;">${label} — ${m.tema}</h4>
      <ul class="checklist" style="pointer-events:none;">
      ${entregas.map(r=>`<li><span class="txt"><b>${r.participante_id || "—"}</b><span>${r.participante_nombre || "(sin nombre)"} · ${r.fecha ? new Date(r.fecha).toLocaleDateString("es-MX") : "—"}</span></span></li>`).join("")}
      </ul></div>`;
  }).filter(Boolean).join("");
  return grupos || `<div class="callout">Todavía no se ha registrado ningún cuestionario contestado desde este navegador.</div>`;
}

/* ---------- 6. Feedback de sesión, clasificado por módulo ---------- */
const LS_KEY_FEEDBACK_SESIONES = "mjht_feedback_sesiones";
function getFeedbackSesiones(){
  try { return JSON.parse(localStorage.getItem(LS_KEY_FEEDBACK_SESIONES) || "[]"); }
  catch(e){ return []; }
}
function guardarFeedbackSesion(registro){
  const arr = getFeedbackSesiones();
  arr.push(registro);
  try { localStorage.setItem(LS_KEY_FEEDBACK_SESIONES, JSON.stringify(arr)); } catch(e){}
  return arr;
}
function renderFeedbackSesionesHTML(){
  if(typeof MODULOS === "undefined") return "";
  const arr = getFeedbackSesiones();
  const grupos = MODULOS.map(m=>{
    const label = typeof m.id==="number" ? "Módulo "+m.id : "Cierre";
    const claveModulo = `${m.id} - ${m.tema}`;
    const items = arr.filter(r=>r.modulo === claveModulo);
    if(!items.length) return "";
    return `<div class="card"><h4 style="margin-bottom:8px;">${label} — ${m.tema}</h4>
      ${items.map(r=>`<div style="padding:10px 0;border-top:1px solid var(--border);">
        <p style="margin-bottom:4px;"><b>${r.participante_nombre || "Anónimo"}</b> <small style="color:var(--gris-claro);">${r.fecha ? new Date(r.fecha).toLocaleDateString("es-MX") : ""}</small></p>
        <p style="margin-bottom:0;">${r.feedback || "(sin comentario)"}</p>
      </div>`).join("")}
    </div>`;
  }).filter(Boolean).join("");
  return grupos || `<div class="callout">Todavía no se ha registrado feedback de sesión desde este navegador.</div>`;
}

/* ---------- 7. Materiales de facilitadores (Netlify Functions + Blobs) ----------
   A diferencia de la versión anterior (que solo guardaba una copia en
   localStorage — visible únicamente en el navegador de quien lo compartió),
   estas funciones suben y sirven los materiales reales desde el servidor:
   en cuanto un facilitador comparte un archivo o una liga, cualquier
   persona — asistentes, otros facilitadores, administradora — lo ve de
   inmediato, en cualquier dispositivo. */
async function mjhtCompartirMaterialLiga(modulo, ponente, nombre_o_url, esPresentacion, titulo){
  const resp = await fetch("/.netlify/functions/materiales-submit", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modulo, ponente, tipo: "liga", nombre_o_url, es_presentacion: !!esPresentacion, titulo: (titulo||"").trim() }),
  });
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok || !data.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data;
}
async function mjhtCompartirMaterialArchivo(modulo, ponente, file, esPresentacion){
  const contentBase64 = await archivoABase64(file);
  const resp = await fetch("/.netlify/functions/materiales-submit", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modulo, ponente, tipo: "archivo", filename: file.name, contentBase64, es_presentacion: !!esPresentacion }),
  });
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok || !data.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data;
}
// Marca (o desmarca) un material ya compartido como LA presentación
// oficial del módulo — ver diseño con Rubí (sep-2026). Solo puede haber
// uno marcado por módulo; el backend desmarca cualquier otro sin borrarlo.
async function marcarPresentacionMaterial(id, modulo, valor){
  const resp = await fetch("/.netlify/functions/materiales-marcar-presentacion", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, modulo, valor: !!valor }),
  });
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok || !data.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data;
}
async function getMaterialesCompartidos(modulo){
  const qs = modulo ? "?modulo=" + encodeURIComponent(modulo) : "";
  const resp = await fetch("/.netlify/functions/materiales-list" + qs);
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok || !data.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data.items || [];
}
async function eliminarMaterialCompartido(id){
  const resp = await fetch("/.netlify/functions/materiales-eliminar", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok || !data.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data;
}
async function actualizarModuloMaterialCompartido(id, nuevoModulo){
  const resp = await fetch("/.netlify/functions/materiales-actualizar", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, modulo: nuevoModulo }),
  });
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok || !data.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data;
}
// Edita el título y/o la liga de un material tipo "liga" ya compartido —
// para cuando el facilitador quiere ponerle título después, o corrigió la
// URL. No aplica a archivos (esos se reemplazan compartiendo uno nuevo).
async function actualizarLigaMaterialCompartido(id, titulo, nombre_o_url){
  const resp = await fetch("/.netlify/functions/materiales-actualizar", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, titulo, nombre_o_url }),
  });
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok || !data.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data;
}
// Título amigable para una liga compartida — en vez de mostrar la URL
// pelona, describe qué se va a encontrar del otro lado (Canva/Drive =
// presentación, Spotify = podcast, redes = publicación, etc.)
function mjhtTituloLigaHTML(url){
  const u = (url || "").toLowerCase();
  if(u.includes("canva.com") || u.includes("drive.google") || u.includes("docs.google")) return "Accede a la presentación ↗";
  if(u.includes("spotify.com")) return "Escuchar podcast ↗";
  if(u.includes("youtube.com") || u.includes("youtu.be")) return "Ver video ↗";
  if(u.includes("instagram.com")) return "Ver en Instagram ↗";
  if(u.includes("linkedin.com")) return "Ver en LinkedIn ↗";
  if(u.includes("x.com") || u.includes("twitter.com")) return "Ver publicación ↗";
  return "Abrir liga ↗";
}
// Botón destacado para el/la asistente cuando el facilitador marcó un
// material como la presentación oficial del módulo (es_presentacion=true).
function mjhtBotonPresentacionOficialHTML(item){
  const url = item.tipo === "archivo"
    ? `/.netlify/functions/materiales-download?key=${encodeURIComponent(item.fileKey)}`
    : item.nombre_o_url;
  return `<a class="btn btn-sm pres-oficial" href="${url}" target="_blank" rel="noopener">📌 Presentación oficial · ${item.tipo === "archivo" ? "Descargar" : "Ver"}</a>`;
}
function mjhtLigaMaterialHTML(x){
  const verUrl = x.tipo === "archivo" ? `/.netlify/functions/materiales-download?key=${encodeURIComponent(x.fileKey)}` : x.nombre_o_url;
  const etiquetaLiga = x.titulo ? `${mjhtEscapeHTML(x.titulo)} ↗` : mjhtTituloLigaHTML(x.nombre_o_url);
  return x.tipo === "archivo"
    ? `<a href="${verUrl}" target="_blank" rel="noopener">${x.nombre_o_url} ↓</a>`
    : `<a href="${x.nombre_o_url}" target="_blank" rel="noopener">${etiquetaLiga}</a>`;
}
// Vista propia del facilitador (en "Mi módulo"): todo lo que ha compartido
// para ESE módulo, con controles para eliminarlo o moverlo a otro módulo —
// así puede confirmar que cayó donde debía, sin tener que preguntarle a Rubí.
async function renderMisMaterialesModuloHTML(claveModulo){
  const materiales = await getMaterialesCompartidos(claveModulo);
  if(!materiales.length){
    return `<p class="file-hint">Todavía no has compartido nada para este módulo.</p>`;
  }
  const opcionesModulo = (typeof MODULOS !== "undefined")
    ? MODULOS.map(m=>{
        const val = `${m.id} - ${m.tema}`;
        const label = `${typeof m.id==="number"?"Módulo "+m.id:"Cierre"} · ${m.tema}`;
        return `<option value="${val}"${val===claveModulo?" selected":""}>${label}</option>`;
      }).join("")
    : "";
  const filas = materiales.map(x=>`
    <tr>
      <td>${x.tipo === "archivo" ? "Archivo" : "Liga"}</td>
      <td>${mjhtLigaMaterialHTML(x)}${x.es_presentacion ? ' <span class="badge-presentacion">📌 Presentación oficial</span>' : ""}</td>
      <td>${x.fecha ? new Date(x.fecha).toLocaleDateString("es-MX") : "—"}</td>
      <td style="white-space:nowrap;">
        <select style="display:inline-block;width:auto;margin:0 6px 0 0;font-size:.8rem;" onchange="mjhtCambiarModuloMaterial('${x.id}', this.value)">${opcionesModulo}</select>
        ${x.tipo === "liga" ? `<button type="button" class="btn-edit-nombre" title="Editar título o liga" onclick='mjhtEditarLigaMaterial("${x.id}", ${JSON.stringify(x.titulo||"").replace(/'/g,"&#39;")}, ${JSON.stringify(x.nombre_o_url||"").replace(/'/g,"&#39;")})'>✏️</button>` : ""}
        <button type="button" class="btn-edit-nombre" title="${x.es_presentacion ? "Quitar la marca de presentación oficial" : "Marcar como la presentación oficial de este módulo"}" onclick="mjhtMarcarPresentacion('${x.id}', '${claveModulo}', ${x.es_presentacion ? "false" : "true"})">${x.es_presentacion ? "📌 Quitar" : "📌 Marcar"}</button>
        <button type="button" class="btn-edit-nombre" title="Eliminar (pide confirmar con un segundo clic)" onclick="mjhtEliminarMaterial(this, '${x.id}')">🗑️</button>
      </td>
    </tr>`).join("");
  return `<div class="table-wrap"><table>
    <thead><tr><th>Tipo</th><th>Contenido</th><th>Fecha</th><th>Módulo</th></tr></thead>
    <tbody>${filas}</tbody>
  </table></div>`;
}
const LS_KEY_RECOMENDACIONES_MATERIALES = "mjht_recomendaciones_materiales";
function getRecomendacionesMateriales(){
  try { return JSON.parse(localStorage.getItem(LS_KEY_RECOMENDACIONES_MATERIALES) || "{}"); }
  catch(e){ return {}; }
}
function guardarRecomendacionMaterial(moduloId, texto){
  const todas = getRecomendacionesMateriales();
  todas[moduloId] = texto;
  try { localStorage.setItem(LS_KEY_RECOMENDACIONES_MATERIALES, JSON.stringify(todas)); } catch(e){}
  return todas;
}
// withRecomendaciones=true agrega, debajo de cada módulo, el textarea de
// "Recomendaciones para este módulo" que solo usa la administradora — es de
// solo lectura/anotación: nunca edita ni borra lo que subió el facilitador.
async function renderMaterialesFacilitadoresHTML(withRecomendaciones){
  if(typeof MODULOS === "undefined") return "";
  const materiales = await getMaterialesCompartidos();
  const recos = getRecomendacionesMateriales();
  return MODULOS.map(m=>{
    const label = typeof m.id==="number" ? "Módulo "+m.id : "Cierre";
    const claveModulo = `${m.id} - ${m.tema}`;
    const propios = materiales.filter(x=>x.modulo === claveModulo);
    const oficial = propios.find(x=>x.es_presentacion);
    const resto = propios.filter(x=>!x.es_presentacion);
    const presentacionOficial = oficial
      ? `<p style="margin-bottom:6px;">📌 <b>Presentación oficial:</b> ${mjhtLigaMaterialHTML(oficial)}</p>`
      : `<p class="file-hint" style="margin-bottom:6px;">Todavía no hay presentación oficial marcada para este módulo.</p>`;
    const listaPropios = resto.length
      ? `<ul class="checklist">${resto.map(x=>`<li><span class="txt"><b>${x.tipo==="archivo"?"Archivo":"Liga"}</b><span>${mjhtLigaMaterialHTML(x)} · ${x.fecha ? new Date(x.fecha).toLocaleDateString("es-MX") : "—"}</span></span></li>`).join("")}</ul>`
      : `<p class="file-hint">Sin materiales adicionales registrados todavía.</p>`;
    const recoBloque = withRecomendaciones ? `
      <label style="margin-top:12px;">Recomendaciones para este módulo <small style="font-weight:400;color:var(--gris-claro);">(solo lectura/anotación tuya — no edita ni borra lo que subió el facilitador)</small></label>
      <textarea id="reco-modulo-${m.id}" placeholder="Escribe tu recomendación…">${recos[m.id] || ""}</textarea>
      <button type="button" class="btn btn-outline btn-sm" data-modulo="${m.id}" onclick="mjhtGuardarRecomendacionMaterial(this)">Guardar recomendación</button>
    ` : "";
    return `<div class="card">
      <h4 style="margin-bottom:8px;">${label} — ${m.tema} <small style="font-weight:400;color:var(--gris-claro);">· ${m.ponente}</small></h4>
      ${presentacionOficial}
      ${listaPropios}
      ${recoBloque}
    </div>`;
  }).join("");
}
window.mjhtGuardarRecomendacionMaterial = function(btn){
  const moduloId = btn.dataset.modulo;
  const textarea = document.getElementById("reco-modulo-"+moduloId);
  if(!textarea) return;
  guardarRecomendacionMaterial(moduloId, textarea.value);
  const original = btn.textContent;
  btn.textContent = "¡Guardado!";
  setTimeout(()=>{ btn.textContent = original; }, 1500);
};

// Vista para ASISTENTES: todo lo que el/la facilitador(a) compartió para
// este módulo (archivos + ligas de sitio web/podcast/Instagram/X/LinkedIn).
// La presentación oficial (es_presentacion=true) NO se repite aquí — ya
// tiene su propio botón destacado arriba (ver mjhtBotonPresentacionOficialHTML),
// para que quede claro cuál es LA presentación y cuáles son ligas extra.
function mjhtMaterialesAsistenteHTML(items){
  const extra = (items || []).filter(x=>!x.es_presentacion);
  if(!extra.length){
    return `<p class="file-hint">Todavía no hay materiales adicionales compartidos para este módulo.</p>`;
  }
  const filas = extra.map(x=>`<li><span class="txt"><b>${x.tipo==="archivo"?"Archivo":"Liga"}</b><span>${mjhtLigaMaterialHTML(x)}${x.ponente?` · ${x.ponente}`:""}</span></span></li>`).join("");
  return `<ul class="checklist">${filas}</ul>`;
}

/* ---------- 7b. Biblioteca (lecturas/libros/artículos por módulo) ----------
   Netlify Functions + Blobs (mismo patrón que "materiales"): cualquier
   lectura, libro o artículo recomendado se guarda por módulo y aparece
   al instante en la pestaña "Biblioteca" del portal de Participante y
   dentro de "Contenido" (bajo "Lectura previa"), además de en el panel
   de administradora, sin depender de tocar assets/js/data.js. */
function mjhtEscapeHTML(str){
  return String(str == null ? "" : str).replace(/[&<>"']/g, (c)=>({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[c]));
}
async function guardarBibliografia(modulo, titulo, autor, tipo, liga, notas){
  const resp = await fetch("/.netlify/functions/biblioteca-submit", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modulo, titulo, autor, tipo, liga, notas }),
  });
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok || !data.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data;
}
async function getBibliografia(modulo){
  const qs = modulo ? "?modulo=" + encodeURIComponent(modulo) : "";
  const resp = await fetch("/.netlify/functions/biblioteca-list" + qs);
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok || !data.ok) return [];
  return data.items || [];
}
async function eliminarBibliografia(id){
  const resp = await fetch("/.netlify/functions/biblioteca-eliminar", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok || !data.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data;
}
// Una fila de una lectura — usada tanto en la pestaña Biblioteca como
// dentro de "Contenido" y en el panel de administradora.
function mjhtBibliografiaItemHTML(x, opts){
  opts = opts || {};
  const titulo = mjhtEscapeHTML(x.titulo);
  const autor = mjhtEscapeHTML(x.autor);
  const tipo = mjhtEscapeHTML(x.tipo || "Libro");
  const tituloHTML = x.liga
    ? `<a href="${mjhtEscapeHTML(x.liga)}" target="_blank" rel="noopener"><b>${titulo}</b></a>`
    : `<b>${titulo}</b>`;
  const notas = x.notas ? `<br><small style="color:var(--gris-claro);">${mjhtEscapeHTML(x.notas)}</small>` : "";
  const borrar = opts.conBorrar
    ? ` <button type="button" class="btn btn-outline btn-sm" style="margin-left:8px;padding:2px 8px;" onclick="mjhtEliminarBibliografia(this,'${x.id}')">🗑️</button>`
    : "";
  return `<li><span class="txt"><span class="tag" style="margin-right:6px;">${tipo}</span>${tituloHTML} — ${autor}${notas}</span>${borrar}</li>`;
}
// Lista de lecturas de UN módulo, para meter dentro del acordeón de
// "Contenido" bajo "Lectura previa" (además del texto fijo que ya
// hubiera en data.js — no lo reemplaza, lo complementa).
function mjhtBibliografiaModuloHTML(items){
  if(!items || !items.length) return "";
  return `<h5 style="margin-top:10px;">📚 Bibliografía recomendada</h5><ul class="checklist">${items.map(x=>mjhtBibliografiaItemHTML(x)).join("")}</ul>`;
}
// Bibliografía completa del programa, agrupada por módulo — usada en la
// pestaña "Biblioteca" del portal de Participante.
function renderBibliotecaPorModuloHTML(todos){
  if(typeof MODULOS === "undefined") return "";
  return MODULOS.map(m=>{
    const claveModulo = `${m.id} - ${m.tema}`;
    const num = typeof m.id==="number" ? String(m.id).padStart(2,"0") : "—";
    const propios = (todos || []).filter(x=>x.modulo === claveModulo);
    const cuerpo = propios.length
      ? `<ul class="checklist">${propios.map(x=>mjhtBibliografiaItemHTML(x)).join("")}</ul>`
      : `<p class="file-hint">Todavía no hay lecturas registradas para este módulo.</p>`;
    return `<div class="acc-item">
      <button class="acc-head">
        <span class="num ${m.eje==='cierre'?'cierre':''}">${num}</span>
        <span class="meta"><h4>${m.tema}</h4><small>${m.subtitulo} · ${m.fechaLabel}</small></span>
        <span class="chev">▾</span>
      </button>
      <div class="acc-body"><div class="acc-body-inner">${cuerpo}</div></div>
    </div>`;
  }).join("");
}

/* ---------- 8. Resultados del test ---------- */
const LS_KEY_RESULTADOS_TEST = "mjht_resultados_test";
function getResultadosTestLocal(){
  try { return JSON.parse(localStorage.getItem(LS_KEY_RESULTADOS_TEST) || "{}"); }
  catch(e){ return {}; }
}
function guardarResultadoTest(participanteId, valor){
  const todos = getResultadosTestLocal();
  todos[participanteId] = { archivo_nombre_o_url: valor, fecha: new Date().toISOString() };
  try { localStorage.setItem(LS_KEY_RESULTADOS_TEST, JSON.stringify(todos)); } catch(e){}
  return todos;
}
function renderResultadosTestEstadoHTML(){
  if(typeof ASISTENTES === "undefined" || !ASISTENTES.length){
    return `<div class="callout">Todavía no has cargado el roster de asistentes.</div>`;
  }
  const resultados = getResultadosTestLocal();
  const filas = ASISTENTES.map(a=>{
    const r = resultados[a.id];
    return `<tr><td><b>${a.id}</b></td><td>${a.nombre}</td>
      <td>${r ? "✅ Cargado" : "⏳ Pendiente"}</td>
      <td>${r ? r.archivo_nombre_o_url : "—"}</td></tr>`;
  }).join("");
  return `<div class="table-wrap"><table>
    <thead><tr><th>ID</th><th>Nombre</th><th>Estado</th><th>Referencia</th></tr></thead>
    <tbody>${filas}</tbody>
  </table></div>`;
}

/* ---------- 8b. Resultados del test — subida/descarga REAL (Netlify Functions + Blobs) ----------
   A diferencia de getResultadosTestLocal()/guardarResultadoTest() de arriba
   (que solo guardan una REFERENCIA en localStorage, visible únicamente en
   ese navegador), estas funciones suben y sirven el PDF real desde el
   servidor: en cuanto alguien sube un archivo, cualquier persona —
   administradora, facilitadores, participantes— lo ve y lo descarga de
   inmediato, sin depender de este navegador ni de Netlify Forms. */

function archivoABase64(file){
  return new Promise((resolve, reject)=>{
    const lector = new FileReader();
    lector.onload = () => {
      // lector.result viene como "data:application/pdf;base64,AAAA..."
      const base64 = String(lector.result).split(",")[1] || "";
      resolve(base64);
    };
    lector.onerror = () => reject(new Error("No se pudo leer el archivo"));
    lector.readAsDataURL(file);
  });
}

async function subirResultadoTestArchivo(participanteId, participanteNombre, file, subidoPor){
  if(!file) throw new Error("Falta el archivo");
  const contentBase64 = await archivoABase64(file);
  const resp = await fetch("/.netlify/functions/test-upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      participanteId, participanteNombre, subidoPor,
      filename: file.name, contentBase64,
    }),
  });
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data;
}

async function listarResultadosTest(participanteId){
  const url = "/.netlify/functions/test-list" + (participanteId ? ("?participanteId=" + encodeURIComponent(participanteId)) : "");
  const resp = await fetch(url);
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data.items || [];
}

async function eliminarResultadoTest(key){
  const resp = await fetch("/.netlify/functions/test-delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });
  const data = await resp.json().catch(()=>({}));
  if(!resp.ok) throw new Error((data && data.error) || ("Error " + resp.status));
  return data;
}

function renderResultadosTestListaHTML(items, opts){
  opts = opts || {};
  if(!items || !items.length){
    return `<div class="callout">Todavía no hay resultados subidos.</div>`;
  }
  const filas = items.map(it=>{
    const verUrl = `/.netlify/functions/test-download?key=${encodeURIComponent(it.key)}`;
    const descargarUrl = verUrl + "&dl=1";
    const fechaLabel = it.fecha ? new Date(it.fecha).toLocaleString("es-MX") : "—";
    const eliminarBtn = opts.editable
      ? `<button type="button" class="btn-edit-nombre" title="Eliminar" onclick="mjhtEliminarResultadoTest('${it.key.replace(/'/g,"\\'")}')">🗑️</button>`
      : "";
    return `<tr>
      <td><b>${it.participanteId || ""}</b></td>
      <td>${it.participanteNombre || ""}</td>
      <td>${it.filename}</td>
      <td>${fechaLabel}</td>
      <td style="white-space:nowrap;">
        <a class="btn btn-outline btn-sm" href="${verUrl}" target="_blank" rel="noopener">Ver</a>
        <a class="btn btn-primary btn-sm" href="${descargarUrl}">Descargar</a>
        ${eliminarBtn}
      </td>
    </tr>`;
  }).join("");
  return `<div class="table-wrap"><table>
    <thead><tr><th>ID</th><th>Nombre</th><th>Archivo</th><th>Subido</th><th></th></tr></thead>
    <tbody>${filas}</tbody>
  </table></div>`;
}

/* ---------- 10. Comentarios de facilitadores (compartido admin/ponentes) ---------- */
const LS_KEY_COMENTARIOS_FACILITADORES = "mjht_comentarios_facilitadores";
function getComentariosFacilitadores(){
  try { return JSON.parse(localStorage.getItem(LS_KEY_COMENTARIOS_FACILITADORES) || "[]"); }
  catch(e){ return []; }
}
function renderComentariosFacilitadoresHTML(comentarios){
  if(!comentarios || !comentarios.length){
    return `<div class="callout">Todavía no hay comentarios guardados en este navegador.</div>`;
  }
  return comentarios.map(c=>`
    <div class="card">
      <p style="margin-bottom:4px;"><b>${c.autor}</b> <small style="color:var(--gris-claro);">→ ${c.destinatarios}${c.modulo ? " · "+c.modulo : ""}${c.fecha ? " · "+new Date(c.fecha).toLocaleString("es-MX") : ""}</small></p>
      <p style="margin-bottom:0;">${c.comentario}</p>
    </div>`).join("");
}
