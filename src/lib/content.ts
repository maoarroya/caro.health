// caro.health — contenido central.
// Voz: magnética, profesional, científica, motivadora, exclusiva y cercana.
// Eje: el merecimiento y la alta vibración. La disciplina como acto de amor propio.

import { p, ps, type Photo } from "@/lib/photos";

export const brand = {
  name: "Caro Health",
  lockup: "The CH Method", // baja del logotipo
  handle: "caro.health",
  role: "Nutricionista · Creadora del CH Method",
  instagram: "https://www.instagram.com/caro.health/",
  email: "hola@caro.health",
  tagline: "La disciplina es el acto definitivo de amor propio.",
  claim: "Fluye con gracia. Alcanza la elegancia en cada movimiento.",
  disciplines: "Nutrición · Pilates · Yoga · Barre & Meditación",
};

// Las siete secciones del sitio. Las etiquetas cortas viven en la barra; el
// nombre completo de cada sección está en `home.verticals`.
export const nav = [
  { label: "Libro", href: "/libro" },
  { label: "Certificaciones", href: "/certificaciones" },
  { label: "Virtual en casa", href: "/virtual" },
  { label: "Asesorías", href: "/asesorias" },
  { label: "Conferencias", href: "/conferencias" },
  { label: "Retiros", href: "/retiros" },
  { label: "Blog", href: "/blog" },
];

// Toda imagen sale del archivo propio de Caro (ver src/lib/photos.ts).
// El set lila es el más reconocible de la marca, así que abre la casa.
export const images = {
  hero: {
    wide: p(34),
    tall: p(3),
    strip: ps(3, 68, 12, 73, 86, 20, 70, 30),
  },
  // Sin el set lila: estudio beige, ballet blanco, negro y en casa.
  marquee: ps(3, 68, 12, 73, 86, 20, 70, 30, 93, 66, 8, 99),
  band: [ps(51, 45, 34, 75, 91, 103, 18, 82, 106), ps(55, 47, 68, 88, 63, 112, 22, 93, 87)],
  founder: { portrait: p(73), detail: p(69), studio: p(60) },
  manifesto: p(85),
  cta: p(85),
  faq: p(108),
};

// ---------------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------------

export const home = {
  hero: {
    eyebrow: brand.disciplines,
    title: "Tu vida abundante empieza en tu cuerpo.",
    body: "Nutrición clínica integral y movimiento consciente, fusionados en un solo método. Ni dietas restrictivas ni ejercicio por obligación: la decisión de habitarte con energía arrolladora.",
    primary: { label: "Certifícate en Pilates", href: "/certificaciones" },
    secondary: { label: "Practica en casa", href: "/virtual" },
  },
  manifesto: {
    eyebrow: "Manifiesto de alta vibración",
    lines: ["Mereces", "una vida", "abundante."],
    body: "No llegaste aquí a castigarte. Llegaste a recordar de lo que estás hecha. Cada plato, cada respiración y cada repetición son una forma de decirte que sí.",
  },
  verticals: {
    eyebrow: "El universo caro.health",
    title: "Siete caminos, una misma vibración.",
    items: [
      {
        no: "01",
        title: "Libro",
        text: "Tú puedes ser libre: una guía para alcanzar la gloria a través de tus hábitos. En físico y en digital.",
        href: "/libro",
        photo: p(123),
      },
      {
        no: "02",
        title: "Certificaciones de Pilates",
        text: "Fórmate como instructora del CH Method: Mat, Reformer, Cadillac, Chair y Barrel con práctica supervisada.",
        href: "/certificaciones",
        photo: p(87),
      },
      {
        no: "03",
        title: "Pilates, Barre y Yoga virtual en casa",
        text: "Clases bajo demanda para practicar desde tu sala. Filtra por disciplina y por el tiempo que hoy tienes.",
        href: "/virtual",
        photo: p(99),
      },
      {
        no: "04",
        title: "Asesorías nutricionales",
        text: "Acompañamiento clínico de alto valor, individual y familiar. Hormonas, masa muscular, energía y longevidad.",
        href: "/asesorias",
        photo: p(121),
      },
      {
        no: "05",
        title: "Conferencias",
        text: "Charlas y talleres para empresas, congresos y eventos que quieren subir la frecuencia de su gente.",
        href: "/conferencias",
        photo: p(129),
      },
      {
        no: "06",
        title: "Retiros wellness y experiencias",
        text: "Retiros VIP y experiencias presenciales en escenarios elegidos por su luz, su calma y su capacidad de cambiarte el año.",
        href: "/retiros",
        photo: p(96),
      },
      {
        no: "07",
        title: "Blog",
        text: "Ideas, ciencia y rituales para vivir en tu frecuencia más alta, escritos por Caro.",
        href: "/blog",
        photo: p(26),
      },
    ],
  },
  authority: {
    eyebrow: "Hola, soy Caro",
    title: "Nutricionista. Conferencista. Autora.",
    body: [
      "Soy nutricionista clínica y llevo más de una década acompañando a mujeres a recuperar su energía, equilibrar sus hormonas y construir un cuerpo fuerte desde la evidencia, no desde la culpa.",
      "El CH Method nació de una certeza: el plato y el movimiento no se negocian por separado. Cuando la nutrición clínica y la práctica consciente se sincronizan, la transformación deja de ser un esfuerzo y se vuelve una consecuencia.",
    ],
    credentials: [
      "Nutrición clínica integral",
      "Conferencista internacional",
      "Autora de Tú puedes ser libre",
      "Instructora certificada de Pilates, Yoga y Barre",
    ],
  },
};

