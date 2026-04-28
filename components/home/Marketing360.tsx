'use client'

import { useState, useRef } from 'react'
import type { ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout, Search, BarChart2, Box, Users, Target, Check, type LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'ux-ui',
    icon: Layout,
    service: 'UX / UI',
    title: 'Diseño que convierte',
    shortDesc: 'Estructura visual pensada para guiar al visitante hasta la compra.',
    analogy: 'Tu tienda física tiene layout y señalización. Tu web también debe tenerla para que el cliente compre.',
    bullets: [
      'Jerarquía visual que conduce al usuario al CTA',
      'Mobile-first con velocidad optimizada',
      'Wireframes validados antes de programar',
    ],
  },
  {
    id: 'seo',
    icon: Search,
    service: 'SEO',
    title: 'Para que Google sepa que existes',
    shortDesc: 'Aparece en Google cuando tus clientes te están buscando.',
    analogy: 'De nada sirve un restaurante hermoso si nadie sabe que existe. El SEO pone tu negocio en el mapa.',
    bullets: [
      'Investigación de palabras clave con intención de compra',
      'SEO técnico, on-page y de contenido integrado',
      'Posicionamiento local para el mercado colombiano',
    ],
  },
  {
    id: 'analytics',
    icon: BarChart2,
    service: 'Analytics + Search Console',
    title: 'Trabaja con datos, no suposiciones',
    shortDesc: 'Mide cada clic, sesión y conversión para tomar mejores decisiones.',
    analogy: 'Sin Analytics manejas tu negocio a ciegas. Los datos te dicen exactamente qué funciona y dónde invertir cada peso.',
    bullets: [
      'GA4 configurado con eventos y conversiones reales',
      'Search Console conectado y monitoreado',
      'Reportes mensuales accionables, no solo números',
    ],
  },
  {
    id: 'meta-pixel',
    icon: Box,
    service: 'Meta Pixel',
    title: 'Tu vendedor invisible',
    shortDesc: 'Registra visitas, comportamiento y compras para optimizar pauta.',
    analogy: 'El Pixel registra quién visita tu web, qué ve y qué compra — para que cada peso de pauta vaya a quien más lo necesita.',
    bullets: [
      'Pixel instalado y verificado con eventos estándar',
      'Audiencias personalizadas y lookalikes configuradas',
      'Catálogo de productos conectado para remarketing dinámico',
    ],
  },
  {
    id: 'crm',
    icon: Users,
    service: 'CRM + Automatizaciones',
    title: 'Ningún lead se vuelve a perder',
    shortDesc: 'Cada cliente con historial, seguimiento automático y flujos activos.',
    analogy: 'Sin CRM los leads se pierden en el WhatsApp. Con CRM cada cliente tiene su historial y seguimiento automático.',
    bullets: [
      'CRM integrado con formularios y WhatsApp Business',
      'Flujos de automatización para nurturing de leads',
      'Notificaciones y recordatorios automáticos al equipo',
    ],
  },
  {
    id: 'pauta',
    icon: Target,
    service: 'Listo para Pauta',
    title: 'Enciende y vende desde el día 1',
    shortDesc: 'Todo configurado para que al activar la pauta el negocio genere.',
    analogy: 'Es como un motor: lo ensamblamos pieza a pieza. Cuando está listo, enciendes la pauta y el negocio arranca a generar.',
    bullets: [
      'Eventos de conversión verificados en Meta y Google',
      'Landing pages con estructura de alta conversión',
      'Estrategia de pauta lista para ejecutar desde el lanzamiento',
    ],
  },
] as const

type ServiceId = typeof SERVICES[number]['id']

// ─── Shared colors ────────────────────────────────────────────────────────────
const C = {
  bg0:     '#08080E',
  bg1:     '#0F0F1A',
  bg2:     '#14141F',
  bg3:     '#1E1E30',
  bg4:     '#2A2A40',
  bg5:     '#3A3A5A',
  purple:  '#5B3FE8',
  purpleL: '#7B5FFF',
  purpleD: 'rgba(91,63,232,0.3)',
  purpleDm:'rgba(91,63,232,0.18)',
  purpleDd:'rgba(91,63,232,0.1)',
  text:    '#F0EEFF',
  muted:   '#8A88A8',
  accent:  '#28CA41',
}

