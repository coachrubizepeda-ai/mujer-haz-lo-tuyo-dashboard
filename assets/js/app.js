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
    });
  });
  const hash = location.hash.replace("#","");
  if(hash && document.getElementById(hash)){
    document.querySelector('.tab-btn[data-tab="'+hash+'"]')?.click();
  }
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

function renderAsistenciaReporteHTML(registros){
  if(!registros || !registros.length){
    return `<div class="callout">Todavía no se ha registrado ninguna asistencia desde este navegador.</div>`;
  }

  // Tabla por módulo: si un módulo se pasó lista más de una vez, se muestra
  // cada envío por separado (fecha de envío + facilitador). Cuando se puede
  // reconocer el módulo (moduloId, o el número dentro del texto guardado),
  // se muestra también la fecha OFICIAL de esa sesión (cruzando con MODULOS),
  // además de la fecha en la que se envió el formulario de asistencia.
  const porModuloHTML = registros.map(r=>{
    const presentesHTML = (r.presentes||[]).length
      ? `<ul class="checklist" style="pointer-events:none;">${
          r.presentes.map(id=>{
            const a = (typeof ASISTENTES !== "undefined") ? ASISTENTES.find(x=>x.id===id) : null;
            const nombreMostrar = a ? (typeof nombreMostrado === "function" ? nombreMostrado(a.nombre) : a.nombre) : id;
            return `<li><span class="txt"><b>${id}</b><span>${a ? nombreMostrar : "(no encontrado en el roster)"}</span></span></li>`;
          }).join("")
        }</ul>`
      : `<p class="file-hint">Sin asistentes marcadas en este envío.</p>`;
    const fecha = r.fecha_envio ? new Date(r.fecha_envio).toLocaleString("es-MX") : "—";
    const fechaOficial = fechaOficialModulo(r);
    return `
      <div class="card">
        <h4 style="margin-bottom:4px;">${r.modulo || "Módulo sin especificar"}</h4>
        <p style="margin-bottom:12px;color:var(--gris-claro);font-size:.85rem;">${fechaOficial ? `Sesión oficial: <b>${fechaOficial}</b> · ` : ""}Enviado por ${r.ponente || "—"} · lista pasada el ${fecha} · ${(r.presentes||[]).length} presente${(r.presentes||[]).length===1?"":"s"}</p>
        ${presentesHTML}
      </div>`;
  }).join("");

  // Resumen por participante: cuántos módulos distintos (por texto de
  // "modulo" del registro) tienen a esa persona marcada como presente.
  const conteoPorId = {};
  registros.forEach(r=>{
    const modulosVistos = new Set();
    (r.presentes||[]).forEach(id=>{
      const key = id + "||" + (r.modulo || "");
      if(!modulosVistos.has(key)){
        modulosVistos.add(key);
        conteoPorId[id] = (conteoPorId[id]||0) + 1;
      }
    });
  });
  const idsOrdenados = (typeof ASISTENTES !== "undefined" ? ASISTENTES.map(a=>a.id) : Object.keys(conteoPorId));
  const resumenHTML = idsOrdenados.map(id=>{
    const a = (typeof ASISTENTES !== "undefined") ? ASISTENTES.find(x=>x.id===id) : null;
    const nombreMostrar = a ? (typeof nombreMostrado === "function" ? nombreMostrado(a.nombre) : a.nombre) : id;
    const n = conteoPorId[id] || 0;
    return `<tr><td><b>${id}</b></td><td>${nombreMostrar}</td><td>${n}</td></tr>`;
  }).join("");

  return `
    <div class="table-wrap" style="margin-bottom:20px;">
      <table>
        <thead><tr><th>ID</th><th>Participante</th><th>Sesiones de asistencia acumuladas</th></tr></thead>
        <tbody>${resumenHTML}</tbody>
      </table>
    </div>
    ${porModuloHTML}`;
}

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
function renderRegistroAsistentesHTML(){
  if(typeof ASISTENTES === "undefined" || !ASISTENTES.length){
    return `<div class="callout">Todavía no has cargado el roster de asistentes en <code>assets/js/roster.js</code>.</div>`;
  }
  const filas = ASISTENTES.map(a=>`
    <tr><td><b>${a.id}</b></td><td>${a.nombre}</td><td>${a.cargo || "—"}</td><td>${a.empresa || "—"}</td></tr>`).join("");
  return `<div class="table-wrap"><table>
    <thead><tr><th>ID</th><th>Nombre</th><th>Cargo</th><th>Empresa</th></tr></thead>
    <tbody>${filas}</tbody>
  </table></div>`;
}