// ---------------------------------------------------------------------------
// CH METHOD — los pilares se muestran en la home; las cualidades y el
// repertorio (textuales del Manual del Instructor) viven en Certificaciones.
// ---------------------------------------------------------------------------

export const chMethod = {
  eyebrow: "CH Method",
  title: "La fusión que ningún plan por separado consigue.",
  body: "Cuatro disciplinas de movimiento consciente sincronizadas con nutrición clínica integral. No es una suma de servicios: es un solo protocolo que lee tu fisiología y la acompaña.",
  qualities: {
    eyebrow: "Nuestras cualidades fundamentales",
    title: "Cinco exigencias que no se negocian.",
    intro:
      "El viaje no es solo aprender ejercicios: es desbloquear el potencial que reside en cada cuerpo y cada mente, a través del control, la precisión y la elegancia.",
    items: [
      { no: "01", title: "Precisión Clínica", text: "Alineación anatómica impecable para cada movimiento." },
      { no: "02", title: "Control y Centrado (Core)", text: "La centralización del poder como base de la fuerza." },
      { no: "03", title: "Conciencia y Respiración Consciente", text: "Conexión profunda mente-cuerpo en cada inhalación y exhalación." },
      { no: "04", title: "Elegancia y Fluidez Artística", text: "El movimiento es arte, fluido y controlado." },
      { no: "05", title: "Adaptabilidad Integral", text: "Uso experto de Cadillac, Chair y Barrel para resultados personalizados." },
    ],
  },
  repertoire: {
    eyebrow: "Repertorio Cadillac",
    title: "El vocabulario del método.",
    note: "Veinticinco ejercicios de Cadillac, más el trabajo de Chair y Barrel, secuenciados según tu nivel.",
    groups: [
      { family: "Push Through Bar", moves: ["Roll Back", "Push Through", "Swan", "Teaser", "Tower", "Thigh Stretch"] },
      { family: "Leg & Arm Springs", moves: ["Airplane", "Reverse E Push", "Flying Eagle", "Spread Eagle", "Leg Springs in the Air", "Standing Arm Springs"] },
      { family: "Kneeling", moves: ["Chest Expansion Kneeling", "Long Back Stretch Kneeling", "Shoulder Roll Down", "Breathing"] },
      { family: "Trapeze", moves: ["Hanging", "Pull Ups", "Hanging Pull Ups", "Twist Pull Ups", "Low Hooks"] },
      { family: "Roll Down Bar", moves: ["Rolling In and Out", "Rolling Stomach Massage", "With Roll Down Bar", "Leg Stretches"] },
    ],
  },
  pillars: [
    { no: "01", title: "Pilates", claim: "Fuerza y control", text: "El centro como origen de todo movimiento. Precisión, estabilidad y una fuerza que se nota en cómo te paras frente al mundo.", photo: p(20) },
    { no: "02", title: "Yoga", claim: "Flexibilidad y conexión", text: "Movilidad, apertura y respiración. El puente entre el cuerpo que entrenas y la mente que decide.", photo: p(103) },
    { no: "03", title: "Barre", claim: "Tonificación dinámica", text: "La disciplina del ballet aplicada al cuerpo real: tono, resistencia y elegancia en cada línea.", photo: p(75) },
    { no: "04", title: "Meditación", claim: "Entrenamiento mental y alta vibración", text: "La práctica que sostiene a todas las demás. Claridad, regulación y la certeza de que mereces esto.", photo: p(100) },
    { no: "05", title: "Nutrición clínica", claim: "La base de todo", text: "Análisis, bioquímica y un plan de alta cocina saludable. La ciencia que convierte tu práctica en resultados.", photo: p(73), focus: "object-[50%_12%]" },
  ],
};

// ---------------------------------------------------------------------------
// 01 · LIBRO
// ---------------------------------------------------------------------------

export type BookFormatId = "digital" | "fisico";

export type BookFormat = {
  id: BookFormatId;
  name: string;
  priceCop: number;
  note: string;
  delivery: string;
  /** Pide dirección y la envía a Wompi como shipping-address. */
  needsShipping: boolean;
  /** Se reclama en persona: pide cédula para verificar la entrega. */
  pickup: boolean;
};