// ─── SVG Illustrations (420 × 240) ────────────────────────────────────────────

function IlloUXUI(): ReactElement {
  return (
    <svg viewBox="0 0 420 240" aria-hidden="true" className="w-full h-full">
      {/* outer card */}
      <rect x="10" y="8" width="400" height="224" rx="12" fill={C.bg2} />

      {/* browser chrome */}
      <rect x="20" y="16" width="380" height="200" rx="10" fill={C.bg1} />
      <rect x="20" y="16" width="380" height="32" rx="10" fill={C.bg3} />
      {/* traffic lights */}
      <circle cx="40" cy="32" r="5" fill="#FF5F57" />
      <circle cx="56" cy="32" r="5" fill="#FFBD2E" />
      <circle cx="72" cy="32" r="5" fill="#28CA41" />
      {/* URL bar */}
      <rect x="96" y="23" width="220" height="18" rx="9" fill={C.bg4} />
      <rect x="104" y="29" width="140" height="6" rx="3" fill={C.bg5} />

      {/* nav bar */}
      <rect x="28" y="56" width="364" height="18" rx="4" fill={C.bg3} />
      <rect x="36" y="62" width="30" height="6" rx="3" fill={C.purpleL} opacity={0.8} />
      {[0,1,2,3].map(i => (
        <rect key={i} x={80 + i * 64} y="62" width="44" height="6" rx="3" fill={C.bg5} />
      ))}
      <rect x="344" y="58" width="40" height="14" rx="7" fill={C.purple} />

      {/* hero left: headline */}
      <rect x="28" y="84" width="180" height="12" rx="4" fill={C.text} opacity={0.9} />
      <rect x="28" y="102" width="140" height="8" rx="4" fill={C.text} opacity={0.55} />
      <rect x="28" y="115" width="120" height="8" rx="4" fill={C.text} opacity={0.4} />

      {/* CTA button — pulsing */}
      <motion.rect
        x="28" y="132" width="108" height="30" rx="8" fill={C.purple}
        animate={{ opacity: [1, 0.72, 1], scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '82px 147px' }}
      />
      <rect x="38" y="145" width="88" height="4" rx="2" fill="white" opacity={0.9} />

      {/* secondary button */}
      <rect x="146" y="132" width="90" height="30" rx="8" fill="transparent"
        stroke={C.bg5} strokeWidth="1" />
      <rect x="154" y="145" width="74" height="4" rx="2" fill={C.bg5} />

      {/* hero right: image mockup */}
      <rect x="230" y="76" width="154" height="104" rx="10" fill={C.bg3} />
      <rect x="240" y="86" width="134" height="70" rx="6" fill={C.bg4} />
      <circle cx="307" cy="121" r="26" fill={C.bg5} />
      <rect x="283" y="166" width="48" height="8" rx="4" fill={C.bg5} opacity={0.5} />

      {/* feature cards */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={28 + i * 92} y="192" width="82" height="22" rx="5" fill={C.bg3} />
          <rect x={36 + i * 92} y="198" width="20" height="10" rx="3" fill={C.purpleDm} />
          <rect x={60 + i * 92} y="200" width="42" height="4" rx="2" fill={C.bg5} />
          <rect x={60 + i * 92} y="207" width="28" height="3" rx="2" fill={C.bg4} />
        </g>
      ))}

      {/* animated cursor */}
      <motion.g
        animate={{ x: [0, 14, 34], y: [10, 0, -6] }}
        transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
      >
        <polygon points="28,158 28,174 32,170 35,177 38,176 35,169 40,169"
          fill="white" opacity={0.85} />
      </motion.g>
    </svg>
  )
}

