/* ============================================================
   Mujer, Haz lo Tuyo — acceso al sitio
   -------------------------------------------------------------
   IMPORTANTE PARA RUBÍ: esto NO es seguridad de grado bancario —
   es suficiente para un diplomado cerrado, pero no lo uses para
   información delicada.

   - Facilitador y Administradora: contraseña compartida por rol
     (igual que siempre). Para cambiarlas, edita ACCESOS abajo
     ANTES de subir el sitio a Netlify.
   - Participante: login INDIVIDUAL (correo + contraseña), para
     que cada quien vea solo lo suyo (en especial, su propio Test
     Trimetrix) y no lo que suben las demás. Los correos y
     contraseñas los da de alta la administradora en su panel
     ("Acceso a la plataforma") y se verifican contra Netlify
     Functions + Blobs (netlify/functions/participant-auth-*.js),
     no contra este archivo — así funciona desde el celular o
     laptop de cada participante, no solo desde el navegador de
     quien dio de alta el acceso.
   ============================================================ */

const ACCESOS = {
  ponente: { pass: "PONENTE2026", label: "Facilitador",   home: "ponentes/index.html" },
  admin:   { pass: "RUBI2026",    label: "Administradora", home: "admin/index.html" }
};

const SESSION_KEY = "mjht_rol_activo";
const ASISTENTE_SESSION_KEY = "mjht_asistente_sesion"; // { participanteId, email }

function mjhtLogin(rol, intento){
  const cfg = ACCESOS[rol];
  if(!cfg) return false;
  if(intento === cfg.pass){
    sessionStorage.setItem(SESSION_KEY, rol);
    return true;
  }
  return false;
}

// Login individual de participante. Devuelve { ok: true } o { ok: false, error }.
async function mjhtLoginAsistente(email, password){
  try {
    const resp = await fetch("/.netlify/functions/participant-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await resp.json().catch(()=>({}));
    if(resp.ok && data && data.ok){
      sessionStorage.setItem(ASISTENTE_SESSION_KEY, JSON.stringify({ participanteId: data.participanteId, email }));
      return { ok: true, participanteId: data.participanteId };
    }
    return { ok: false, error: (data && data.error) || "Correo o contraseña incorrectos." };
  } catch(e){
    return { ok: false, error: "No se pudo conectar (" + (e.message || e) + ")." };
  }
}

// Sesión activa de la participante logueada, o null si no hay ninguna.
function mjhtAsistenteActivo(){
  try { return JSON.parse(sessionStorage.getItem(ASISTENTE_SESSION_KEY) || "null"); }
  catch(e){ return null; }
}

function mjhtLogout(){
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(ASISTENTE_SESSION_KEY);
  location.href = "../index.html";
}

// Llamar en cada portal (asistentes/ponentes/admin) al cargar la página.
function mjhtGuard(rolEsperado){
  if(rolEsperado === "asistente"){
    if(!mjhtAsistenteActivo()){ location.href = "../index.html?rol=asistente"; }
    return;
  }
  const activo = sessionStorage.getItem(SESSION_KEY);
  if(activo !== rolEsperado){
    location.href = "../index.html?rol=" + rolEsperado;
  }
}