export const libro = {
  eyebrow: "Libro",
  title: "El método, en tus manos.",
  book: {
    title: "Tú puedes ser libre",
    subtitle: "Una guía para alcanzar la gloria a través de tus hábitos",
    author: "Carolina Velásquez · Caro Health",
    cover: { src: "/libro/portada.jpg", w: 874, h: 1310 },
    isbn: "978-628-97558-2-4",
    pages: 117,
    publisher: "Editorial Mi Máquina de Escribir · Colombia, 2026",
    synopsis:
      "¿Vives atrapada en el ciclo del «tengo que», «debería» y «no puedo»? Este libro no es un manual de salud: es un mapa hacia tu propia gloria. Un camino de ascenso que empieza por el espíritu y la mente (confianza, abundancia, perdón) y sigue por el cuerpo (nutrición, movimiento, descanso), con ejercicios prácticos al final de cada capítulo. Aquí la disciplina no es un castigo: es el acto de amor propio más grande que existe.",
    howTo: [
      { title: "Prepara tu Kit de Gloria", text: "Un diario de libertad para los ejercicios de escritura y diez minutos al día en un rincón sin distracciones." },
      { title: "El orden tiene un propósito", text: "Primero el espíritu y la mente; después el cuerpo. Léelo en orden la primera vez y vuelve luego al capítulo que necesites." },
      { title: "Del papel a la acción", text: "Cada capítulo cierra con un ejercicio, un reto o una reflexión. No pases al siguiente sin hacerlo." },
      { title: "Sin juicio, con compasión", text: "La gloria no es una carrera de velocidad, es un camino de consciencia. Ve a tu ritmo." },
    ],
    chapters: [
      "La nutrición: el poder de los alimentos y el arte de relacionarse con la vida",
      "Suplementación inteligente: el impulso extra para tu libertad",
      "El sueño reparador: el ritual de la renovación divina",
      "El estrés: el ladrón de tu gloria y cómo recuperar el mando",
      "La disciplina es la llave de tu libertad",
      "La mentalidad de abundancia: el suelo donde crece tu gloria",
      "El poder de estar presente: meditar para reclamar tu libertad",
      "El arte del journaling: escribir para sanar y escuchar tu guía interior",
      "Estética consciente: el ritual de cuidar tu reflejo",
      "Rituales de pureza: de tu sonrisa a la punta de tus pies",
      "El cuerpo en libertad: el poder del movimiento consciente",
      "Mitos y verdades: despejando el camino hacia la gloria",
      "La postura: tu corona de gloria",
      "Detox digital: recuperando tu dopamina y tu paz",
      "La cocina consciente: el alquimista de tu salud",
      "El poder del «no»: el hábito del amor propio",
      "Vitamina N: el regreso a la Madre Tierra",
      "El mito de la edad: mi secreto para vibrar en gloria a los 40",
      "La respiración: tu ducha interior y el primer nutriente de la gloria",
      "Un día en la vida de un ser libre: tu guía de 24 horas hacia la gloria",
    ],
    // Precios en pesos colombianos: Wompi cobra en COP.
    formats: [
      {
        id: "digital",
        name: "Digital",
        priceCop: 35000,
        note: "PDF · Descarga inmediata",
        delivery: "Recibes el enlace de descarga apenas Wompi apruebe el pago.",
        needsShipping: false,
        pickup: false,
      },
      {
        id: "fisico",
        name: "Físico",
        priceCop: 60000,
        note: "Reclama en Nirvana Spa con tu cédula",
        delivery: "Después del pago, reclama tu ejemplar en Nirvana Spa presentando tu cédula.",
        needsShipping: false,
        pickup: true,
      },
    ] as BookFormat[],
    // Punto de entrega del libro físico.
    pickup: {
      place: "Nirvana Spa",
      instructions: "Presenta tu cédula y el número de pedido. Te lo entregamos en recepción.",
    },
    photo: p(119),
    author_photos: ps(117, 127, 126),
  },
  forWho: {
    eyebrow: "Para quién",
    title: "Un libro para ser vivido, no para dejar en la mesa de noche.",
    items: [
      { title: "Si vives en el «tengo que»", text: "Y sientes que tus miedos, culpas o creencias son las cadenas que te impiden la vida plena que sueñas." },
      { title: "Si tus hábitos no duran", text: "Porque el cambio empezó por fuera. Aquí primero se sana el interior y después se construye el cuerpo." },
      { title: "Si enseñas movimiento", text: "Instructoras de Pilates, Yoga y Barre: la base de nutrición, descanso y mente que tus alumnas te preguntan." },
    ],
  },
};

// ---------------------------------------------------------------------------
// 02 · CERTIFICACIONES DE PILATES
// ---------------------------------------------------------------------------

export type Certification = {
  slug: string;
  name: string;
  level: string;
  hours: string;
  format: string;
  next: string;
  claim: string;
  summary: string;
  includes: string[];
  photo: Photo;
};