function IlloSEO(): ReactElement {
  const results = [
    { active: true,  width: 190 },
    { active: false, width: 148 },
    { active: false, width: 162 },
    { active: false, width: 120 },
  ]
  const trendPts = '300,200 316,182 332,186 348,164 364,158 380,138 396,118'
  return (
    <svg viewBox="0 0 420 240" aria-hidden="true" className="w-full h-full">
      <rect x="8" y="8" width="404" height="224" rx="12" fill={C.bg2} />

      {/* search bar */}
      <rect x="18" y="16" width="280" height="34" rx="17" fill={C.bg3}
        stroke={C.bg5} strokeWidth="1" />
      <circle cx="42" cy="33" r="8" fill="none" stroke={C.purple} strokeWidth="2" />
      <line x1="48" y1="39" x2="54" y2="45" stroke={C.purple} strokeWidth="2"
        strokeLinecap="round" />
      <rect x="62" y="26" width="176" height="14" rx="7" fill={C.bg4} />
      <rect x="64" y="30" width="100" height="6" rx="3" fill={C.bg5} />
      {/* search button */}
      <rect x="306" y="16" width="104" height="34" rx="17" fill={C.purple} />
      <rect x="320" y="26" width="76" height="14" rx="7" fill="white" opacity={0.25} />

      {/* results */}
      {results.map((r, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.13, duration: 0.4, ease: 'easeOut' }}
        >
          <rect x="18" y={60 + i * 42} width="270" height="36" rx="8"
            fill={r.active ? C.purpleDm : C.bg1}
            stroke={r.active ? C.purpleL : C.bg3}
            strokeWidth="1" />
          {/* rank badge */}
          <rect x="26" y={67 + i * 42} width="20" height="20" rx="5"
            fill={r.active ? C.purple : C.bg3} />
          <text x="36" y={81 + i * 42} textAnchor="middle"
            fill={r.active ? 'white' : C.muted} fontSize="9" fontWeight="700">
            {i + 1}
          </text>
          {/* url line */}
          <rect x="54" y={68 + i * 42} width={r.active ? 90 : 70} height="5" rx="2.5"
            fill={r.active ? C.purpleL : C.bg5} opacity={r.active ? 0.9 : 0.5} />
          {/* title line */}
          <rect x="54" y={77 + i * 42} width={r.width} height="7" rx="3"
            fill={r.active ? C.text : C.bg4} opacity={r.active ? 0.9 : 0.6} />
          {/* snippet */}
          {r.active && (
            <rect x="54" y={88 + i * 42} width="150" height="4" rx="2"
              fill={C.text} opacity={0.3} />
          )}
        </motion.g>
      ))}

      {/* trend panel */}
      <rect x="296" y="60" width="116" height="150" rx="10" fill={C.bg1} />
      <rect x="306" y="68" width="60" height="8" rx="4" fill={C.bg4} />
      <rect x="306" y="80" width="40" height="18" rx="4" fill={C.purpleDd} />
      <text x="314" y="94" fill={C.purpleL} fontSize="11" fontWeight="700">#1</text>

      {/* mini trend chart */}
      <rect x="304" y="104" width="100" height="60" rx="6" fill={C.bg3} />
      {[0,1,2,3].map(i => (
        <line key={i} x1="308" y1={158 - i * 14} x2="400" y2={158 - i * 14}
          stroke={C.bg4} strokeWidth="1" />
      ))}
      <motion.polyline
        points={trendPts} fill="none" stroke={C.purpleL} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
      />
      <motion.circle cx="396" cy="118" r="4" fill={C.purpleL}
        animate={{ r: [4, 6, 4] }} transition={{ duration: 1.8, repeat: Infinity }} />

      {/* bottom stat pills */}
      {[['DA', '78'], ['Velocidad', '96'], ['Backlinks', '243']].map(([k, v], i) => (
        <g key={k}>
          <rect x={18 + i * 96} y="218" width="86" height="18" rx="5" fill={C.bg1} />
          <rect x={26 + i * 96} y="224" width="28" height="5" rx="2" fill={C.bg5} />
          <rect x={60 + i * 96} y="223" width="30" height="7" rx="3"
            fill={C.purple} opacity={0.8} />
          <rect x={64 + i * 96} y="225" width="22" height="3" rx="1"
            fill="white" opacity={0.55} />
        </g>
      ))}

      {/* bouncing up arrow */}
      <motion.text x="386" y="80" textAnchor="middle"
        fill={C.purple} fontSize="20" fontWeight="700"
        animate={{ y: [80, 74, 80] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
        ↑
      </motion.text>
    </svg>
  )
}

