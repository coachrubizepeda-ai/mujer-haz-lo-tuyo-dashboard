/* ============================================================
   Mujer, Haz lo Tuyo — preguntas de "Retroalimentación del módulo"
   -------------------------------------------------------------
   Mismo formato que el PDF oficial (MHLT_Retroalimentacion_Modulo):
   6 categorías, 16 preguntas en escala 1-5, más 2 preguntas abiertas.
   Se comparte entre los 3 portales: Asistentes (llena el formulario),
   Facilitadores y Administradora (ven los resultados).
   ============================================================ */
const RETRO_CATEGORIAS = [
  {
    id: "instalaciones",
    nombre: "Instalaciones",
    preguntas: [
      { id: 1, texto: "Llegar y entrar a Torre Inxignia (registro, app Kigo, estacionamiento) fue sencillo y sin contratiempos." },
      { id: 2, texto: "El salón (temperatura, acústica, mobiliario) me permitió concentrarme y participar en las dinámicas con comodidad." },
      { id: 3, texto: "La calidad de los alimentos y el servicio del coffee break estuvieron a la altura de la sesión." },
    ],
  },
  {
    id: "tiempos",
    nombre: "Tiempos",
    preguntas: [
      { id: 4, texto: "La sesión inició y cerró puntualmente, respetando mi agenda." },
      { id: 5, texto: "Las 5 horas se sintieron bien distribuidas: hubo tiempo para profundizar sin sentirse apresurado ni alargado." },
      { id: 6, texto: "Los descansos estuvieron bien ubicados y me ayudaron a mantener la energía durante toda la sesión." },
    ],
  },
  {
    id: "instructora",
    nombre: "Instructor(a)",
    preguntas: [
      { id: 7, texto: "Domina el tema y lo demostró con ejemplos reales, no solo con teoría." },
      { id: 8, texto: "Aterrizó el contenido a mi realidad." },
      { id: 9, texto: "Manejó las participaciones del grupo con equilibrio: escuchó, dio espacio y mantuvo el rumbo." },
      { id: 10, texto: "Me sentí en confianza para preguntar, opinar y equivocarme." },
    ],
  },
  {
    id: "material",
    nombre: "Material",
    preguntas: [
      { id: 11, texto: "El material (hojas de trabajo, presentación, kit) fue útil en la sesión y me servirá para consultarlo después." },
    ],
  },
  {
    id: "contenido",
    nombre: "Contenido",
    preguntas: [
      { id: 12, texto: "Aprendí al menos una cosa que no sabía o que cambió mi forma de ver el tema." },
      { id: 13, texto: "El balance entre reflexión, teoría y práctica fue el adecuado para este módulo." },
    ],
  },
  {
    id: "impacto",
    nombre: "Impacto personal",
    preguntas: [
      { id: 14, texto: "Salgo con al menos una acción concreta que voy a aplicar esta misma semana." },
      { id: 15, texto: "Este módulo me dio una herramienta o perspectiva que puedo usar en mi día a día." },
      { id: 16, texto: "Recomendaría este módulo a otra mujer de mi red." },
    ],
  },
];

// Lista plana de las 16 preguntas, útil para validar/iterar sin anidar categorías
const RETRO_PREGUNTAS = RETRO_CATEGORIAS.flatMap((c) =>
  c.preguntas.map((p) => ({ ...p, categoria: c.id, categoriaNombre: c.nombre }))
);
