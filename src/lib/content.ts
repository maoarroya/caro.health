// Central content for Caro · Pilates Master.
// Voice modelled on lottiemurphy.com: warm, unhurried, anti-hustle, community-first.

const P = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// One cohesive Pexels shoot — warm, beige, editorial. Every block gets its own frame.
export const images = {
  heroMain: P(6453906, 1800),
  strip: [P(6454157), P(6453898), P(6453907), P(6453880)],
  ways: {
    dip: P(6453881, 900),
    challenge: P(6453899, 900),
    routine: P(6453905, 900),
  },
  courses: {
    foundations: P(6453908, 1000),
    core: P(6454156, 1000),
    reformer: P(6454158, 1000),
    prenatal: P(6453882, 1000),
    restore: P(6453883, 1000),
    teacher: P(6453884, 1000),
  },
  manifesto: P(6453885, 1600),
  aboutPortrait: P(6453900),
  aboutDetail: P(6453901),
  method: P(6453902),
  testimonials: [P(6453903), P(6453904, 700), P(6453902, 700)],
  pricing: P(6454150),
  faq: P(6454151),
  cta: P(6454152, 1600),
  preview: P(6454153),
};

export const brand = {
  name: "Caro",
  handle: "caro.health",
  role: "Pilates Master",
  instagram: "https://www.instagram.com/caro.health/",
  tagline: "Tu estudio de Pilates, donde estés.",
};

export const nav = [
  { label: "Cursos", href: "/cursos" },
  { label: "Método", href: "/#metodo" },
  { label: "Sobre mí", href: "/#sobre-mi" },
  { label: "Historias", href: "/#historias" },
  { label: "Membresía", href: "/#precios" },
];

export const marquee = [
  "Muévete con intención",
  "Aparecer ya cuenta",
  "Siéntete en casa en tu cuerpo",
  "Sin prisa, sin postureo",
  "Pilates que encaja en tu vida",
];

export const ways = {
  eyebrow: "Cómo se practica",
  title: "Pilates que encaja en la vida real.",
  items: [
    {
      k: "10 min",
      title: "Entra 10 minutos",
      text: "Un respiro entre reuniones. Sesiones cortas para los días llenos.",
      image: images.ways.dip,
      accent: "peri",
    },
    {
      k: "Reto",
      title: "Sigue un reto guiado",
      text: "Programas estructurados que te llevan de la mano, semana a semana.",
      image: images.ways.challenge,
      accent: "amber",
    },
    {
      k: "Rutina",
      title: "Crea tu rutina",
      text: "Construye una práctica regular que funcione para ti, a tu ritmo.",
      image: images.ways.routine,
      accent: "taupe",
    },
  ],
  note: "Todo está incluido en tu membresía. Tú decides cómo y cuándo te mueves.",
};

export const manifesto = {
  eyebrow: "Esto no va de rendir",
  lines: ["Esto no va", "de exigirte", "más."],
  body: "Aparecer ya cuenta. Sea como sea tu día de hoy. Aquí no hay prisa ni postureo: solo tu cuerpo, tu respiración y el movimiento justo.",
};

export type Course = {
  slug: string;
  title: string;
  level: "Principiante" | "Intermedio" | "Avanzado" | "Todos los niveles";
  duration: string;
  sessions: string;
  price: string;
  image: string;
  accent: "peri" | "amber" | "taupe" | "lilac" | "moss" | "butter";
  summary: string;
  tag?: string;
  outcomes: string[];
};