export const certificaciones = {
  eyebrow: "Certificaciones de Pilates",
  title: "Conviértete en instructora del CH Method.",
  body: "Formación profesional en Pilates con el sello del CH Method: anatomía aplicada, repertorio completo de Mat y equipos, práctica supervisada y la elegancia que distingue a nuestras instructoras. Se cursa por niveles y se certifica por evaluación.",
  gallery: ps(34, 5, 48, 86, 7, 35, 88, 20),
  programs: [
    {
      slug: "mat-pilates",
      name: "Mat Pilates",
      level: "Nivel I · Fundamentos",
      hours: "80 horas",
      format: "Presencial + virtual",
      next: "Próxima cohorte · Marzo 2027",
      claim: "El repertorio clásico de suelo, de principio a fin.",
      summary:
        "La base de toda instructora: anatomía funcional, los principios del método y los 34 ejercicios originales de Mat con sus progresiones, regresiones y accesorios (magic circle, banda y pelota).",
      includes: [
        "Manual del Instructor CH Method",
        "Anatomía aplicada al movimiento",
        "Repertorio completo de Mat y accesorios",
        "Práctica de enseñanza supervisada",
        "Acceso a la biblioteca virtual durante la formación",
        "Evaluación teórica y práctica con certificado",
      ],
      photo: p(99),
    },
    {
      slug: "reformer-cadillac",
      name: "Reformer & Cadillac",
      level: "Nivel II · Equipos",
      hours: "120 horas",
      format: "Presencial en estudio",
      next: "Próxima cohorte · Junio 2027",
      claim: "Los dos equipos que definen un estudio profesional.",
      summary:
        "Repertorio completo de Reformer y los veinticinco ejercicios de Cadillac del manual: Push Through Bar, Leg & Arm Springs, Kneeling, Trapeze y Roll Down Bar. Programación de clases privadas y grupales.",
      includes: [
        "Repertorio de Reformer por niveles",
        "Los 25 ejercicios de Cadillac del CH Method",
        "Ajustes de resortes, seguridad y asistencia manual",
        "Programación de sesiones privadas y grupales",
        "Prácticas con alumnas reales en estudio",
        "Evaluación y certificado de Nivel II",
      ],
      photo: p(20),
    },
    {
      slug: "chair-barrel",
      name: "Chair & Barrel",
      level: "Nivel III · Avanzado",
      hours: "60 horas",
      format: "Presencial en estudio",
      next: "Próxima cohorte · Septiembre 2027",
      claim: "Adaptabilidad integral para cuerpos reales.",
      summary:
        "Wunda Chair, Ladder Barrel y Spine Corrector: el trabajo de precisión que permite personalizar el método a cualquier cuerpo, lesión o momento vital.",
      includes: [
        "Repertorio de Chair y Barrel",
        "Poblaciones especiales: embarazo, postparto y columna",
        "Diseño de protocolos personalizados",
        "Casos clínicos con supervisión de Caro",
        "Evaluación y certificado de Nivel III",
      ],
      photo: p(44),
    },
    {
      slug: "master-trainer",
      name: "Master Trainer CH Method",
      level: "Formadora de formadoras",
      hours: "200 horas",
      format: "Presencial + mentoría",
      next: "Por postulación · Cupos limitados",
      claim: "Enseña el método con nuestro aval.",
      summary:
        "Para instructoras certificadas en los tres niveles que quieren formar a otras. Pedagogía, evaluación, gestión de estudio y la licencia para dictar certificaciones CH Method en su ciudad.",
      includes: [
        "Pedagogía del movimiento y evaluación",
        "Nutrición integral aplicada a la instrucción",
        "Gestión y posicionamiento de estudio",
        "Mentoría directa con Caro durante un año",
        "Licencia para dictar certificaciones CH Method",
      ],
      photo: p(87),
    },
  ] as Certification[],
  steps: {
    eyebrow: "Cómo funciona",
    title: "De alumna a instructora, en cuatro pasos.",
    items: [
      { no: "01", title: "Postúlate", text: "Cuéntame tu experiencia y por qué quieres enseñar. Reviso cada caso personalmente." },
      { no: "02", title: "Fórmate", text: "Teoría en la plataforma virtual y práctica intensiva en estudio con equipos profesionales." },
      { no: "03", title: "Practica", text: "Horas de enseñanza supervisada con alumnas reales antes de evaluarte." },
      { no: "04", title: "Certifícate", text: "Evaluación teórica y práctica. Tu certificado lleva el sello del CH Method." },
    ],
  },
  form: {
    eyebrow: "Postulación",
    title: "Cuéntame por qué quieres enseñar.",
    body: "Escríbeme con tu experiencia en Pilates, la certificación que te interesa y tu ciudad. Te respondo en menos de 48 horas con fechas, inversión y el siguiente paso.",
  },
};

// ---------------------------------------------------------------------------
// 03 · PILATES, BARRE Y YOGA VIRTUAL EN CASA
// ---------------------------------------------------------------------------

export type Discipline = "Pilates" | "Yoga" | "Barre" | "Meditación";

export type Session = {
  title: string;
  discipline: Discipline;
  minutes: number;
  level: "Principiante" | "Intermedio" | "Avanzado" | "Todos los niveles";
  photo: Photo;
};

export const virtual = {
  eyebrow: "Pilates, Barre y Yoga virtual en casa",
  title: "Tu estudio, en tu casa.",
  body: "Clases en video bajo demanda de Pilates, Barre, Yoga y Meditación. Sin desplazarte y sin horarios: filtra por lo que tu cuerpo pide y por el tiempo que hoy tienes.",
  disciplines: [
    { name: "Pilates", claim: "Fuerza y control" },
    { name: "Barre", claim: "Tonificación dinámica" },
    { name: "Yoga", claim: "Flexibilidad y conexión" },
    { name: "Meditación", claim: "Alta vibración" },
  ],
  equipment: {
    eyebrow: "Lo que necesitas",
    title: "Un mat y dos metros de suelo.",
    body: "Casi todo se practica con el peso del cuerpo. Cuando una clase usa un accesorio, siempre hay una alternativa sin él.",
    items: [
      { name: "Mat", text: "La base de todo. Cualquier superficie firme sirve.", photo: p(105) },
      { name: "Magic circle", text: "El aro que activa aductores, brazos y centro.", photo: p(110) },
      { name: "Banda elástica", text: "Resistencia para glúteos y piernas, sin pesas.", photo: p(109) },
      { name: "Pelota", text: "Inestabilidad controlada para un core más profundo.", photo: p(47) },
    ],
  },
  durations: [
    { label: "10–15 min", max: 15, min: 0 },
    { label: "20–30 min", max: 30, min: 16 },
    { label: "30+ min", max: 999, min: 31 },
  ],
  sessions: [
    { title: "Fundamentos en el mat", discipline: "Pilates", minutes: 15, level: "Principiante", photo: p(99) },
    { title: "Centro y control", discipline: "Pilates", minutes: 32, level: "Intermedio", photo: p(111) },
    { title: "Glúteos con banda", discipline: "Pilates", minutes: 20, level: "Principiante", photo: p(109) },
    { title: "Columna móvil", discipline: "Pilates", minutes: 22, level: "Todos los niveles", photo: p(106) },
    { title: "Core con pelota", discipline: "Pilates", minutes: 25, level: "Intermedio", photo: p(47) },
    { title: "Barre & control", discipline: "Barre", minutes: 28, level: "Intermedio", photo: p(63) },
    { title: "Piernas largas", discipline: "Barre", minutes: 24, level: "Intermedio", photo: p(64) },
    { title: "Ballet fit", discipline: "Barre", minutes: 30, level: "Avanzado", photo: p(70) },
    { title: "Brazos y postura", discipline: "Barre", minutes: 18, level: "Principiante", photo: p(65) },
    { title: "Saludo lento", discipline: "Yoga", minutes: 12, level: "Principiante", photo: p(97) },
    { title: "Apertura de caderas", discipline: "Yoga", minutes: 35, level: "Intermedio", photo: p(105) },
    { title: "Invertidas guiadas", discipline: "Yoga", minutes: 30, level: "Avanzado", photo: p(115) },
    { title: "Equilibrio y foco", discipline: "Yoga", minutes: 20, level: "Intermedio", photo: p(104) },
    { title: "Respirar diez", discipline: "Meditación", minutes: 10, level: "Principiante", photo: p(100) },
    { title: "Alta vibración", discipline: "Meditación", minutes: 15, level: "Todos los niveles", photo: p(101) },
    { title: "Cierre del día", discipline: "Meditación", minutes: 12, level: "Todos los niveles", photo: p(98) },
  ] as Session[],
};

