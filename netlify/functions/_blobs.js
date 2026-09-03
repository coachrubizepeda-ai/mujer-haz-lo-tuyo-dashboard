/* ============================================================
   Mujer, Haz lo Tuyo — abrir un Netlify Blobs store
   -------------------------------------------------------------
   Netlify normalmente detecta solo el sitio/token cuando una función
   corre en su infraestructura ("getStore(nombre)" sin nada más). Si
   eso falla con el error "The environment has not been configured to
   use Netlify Blobs..." (lo verás en el panel como "No se pudo listar/
   guardar: ..."), significa que por lo que sea Netlify no está pasando
   ese contexto solo — pasa a veces según cómo esté conectado el sitio
   a GitHub o el dominio.

   Esta función arregla eso: si el sitio tiene configuradas dos
   variables de entorno (ver abajo), las usa directo en vez de esperar
   a que Netlify las adivine. Si no existen, intenta la forma automática
   de siempre (no rompe nada si ya te estaba funcionando).

   CÓMO ARREGLARLO SI VES ESE ERROR (una sola vez, tarda 2 minutos):
   1. Site ID: en app.netlify.com entra al sitio → Site configuration →
      General → Site details → copia "Site ID".
   2. Token: en app.netlify.com → tu foto (arriba a la derecha) → User
      settings → Applications → Personal access tokens → New access
      token → ponle un nombre (ej. "blobs-mjht") → cópialo (solo se
      muestra una vez).
   3. En el sitio del dashboard: Site configuration → Environment
      variables → Add a variable, dos veces:
        BLOBS_SITE_ID = (lo del paso 1)
        BLOBS_TOKEN   = (lo del paso 2)
   4. Deploys → Trigger deploy → Deploy site (para que tome las
      variables nuevas).
   ============================================================ */

const { getStore } = require("@netlify/blobs");

function abrirStore(nombre) {
  const siteID = process.env.BLOBS_SITE_ID;
  const token = process.env.BLOBS_TOKEN;
  if (siteID && token) {
    return getStore({ name: nombre, siteID, token });
  }
  return getStore(nombre);
}

module.exports = { abrirStore };
