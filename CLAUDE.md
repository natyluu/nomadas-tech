# CLAUDE.md — Nómadas Tech Website
## Instrucciones para Claude Code

---

## 🎯 CONTEXTO DEL PROYECTO

**Empresa:** Nómadas Tech  
**Tipo:** Agencia de Marketing Digital 360°  
**Mercado:** Colombia  
**Stack:** Next.js 14 (App Router) + Tailwind CSS + TypeScript  
**Deploy:** Vercel (conectado a GitHub, deploy automático en cada push a `main`)

---

## 🏗️ ARQUITECTURA DEL PROYECTO

```
nomadas-tech/
├── app/
│   ├── layout.tsx          # Layout global con nav + footer
│   ├── page.tsx            # Landing page principal
│   ├── globals.css         # Variables CSS + reset
│   ├── servicios/
│   │   └── page.tsx        # Página de servicios (SEO independiente)
│   ├── portafolio/
│   │   └── page.tsx        # Portafolio por industria
│   ├── proceso/
│   │   └── page.tsx        # Cómo trabajamos
│   ├── nosotros/
│   │   └── page.tsx        # Sobre Nómadas Tech
│   ├── blog/
│   │   ├── page.tsx        # Lista de artículos
│   │   └── [slug]/
│   │       └── page.tsx    # Artículo individual
│   └── contacto/
│       └── page.tsx        # Página de contacto
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroBanner.tsx      # Hero con marquee animado
│   │   ├── MarqueeWords.tsx    # Palabras flotantes animadas
│   │   ├── FlowDiagram.tsx     # Flujo 7 pasos animado
│   │   ├── Marketing360.tsx    # Sección servicios con analogías
│   │   ├── Proceso.tsx         # Timeline 5 pasos
│   │   ├── Portafolio.tsx      # Logos + industrias
│   │   ├── Diferencial.tsx     # 6 tarjetas diferencial
│   │   ├── Cotizador.tsx       # Formulario 4 pasos
│   │   └── Contacto.tsx        # 3 canales de contacto
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Icon.tsx            # Iconos SVG (Lucide)
│       └── SectionHeader.tsx
├── lib/
│   ├── constants.ts        # Textos, palabras del marquee, datos
│   └── utils.ts
├── public/
│   ├── logos/              # Logos de Nómadas Tech (todos los PNG)
│   └── clientes/           # Logos de clientes
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎨 DESIGN SYSTEM

### Colores (definir en tailwind.config.ts y globals.css)
```css
--color-purple:       #5B3FE8;   /* Principal */
--color-purple-light: #7B5FFF;   /* Hover/accents */
--color-purple-dark:  #3A26B0;   /* Pressed */
--color-purple-dim:   rgba(91,63,232,0.15); /* Fondos suaves */
--color-bg:           #08080E;   /* Fondo hero dark */
--color-surface:      #0F0F1A;   /* Cards dark */
--color-card:         #14141F;   /* Cards secundarias */
--color-border:       rgba(91,63,232,0.22);
--color-text:         #F0EEFF;
--color-muted:        #8A88A8;
```

### Tipografía
```
Display/Títulos: Syne 700/800/900 (Google Fonts)
Cuerpo/UI:       DM Sans 400/500/600 (Google Fonts)
```

### Iconos
- Librería: **Lucide React** (`npm install lucide-react`)
- Stroke: 1.8px uniforme en toda la web
- Tamaño base: 24px, reducir a 20px en pills/badges
- **CERO emojis** en toda la web

---

## 📄 SECCIONES — CONTENIDO EXACTO

### 1. NAV (fija, blur al scroll)
```
Logo: [icono n] nómadas.tech
Links: 360° | Proceso | Portafolio | Servicios
CTA: "Cotizar proyecto →" (fondo morado)
Comportamiento: transparente → blur oscuro al hacer scroll
```

### 2. HERO — HeroBanner.tsx
```
Badge: "· Marketing Digital 360° · Colombia ·"
H1: "Todo lo que tu negocio necesita para vender online"
Sub: "No solo una web bonita. El ecosistema completo: 
     cada herramienta configurada, conectada y lista 
     para generar clientes desde el día 1."