function IlloAnalytics(): ReactElement {
  const bars = [38, 52, 44, 68, 58, 80, 94]
  const maxH  = 72
  const kpis  = [
    { label: 'Usuarios',   value: '8.2K',  color: C.purpleL },
    { label: 'Sesiones',   value: '12.4K', color: C.purple  },
    { label: 'Conv. Rate', value: '3.8%',  color: C.accent  },
    { label: 'Revenue',    value: '$9.6K', color: '#FF9F43' },
  ]
  return (
    <svg viewBox="0 0 420 240" aria-hidden="true" className="w-full h-full">
      <rect x="8" y="8" width="404" height="224" rx="12" fill={C.bg2} />

      {/* header */}
      <rect x="18" y="16" width="120" height="10" rx="4" fill={C.bg4} />
      <rect x="312" y="14" width="88" height="16" rx="8" fill={C.bg3} />
      <rect x="318" y="18" width="60" height="8" rx="4" fill={C.bg5} />

      {/* KPI cards */}
      {kpis.map((k, i) => (
        <g key={k.label}>
          <rect x={18 + i * 97} y="34" width="88" height="38" rx="7" fill={C.bg3} />
          <rect x={26 + i * 97} y="40" width="44" height="6" rx="3" fill={C.bg5} />
          <motion.text
            x={26 + i * 97} y="62" fill={k.color} fontSize="14" fontWeight="800"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: i * 0.15 + 0.2 }}
          >
            {k.value}
          </motion.text>
        </g>
      ))}

      {/* main bar chart */}
      <rect x="18" y="82" width="240" height="116" rx="8" fill={C.bg1} />
      <rect x="28" y="90" width="80" height="7" rx="3" fill={C.bg4} />

      {/* grid lines */}
      {[0,1,2,3].map(i => (
        <line key={i} x1="28" y1={180 - i * 22} x2="250" y2={180 - i * 22}
          stroke={C.bg3} strokeWidth="1" />
      ))}

      {/* bars */}
      {bars.map((h, i) => {
        const barH = (h / 100) * maxH
        return (
          <motion.rect
            key={i}
            x={30 + i * 32} y={180 - barH} width="22" height={barH} rx="4"
            fill={i === 6 ? C.purple : `rgba(91,63,232,0.42)`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ transformOrigin: `${30 + i * 32 + 11}px 180px` }}
            transition={{ delay: i * 0.08 + 0.3, duration: 0.5, ease: 'easeOut' }}
          />
        )
      })}

      {/* day labels */}
      {['L','M','M','J','V','S','D'].map((d, i) => (
        <text key={i} x={41 + i * 32} y="196" textAnchor="middle"
          fill={C.muted} fontSize="8">{d}</text>
      ))}

      {/* line + area chart (right) */}
      <rect x="268" y="82" width="144" height="116" rx="8" fill={C.bg1} />
      <rect x="278" y="90" width="64" height="7" rx="3" fill={C.bg4} />
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.purple} stopOpacity="0.35" />
          <stop offset="100%" stopColor={C.purple} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M276,184 L292,170 L308,173 L324,155 L340,148 L356,132 L372,118 L388,104 L404,104 L404,184 Z"
        fill="url(#areaGrad)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      />
      <motion.polyline
        points="276,184 292,170 308,173 324,155 340,148 356,132 372,118 388,104"
        fill="none" stroke={C.purpleL} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
      />
      <motion.circle cx="388" cy="104" r="5" fill={C.purpleL}
        animate={{ r: [5, 7, 5] }} transition={{ duration: 1.6, repeat: Infinity }} />

      {/* bottom: top pages table */}
      {['/inicio — 42%', '/servicios — 28%', '/contacto — 18%'].map((row, i) => (
        <g key={row}>
          <rect x="18" y={202 + i * 0} width="0" height="0" />
        </g>
      ))}
      <rect x="18" y="202" width="394" height="28" rx="6" fill={C.bg1} />
      {['/inicio', '/servicios', '/contacto'].map((p, i) => (
        <g key={p}>
          <rect x={22 + i * 132} y="208" width="90" height="5" rx="2" fill={C.bg4} />
          <rect x={22 + i * 132} y="215" width={[58, 42, 28][i]} height="4" rx="2"
            fill={C.purple} opacity={0.6} />
        </g>
      ))}
    </svg>
  )
}

