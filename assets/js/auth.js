/* ============================================================
   Mujer, Haz lo Tuyo — acceso por rol (contraseña compartida)
   -------------------------------------------------------------
   IMPORTANTE PARA RUBÍ: esto NO es seguridad de grado bancario —
   es una cortina simple para que cada grupo entre a su propio
   espacio. Cualquiera que sepa ver el código de la página puede
   encontrar las contraseñas. Es suficiente para un diplomado
   cerrado, pero no lo uses para información delicada.

   Para cambiar las contraseñas, edita los 3 valores de abajo
   ANTES de subir el sitio a Netlify.
   ============================================================ */

const ACCESOS = {
  asistente: { pass: "HAZLOTUYO2026", label: "Asistente", home: "asistentes/index.html" },
  ponente:   { pass: "PONENTE2026",   label: "Ponente",   home: "ponentes/index.html" },
  admin:     { pass: "RUBI2026",      label: "Administradora", home: "admin/index.html" }
};

const SESSION_KEY = "mjht_rol_activo";

function mjhtLogin(rol, intento){
  const cfg = ACCESOS[rol];
  if(!cfg) return false;
  if(intento === cfg.pass){
    sessionStorage.setItem(SESSION_KEY, rol);
    return true;
  }
  return false;
}

function mjhtLogout(){
  sessionStorage.removeItem(SESSION_KEY);
  location.href = "../index.html";
}

// Llamar en cada portal (asistentes/ponentes/admin) al cargar la página.
function mjhtGuard(rolEsperado){
  const activo = sessionStorage.getItem(SESSION_KEY);
  if(activo !== rolEsperado){
    location.href = "../index.html?rol=" + rolEsperado;
  }
}