const LS_KEY_SEMBLANZAS_ASISTENTES = "mjht_semblanzas_asistentes";
function getSemblanzasAsistentes(){
  try { return JSON.parse(localStorage.getItem(LS_KEY_SEMBLANZAS_ASISTENTES) || "{}"); }
  catch(e){ return {}; }
}
function guardarSemblanzaAsistente(id, nombre, semblanza){
  const todas = getSemblanzasAsistentes();
  todas[id] = { nombre, semblanza, fecha: new Date().toISOString() };
  try { localStorage.setItem(LS_KEY_SEMBLANZAS_ASISTENTES, JSON.stringify(todas)); } catch(e){}
  return todas;
}
function renderSemblanzasAsistentesHTML(){
  if(typeof ASISTENTES === "undefined" || !ASISTENTES.length){
    return `<div class="callout">Todavía no has cargado el roster de asistentes.</div>`;
  }
  const guardadas = getSemblanzasAsistentes();
  const filas = ASISTENTES.map(a=>{
    const s = guardadas[a.id];
    return `<tr><td><b>${a.id}</b></td><td>${a.nombre}</td>
      <td>${s ? "✅ Semblanza enviada" : "⏳ Pendiente"}</td>
      <td>${s ? new Date(s.fecha).toLocaleDateString("es-MX") : "—"}</td></tr>`;
  }).join("");
  return `<div class="table-wrap"><table>
    <thead><tr><th>ID</th><th>Nombre</th><th>Estado</th><th>Última actualización (este navegador)</th></tr></thead>
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

/* ---------- 7. Materiales de facilitadores + recomendaciones del admin ---------- */
const LS_KEY_MATERIALES_COMPARTIDOS = "mjht_materiales_compartidos";
function getMaterialesCompartidos(){
  try { return JSON.parse(localStorage.getItem(LS_KEY_MATERIALES_COMPARTIDOS) || "[]"); }
  catch(e){ return []; }
}
function guardarMaterialCompartido(registro){
  const arr = getMaterialesCompartidos();
  arr.push(registro);
  try { localStorage.setItem(LS_KEY_MATERIALES_COMPARTIDOS, JSON.stringify(arr)); } catch(e){}
  return arr;
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
function renderMaterialesFacilitadoresHTML(withRecomendaciones){
  if(typeof MODULOS === "undefined") return "";
  const materiales = getMaterialesCompartidos();
  const recos = getRecomendacionesMateriales();
  return MODULOS.map(m=>{
    const label = typeof m.id==="number" ? "Módulo "+m.id : "Cierre";
    const claveModulo = `${m.id} - ${m.tema}`;
    const propios = materiales.filter(x=>x.modulo === claveModulo);
    const presentacionOficial = m.presentacion ? `<p style="margin-bottom:6px;"><a href="${m.presentacion}" target="_blank">Ver presentación oficial ↗</a></p>` : "";
    const listaPropios = propios.length
      ? `<ul class="checklist" style="pointer-events:none;">${propios.map(x=>`<li><span class="txt"><b>${x.tipo==="pdf"?"Archivo":"Liga"}</b><span>${x.nombre_o_url} · ${x.fecha ? new Date(x.fecha).toLocaleDateString("es-MX") : "—"}</span></span></li>`).join("")}</ul>`
      : `<p class="file-hint">Sin materiales registrados en este navegador todavía.</p>`;
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