function IlloMetaPixel(): ReactElement {
  const nodes = [
    { label: 'Usuario', x: 56  },
    { label: 'Website', x: 152 },
    { label: 'Pixel',   x: 248 },
    { label: 'Ads Mgr', x: 344 },
  ]
  const events = ['PageView', 'ViewContent', 'AddToCart', 'Purchase']
  return (
    <svg viewBox="0 0 420 240" aria-hidden="true" className="w-full h-full">
      <rect x="8" y="8" width="404" height="224" rx="12" fill={C.bg2} />

      {/* title */}
      <rect x="18" y="16" width="130" height="10" rx="4" fill={C.bg4} />

      {/* flow nodes */}
      {nodes.map((n, i) => (
        <g key={n.label}>
          <motion.rect
            x={n.x - 34} y="42" width="68" height="68" rx="12"
            fill={C.purpleDd} stroke={C.purple} strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: `${n.x}px 76px` }}
            transition={{ delay: i * 0.18, duration: 0.4, ease: 'easeOut' }}
          />
          {/* icon placeholder */}
          <motion.circle cx={n.x} cy="76" r="16"
            fill={C.purpleDm}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: i * 0.18 + 0.15 }}
          />
          <motion.rect
            x={n.x - 20} y="118" width="40" height="8" rx="4" fill={C.bg4}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: i * 0.18 + 0.2 }}
          />
          {/* pulse ring on Pixel node */}
          {i === 2 && (
            <motion.rect
              x={n.x - 34} y="42" width="68" height="68" rx="12"
              fill="none" stroke={C.purpleL} strokeWidth="2"
              animate={{ opacity: [0.8, 0, 0.8], scale: [1, 1.12, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: `${n.x}px 76px` }}
            />
          )}
        </g>
      ))}

      {/* connectors */}
      {nodes.slice(0, 3).map((n, i) => (
        <motion.line key={i}
          x1={n.x + 34} y1="76" x2={nodes[i + 1].x - 34} y2="76"
          stroke={C.purple} strokeWidth="2" strokeDasharray="5 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: i * 0.2 + 0.5, duration: 0.4 }}
        />
      ))}

      {/* travelling data dot */}
      <motion.circle r="7" fill={C.purpleL} opacity={0.9}
        animate={{ cx: [56, 152, 248, 344], cy: [76, 76, 76, 76] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut',
          times: [0, 0.33, 0.66, 1], repeatDelay: 0.3 }}
      />

      {/* event log panel */}
      <rect x="18" y="136" width="190" height="90" rx="8" fill={C.bg1} />
      <rect x="26" y="144" width="80" height="7" rx="3" fill={C.bg4} />
      {events.map((ev, i) => (
        <motion.g key={ev}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.14 + 0.6 }}>
          <circle cx="30" cy={160 + i * 18} r="4" fill={C.purple} opacity={0.8} />
          <rect x="40" y={156 + i * 18} width="80" height="6" rx="3" fill={C.bg4} />
          <rect x="130" y={157 + i * 18} width="50" height="5" rx="2"
            fill={C.purpleL} opacity={0.5} />
        </motion.g>
      ))}

      {/* audience panel */}
      <rect x="218" y="136" width="194" height="90" rx="8" fill={C.bg1} />
      <rect x="226" y="144" width="80" height="7" rx="3" fill={C.bg4} />
      {[['Custom Audience', 78], ['Lookalike 1%', 52], ['Remarketing', 91]].map(([label, pct], i) => (
        <g key={String(label)}>
          <rect x="226" y={158 + i * 22} width="120" height="6" rx="3" fill={C.bg3} />
          <motion.rect x="226" y={158 + i * 22}
            width={0} height="6" rx="3" fill={C.purple} opacity={0.75}
            animate={{ width: (pct as number) * 1.2 }}
            transition={{ delay: i * 0.15 + 0.7, duration: 0.7, ease: 'easeOut' }}
          />
          <rect x="352" y={157 + i * 22} width="50" height="8" rx="3" fill={C.bg3} />
          <rect x="356" y={159 + i * 22} width="36" height="4" rx="2" fill={C.bg5} />
        </g>
      ))}
    </svg>
  )
}