export const membership = {
  eyebrow: "Membresía virtual",
  title: "Entra a tu estudio en casa.",
  subtitle: "Pilates, Barre, Yoga y Meditación, clases nuevas cada semana y los retos guiados. Cancela cuando quieras.",
  monthly: { price: "$29", period: "/ mes", note: "Mes a mes" },
  annual: { price: "$278", period: "/ año", note: "2 meses de regalo" },
  perks: [
    "Biblioteca completa: Pilates, Barre, Yoga y Meditación",
    "Clases nuevas cada semana",
    "Retos guiados de 21 días",
    "Sesiones en directo con Caro",
    "Guías de nutrición descargables",
    "Comunidad privada de alta vibración",
  ],
};

// ---------------------------------------------------------------------------
// 04 · ASESORÍAS NUTRICIONALES (high-ticket)
// ---------------------------------------------------------------------------

export type Program = {
  slug: string;
  name: string;
  kind: string;
  claim: string;
  summary: string;
  duration: string;
  includes: string[];
  forWho: string;
  photo: Photo;
};

export const asesorias = {
  eyebrow: "Asesorías nutricionales",
  title: "Acompañamiento clínico, no un PDF con un menú.",
  body: "Programas de tres meses con seguimiento cercano, diseñados para transformaciones reales. Se trabaja por postulación: reviso cada caso antes de aceptarlo.",
  programs: [
    {
      slug: "active-glow",
      name: "Active Glow",
      kind: "Transformación individual",
      claim: "Energía vital, músculo y hormonas en su sitio.",
      summary:
        "Para mujeres decididas a potenciar su energía vital, ganar masa muscular óptima, equilibrar sus hormonas y rejuvenecer de forma integral.",
      duration: "3 meses · 1 a 1",
      includes: [
        "Valoración clínica completa e interpretación de laboratorios",
        "Protocolo de nutrición personalizado y ajustado cada semana",
        "Plan de movimiento CH Method según tu momento hormonal",
        "Suplementación basada en evidencia",
        "Seguimiento directo por WhatsApp con Caro",
        "Acceso completo a las clases virtuales durante el programa",
      ],
      forWho: "Mujeres de 30 a 55 años listas para dejar de improvisar.",
      photo: p(121),
    },
    {
      slug: "healthy-legacy",
      name: "Healthy Legacy",
      kind: "Nutrición familiar · Concierge",
      claim: "Transforma la casa entera, no solo a una persona.",
      summary:
        "Un servicio exclusivo estilo concierge diseñado para transformar hogares completos, con menús mensuales de alta cocina saludable para toda la familia.",
      duration: "3 meses · Familia",
      includes: [
        "Diagnóstico nutricional de cada miembro del hogar",
        "Menús mensuales de alta cocina saludable, listos para ejecutar",
        "Formación al personal de cocina de la casa",
        "Lista de mercado y despensa curada",
        "Ajustes por alergias, edades y objetivos individuales",
        "Revisión mensual con toda la familia",
      ],
      forWho: "Familias que quieren que la salud sea la herencia, no la excepción.",
      photo: p(118),
    },
  ] as Program[],
  form: {
    eyebrow: "Postulación",
    title: "Cuéntame dónde estás hoy.",
    body: "Reviso personalmente cada postulación y respondo en menos de 48 horas. Si tu caso encaja, agendamos una llamada de diagnóstico.",
  },
};

// ---------------------------------------------------------------------------
// 05 · CONFERENCIAS
// ---------------------------------------------------------------------------

export const conferencias = {
  eyebrow: "Conferencias",
  title: "Llevo la alta vibración a tu escenario.",
  body: "Conferencias, talleres y jornadas de bienestar para empresas, universidades, congresos de salud y eventos que quieren que su gente salga con más energía de la que llegó. Ciencia clara, voz cercana y una práctica que se siente en el cuerpo.",
  portrait: p(129),
  detail: p(3),
  talks: [
    {
      no: "01",
      title: "Mereces una vida abundante",
      kind: "Keynote inspiracional",
      text: "El merecimiento como punto de partida de cualquier cambio. Por qué la disciplina es amor propio y cómo empezar hoy, sin castigo.",
      photo: p(122),
    },
    {
      no: "02",
      title: "Hormonas, energía y el mito del metabolismo lento",
      kind: "Charla científica",
      text: "La bioquímica de tu plato explicada en lenguaje humano. Lo que de verdad regula tu energía, tu peso y tu ánimo.",
      photo: p(121),
    },
    {
      no: "03",
      title: "El cuerpo como proyecto",
      kind: "Taller práctico",
      text: "Nutrición y movimiento consciente diseñados juntos. Incluye una práctica guiada de Pilates y respiración para el público.",
      photo: p(126),
    },
    {
      no: "04",
      title: "Equipos de alta vibración",
      kind: "Jornada corporativa",
      text: "Bienestar real para empresas que entienden que la energía de su gente es el activo. Hábitos, pausas activas y alimentación en la oficina.",
      photo: p(125),
    },
  ],
  formats: [
    { name: "Keynote", detail: "45–60 min · Presencial o virtual" },
    { name: "Taller", detail: "2–4 horas · Grupos de hasta 40 personas" },
    { name: "Jornada corporativa", detail: "Medio día o día completo · Con práctica de movimiento" },
    { name: "Masterclass virtual", detail: "60–90 min · Sin límite de asistentes" },
  ],
  audiences: ["Empresas", "Universidades", "Congresos de salud", "Eventos wellness", "Marcas y lanzamientos"],
  cta: {
    eyebrow: "Reserva",
    title: "Lleva a Caro a tu evento.",
    body: "Cuéntame la fecha, la ciudad y el público. Respondo en menos de 48 horas con propuesta y disponibilidad.",
  },
};