CTA1: "Quiero mi cotización →" (botón morado)
CTA2: "Ver cómo trabajamos" (botón outline)
```

### 3. MARQUEE ANIMADO — MarqueeWords.tsx
**3 filas** de palabras moviéndose a velocidades distintas:
- Fila 1: izquierda → derecha (28s)
- Fila 2: derecha → izquierda (32s)  
- Fila 3: izquierda → derecha lento (38s)

**Palabras a incluir (con iconos Lucide):**
```typescript
const MARQUEE_WORDS = [
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
]
```

**Animación highlight:**
- Cada 1.6s: 1 palabra `super-lit` (morado brillante + glow) + 3-4 palabras `lit` (morado suave)
- Las demás: gris oscuro

### 4. FLUJO ANIMADO — FlowDiagram.tsx
**7 nodos que se iluminan en secuencia cada 1.4s:**
```
🌐 Web → 🔍 SEO → 📊 Analytics → 📱 Meta Pixel → 🤖 CRM → 🎯 Pauta → 💰 Ventas
```
Usar iconos Lucide: `Globe` → `Search` → `BarChart2` → `Box` → `Users` → `Target` → `DollarSign`

Línea de progreso entre nodos que se llena al activarse.

### 5. MARKETING 360° — Marketing360.tsx
**6 tarjetas de servicios con analogías:**

| Servicio | Ícono Lucide | Título | Analogía |
|---|---|---|---|
| UX/UI | `Layout` | Diseño que convierte | "Tu tienda física tiene layout y señalización. Tu web también debe tenerla para que el cliente compre." |
| SEO | `Search` | Para que Google sepa que existes | "Los robots de Google rastrean millones de páginas. De nada sirve un restaurante hermoso si nadie sabe que existe. El SEO pone tu negocio en el mapa." |
| Analytics + Search Console | `BarChart2` | Trabaja con datos, no suposiciones | "Sin Analytics manejas tu negocio a ciegas. Los datos te dicen exactamente qué funciona y dónde invertir cada peso." |
| Meta Pixel | `Box` | Tu vendedor invisible | "El Pixel registra quién visita tu web, qué ve y qué compra — para que cada peso de pauta vaya a quien más lo necesita." |
| CRM + Automatizaciones | `Users` | Ningún lead se vuelve a perder | "Sin CRM los leads se pierden en el WhatsApp. Con CRM cada cliente tiene su historial y seguimiento automático." |
| Listo para Pauta | `Target` | Enciende y vende desde el día 1 | "Es como un motor: lo ensamblamos pieza a pieza. Cuando está listo, enciendes la pauta y el negocio arranca a generar." |

### 6. PROCESO — Proceso.tsx
**Timeline vertical con 5 pasos:**
```
01 · Descubrimiento   → Brief, análisis competencia, buyer persona
02 · Estrategia       → Sitemap, wireframes, plan SEO, embudo
03 · Desarrollo       → UI/UX, código, e-commerce, velocidad
04 · Integración 360° → GA4, Search Console, Meta Pixel, CRM
05 · Lanzamiento      → QA, capacitación, soporte post-lanzamiento
```

### 7. PORTAFOLIO — Portafolio.tsx
**3 industrias:**
- Retail & E-commerce (icono: `ShoppingBag`)
- Servicios Profesionales (icono: `Briefcase`)
- Educación (icono: `GraduationCap`)

Grid de logos de clientes en escala de grises → color en hover.

### 8. DIFERENCIAL — Diferencial.tsx
**Título:** "La IA hace webs. Nosotros hacemos negocios."

**6 tarjetas:**
```
01 SEO desde el inicio        → No como add-on, incluido desde el diseño
02 Medición completa          → GA4 + Search Console + Meta Pixel
03 Lista para pauta día 1     → Eventos y conversiones ya configurados
04 CRM integrado              → Ningún lead se pierde, seguimiento auto
05 E-commerce que convierte   → Checkout, catálogos Meta, pagos locales
06 Atención 24/7              → Reservas, WhatsApp Business, chatbots
```

### 9. COTIZADOR — Cotizador.tsx
**4 pasos con progress bar:**
```
Paso 1: Tipo de negocio
  Opciones: Restaurante/Café · Salud/Belleza · Tienda/E-commerce
            Servicios profesionales · Educación/Cursos · Otro