function IlloCRM(): ReactElement {
  const stages  = ['Nuevo', 'Contactado', 'Propuesta', 'Cerrado']
  const counts  = [3, 2, 2, 1]
  const active  = 3
  return (
    <svg viewBox="0 0 420 240" aria-hidden="true" className="w-full h-full">
      <rect x="8" y="8" width="404" height="224" rx="12" fill={C.bg2} />

      {/* header */}
      <rect x="18" y="16" width="110" height="10" rx="4" fill={C.bg4} />
      <rect x="300" y="14" width="100" height="18" rx="9" fill={C.purpleDm}
        stroke={C.purple} strokeWidth="1" />
      <rect x="310" y="19" width="70" height="8" rx="4" fill={C.purpleL} opacity={0.6} />

      {/* kanban columns */}
      {stages.map((stage, col) => {
        const x = 18 + col * 98
        const isActive = col === active
        return (
          <g key={stage}>
            {/* column bg */}
            <rect x={x} y="34" width="88" height="164" rx="8" fill={C.bg1} opacity={0.6} />
            {/* column header */}
            <rect x={x + 4} y="38" width="80" height="20" rx="5"
              fill={isActive ? C.purpleDm : C.bg3}
              stroke={isActive ? C.purple : 'none'} strokeWidth="1" />
            <rect x={x + 10} y="44" width="44" height="6" rx="3"
              fill={isActive ? C.purpleL : C.bg5} opacity={isActive ? 0.9 : 0.7} />
            <rect x={x + 58} y="43" width="18" height="8" rx="4"
              fill={isActive ? C.purple : C.bg4} />

            {/* lead cards */}
            {Array.from({ length: counts[col] }).map((_, row) => (
              <motion.g key={row}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: col * 0.1 + row * 0.13 + 0.25 }}>
                <rect x={x + 4} y={64 + row * 52} width="80" height="44" rx="7"
                  fill={isActive ? C.purpleDm : C.bg3}
                  stroke={isActive ? C.purple : C.bg4} strokeWidth="1" />
                <circle cx={x + 16} cy={82 + row * 52} r="8"
                  fill={isActive ? C.purpleDd : C.bg4} />
                <rect cx={x + 16} cy={82 + row * 52}
                  x={x + 28} y={76 + row * 52} width="46" height="6" rx="3"
                  fill={isActive ? C.text : C.bg5} opacity={0.8} />
                <rect x={x + 28} y={86 + row * 52} width="34" height="4" rx="2"
                  fill={isActive ? C.purpleL : C.bg4} opacity={0.6} />
                <rect x={x + 8} y={98 + row * 52} width="68" height="4" rx="2"
                  fill={isActive ? C.purple : C.bg4} opacity={0.4} />
              </motion.g>
            ))}
          </g>
        )
      })}

      {/* animated moving lead card */}
      <motion.g
        animate={{ x: [0, 98, 196, 294] }}
        transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 0.8,
          ease: 'easeInOut', times: [0, 0.33, 0.66, 1] }}>
        <rect x="18" y="200" width="80" height="26" rx="7"
          fill={C.purpleD} stroke={C.purpleL} strokeWidth="1.5" />
        <rect x="28" y="207" width="60" height="5" rx="2" fill={C.text} opacity={0.75} />
        <rect x="28" y="215" width="42" height="3" rx="2" fill={C.purpleL} opacity={0.55} />
      </motion.g>

      {/* automation badge */}
      <motion.rect x="160" y="198" width="88" height="28" rx="14"
        fill={C.purpleDm} stroke={C.purple} strokeWidth="1"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}>
      </motion.rect>
      <rect x="172" y="208" width="64" height="8" rx="4" fill={C.purpleL} opacity={0.6} />
    </svg>
  )
}