// ---------------------------------------------------------------------------
// 06 · RETIROS WELLNESS Y EXPERIENCIAS
// ---------------------------------------------------------------------------

export const retiros = {
  eyebrow: "Retiros wellness y experiencias",
  title: "Sube de frecuencia, en persona.",
  body: "Retiros VIP, experiencias de un día y masterclasses internacionales en escenarios elegidos por su luz, su calma y su capacidad de cambiarte el año.",
  retreats: [
    {
      name: "Lavanda Retreat",
      place: "Provenza, Francia",
      date: "Junio 2027",
      spots: "12 cupos",
      text: "Siete días entre campos de lavanda: práctica al amanecer, alta cocina saludable y trabajo profundo de sistema nervioso.",
      photo: p(96),
    },
    {
      name: "Alta Vibración",
      place: "Tulum, México",
      date: "Noviembre 2026",
      spots: "16 cupos",
      text: "Cinco días de movimiento junto al mar, ceremonia de intención y protocolo de nutrición para cerrar el año en tu mejor versión.",
      photo: p(100),
    },
    {
      name: "Un día de alta vibración",
      place: "Experiencia urbana",
      date: "Fechas por ciudad",
      spots: "20 cupos",
      text: "Una jornada completa: Pilates, Barre, taller de nutrición y una comida de alta cocina saludable. Para volver a casa distinta esa misma noche.",
      photo: p(101),
    },
    {
      name: "Corporate Wellness",
      place: "A medida",
      date: "Todo el año",
      spots: "Equipos de 20 a 200",
      text: "Talleres y jornadas de bienestar de lujo para empresas que entienden que la energía de su gente es el activo.",
      photo: p(103),
    },
  ],
  day: {
    eyebrow: "Un día en el retiro",
    title: "Así se siente subir de frecuencia.",
    photo: p(98),
    items: [
      { time: "06:30", title: "Práctica al amanecer", text: "Pilates o Yoga con la primera luz. El cuerpo despierta antes que la mente." },
      { time: "09:00", title: "Desayuno de alta cocina", text: "Cada plato diseñado por Caro: sabor, saciedad y bioquímica en la misma mesa." },
      { time: "11:30", title: "Taller de nutrición", text: "Hormonas, energía y hábitos, en lenguaje humano y con tu caso sobre la mesa." },
      { time: "16:00", title: "Barre y tiempo libre", text: "Tonificación dinámica y después nada: piscina, siesta, un libro." },
      { time: "18:30", title: "Meditación al atardecer", text: "Respiración, intención y el cierre del día en alta vibración." },
    ],
  },
};

// ---------------------------------------------------------------------------
// 07 · BLOG
// ---------------------------------------------------------------------------

export type PostCategory = "Nutrición" | "Pilates" | "Yoga" | "Barre" | "Mente";

export type Post = {
  slug: string;
  title: string;
  category: PostCategory;
  date: string; // ISO
  readTime: string;
  excerpt: string;
  photo: Photo;
  body: string[];
};

