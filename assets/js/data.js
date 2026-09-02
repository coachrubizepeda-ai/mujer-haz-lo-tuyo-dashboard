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
    tel: "222 113 3443",
    ig: "@MujerHazLoTuyo",
    web: "theokpeople.com/hazlotuyo"
  }
};

// eje: campo histórico (1/2/3/"cierre"), ya no se muestra en pantalla — se
// conserva solo por compatibilidad de datos. El agrupamiento visible en el
// calendario usa el campo "grupo" (ver GRUPO_LABEL más abajo).
const MODULOS = [
  {
    id: 1,
    fecha: "2026-09-04",
    fechaLabel: "Viernes 4 sep",
    tema: "Diagnóstico inicial y análisis de resultados del Test Trimetrix",
    subtitulo: "Punto de partida",
    ponente: "Rubí Zepeda",
    eje: 1,
    grupo: "identidad",
    descripcion: "Arranque del diplomado: diagnóstico inicial y el encuadre del viaje que viene, a partir de los resultados del Test Trimetrix (comportamiento, motivadores e inteligencia emocional).",
    lectura: "1. Introducción – Comportamientos (pág. 5)<br>2. Características Generales (pág. 6–7)<br>3. Valores que Aporta a la Organización (pág. 8)<br><i style=\"font-size:.82rem;color:var(--gris-claro)\">Aquí \"organización\" no se refiere solo a un trabajo formal: aplica a cualquier sistema al que perteneces — tu empresa, tu familia, tu comunidad. Todas estamos inmersas en algún entorno social donde esto aplica.</i><br>4. Percepciones – Cómo te Ven los Demás (pág. 12)<br>5. Descriptores (pág. 14)<br><br><small style=\"color:var(--gris-claro)\">Nota: Las páginas pueden variar en cada test, son solo como referencia. Es mejor que te bases en los títulos.</small>",
    tarea: "No aplica porque el test es previo al módulo.",
    presentacion: "../assets/presentaciones/modulo-01.pdf",
    semblanza: "Consultora organizacional, coach ejecutiva y facilitadora con más de 15 años de experiencia acompañando a líderes, equipos y organizaciones en procesos de transformación, alineación estratégica y desarrollo de talento. Formación en Desarrollo Humano y estudios en Coaching Profesional por la European Open Business School (Madrid), con certificaciones internacionales en Coaching Ejecutivo, Evaluación de Talento e Inteligencia Emocional. Su trayectoria incluye experiencia internacional en Alemania dentro del sector industrial y colaboraciones con empresas globales como Volkswagen y Eisenmann. Licenciada en Informática por el Instituto Tecnológico de Puebla.",
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
    grupo: "identidad",
    descripcion: "Un espacio para mirar la historia personal con honestidad y soltar lo que ya no sirve, sin juicio.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-02.pdf",
    semblanza: "Directora del Espacio Holístico Mente, Cuerpo y Alma. Especialidades en Terapia Gestalt, Psicoterapia de Adolescentes, Grupos Terapéuticos, Psicoterapia Sexual, de Pareja y Corporal, Especialidad en Síntomas y Tanatología, Constelaciones Familiares, Programación Neurolingüística (PNL), Teatro Clown Terapéutico, Coaching Empresarial y Biodesprogramación Emocional. Ha impartido más de 1,000 conferencias y cursos, y colaborado en medios como TV Puebla, Los 40 Radiotribuna, Radio BUAP y el noticiero Así Sucede 103.9 FM. Autora de más de 10 libros y manuales.",
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
    grupo: "identidad",
    descripcion: "Cómo la presencia habla antes que las palabras: coherencia entre quién soy y cómo me proyecto en espacios de poder.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-03.pdf",
    semblanza: "Consultora organizacional, coach ejecutiva y facilitadora con más de 15 años de experiencia acompañando a líderes, equipos y organizaciones en procesos de transformación, alineación estratégica y desarrollo de talento. Formación en Desarrollo Humano y estudios en Coaching Profesional por la European Open Business School (Madrid), con certificaciones internacionales en Coaching Ejecutivo, Evaluación de Talento e Inteligencia Emocional. Su trayectoria incluye experiencia internacional en Alemania dentro del sector industrial y colaboraciones con empresas globales como Volkswagen y Eisenmann. Licenciada en Informática por el Instituto Tecnológico de Puebla.",
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
    grupo: "proyeccion",
    descripcion: "Imagen ejecutiva como herramienta de comunicación: los detalles que refuerzan (o restan) tu mensaje.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-04.pdf",
    semblanza: "Con más de 11 años de experiencia, es asesora de imagen y mentora de emprendimientos femeninos, especializada en ayudar a las mujeres a fortalecer su confianza, autoestima y proyección personal y profesional. Ha colaborado con marcas como Palacio de Hierro, Tiffany, AVON, Adolfo Domínguez, Rapsodia y Cadillac.",
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
    grupo: "proyeccion",
    descripcion: "Bienestar físico como base de la energía y la claridad para liderar.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-05.pdf",
    semblanza: "Nutrióloga por la Universidad Iberoamericana Puebla, especializada en Metabolismo y Nutrición para Cirugía Bariátrica en el Colegio Mexicano para Cirugía de Obesidad y Enfermedades Metabólicas. Certificada como Educadora en Obesidad por la Universidad Iberoamericana, con Diplomado en Nutrigenética y Epigenética por el Instituto de Nutrigenética de Madrid, España. Miembro del Colegio Mexicano de Nutriólogos, A.C. Atiende consulta privada y hospitalaria.",
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
    grupo: "proyeccion",
    descripcion: "Comunicación con propósito: cómo suena una mujer que decide cada palabra, no la que le sale por default.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-06.pdf",
    semblanza: "Consultor senior, capacitador y coach con más de 25 años de experiencia en formación directiva, comunicación organizacional y desarrollo de equipos de alto desempeño. Licenciado en Periodismo y Comunicación Colectiva por la UNAM (Mención Honorífica), con Maestría en Dirección de Negocios por la BUAP y especialización en Desarrollo Comercial por el Movimiento Desjardins en Quebec, Canadá.",
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
    grupo: "proyeccion",
    descripcion: "Construcción de marca personal: propuesta de valor clara y posicionamiento consistente.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-07.pdf",
    semblanza: "Licenciada en Diseño y Producción Publicitaria por la UPAEP con Maestría en Mercadotecnia. Más de 20 años especializándose en estrategias de marketing, tendencias de consumo y comportamiento del consumidor. Profesora en instituciones como el Instituto de Mercadotecnia y Publicidad (IMP), UPAEP, IBERO y CICE de la BUAP. Dirige Insighter, consultora en diseño y pensamiento estratégico.",
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
    grupo: "estrategia",
    descripcion: "Finanzas personales y empresariales como pilar de libertad e independencia.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-08.pdf",
    semblanza: "Licenciada en Administración de Empresas por la UDLAP, con más de 16 años de experiencia profesional en el área administrativa y financiera. Actualmente enfocada en el emprendimiento y la asesoría en finanzas personales, acompañando a mujeres a fortalecer su relación con el dinero y construir decisiones económicas más conscientes y sostenibles.",
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
    grupo: "estrategia",
    descripcion: "Redes sociales y tecnología puestas al servicio de tu marca y tu negocio, con intención.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-09.pdf",
    semblanza: "Emprendedora poblana con trayectoria sólida en publicidad, marketing y creación de contenido digital. Desde 2020 especializada en el desarrollo de estrategias de marketing digital, integrando creatividad, análisis y ejecución estratégica. Ha liderado Dirección de Comunicación y Marketing en Revista Valores Puebla, trabajando con marcas locales y nacionales, aseguradoras, desarrolladoras inmobiliarias y creadores de contenido.",
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
    grupo: "estrategia",
    descripcion: "Inteligencia artificial como herramienta de apalancamiento personal y de negocio.",
    lectura: "Por confirmar — se actualizará antes del módulo.",
    tarea: "Por confirmar — se actualizará antes del módulo.",
    presentacion: "../assets/presentaciones/modulo-10.pdf",
    semblanza: "Emprendedor Endeavor, ha constituido empresas de innovación en movilidad sustentable y seguridad vial, como Autotraffic SA de CV, empresa líder en tecnología en seguridad vial con más de 21 años en el mercado. Doble grado de Maestría en Administración de Empresas por la Escuela Superior de Administración y Dirección de Empresas de Barcelona y la Universidad Adolfo Ibáñez de Santiago de Chile. Ingeniero Mecánico por el Instituto Tecnológico de Puebla.",
    redes: { linkedin: "", instagram: "", x: "" }
  },
  {
    id: "cierre",
    fecha: "2026-11-13",
    fechaLabel: "Viernes 13 nov",
    tema: "Experiencia de cierre",
    subtitulo: "Cata de vinos",
    ponente: "María José Navarrete Sánchez",
    eje: "cierre",
    grupo: "cierre",
    descripcion: "Cierre de generación: celebración, integración del grupo y entrega de certificados.",
    lectura: "—",
    tarea: "—",
    presentacion: null,
    semblanza: "Sommelier consultor y educadora en vinos, certificada con el nivel 3 en vinos de la WSET con distinción. Como consultora independiente diseña cartas de vino para hoteles y restaurantes, capacita equipos de servicio y guía catas privadas y corporativas en español e inglés. Desde 2024 es docente de Enología en la Licenciatura en Gastronomía de ISU Universidad, en Puebla, y en 2025 formó parte del panel de jueces del concurso México Selection by CMB.",
    redes: { linkedin: "", instagram: "", x: "" }
  }
];