function IlloPauta(): ReactElement {
  const checks = ['GA4 Events', 'Meta Pixel', 'CRM Sync', 'Landing', 'Budget']
  return (
    <svg viewBox="0 0 420 240" aria-hidden="true" className="w-full h-full">
      <rect x="8" y="8" width="404" height="224" rx="12" fill={C.bg2} />

      {/* gauge area */}
      {/* track */}
      <path d="M 80 168 A 90 90 0 0 1 250 168" fill="none"
        stroke={C.bg3} strokeWidth="18" strokeLinecap="round" />
      {/* fill — animated */}
      <motion.path d="M 80 168 A 90 90 0 0 1 250 168" fill="none"
        stroke={C.purple} strokeWidth="18" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut', delay: 0.4 }}
      />
      {/* needle */}
      <motion.line x1="165" y1="168" x2="165" y2="88"
        stroke={C.purpleL} strokeWidth="4" strokeLinecap="round"
        initial={{ rotate: -90 }} animate={{ rotate: 0 }}
        style={{ transformOrigin: '165px 168px' }}
        transition={{ duration: 1.8, ease: 'easeOut', delay: 0.4 }}
      />
      <circle cx="165" cy="168" r="8" fill={C.purple} />
      <circle cx="165" cy="168" r="4" fill={C.purpleL} />

      {/* gauge labels */}
      <text x="70" y="186" fill={C.muted} fontSize="10" textAnchor="middle">0%</text>
      <text x="165" y="78" fill={C.purpleL} fontSize="10" textAnchor="middle"
        fontWeight="700">100%</text>
      <text x="258" y="186" fill={C.muted} fontSize="10" textAnchor="middle">MAX</text>

      {/* LISTO label */}
      <motion.text x="165" y="152" textAnchor="middle"
        fill={C.purple} fontSize="13" fontWeight="800" letterSpacing="0.1em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}>
        LISTO
      </motion.text>

      {/* checklist panel */}
      <rect x="270" y="16" width="140" height="186" rx="10" fill={C.bg1} />
      <rect x="280" y="24" width="80" height="8" rx="4" fill={C.bg4} />
      {checks.map((label, i) => (
        <motion.g key={label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.18 + 0.5, duration: 0.3 }}>
          <rect x="280" y={38 + i * 32} width="120" height="24" rx="6" fill={C.bg3} />
          <motion.rect x="284" y={42 + i * 32} width="16" height="16" rx="4"
            fill={C.purple}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{ transformOrigin: `292px ${50 + i * 32}px` }}
            transition={{ delay: i * 0.18 + 0.7, type: 'spring', stiffness: 280, damping: 22 }}
          />
          {/* check mark */}
          <motion.polyline
            points={`287,${49 + i * 32} 290,${53 + i * 32} 297,${46 + i * 32}`}
            fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.18 + 0.9, duration: 0.2 }}
          />
          <rect x="306" y={44 + i * 32} width="80" height="6" rx="3" fill={C.bg5} />
          <rect x="306" y={53 + i * 32} width="56" height="4" rx="2" fill={C.bg4} />
        </motion.g>
      ))}

      {/* ROAS counter card */}
      <rect x="18" y="16" width="240" height="72" rx="10" fill={C.bg1} />
      <rect x="28" y="24" width="70" height="8" rx="4" fill={C.bg4} />
      <motion.text x="28" y="70" fill={C.purpleL} fontSize="32" fontWeight="900"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2 }}>
        4.8x
      </motion.text>
      <text x="116" y="70" fill={C.muted} fontSize="13">ROAS</text>

      {/* mini metric row */}
      {[['CTR', '4.2%'], ['CPC', '$0.38'], ['Conv', '348']].map(([k, v], i) => (
        <g key={String(k)}>
          <rect x={28 + i * 72} y="100" width="64" height="36" rx="7" fill={C.bg1} />
          <rect x={34 + i * 72} y="107" width="36" height="5" rx="2" fill={C.bg5} />
          <motion.text x={34 + i * 72} y="128"
            fill={i === 0 ? C.purpleL : i === 1 ? C.accent : '#FF9F43'}
            fontSize="12" fontWeight="700"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 + 1.8 }}>
            {v}
          </motion.text>
        </g>
      ))}
    </svg>
  )
}