export const blog = {
  eyebrow: "Blog",
  title: "Ideas para vivir en tu frecuencia más alta.",
  body: "Ciencia clara, práctica honesta y rituales que se sostienen. Todo escrito por Caro, sin dietas de castigo ni promesas vacías.",
  categories: ["Nutrición", "Pilates", "Yoga", "Barre", "Mente"] as PostCategory[],
  posts: [
    {
      slug: "el-mito-del-metabolismo-lento",
      title: "El mito del metabolismo lento",
      category: "Nutrición",
      date: "2026-08-24",
      readTime: "6 min",
      excerpt: "No, tu metabolismo no está roto. Lo que suele estar desajustado es otra cosa, y tiene solución.",
      photo: p(121),
      body: [
        "Cada semana llega a consulta alguien convencida de que su metabolismo es lento. Casi nunca es cierto. Lo que veo en los laboratorios es otra historia: poca masa muscular, sueño fragmentado, un cortisol que no baja y una ingesta de proteína que no alcanza para sostener el músculo que sí tiene.",
        "El metabolismo basal depende sobre todo de cuánto músculo tienes. Por eso las dietas restrictivas empeoran el problema: pierdes músculo, tu gasto baja y, cuando vuelves a comer normal, el cuerpo guarda. No es un castigo, es fisiología.",
        "La salida no es comer menos. Es comer suficiente proteína, entrenar fuerza con control (sí, el Pilates cuenta cuando se hace con precisión) y dormir como si fuera parte del plan. Porque lo es.",
      ],
    },
    {
      slug: "cinco-minutos-de-pilates-que-cambian-tu-postura",
      title: "Cinco minutos de Pilates que cambian tu postura",
      category: "Pilates",
      date: "2026-08-10",
      readTime: "4 min",
      excerpt: "Una secuencia corta de columna que puedes hacer en el suelo de tu sala, antes del café.",
      photo: p(106),
      body: [
        "La postura no se corrige pensando en ella. Se corrige dándole a la columna el movimiento que le falta: flexión, extensión, rotación y lateralidad, cada día, aunque sea un poco.",
        "Mi secuencia de cinco minutos: cat-cow lento con respiración completa, roll down articulado desde de pie, swan pequeño desde el suelo y una torsión sentada a cada lado. Nada heroico. Todo con control.",
        "Hazla tres semanas seguidas y fíjate en cómo te sientas en el escritorio. El cuerpo aprende rápido cuando se le habla con precisión.",
      ],
    },
    {
      slug: "como-respirar-para-bajar-el-cortisol",
      title: "Cómo respirar para bajar el cortisol",
      category: "Mente",
      date: "2026-07-28",
      readTime: "5 min",
      excerpt: "La herramienta más barata de regulación del sistema nervioso está en tu nariz. Así se usa.",
      photo: p(100),
      body: [
        "La respiración es el único proceso automático del cuerpo que también podemos dirigir. Esa puerta de doble sentido es la que usamos para hablarle al sistema nervioso cuando la mente ya no escucha.",
        "La técnica que enseño primero: inhala por la nariz contando cuatro, exhala por la nariz contando seis. La exhalación más larga que la inhalación activa el nervio vago y baja la frecuencia cardíaca. Diez ciclos bastan para notarlo.",
        "Hazlo antes de comer y verás otra cosa: digieres mejor. El cuerpo no asimila bien en modo alerta. Bajar el cortisol también es nutrición.",
      ],
    },
    {
      slug: "barre-por-que-tus-piernas-cambian-en-21-dias",
      title: "Barre: por qué tus piernas cambian en 21 días",
      category: "Barre",
      date: "2026-07-14",
      readTime: "4 min",
      excerpt: "Pulsos pequeños, resistencia larga y un tipo de fibra muscular que casi nadie entrena.",
      photo: p(64),
      body: [
        "El Barre trabaja el músculo en rangos cortos y bajo tensión constante. Eso recluta fibras de resistencia que el entrenamiento convencional deja dormidas, y son precisamente las que le dan al muslo esa línea larga y definida.",
        "A las tres semanas de práctica constante el cambio se ve porque el músculo gana tono, no volumen. Por eso la disciplina del ballet aplicada al cuerpo real produce elegancia y no pesadez.",
        "Mi consejo: no persigas la altura de la pierna. Persigue la alineación. Una pierna baja y perfectamente alineada hace más que una alta y torcida.",
      ],
    },
    {
      slug: "proteina-cuanta-cuando-y-de-donde",
      title: "Proteína: cuánta, cuándo y de dónde",
      category: "Nutrición",
      date: "2026-06-30",
      readTime: "7 min",
      excerpt: "La pregunta que más me hacen en consulta, respondida con números y sin fanatismos.",
      photo: p(47),
      body: [
        "Cuánta: entre 1,6 y 2,2 gramos por kilo de peso corporal al día si entrenas y quieres ganar o conservar músculo. Menos de eso, el cuerpo no tiene con qué construir.",
        "Cuándo: repartida en tres o cuatro comidas con al menos 25 a 30 gramos cada una. El músculo responde a dosis, no a totales. Un desayuno sin proteína es una oportunidad perdida.",
        "De dónde: huevo, pescado, carnes magras, lácteos si los toleras, legumbres combinadas con cereal. La calidad importa, pero la constancia importa más. Lo perfecto que no haces no cuenta.",
      ],
    },
    {
      slug: "invertidas-sin-miedo",
      title: "Invertidas sin miedo: una guía honesta",
      category: "Yoga",
      date: "2026-06-12",
      readTime: "5 min",
      excerpt: "Ponerte de cabeza no es un truco. Es un proceso de fuerza, técnica y confianza que se construye por partes.",
      photo: p(115),
      body: [
        "Nadie debería intentar una invertida sin antes tener hombros fuertes y un centro que sostenga. Por eso en el método las trabajamos después del Pilates: el core que construyes en el mat es el que te sostiene boca abajo.",
        "Progresión que uso: delfín con la cabeza apoyada, piernas en la pared, una pierna arriba, luego las dos con la pared como referencia. Semanas, no días. El miedo se disuelve cuando el cuerpo sabe qué hacer.",
        "Y si nunca te pones de cabeza, no pasa nada. La invertida no es el objetivo. La fuerza y la calma que aparecen en el camino sí.",
      ],
    },
    {
      slug: "la-disciplina-como-acto-de-amor-propio",
      title: "La disciplina como acto de amor propio",
      category: "Mente",
      date: "2026-05-27",
      readTime: "3 min",
      excerpt: "Por qué dejé de hablar de fuerza de voluntad y empecé a hablar de merecimiento.",
      photo: p(101),
      body: [
        "Durante años entendí la disciplina como exigencia: apretar los dientes, aguantar, cumplir. Funcionaba unas semanas y después se rompía, porque nadie sostiene un castigo mucho tiempo.",
        "Todo cambió cuando la pensé al revés. Comer bien, moverme y dormir no son cosas que me obligo a hacer. Son cosas que hago porque merezco sentirme bien. Cuando la motivación viene de ahí, no se agota.",
        "Ese es el eje del CH Method y de este blog. No te pido que te esfuerces más. Te pido que te trates como alguien que merece estar bien.",
      ],
    },
    {
      slug: "el-magic-circle-el-aro-que-hace-todo-el-trabajo",
      title: "El magic circle: el aro que hace todo el trabajo",
      category: "Pilates",
      date: "2026-05-08",
      readTime: "4 min",
      excerpt: "El accesorio más subestimado del Pilates y cuatro formas de usarlo en casa.",
      photo: p(110),
      body: [
        "Joseph Pilates lo diseñó con el aro de un barril. Sigue siendo la herramienta más eficaz para activar aductores, pecho y brazos con una sola señal: apretar.",
        "Cuatro usos en casa: entre los tobillos en el hundred para conectar el centro; entre las manos sobre la cabeza para abrir la espalda alta; en el interior de las rodillas durante el bridge; y contra el muslo externo para trabajar glúteo medio.",
        "El secreto es no apretarlo con fuerza bruta. Apriétalo lo justo para sentir la línea del músculo. La precisión siempre gana al esfuerzo.",
      ],
    },
  ] as Post[],
};