// EJE_LABEL: campo histórico, ya no se usa para mostrar texto en pantalla
// (se dejó de usar la palabra "Eje" + número por pedido de Rubí). Se
// mantiene solo por si algún dato viejo lo referencia.
const EJE_LABEL = {
  1: "Eje 1 · Identidad y presencia",
  2: "Eje 2 · Comunicación y marca personal",
  3: "Eje 3 · Finanzas, tecnología e IA",
  cierre: "Cierre de generación"
};

// ------------------------------------------------------------------
// Agrupamiento visible del calendario (reemplaza "Eje 1/2/3" + número).
// Confirmado por Rubí:
//   - Módulos 1, 2, 3 + Sesión especial "Presencia que conecta. Experiencia con caballos" → Identidad Interna
//   - Módulos 4, 5, 6, 7                                       → Proyección y marca personal
//   - Módulos 8, 9, 10                                         → Estrategia
//   - Sesión de cierre (cata de vinos)                         → Experiencia de cierre
//
// NOTA SIN RESOLVER: en el mensaje donde Rubí confirmó estos grupos también
// mencionó la frase "Presencia que conecta", sin que quedara claro a qué
// grupo o módulo corresponde. No se usó en este agrupamiento por no poder
// confirmarlo con certeza — hay que preguntarle a Rubí a qué se refería
// antes de dar esto por cerrado.
// ------------------------------------------------------------------
const GRUPO_LABEL = {
  identidad: "Identidad Interna",
  proyeccion: "Proyección y marca personal",
  estrategia: "Estrategia",
  cierre: "Experiencia de cierre"
};

