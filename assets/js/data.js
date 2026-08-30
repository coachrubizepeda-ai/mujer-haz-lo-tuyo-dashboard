/* ============================================================
   Mujer, Haz lo Tuyo — datos del programa (edición Matutina/CANACINTRA)
   Edita este archivo para actualizar fechas, ponentes, lecturas y
   presentaciones sin tocar el HTML de cada portal.
   ============================================================ */

const PROGRAMA = {
  edicion: "Matutina · CANACINTRA / Club de Empresarios",
  horario: "Viernes · 9:00 a 14:00 hrs",
  sede: "Club de Empresarios (CCE), Torre Inxignia",
  inicio: "4 de septiembre de 2026",
  fin: "13 de noviembre de 2026",
  horasTotales: 50,
  cupoMinimo: 11,
  cupoMaximo: 20,
  contacto: {
    correo: "hazlotuyo@theokpeople.com",
    tel: "222 114 1168",
    ig: "@MujerHazLoTuyo",
    web: "theokpeople.com/hazlotuyo"
  }
};

// eje: 1 = Identidad y presencia · 2 = Comunicación y marca personal · 3 = Finanzas, tecnología e IA
const MODULOS = [
  {
    id: 1,
    fecha: "2026-09-04",
    fechaLabel: "Viernes 4 sep",
    tema: "Inicio del viaje",
    subtitulo: "Punto de partida",
    ponente: "Rubí Zepeda",
    eje: 1,
    descripcion: "Arranque del diplomado: diagnóstico inicial y el encuadre del viaje que viene. Aquí se aplica el test de comportamiento y motivadores.",
    lectura: "Rubí compartirá la lectura previa antes de esta sesión.",
    tarea: "Contestar el test de comportamiento y motivadores (liga en la pestaña Test).",
    presentacion: "../assets/presentaciones/modulo-01.pdf",
    redes: { linkedin: "", instagram: "", x: "" }
  },
  {
    id: 2,
    fecha: "2026-09-11",
    fechaLabel: "Viernes 11 sep",
    tema: "De niña a mujer",
    subtitulo: "Sanar para avanzar",
    ponente: "Rocío González",
    eje: 1,
    descripcion: "Un espacio para mirar la historia personal con honestidad y soltar lo que ya no sirve, sin juicio.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-02.pdf",
    redes: { linkedin: "", instagram: "", x: "" }
  },
  {
    id: 3,
    fecha: "2026-09-18",
    fechaLabel: "Viernes 18 sep",
    tema: "Del ser al parecer",
    subtitulo: "Mi presencia y proyección",
    ponente: "Rubí Zepeda",
    eje: 1,
    descripcion: "Cómo la presencia habla antes que las palabras: coherencia entre quién soy y cómo me proyecto en espacios de poder.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-03.pdf",
    redes: { linkedin: "", instagram: "", x: "" }
  },
  {
    id: 4,
    fecha: "2026-09-25",
    fechaLabel: "Viernes 25 sep",
    tema: "Detalles que hablan",
    subtitulo: "El cuidado de mi imagen",
    ponente: "Fernanda Domínguez",
    eje: 1,
    descripcion: "Imagen ejecutiva como herramienta de comunicación: los detalles que refuerzan (o restan) tu mensaje.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-04.pdf",
    redes: { linkedin: "", instagram: "", x: "" }
  },
  {
    id: 5,
    fecha: "2026-10-02",
    fechaLabel: "Viernes 2 oct",
    tema: "Nutre tu cuerpo",
    subtitulo: "Transforma tu vida",
    ponente: "Luzmy Flores",
    eje: 1,
    descripcion: "Bienestar físico como base de la energía y la claridad para liderar.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-05.pdf",
    redes: { linkedin: "", instagram: "", x: "" }
  },
  {
    id: 6,
    fecha: "2026-10-09",
    fechaLabel: "Viernes 9 oct",
    tema: "Comunicar con intención",
    subtitulo: "Mi voz consciente",
    ponente: "Felipe Ávila",
    eje: 2,
    descripcion: "Comunicación con propósito: cómo suena una mujer que decide cada palabra, no la que le sale por default.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-06.pdf",
    redes: { linkedin: "", instagram: "", x: "" }
  },
  {
    id: 7,
    fecha: "2026-10-16",
    fechaLabel: "Viernes 16 oct",
    tema: "La huella de mi marca personal",
    subtitulo: "Propuesta de valor y posicionamiento",
    ponente: "María Eugenia Ramos",
    eje: 2,
    descripcion: "Construcción de marca personal: propuesta de valor clara y posicionamiento consistente.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-07.pdf",
    redes: { linkedin: "", instagram: "", x: "" }
  },
  {
    id: 8,
    fecha: "2026-10-23",
    fechaLabel: "Viernes 23 oct",
    tema: "Mis finanzas, mi libertad",
    subtitulo: "Decisiones que sostienen tu autonomía",
    ponente: "Georgette Hernández",
    eje: 3,
    descripcion: "Finanzas personales y empresariales como pilar de libertad e independencia.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-08.pdf",
    redes: { linkedin: "", instagram: "", x: "" }
  },
  {
    id: 9,
    fecha: "2026-10-30",
    fechaLabel: "Viernes 30 oct",
    tema: "Pienso, luego conecto",
    subtitulo: "Uso consciente de redes y tecnología",
    ponente: "Doledt Castillo",
    eje: 3,
    descripcion: "Redes sociales y tecnología puestas al servicio de tu marca y tu negocio, con intención.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-09.pdf",
    redes: { linkedin: "", instagram: "", x: "" }
  },
  {
    id: 10,
    fecha: "2026-11-06",
    fechaLabel: "Viernes 6 nov",
    tema: "Cuando la mente imagina, la IA acompaña",
    subtitulo: "Inteligencia artificial aplicada",
    ponente: "Alfonso Vélez",
    eje: 3,
    descripcion: "Inteligencia artificial como herramienta de apalancamiento personal y de negocio.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-10.pdf",
    redes: { linkedin: "", instagram: "", x: "" }
  },
  {
    id: "cierre",
    fecha: "2026-11-13",
    fechaLabel: "Viernes 13 nov",
    tema: "Experiencia de cierre",
    subtitulo: "Cata de vinos",
    ponente: "Sommelier consultor María José Navarrete",
    eje: "cierre",
    descripcion: "Cierre de generación: celebración, integración del grupo y entrega de certificados.",
    lectura: "—",
    tarea: "—",
    presentacion: null,
    redes: { linkedin: "", instagram: "", x: "" }
  }
];

const EJE_LABEL = {
  1: "Eje 1 · Identidad y presencia",
  2: "Eje 2 · Comunicación y marca personal",
  3: "Eje 3 · Finanzas, tecnología e IA",
  cierre: "Cierre de generación"
};
