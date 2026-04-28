// ─── Marquee Words ────────────────────────────────────────────────────────────
export const MARQUEE_WORDS = [
  { label: 'SEO',               icon: 'Search' },
  { label: 'E-commerce',        icon: 'ShoppingBag' },
  { label: 'Google Analytics',  icon: 'BarChart2' },
  { label: 'Meta Pixel',        icon: 'Box' },
  { label: 'UX / UI',           icon: 'Layout' },
  { label: 'Search Console',    icon: 'SearchCheck' },
  { label: 'CRM',               icon: 'Users' },
  { label: 'Google Ads',        icon: 'TrendingUp' },
  { label: 'Web App',           icon: 'Monitor' },
  { label: 'Automatizaciones',  icon: 'Zap' },
  { label: 'WhatsApp API',      icon: 'MessageCircle' },
  { label: 'Diseño Web',        icon: 'Globe' },
  { label: 'Conversiones',      icon: 'ArrowUpRight' },
  { label: 'Tienda Online',     icon: 'Store' },
  { label: 'Pauta Digital',     icon: 'Play' },
  { label: 'ROAS',              icon: 'DollarSign' },
  { label: 'Email Marketing',   icon: 'Mail' },
  { label: 'Calendly',          icon: 'Calendar' },
  { label: 'Landing Page',      icon: 'FileText' },
  { label: 'Core Web Vitals',   icon: 'Activity' },
  { label: 'Remarketing',       icon: 'RefreshCw' },
] as const

// ─── Flow Diagram Nodes ───────────────────────────────────────────────────────
export const FLOW_NODES = [
  { label: 'Web',        icon: 'Globe' },
  { label: 'SEO',        icon: 'Search' },
  { label: 'Analytics',  icon: 'BarChart2' },
  { label: 'Meta Pixel', icon: 'Box' },
  { label: 'CRM',        icon: 'Users' },
  { label: 'Pauta',      icon: 'Target' },
  { label: 'Ventas',     icon: 'DollarSign' },
] as const

// ─── Marketing 360 Services ───────────────────────────────────────────────────
export const SERVICES = [
  {
    icon: 'Layout',
    title: 'Diseño que convierte',
    service: 'UX/UI',
    analogy: 'Tu tienda física tiene layout y señalización. Tu web también debe tenerla para que el cliente compre.',
  },
  {
    icon: 'Search',
    title: 'Para que Google sepa que existes',
    service: 'SEO',
    analogy: 'Los robots de Google rastrean millones de páginas. De nada sirve un restaurante hermoso si nadie sabe que existe. El SEO pone tu negocio en el mapa.',
  },
  {
    icon: 'BarChart2',
    title: 'Trabaja con datos, no suposiciones',
    service: 'Analytics + Search Console',
    analogy: 'Sin Analytics manejas tu negocio a ciegas. Los datos te dicen exactamente qué funciona y dónde invertir cada peso.',
  },
  {
    icon: 'Box',
    title: 'Tu vendedor invisible',
    service: 'Meta Pixel',
    analogy: 'El Pixel registra quién visita tu web, qué ve y qué compra — para que cada peso de pauta vaya a quien más lo necesita.',
  },
  {
    icon: 'Users',
    title: 'Ningún lead se vuelve a perder',
    service: 'CRM + Automatizaciones',
    analogy: 'Sin CRM los leads se pierden en el WhatsApp. Con CRM cada cliente tiene su historial y seguimiento automático.',
  },
  {
    icon: 'Target',
    title: 'Enciende y vende desde el día 1',
    service: 'Listo para Pauta',
    analogy: 'Es como un motor: lo ensamblamos pieza a pieza. Cuando está listo, enciendes la pauta y el negocio arranca a generar.',
  },
] as const

// ─── Process Steps ────────────────────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Descubrimiento',
    description: 'Brief inicial, análisis de competencia y definición del buyer persona.',
    tags: ['Brief', 'Competencia', 'Buyer Persona'],
  },
  {
    number: '02',
    title: 'Estrategia',
    description: 'Sitemap, wireframes, plan SEO y diseño del embudo de conversión.',
    tags: ['Sitemap', 'Wireframes', 'Plan SEO', 'Embudo'],
  },
  {
    number: '03',
    title: 'Desarrollo',
    description: 'UI/UX final, desarrollo del código, e-commerce y optimización de velocidad.',
    tags: ['UI/UX', 'Código', 'E-commerce', 'Velocidad'],
  },
  {
    number: '04',
    title: 'Integración 360°',
    description: 'Configuración completa de GA4, Search Console, Meta Pixel y CRM.',
    tags: ['GA4', 'Search Console', 'Meta Pixel', 'CRM'],
  },
  {
    number: '05',
    title: 'Lanzamiento',
    description: 'QA exhaustivo, capacitación del equipo y soporte post-lanzamiento.',
    tags: ['QA', 'Capacitación', 'Soporte'],
  },
] as const

