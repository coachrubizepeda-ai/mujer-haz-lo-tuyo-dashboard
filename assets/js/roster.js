/* ============================================================
   Mujer, Haz lo Tuyo — roster de asistentes (edición Matutina)
   -------------------------------------------------------------
   Rubí: agrega o edita aquí la información de cada asistente.
   Ejemplo de campos:

   {
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
  { nombre: "Liz Perez", empresa: "", cargo: "", semblanza: "", linkedin: "", perfil: "Elizabeth Pérez Martinez" },
  { nombre: "Liz Cárcamo", empresa: "", cargo: "", semblanza: "", linkedin: "" },
  { nombre: "Lilia Velez", empresa: "", cargo: "", semblanza: "", linkedin: "" },
  { nombre: "Iztel Palacios", empresa: "", cargo: "", semblanza: "", linkedin: "", perfil: "Itzel Palacios Ortiz" },
  { nombre: "Liliana Buitrón", empresa: "", cargo: "", semblanza: "", linkedin: "" },
  { nombre: "Marysol Pontón", empresa: "", cargo: "", semblanza: "", linkedin: "", perfil: "Marysol Ponton Gracía" },
  { nombre: "Ana Vélez", empresa: "", cargo: "", semblanza: "", linkedin: "" },
  { nombre: "Sara Rivero Rugerio", empresa: "", cargo: "", semblanza: "", linkedin: "" },
  { nombre: "Mildred Sosa", empresa: "", cargo: "", semblanza: "", linkedin: "", perfil: "Mildred Erosa" },
  { nombre: "Lupita Prósperi", empresa: "", cargo: "", semblanza: "", linkedin: "" },
];
