'use client'

import { useEffect, useMemo, useState, memo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// ─── Word data with exact SVG paths from the original design ──────────────────
const WORDS = [
  { label: 'SEO',              path: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' },
  { label: 'E-commerce',       path: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>' },
  { label: 'Google Analytics', path: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>' },
  { label: 'Meta Pixel',       path: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>' },
  { label: 'UX / UI',          path: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>' },
  { label: 'Search Console',   path: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>' },
  { label: 'CRM',              path: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
  { label: 'Google Ads',       path: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>' },
  { label: 'Web App',          path: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>' },
  { label: 'Automatizaciones', path: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' },
  { label: 'WhatsApp API',     path: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' },
  { label: 'Diseño Web',       path: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>' },
  { label: 'Conversiones',     path: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>' },
  { label: 'Tienda Online',    path: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>' },
  { label: 'Pauta Digital',    path: '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>' },
  { label: 'ROAS',             path: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
  { label: 'Email Marketing',  path: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
  { label: 'Calendly',         path: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  { label: 'Landing Page',     path: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>' },
  { label: 'Core Web Vitals',  path: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>' },
  { label: 'Remarketing',      path: '<path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>' },
]

type Word = typeof WORDS[number]
type PillState = 'dim' | 'lit' | 'super-lit'

// ─── Pill styles — exact values from original ──────────────────────────────────
const PILL_STYLE: Record<PillState, { pill: React.CSSProperties; iconStroke: string }> = {
  'dim': {
    pill: {
      border: '1px solid rgba(255,255,255,0.07)',
      background: 'rgba(255,255,255,0.03)',
      color: '#5A5878',
      boxShadow: 'none',
    },
    iconStroke: '#5A5878',
  },
  'lit': {
    pill: {
      border: '1px solid rgba(91,63,232,0.5)',
      background: 'rgba(91,63,232,0.18)',
      color: '#B8B0FF',
      boxShadow: 'none',
    },
    iconStroke: '#7B5FFF',
  },
  'super-lit': {
    pill: {
      border: '1px solid #7B5FFF',
      background: 'rgba(91,63,232,0.3)',
      color: '#fff',
      boxShadow: '0 0 16px rgba(91,63,232,0.35)',
    },
    iconStroke: '#B8B0FF',
  },
}

// ─── Shuffle ───────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── SVG icon using exact path data ───────────────────────────────────────────
function WordIcon({ path, stroke }: { path: string; stroke: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={13}
      height={13}
      fill="none"
      stroke={stroke}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, transition: 'stroke 0.4s' }}
      dangerouslySetInnerHTML={{ __html: path }}
    />
  )
}

// ─── Word pill ─────────────────────────────────────────────────────────────────
const WordPill = memo(function WordPill({
  word,
  state,
}: {
  word: Word
  state: PillState
}) {
  const s = PILL_STYLE[state]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '7px 14px',
        borderRadius: 100,
        fontSize: '0.78rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        cursor: 'default',
        userSelect: 'none',
        transition: 'all 0.4s',
        ...s.pill,
      }}
    >
      <WordIcon path={word.path} stroke={s.iconStroke} />
      {word.label}
    </span>
  )
})

// ─── Marquee row ───────────────────────────────────────────────────────────────
function MarqueeRow({
  words,
  animation,
  rowOffset,
  superLit,
  lit,
}: {
  words: Word[]
  animation: string
  rowOffset: number
  superLit: number
  lit: Set<number>
}) {
  const doubled = [...words, ...words]
  return (
    <div style={{ display: 'flex', overflow: 'hidden' }} aria-hidden="true">
      <div style={{ display: 'flex', gap: 10, width: 'max-content', animation }}>
        {doubled.map((word, i) => {
          const idx = rowOffset + i
          const state: PillState =
            idx === superLit ? 'super-lit' : lit.has(idx) ? 'lit' : 'dim'
          return <WordPill key={`${word.label}-${i}`} word={word} state={state} />
        })}
      </div>
    </div>
  )
}

// ─── HeroBanner ───────────────────────────────────────────────────────────────
export function HeroBanner() {
  // Stable shuffled rows — generated once on mount
  const rows = useMemo<[Word[], Word[], Word[]]>(() => [
    shuffle([...WORDS]).slice(0, 11),
    shuffle([...WORDS]).slice(0, 11),
    shuffle([...WORDS]).slice(0, 11),
  ], [])

  const ROW_LEN = rows[0].length * 2 // 22 doubled pills per row
  const TOTAL   = ROW_LEN * 3        // 66 total rendered pills

  const [highlights, setHighlights] = useState<{ superLit: number; lit: Set<number> }>({
    superLit: 0,
    lit: new Set([5, 18, 40]),
  })

  useEffect(() => {
    function randomHighlight() {
      const superLit = Math.floor(Math.random() * TOTAL)
      const lit = new Set<number>()
      const litCount = 3 + Math.floor(Math.random() * 3) // 3–5
      let tries = 0
      while (lit.size < litCount && tries < 60) {
        const idx = Math.floor(Math.random() * TOTAL)
        if (idx !== superLit) lit.add(idx)
        tries++
      }
      setHighlights({ superLit, lit })
    }

    randomHighlight()
    const id = setInterval(randomHighlight, 1600)
    return () => clearInterval(id)
  }, [TOTAL])

  return (
    <section
      aria-label="Hero — Nómadas Tech"
      style={{
        minHeight: 520,
        background: '#08080E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 1rem 2rem',
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(91,63,232,1) 1px,transparent 1px),' +
            'linear-gradient(90deg,rgba(91,63,232,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 600, height: 400, borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(ellipse,rgba(91,63,232,.14) 0%,transparent 70%)',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(91,63,232,0.15)',
            border: '1px solid rgba(91,63,232,0.4)',
            padding: '0.3rem 0.9rem', borderRadius: 100,
            marginBottom: '1.4rem',
            fontSize: '0.7rem', fontWeight: 600, color: '#7B5FFF',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}
        >
          <motion.span
            aria-hidden="true"
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#7B5FFF', flexShrink: 0 }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          Marketing Digital 360°
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
          style={{
            fontFamily: 'var(--font-syne), Syne, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            lineHeight: 1.05,
            color: '#fff',
            textAlign: 'center',
            marginBottom: '0.8rem',
            letterSpacing: '-0.02em',
          }}
        >
          Todo lo que tu negocio<br />
          necesita para{' '}
          <span style={{ color: '#7B5FFF' }}>vender online</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.16 }}
          style={{
            fontSize: '0.95rem', color: '#6A6890', textAlign: 'center',
            maxWidth: 480, lineHeight: 1.7, marginBottom: '2rem',
          }}
        >
          No solo una web bonita. El{' '}
          <strong style={{ color: '#B0AECE' }}>ecosistema completo</strong>: cada
          herramienta configurada, conectada y lista para generar clientes desde el día 1.
        </motion.p>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          aria-label="Servicios de marketing digital"
          style={{
            width: '100%',
            display: 'flex', flexDirection: 'column', gap: 10,
            marginBottom: '2rem',
            maskImage: 'linear-gradient(90deg,transparent 0%,black 12%,black 88%,transparent 100%)',
            WebkitMaskImage: 'linear-gradient(90deg,transparent 0%,black 12%,black 88%,transparent 100%)',
          }}
        >
          <MarqueeRow
            words={rows[0]}
            animation="marquee 28s linear infinite"
            rowOffset={0}
            superLit={highlights.superLit}
            lit={highlights.lit}
          />
          <MarqueeRow
            words={rows[1]}
            animation="marquee-reverse 32s linear infinite"
            rowOffset={ROW_LEN}
            superLit={highlights.superLit}
            lit={highlights.lit}
          />
          <MarqueeRow
            words={rows[2]}
            animation="marquee 38s linear infinite"
            rowOffset={ROW_LEN * 2}
            superLit={highlights.superLit}
            lit={highlights.lit}
          />
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.32 }}
          style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            href="/#cotizador"
            style={{
              background: '#5B3FE8', color: '#fff',
              padding: '0.75rem 1.8rem', borderRadius: 9,
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              fontWeight: 700, fontSize: '0.9rem',
              textDecoration: 'none', display: 'inline-block',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#7B5FFF')}
            onMouseLeave={e => (e.currentTarget.style.background = '#5B3FE8')}
          >
            Quiero mi cotización →
          </Link>
          <Link
            href="/#proceso"
            style={{
              background: 'transparent', color: '#8A88A8',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '0.75rem 1.8rem', borderRadius: 9,
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              fontWeight: 600, fontSize: '0.9rem',
              textDecoration: 'none', display: 'inline-block',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#8A88A8'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            }}
          >
            Ver cómo trabajamos
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