// ─── Portfolio Industries ─────────────────────────────────────────────────────
export const INDUSTRIES = [
  {
    id: 'retail',
    label: 'Retail & E-commerce',
    icon: 'ShoppingBag',
    clients: [
      { name: 'Cliente 01' },
      { name: 'Cliente 02' },
      { name: 'Cliente 03' },
      { name: 'Cliente 04' },
      { name: 'Cliente 05' },
      { name: 'Cliente 06' },
    ],
  },
  {
    id: 'servicios',
    label: 'Servicios Profesionales',
    icon: 'Briefcase',
    clients: [
      { name: 'Cliente 07' },
      { name: 'Cliente 08' },
      { name: 'Cliente 09' },
      { name: 'Cliente 10' },
      { name: 'Cliente 11' },
      { name: 'Cliente 12' },
    ],
  },
  {
    id: 'educacion',
    label: 'Educación',
    icon: 'GraduationCap',
    clients: [
      { name: 'Cliente 13' },
      { name: 'Cliente 14' },
      { name: 'Cliente 15' },
      { name: 'Cliente 16' },
    ],
  },
] as const

// ─── Differentials ────────────────────────────────────────────────────────────
export const DIFFERENTIALS = [
  {
    number: '01',
    title: 'SEO desde el inicio',
    description: 'No como add-on. El SEO está incluido desde el diseño, no pegado al final.',
    icon: 'Search',
  },
  {
    number: '02',
    title: 'Medición completa',
    description: 'GA4 + Search Console + Meta Pixel configurados y verificados antes de lanzar.',
    icon: 'BarChart2',
  },
  {
    number: '03',
    title: 'Lista para pauta día 1',
    description: 'Todos los eventos y conversiones configurados. Enciendes la pauta y ya convierte.',
    icon: 'Target',
  },
  {
    number: '04',
    title: 'CRM integrado',
    description: 'Ningún lead se pierde. Seguimiento automático desde el primer clic.',
    icon: 'Users',
  },
  {
    number: '05',
    title: 'E-commerce que convierte',
    description: 'Checkout optimizado, catálogos de Meta y pasarelas de pago locales.',
    icon: 'ShoppingBag',
  },
  {
    number: '06',
    title: 'Atención 24/7',
    description: 'Reservas automáticas, WhatsApp Business y chatbots que trabajan mientras duermes.',
    icon: 'MessageCircle',
  },
] as const

// ─── Quoter Options ───────────────────────────────────────────────────────────
export const BUSINESS_TYPES = [
  { value: 'restaurante', label: 'Restaurante / Café' },
  { value: 'salud',       label: 'Salud / Belleza' },
  { value: 'ecommerce',   label: 'Tienda / E-commerce' },
  { value: 'servicios',   label: 'Servicios profesionales' },
  { value: 'educacion',   label: 'Educación / Cursos' },
  { value: 'otro',        label: 'Otro' },
] as const

export const NEEDS_OPTIONS = [
  { value: 'web-nueva',   label: 'Web nueva desde cero' },
  { value: 'rediseno',    label: 'Rediseño de mi web' },
  { value: 'tienda',      label: 'Tienda online' },
  { value: 'paquete360',  label: 'Paquete completo 360°' },
] as const

export const BUDGET_OPTIONS = [
  { value: 'basico',      label: 'Básico',      sub: 'hasta $1.500 USD' },
  { value: 'profesional', label: 'Profesional', sub: '$1.500 – $4.000 USD' },
  { value: 'premium',     label: 'Premium',     sub: '$4.000 – $10.000 USD' },
  { value: 'enterprise',  label: 'Enterprise',  sub: '+$10.000 USD' },
] as const

// ─── Nav Links ────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: '360°',        href: '/#servicios' },
  { label: 'Proceso',     href: '/#proceso' },
  { label: 'Portafolio',  href: '/#portafolio' },
  { label: 'Servicios',   href: '/servicios' },
] as const