Paso 2: ¿Qué necesitas?
  Opciones: Web nueva desde cero · Rediseño de mi web
            Tienda online · Paquete completo 360°

Paso 3: Presupuesto aproximado
  Opciones: Básico (hasta $1.500 USD) · Profesional ($1.500–$4.000)
            Premium ($4.000–$10.000) · Enterprise (+$10.000)

Paso 4: Datos de contacto
  Campos: Nombre · Empresa · WhatsApp · Email · Nota libre (opcional)

Confirmación: "¡Recibido! Te contactamos en menos de 24 horas."
```

**Al enviar:** POST a `/api/cotizacion` → email de notificación al equipo + respuesta automática al cliente.

### 10. CONTACTO — Contacto.tsx
**3 canales:**
```
1. WhatsApp directo    → Botón verde con ícono MessageCircle
2. Cotizador           → CTA al formulario de arriba
3. Calendly            → Widget embed para agendar llamada 30min gratis
```

WhatsApp flotante (sticky bottom-right) en TODAS las páginas.

---

## ⚙️ CONFIGURACIÓN TÉCNICA

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    remotePatterns: [],
  },
  experimental: {
    optimizeCss: true,
  },
}
module.exports = nextConfig
```

### tailwind.config.ts
Extender con:
- Colores de marca (purple, purple-light, bg-dark, surface, etc.)
- Fuentes: Syne + DM Sans
- Animaciones custom: `marquee`, `marquee-reverse`, `flow-pulse`, `fade-up`

### SEO — Metadata por página
```typescript
// app/layout.tsx
export const metadata = {
  title: 'Nómadas Tech | Marketing Digital 360° Colombia',
  description: 'Agencia de marketing digital en Colombia. Diseño web, SEO, Google Analytics, Meta Pixel, CRM y automatizaciones — todo incluido, listo para vender desde el día 1.',
  keywords: 'agencia marketing digital colombia, diseño web colombia, seo colombia, meta pixel, google analytics',
  openGraph: {
    title: 'Nómadas Tech | Marketing Digital 360° Colombia',
    description: '...',
    url: 'https://nomadas.tech',
    siteName: 'Nómadas Tech',
    locale: 'es_CO',
    type: 'website',
  },
}
```

### API Routes
```
app/api/cotizacion/route.ts   → Recibe form, envía email con Resend o Nodemailer
app/api/contacto/route.ts     → Formulario de contacto general
```

---

## 🚀 COMANDOS DE DESARROLLO

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build producción
npm run build

# Preview producción local
npm run start

# Linting
npm run lint
```

---

## 📦 DEPENDENCIAS PRINCIPALES

```json
{
  "dependencies": {
    "next": "14.2.x",
    "react": "^18",
    "react-dom": "^18",
    "lucide-react": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "framer-motion": "latest",
    "resend": "latest"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "tailwindcss": "^3",
    "autoprefixer": "^10",
    "postcss": "^8",
    "eslint": "^8",
    "eslint-config-next": "14.2.x"
  }
}
```

---

## 🔧 VARIABLES DE ENTORNO (.env.local)

```env
# Email (Resend)
RESEND_API_KEY=tu_api_key_aqui