// Resultados del Test Trimetrix por asistente. Se llena a mano (o vía el
// formulario "resultado-test-asistente" que sube el facilitador en su
// portal — Netlify Forms no expone archivos al frontend automáticamente,
// así que la administradora copia aquí la liga de descarga una vez que
// tiene el archivo). Clave = nombre exacto tal como aparece en roster.js.
const RESULTADOS_TEST = {
  // "Liz Perez": "https://drive.google.com/tu-liga-aqui"
};

// Sesión especial fuera del programa numerado de módulos — se muestra en el
// calendario de los 3 portales, pero no cuenta como módulo ni afecta el
// avance del diplomado (renderCourseProgress solo usa MODULOS).
const SESION_ESPECIAL = {
  tema: "Presencia que conecta. Experiencia con caballos",
  grupo: "identidad",
  fecha: "2026-09-19",
  fechaLabel: "Sábado 19 sep",
  horario: "Por confirmar",
  facilitadora: "Rosario"
};

// Código de Honor para participantes — placeholder editable: Rubí aún no ha
// compartido el contenido definitivo, así que estos son puntos de ejemplo
// marcados como borrador. Reemplázalos en cuanto Rubí confirme el texto real.
const CODIGO_HONOR_PARTICIPANTES = [
  ["Compromiso y puntualidad", "Asistir a las sesiones con puntualidad y compromiso con el propio proceso. [PENDIENTE: confirmar con Rubí]"],
  ["Confidencialidad", "Respetar la privacidad e historias compartidas por las demás participantes. [PENDIENTE: confirmar con Rubí]"],
  ["Apertura y respeto", "Participar con apertura, respeto y sin juicio hacia una misma y hacia el grupo. [PENDIENTE: confirmar con Rubí]"],
  ["Confianza en el proceso", "Confiar en la metodología y en el acompañamiento de los facilitadores. [PENDIENTE: confirmar con Rubí]"]
];
