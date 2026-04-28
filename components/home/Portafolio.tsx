'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'

/*
  Grid layout (3 cols):

  ┌─────────┬─────────┬─────────┐
  │         │  [2]    │         │  row 1
  │  [1]    │ square  │         │
  │  tall   ├─────────┤         │
  │ 1c×2r   │  [3]    │  (gap)  │  row 2
  │         │  wide ──┤         │
  └─────────┴─────────┴─────────┘

  Actual placement:
  [1] col 1 / row 1–2   (tall: 1 col, 2 rows)
  [2] col 2 / row 1     (square: 1 col, 1 row)
  [3] col 2–3 / row 2   (wide: 2 cols, 1 row)
  [4] col 3 / row 1     (square: 1 col, 1 row)
*/

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
      {/* Dark overlay */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'rgba(0,0,0,0.5)' }}
        aria-hidden="true"
      />
      {/* Centered text */}
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

/* ─── Card 1: tall — screenshot móvil, 1 col × 2 rows ───────────── */
function TallCard({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className="relative overflow-hidden group cursor-default"
      style={{
        gridColumn: '1',
        gridRow: '1 / 3',
        borderRadius: 16,
        minHeight: 520,
      }}
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

/* ─── Card 2 & 4: square — fondo oscuro, imagen en hover ─────────── */
function SquareCard({
  client,
  industry,
  image,
  gridColumn,
  gridRow,
  index,
}: {
  client: string
  industry: string
  image: string
  gridColumn: string
  gridRow: string
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
      className="relative overflow-hidden group cursor-default"
      style={{
        gridColumn,
        gridRow,
        borderRadius: 16,
        minHeight: 254,
        background: '#111118',
      }}
    >
      {/* Image always visible */}
      <div
        className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundPosition: 'top center',
        }}
        aria-hidden="true"
      />
      {/* Bottom gradient — hidden on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      {/* Hover overlay + centered text */}
      <HoverOverlay client={client} industry={industry} />
    </motion.div>
  )
}

/* ─── Card 3: wide — screenshot desktop, 2 cols × 1 row ─────────── */
function WideCard({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className="relative overflow-hidden group cursor-default"
      style={{
        gridColumn: '2 / 4',
        gridRow: '2',
        borderRadius: 16,
        minHeight: 254,
      }}
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

        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, auto)',
            gap: 12,
          }}
        >
          {/* Col 1, rows 1–2: tall */}
          <TallCard index={0} />

          {/* Col 2, row 1: square */}
          <SquareCard
            client="Pastelería"
            industry="Gastronomía"
            image="/portafolios/cliente2.jpg"
            gridColumn="2"
            gridRow="1"
            index={1}
          />

          {/* Col 3, row 1: square */}
          <SquareCard
            client="Keydi de la Rosa"
            industry="E-commerce"
            image="/portafolios/cliente1.jpg"
            gridColumn="3"
            gridRow="1"
            index={3}
          />

          {/* Cols 2–3, row 2: wide */}
          <WideCard index={2} />
        </div>
      </div>
    </section>
  )
}