export const courses: Course[] = [
  {
    slug: "fundamentos",
    title: "Fundamentos",
    level: "Principiante",
    duration: "6 semanas",
    sessions: "24 sesiones",
    price: "€89",
    image: images.courses.foundations,
    accent: "peri",
    summary:
      "Tu punto de partida. Principios, respiración y ejercicios base para una práctica segura y sólida.",
    tag: "Empieza aquí",
    outcomes: [
      "Domina la respiración y la activación del centro",
      "Los 12 ejercicios fundamentales del mat",
      "Corrige tu postura desde la base",
    ],
  },
  {
    slug: "core-y-fuerza",
    title: "Core & Fuerza",
    level: "Intermedio",
    duration: "8 semanas",
    sessions: "32 sesiones",
    price: "€119",
    image: images.courses.core,
    accent: "amber",
    summary:
      "Construye fuerza real desde el centro, con transiciones fluidas y control absoluto.",
    tag: "Más popular",
    outcomes: [
      "Fortalece el powerhouse y la espalda",
      "Progresiones de fuerza semana a semana",
      "Más resistencia, control y definición",
    ],
  },
  {
    slug: "reformer-en-casa",
    title: "Reformer en Casa",
    level: "Intermedio",
    duration: "6 semanas",
    sessions: "18 sesiones",
    price: "€109",
    image: images.courses.reformer,
    accent: "taupe",
    summary:
      "La experiencia del reformer en tu salón, con o sin equipo, adaptada a bandas y peso corporal.",
    outcomes: [
      "Adaptaciones para reformer, bandas o sin equipo",
      "Tren inferior y estabilidad",
      "Flujos largos de cuerpo completo",
    ],
  },
  {
    slug: "pre-y-postnatal",
    title: "Pre & Postnatal",
    level: "Todos los niveles",
    duration: "10 semanas",
    sessions: "30 sesiones",
    price: "€129",
    image: images.courses.prenatal,
    accent: "lilac",
    summary:
      "Acompañamiento consciente para tu embarazo y postparto, cuidando suelo pélvico y energía.",
    outcomes: [
      "Rutinas seguras por trimestre",
      "Recuperación de core y suelo pélvico",
      "Alivio de tensión y descanso reparador",
    ],
  },
  {
    slug: "restaurativo",
    title: "Restaurativo",
    level: "Todos los niveles",
    duration: "4 semanas",
    sessions: "16 sesiones",
    price: "€69",
    image: images.courses.restore,
    accent: "moss",
    summary:
      "Movilidad y liberación suave para recuperar, descansar y volver a habitar tu cuerpo.",
    outcomes: [
      "Movilidad de columna y caderas",
      "Libera cuello, hombros y espalda",
      "Rutinas cortas para días de bajo impacto",
    ],
  },
  {
    slug: "formacion-instructores",
    title: "Formación de Instructores",
    level: "Avanzado",
    duration: "16 semanas",
    sessions: "Certificación",
    price: "€890",
    image: images.courses.teacher,
    accent: "butter",
    summary:
      "Conviértete en instructora certificada: metodología, anatomía, secuenciación y práctica supervisada.",
    tag: "Certificación",
    outcomes: [
      "Anatomía funcional aplicada al Pilates",
      "Diseño y secuenciación de clases",
      "Prácticas supervisadas + certificado",
    ],
  },
];

export const method = {
  eyebrow: "El método Caro",
  title: "No es entrenar más fuerte. Es moverte con más intención.",
  body: "Precisión del Pilates clásico con una mirada contemporánea del cuerpo. Cada sesión está pensada para que sientas, no solo para que ejecutes.",
  pillars: [
    { no: "01", title: "Centro y control", text: "Todo nace del powerhouse: estabilidad y ligereza." },
    { no: "02", title: "Respiración consciente", text: "El aire marca el ritmo. Practicas con presencia." },
    { no: "03", title: "Precisión sobre repetición", text: "Menos, pero mejor. Calidad antes que cantidad." },
    { no: "04", title: "Progresión sostenible", text: "Programas que crecen contigo, a tu ritmo." },
  ],
};

export const testimonials = [
  { quote: "Clara en las indicaciones, cuidadosa en el trato, nunca abrumadora. Una profesora excepcional.", name: "Valentina R." },
  { quote: "Cada clase es un placer. La práctica se siente como un lujo y un descanso a la vez.", name: "Lucía M." },
  { quote: "Después de años con dolor de espalda, por fin encontré una práctica que me escucha.", name: "Andrea P." },
  { quote: "El programa prenatal me acompañó en cada trimestre. Volví a moverme con seguridad.", name: "Marina G." },
  { quote: "Practico desde México a mi ritmo. Es como tener un estudio en casa.", name: "Daniela S." },
  { quote: "Hice la formación y hoy doy mis propias clases. Caro enseña con una generosidad enorme.", name: "Paula H." },
  { quote: "Nunca me había sentido tan fuerte y tan en paz al mismo tiempo.", name: "Sofía L." },
  { quote: "Aparecer cuenta, decía Caro. Empecé con 10 minutos al día y me cambió la vida.", name: "Nora V." },
];

export const faqs = [
  { q: "¿Necesito experiencia previa?", a: "Para nada. El curso de Fundamentos empieza desde cero y cada programa incluye adaptaciones para distintos niveles. Empiezas donde estés." },
  { q: "¿Necesito equipo o máquina reformer?", a: "La mayoría se practica solo con un mat. Cuando usamos equipo, siempre ofrezco alternativas con bandas o peso corporal." },
  { q: "¿Cómo accedo a las clases?", a: "Todo es online y a tu ritmo, desde cualquier dispositivo. Acceso para siempre en los cursos, o mientras seas miembro en la membresía." },
  { q: "¿Cuánto tiempo necesito a la semana?", a: "Con 3 sesiones de 25–35 min por semana notarás cambios reales. Están diseñados para una vida ocupada." },
  { q: "¿Puedo practicar durante el embarazo?", a: "Sí, con el programa Pre & Postnatal, diseñado para cada etapa. Recomiendo el visto bueno de tu profesional de salud." },
];

export const membership = {
  eyebrow: "Incluido en tu membresía",
  title: "Empieza con una semana gratis.",
  subtitle: "Pruébalo de verdad, y luego decides si es para ti.",
  monthly: { price: "€19", period: "/ mes", note: "Mes a mes" },
  annual: { price: "€182", period: "/ año", note: "2 meses gratis" },
  perks: [
    "Acceso a toda la biblioteca de clases",
    "Todos los cursos y retos de Caro",
    "Clases nuevas cada semana",
    "Sesiones en directo",
    "Comunidad privada y eventos",
    "Cancela cuando quieras",
  ],
};
