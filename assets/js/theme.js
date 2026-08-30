/* ============================================================
   Mujer, Haz lo Tuyo — modo día/noche
   -------------------------------------------------------------
   Por default sigue el sistema operativo del dispositivo (auto).
   El switch guarda una preferencia manual en este navegador.
   ============================================================ */
(function(){
  try {
    var saved = localStorage.getItem("mjht_theme");
    if(saved === "light" || saved === "dark"){
      document.documentElement.setAttribute("data-theme", saved);
    }
  } catch(e){}
})();

function mjhtToggleTheme(){
  var root = document.documentElement;
  var systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var current = root.getAttribute("data-theme") || (systemDark ? "dark" : "light");
  var next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("mjht_theme", next); } catch(e){}
}
