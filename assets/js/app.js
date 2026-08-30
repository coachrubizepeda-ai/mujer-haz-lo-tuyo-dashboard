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

function initAccordion(){
  document.querySelectorAll(".acc-head").forEach(head=>{
    head.addEventListener("click", ()=>{
      head.closest(".acc-item").classList.toggle("open");
    });
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