// ---------------------------------------------------------------------------
// Transversal
// ---------------------------------------------------------------------------

export const marquee = [
  "Alta vibración",
  "Mereces sentirte así de bien",
  "Nutrición que se disfruta",
  "La disciplina es amor propio",
  "Tu cuerpo es el proyecto",
];

export const testimonials = [
  { quote: "Recuperé la energía que llevaba una década buscando. Y por primera vez entendí mis laboratorios.", name: "Valentina R.", detail: "Active Glow · 3 meses", photo: p(117) },
  { quote: "Bajé 9 kilos de grasa y subí músculo, pero lo que cambió de verdad fue cómo me hablo.", name: "Lucía M.", detail: "Active Glow", photo: p(118) },
  { quote: "Mis hormonas por fin están en orden. Caro lee la bioquímica como nadie y la explica como una amiga.", name: "Andrea P.", detail: "Active Glow", photo: p(119) },
  { quote: "Cambiamos la cocina de la casa entera. Mis hijos comen distinto y nadie lo vivió como un castigo.", name: "Marina G.", detail: "Healthy Legacy", photo: p(121) },
  { quote: "Practico desde México a mi ritmo. Las clases virtuales son lo más cerca que he estado de tener un santuario propio.", name: "Daniela S.", detail: "Virtual en casa", photo: p(122) },
  { quote: "El retiro me reordenó el año. Volví con un plan y con una versión de mí que no conocía.", name: "Paula H.", detail: "Retiros", photo: p(123) },
  { quote: "Nunca me había sentido tan fuerte y tan en paz al mismo tiempo. Eso es el CH Method.", name: "Sofía L.", detail: "Virtual en casa", photo: p(125) },
  { quote: "Me certifiqué en Mat con Caro y hoy tengo mi propio grupo. La precisión que enseña se nota en cada clase.", name: "Nora V.", detail: "Certificación Mat Pilates", photo: p(126) },
];

export const faqs = [
  { q: "¿Necesito experiencia previa para las clases virtuales?", a: "Ninguna. Cada disciplina tiene clases desde nivel principiante y todas incluyen adaptaciones. Empiezas donde estés hoy." },
  { q: "¿Qué diferencia al CH Method de un plan de nutrición normal?", a: "Que el plato y el movimiento se diseñan juntos, leyendo tu bioquímica y tu momento hormonal. Un protocolo de nutrición aislado ignora la mitad de la ecuación." },
  { q: "¿Necesito ser instructora para certificarme?", a: "No. Mat Pilates (Nivel I) parte de cero; solo pido práctica previa como alumna. Los niveles de equipos y Master Trainer sí requieren el nivel anterior." },
  { q: "¿Las asesorías tienen precio público?", a: "Son programas de alto acompañamiento y se trabajan por postulación. Tras revisar tu caso te comparto la inversión en la llamada de diagnóstico." },
  { q: "¿Necesito equipo para practicar en casa?", a: "La mayoría de las clases se practica solo con un mat. Cuando usamos aro, banda o pelota, siempre ofrezco una alternativa con peso corporal." },
  { q: "¿Puedo practicar durante el embarazo?", a: "Sí, con las adaptaciones señaladas en cada clase y siempre con el visto bueno de tu profesional de salud." },
  { q: "¿Cómo reservo un retiro o una conferencia?", a: "Los cupos de los retiros se asignan por orden de reserva y las conferencias por agenda. Escríbeme y te comparto el dossier completo." },
];

export const gallery = {
  eyebrow: "El archivo",
  title: "La estética de la marca, cuadro a cuadro.",
  groups: [
    { id: "todo", label: "Todo", sets: [] as string[] },
    { id: "estudio", label: "Estudio", sets: ["studio", "detail"] },
    { id: "barre", label: "Barre & ballet", sets: ["lilac", "ballet"] },
    { id: "fuerza", label: "Fuerza", sets: ["black"] },
    { id: "casa", label: "En casa", sets: ["home"] },
    { id: "retratos", label: "Retratos", sets: ["portrait"] },
  ],
  photos: ps(
    3, 6, 8, 12, 13, 15, 16, 17, 18, 21, 22, 24, 27, 30, 31, 34, 35, 36,
    25, 26, 29, 33, 67, 69, 77, 84,
    41, 42, 45, 47, 51, 52, 55, 56, 57, 58, 59, 60, 63, 64,
    66, 68, 70, 71, 73, 74, 75,
    80, 82, 83, 85, 86, 87, 88, 90, 91, 93, 94, 95, 96,
    97, 99, 100, 103, 105, 106, 109, 111, 112, 114, 116,
    117, 119, 121, 123, 126, 127,
  ),
};
