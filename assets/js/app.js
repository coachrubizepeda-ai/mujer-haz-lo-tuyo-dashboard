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
   Calendario: filas combinadas (módulos + sesión especial) y
   color por rango de fechas (reemplaza el coloreado por "eje").
   ============================================================ */
function buildCalendarRows(){
  const rows = (typeof MODULOS !== "undefined" ? MODULOS : []).map(m=>Object.assign({tipo:"modulo"}, m));
  if(typeof SESION_ESPECIAL !== "undefined"){
    rows.push(Object.assign({tipo:"especial"}, SESION_ESPECIAL));
  }
  rows.sort((a,b)=> a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0);
  return rows;
}

const RANGO_LABEL = {
  a: "4 – 25 de septiembre",
  b: "2 – 23 de octubre",
  c: "30 de octubre – 13 de noviembre"
};

function rangoDeFecha(fechaISO){
  if(fechaISO <= "2026-09-25") return "a";
  if(fechaISO <= "2026-10-23") return "b";
  return "c";
}

function calendarLegendHTML(){
  return `<div class="cal-legend">
    <span class="cal-legend-item"><span class="dot dot-a"></span>${RANGO_LABEL.a}</span>
    <span class="cal-legend-item"><span class="dot dot-b"></span>${RANGO_LABEL.b}</span>
    <span class="cal-legend-item"><span class="dot dot-c"></span>${RANGO_LABEL.c}</span>
  </div>`;
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

  return { n: perfiles.length, edades, experiencias, estudiosCount, distribuciones };
}

function renderPerfilGrupalHTML(g){
  if(!g.n){
    return `<div class="callout">Todavía no hay respuestas suficientes para armar el perfil general del grupo.</div>`;
  }
  const edadTxt = g.edades.length ? `${Math.min(...g.edades)}–${Math.max(...g.edades)} años` : "sin datos suficientes";
  const expProm = g.experiencias.length ? Math.round(g.experiencias.reduce((a,b)=>a+b,0)/g.experiencias.length) : null;
  const estudiosTxt = Object.entries(g.estudiosCount).sort((a,b)=>b[1]-a[1])
    .map(([k,v])=>`${k} (${v})`).join(", ") || "sin datos suficientes";

  const distHTML = g.distribuciones.map(d=>`
    <div class="perfil-campo">
      <span class="mtag">·</span>
      <span class="txt"><b>${d.label}:</b> ${d.entradas.map(([v,c])=>`${v} (${c})`).join(", ")}</span>
    </div>`).join("");

  return `
    <div class="card">
      <h4>Perfil general del grupo <small style="font-weight:400;color:var(--gris-claro);">— con base en ${g.n} respuesta${g.n===1?"":"s"}</small></h4>
      <div class="grid grid-3" style="margin:14px 0 18px;">
        <div class="stat"><b>${edadTxt}</b><span>rango de edad</span></div>
        <div class="stat"><b>${expProm!==null?expProm+" años":"—"}</b><span>experiencia promedio</span></div>
        <div class="stat"><b style="font-size:1rem;line-height:1.3;">${estudiosTxt}</b><span>grado de estudios</span></div>
      </div>
      ${distHTML}
    </div>`;
}
