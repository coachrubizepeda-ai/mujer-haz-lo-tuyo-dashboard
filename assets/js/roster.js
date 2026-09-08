/* ============================================================
   Mujer, Haz lo Tuyo — roster de asistentes (edición Matutina)
   -------------------------------------------------------------
   Rubí: agrega o edita aquí la información de cada asistente.
   Ejemplo de campos:

   {
     id: "M11",            // identificador corto y estable de la persona —
                           // no lo cambies aunque su nombre se corrija después
     nombre: "Ana Pérez",
     empresa: "Pérez Consultoría",
     cargo: "Directora General",
     semblanza: "Breve descripción de su trayectoria.",
     linkedin: "https://linkedin.com/in/ana-perez",
     perfil: "Ana Pérez"   // opcional: nombre exacto usado en perfiles.js
                           // (solo si su nombre completo ahí es distinto)
   }

   Este mismo arreglo alimenta:
   - El directorio de asistentes en el portal de administradora.
   - La lista de nombres para pasar lista en el portal de ponentes
     (si está vacío, los ponentes escriben los nombres a mano).
   - El vínculo con los perfiles confidenciales de assets/js/perfiles.js
     (visibles solo para facilitadores).

   No necesitas tocar ningún otro archivo — en cuanto guardes esto
   y vuelvas a subir el sitio, se actualiza en automático.
   ============================================================ */

const ASISTENTES = [
  { id: "M01", nombre: "Liz Perez", empresa: "", cargo: "", semblanza: "", linkedin: "", perfil: "Elizabeth Pérez Martinez" },
  { id: "M02", nombre: "Liz Cárcamo", empresa: "", cargo: "", semblanza: "", linkedin: "" },
  { id: "M03", nombre: "Lilia Velez", empresa: "", cargo: "", semblanza: "", linkedin: "" },
  { id: "M04", nombre: "Iztel Palacios", empresa: "", cargo: "", semblanza: "", linkedin: "", perfil: "Itzel Palacios Ortiz" },
  { id: "M05", nombre: "Liliana Buitrón", empresa: "", cargo: "", semblanza: "", linkedin: "" },
  { id: "M06", nombre: "Marysol Pontón", empresa: "", cargo: "", semblanza: "", linkedin: "", perfil: "Marysol Ponton Gracía" },
  { id: "M07", nombre: "Ana Vélez", empresa: "", cargo: "", semblanza: "", linkedin: "" },
  { id: "M08", nombre: "Sara Rivero Rugerio", empresa: "", cargo: "", semblanza: "", linkedin: "" },
  { id: "M09", nombre: "Mildred Sosa", empresa: "", cargo: "", semblanza: "", linkedin: "", perfil: "Mildred Erosa" },
  { id: "M10", nombre: "Lupita Prósperi", empresa: "", cargo: "", semblanza: "", linkedin: "" },
  { id: "M11", nombre: "Rocío González", empresa: "", cargo: "", semblanza: "", linkedin: "" },
  { id: "M12", nombre: "Rubí Zepeda", empresa: "The Ok People", cargo: "Directora del diplomado", semblanza: "", linkedin: "" },
];
