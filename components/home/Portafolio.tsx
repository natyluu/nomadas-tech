'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'

/*
  Desktop grid (3 cols × 2 rows):

  ┌─────────┬─────────┬─────────┐
  │         │  [2]    │  [4]    │  row 1
  │  [1]    │ square  │ square  │
  │  tall   ├─────────┴─────────┤
  │ 1c×2r   │  [3]    wide      │  row 2
  └─────────┴───────────────────┘

  Mobile: horizontal carousel, 75vw × 420px per card, snap-start, px-5 peek
*/

/* ─── Carousel card data ─────────────────────────────────────────── */
const CAROUSEL_CARDS = [
  {
    image:    '/portafolios/cliente4.jpg',
    client:   'App de Domicilios',
    industry: 'App & Tecnología',
    bgPos:    'top center',
  },
  {
    image:    '/portafolios/cliente2.jpg',
    client:   'Pastelería',
    industry: 'Gastronomía',
    bgPos:    'top center',
  },
  {
    image:    '/portafolios/cliente1.jpg',
    client:   'Keydi de la Rosa',
    industry: 'E-commerce',
    bgPos:    'top center',
  },
  {
    image:    '/portafolios/cliente3.jpg',
    client:   'Academia',
    industry: 'Educación',
    bgPos:    'center',
  },
]

/* ─── Shared badge ───────────────────────────────────────────────── */
function IndustryBadge({ label }: { label: string }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-body font-semibold"
      style={{
        display: 'inline-block',
        width: 'fit-content',
        background: 'rgba(91,63,232,0.55)',
        border: '1px solid rgba(123,95,255,0.55)',
        color: '#C4BBFF',
        letterSpacing: '0.06em',
      }}
    >
      {label}
    </span>
  )
}

/* ─── Hover overlay (shared) ─────────────────────────────────────── */
function HoverOverlay({ client, industry }: { client: string; industry: string }) {
  return (
    <>
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'rgba(0,0,0,0.5)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100 pointer-events-none px-6">
        <IndustryBadge label={industry} />
        <h3
          className="font-display font-bold text-white text-center leading-tight"
          style={{ fontSize: '2rem' }}
        >
          {client}
        </h3>
      </div>
    </>
  )
}

/* ─── Card 1: tall — 1 col × 2 rows on desktop ───────────────────── */
function TallCard({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className="relative overflow-hidden group cursor-default md:[grid-column:1] md:[grid-row:1/3]"
      style={{ borderRadius: 16, minHeight: 520 }}
    >
      <div
        className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: "url('/portafolios/cliente4.jpg')",
          backgroundPosition: 'top center',
        }}
        aria-hidden="true"
      />
      <HoverOverlay client="App de Domicilios" industry="App & Tecnología" />
    </motion.div>
  )
}

/* ─── Card 2 & 4: square ─────────────────────────────────────────── */
function SquareCard({
  client,
  industry,
  image,
  colClass,
  rowClass,
  index,
}: {
  client: string
  industry: string
  image: string
  colClass: string
  rowClass: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className={`relative overflow-hidden group cursor-default ${colClass} ${rowClass}`}
      style={{ borderRadius: 16, minHeight: 254, background: '#111118' }}
    >
      <div
        className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundPosition: 'top center',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <HoverOverlay client={client} industry={industry} />
    </motion.div>
  )
}

/* ─── Card 3: wide — 2 cols × 1 row on desktop ───────────────────── */
function WideCard({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className="relative overflow-hidden group cursor-default md:[grid-column:2/4] md:[grid-row:2]"
      style={{ borderRadius: 16, minHeight: 254 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: "url('/portafolios/cliente3.jpg')" }}
        aria-hidden="true"
      />
      <HoverOverlay client="Academia" industry="Educación" />
    </motion.div>
  )
}

/* ─── Section ────────────────────────────────────────────────────── */
export function Portafolio() {
  return (
    <section
      id="portafolio"
      aria-label="Portafolio de proyectos"
      style={{ background: '#08080E' }}
      className="py-20 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Portafolio"
          title="Proyectos que generan resultados"
          subtitle="Ecosistemas digitales construidos para negocios reales en Colombia — desde restaurantes hasta academias online."
          className="mb-14"
        />

        {/* ── MOBILE: horizontal carousel ──────────────────────────── */}
        <div className="md:hidden -mx-4">
          <div
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
            style={{ paddingInline: 20 }}
            role="list"
            aria-label="Proyectos del portafolio"
          >
            {CAROUSEL_CARDS.map((card, i) => (
              <div
                key={card.client}
                role="listitem"
                className="relative overflow-hidden group cursor-default shrink-0 snap-start"
                style={{
                  width: '75vw',
                  height: 420,
                  borderRadius: 16,
                }}
              >
                <div
                  className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${card.image}')`,
                    backgroundPosition: card.bgPos,
                  }}
                  aria-hidden="true"
                />
                {/* Permanent bottom gradient so client info is legible */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />
                {/* Always-visible label at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1.5 px-4 pb-4">
                  <IndustryBadge label={card.industry} />
                  <h3
                    className="font-display font-bold text-white leading-tight"
                    style={{ fontSize: '1.25rem' }}
                  >
                    {card.client}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: masonry grid ─────────────────────────────────── */}
        <div className="hidden md:grid md:[grid-template-columns:repeat(3,1fr)] md:[grid-template-rows:repeat(2,auto)] gap-3">
          {/* Col 1, rows 1–2: tall */}
          <TallCard index={0} />

          {/* Col 2, row 1: square */}
          <SquareCard
            client="Pastelería"
            industry="Gastronomía"
            image="/portafolios/cliente2.jpg"
            colClass="md:[grid-column:2]"
            rowClass="md:[grid-row:1]"
            index={1}
          />

          {/* Col 3, row 1: square */}
          <SquareCard
            client="Keydi de la Rosa"
            industry="E-commerce"
            image="/portafolios/cliente1.jpg"
            colClass="md:[grid-column:3]"
            rowClass="md:[grid-row:1]"
            index={3}
          />

          {/* Cols 2–3, row 2: wide */}
          <WideCard index={2} />
        </div>
      </div>
    </section>
  )
}