# Email destino para notificaciones
CONTACT_EMAIL=hola@nomadas.tech

# WhatsApp Business número
WHATSAPP_NUMBER=57XXXXXXXXXX

# Calendly URL
CALENDLY_URL=https://calendly.com/nomadas-tech/30min

# URL producción
NEXT_PUBLIC_SITE_URL=https://nomadas.tech
```

---

## 🗂️ GIT WORKFLOW

```bash
# Clonar (después de crear repo en GitHub)
git clone https://github.com/TU_USUARIO/nomadas-tech.git
cd nomadas-tech

# Crear proyecto Next.js
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir no

# Instalar dependencias adicionales
npm install lucide-react framer-motion clsx tailwind-merge resend

# Primer commit
git add .
git commit -m "feat: initial Next.js setup with Tailwind"
git push origin main
```

---

## 🌐 DEPLOY EN VERCEL

1. Ir a vercel.com → "New Project"
2. Importar repositorio de GitHub `nomadas-tech`
3. Framework: Next.js (auto-detectado)
4. Agregar variables de entorno del `.env.local`
5. Deploy → URL automática `nomadas-tech.vercel.app`
6. Configurar dominio custom en Vercel Settings → Domains

**Deploy automático:** cada push a `main` → Vercel hace deploy automáticamente.

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Fase 1 — Base
- [ ] Crear repo en GitHub: `nomadas-tech`
- [ ] Inicializar Next.js 14 con TypeScript + Tailwind
- [ ] Instalar dependencias (lucide-react, framer-motion, resend)
- [ ] Configurar tailwind.config.ts con colores y fuentes de marca
- [ ] Conectar Google Fonts (Syne + DM Sans) en layout.tsx
- [ ] Crear estructura de carpetas completa

### Fase 2 — Componentes
- [ ] Nav.tsx con scroll behavior
- [ ] HeroBanner.tsx con badge + título + CTA
- [ ] MarqueeWords.tsx con 3 filas + highlight animado
- [ ] FlowDiagram.tsx con 7 nodos animados (SVG Lucide)
- [ ] Marketing360.tsx con 6 tarjetas + analogías
- [ ] Proceso.tsx con timeline vertical
- [ ] Portafolio.tsx con 3 industrias + logos
- [ ] Diferencial.tsx con 6 tarjetas
- [ ] Cotizador.tsx con 4 pasos + progress bar
- [ ] Contacto.tsx con 3 canales
- [ ] Footer.tsx
- [ ] WhatsApp flotante (sticky)

### Fase 3 — Funcionalidad
- [ ] API route `/api/cotizacion` con Resend
- [ ] Metadata SEO en todas las páginas
- [ ] Schema.org Organization markup
- [ ] Sitemap.xml automático
- [ ] robots.txt
- [ ] Imágenes en WebP con next/image

### Fase 4 — Deploy
- [ ] Push a GitHub
- [ ] Conectar Vercel
- [ ] Configurar variables de entorno en Vercel
- [ ] Configurar dominio custom
- [ ] Verificar GA4 + Search Console post-lanzamiento

---

## 📌 NOTAS IMPORTANTES PARA CLAUDE CODE

1. **Cero emojis** — usar siempre iconos Lucide React
2. **Mercado: Colombia** — no mencionar ciudades específicas
3. **Dark mode en hero** — fondo #08080E, secciones alternas claro/oscuro
4. **Animaciones con Framer Motion** — no CSS puro para las animaciones complejas
5. **Mobile first** — diseñar primero para móvil, luego desktop
6. **Accesibilidad** — aria-labels en todos los iconos, contraste AAA
7. **Performance** — lazy loading en imágenes, componentes dinámicos donde aplique
8. **El marquee** — mask-image para que las palabras se difuminen en los bordes
9. **El flujo de 7 pasos** — animar con useEffect + setInterval, limpiar en cleanup
10. **Formulario cotizador** — guardar estado en useState, no en URL params