const ILLUSTRATIONS: Record<ServiceId, () => ReactElement> = {
  'ux-ui':      IlloUXUI,
  'seo':        IlloSEO,
  'analytics':  IlloAnalytics,
  'meta-pixel': IlloMetaPixel,
  'crm':        IlloCRM,
  'pauta':      IlloPauta,
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Marketing360() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active       = SERVICES[activeIdx]
  const Illustration = ILLUSTRATIONS[active.id]
  const panelRef     = useRef<HTMLDivElement>(null)

  function handleSelect(i: number) {
    setActiveIdx(i)
    if (window.innerWidth < 768 && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="servicios"
      aria-label="Servicios de Marketing Digital 360°"
      className="py-20 px-4"
      style={{ background: C.bg0 }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Marketing 360°"
          title="Todo incluido, todo conectado"
          subtitle="No vendemos servicios sueltos. Construimos el ecosistema completo para que tu negocio venda online."
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4 lg:gap-6">

          {/* ── Left: service list ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-2" role="list" aria-label="Lista de servicios">
            {SERVICES.map((s, i) => {
              const Icon = s.icon as LucideIcon
              const isActive = i === activeIdx
              return (
                <button
                  key={s.id}
                  role="listitem"
                  onClick={() => handleSelect(i)}
                  aria-pressed={isActive}
                  aria-label={`Ver servicio: ${s.title}`}
                  className={cn(
                    'flex items-start gap-4 text-left px-4 py-3.5 rounded-2xl transition-all duration-200 cursor-pointer w-full',
                  )}
                  style={{
                    background: isActive
                      ? 'rgba(91,63,232,0.2)'
                      : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isActive ? '#5B3FE8' : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  {/* icon box */}
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-colors duration-200"
                    style={{
                      background: isActive
                        ? 'rgba(91,63,232,0.3)'
                        : 'rgba(91,63,232,0.12)',
                    }}
                  >
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true"
                      style={{ color: isActive ? '#B8B0FF' : '#7B5FFF' }} />
                  </div>

                  {/* text */}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-body text-[10px] font-semibold uppercase tracking-widest"
                      style={{ color: isActive ? 'rgba(184,176,255,0.7)' : 'rgba(123,95,255,0.65)' }}>
                      {s.service}
                    </span>
                    <span className="font-display font-bold text-sm leading-tight"
                      style={{ color: '#F0EEFF' }}>
                      {s.title}
                    </span>
                    <span className="font-body text-xs leading-snug mt-0.5"
                      style={{ color: isActive ? 'rgba(240,238,255,0.55)' : 'rgba(138,136,168,0.75)' }}>
                      {s.shortDesc}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* ── Right: detail panel ────────────────────────────────────────── */}
          <div
            ref={panelRef}
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: C.bg2,
              border: '1px solid rgba(91,63,232,0.2)',
              borderRadius: 16,
              minHeight: 520,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="flex flex-col flex-1"
              >
                {/* illustration */}
                <div
                  className="flex items-center justify-center px-6 pt-6 pb-3"
                  style={{ minHeight: 240 }}
                  aria-hidden="true"
                >
                  <Illustration />
                </div>

                {/* divider */}
                <div className="mx-6" style={{ borderTop: '1px solid rgba(91,63,232,0.15)' }} />

                {/* content */}
                <div className="flex flex-col gap-5 px-6 py-6 flex-1">
                  {/* service badge */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg"
                      style={{ background: 'rgba(91,63,232,0.18)' }}>
                      <active.icon size={15} strokeWidth={1.8}
                        style={{ color: '#7B5FFF' }} aria-hidden="true" />
                    </div>
                    <span className="font-body text-[10px] font-semibold uppercase tracking-widest"
                      style={{ color: '#7B5FFF' }}>
                      {active.service}
                    </span>
                  </div>

                  {/* analogy quote */}
                  <blockquote
                    className="pl-4"
                    style={{ borderLeft: '2px solid rgba(91,63,232,0.55)' }}
                    aria-label="Analogía"
                  >
                    <p className="font-body text-sm italic leading-relaxed"
                      style={{ color: 'rgba(240,238,255,0.6)' }}>
                      &ldquo;{active.analogy}&rdquo;
                    </p>
                  </blockquote>

                  {/* bullets */}
                  <ul className="flex flex-col gap-3" aria-label="Beneficios">
                    {active.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <Check
                          size={15}
                          strokeWidth={2.2}
                          className="shrink-0 mt-0.5"
                          style={{ color: '#7B5FFF' }}
                          aria-hidden="true"
                        />
                        <span className="font-body text-sm leading-snug"
                          style={{ color: 'rgba(240,238,255,0.75)' }}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
