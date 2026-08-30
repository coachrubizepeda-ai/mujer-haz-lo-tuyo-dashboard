/* Utilidades compartidas: tabs, acordeón, formularios Netlify por fetch */

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
      if(msg){ msg.textContent = "¡Listo! Se envió correctamente. Gracias 💛"; msg.className="form-msg show ok"; }
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
