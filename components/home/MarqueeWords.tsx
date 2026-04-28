'use client'

import { useEffect, useState, memo } from 'react'
import {
  Search, ShoppingBag, BarChart2, Box, Layout, SearchCheck, Users,
  TrendingUp, Monitor, Zap, MessageCircle, Globe, ArrowUpRight, Store,
  Play, DollarSign, Mail, Calendar, FileText, Activity, RefreshCw,
  type LucideIcon,
} from 'lucide-react'
import { MARQUEE_WORDS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, LucideIcon> = {
  Search, ShoppingBag, BarChart2, Box, Layout, SearchCheck, Users,
  TrendingUp, Monitor, Zap, MessageCircle, Globe, ArrowUpRight, Store,
  Play, DollarSign, Mail, Calendar, FileText, Activity, RefreshCw,
}

type WordState = {
  superLit: number
  lit: number[]
}

// Split words into 3 rows
const ROW_1 = MARQUEE_WORDS.slice(0, 7)
const ROW_2 = MARQUEE_WORDS.slice(7, 14)
const ROW_3 = MARQUEE_WORDS.slice(14)

interface WordChipProps {
  label: string
  icon: string
  state: 'super-lit' | 'lit' | 'dim'
}

const WordChip = memo(function WordChip({ label, icon, state }: WordChipProps) {
  const Icon = ICON_MAP[icon]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-body font-medium whitespace-nowrap border transition-all duration-500 mx-2',
        state === 'super-lit' && 'text-purple-light border-purple/60 bg-purple-dim glow-purple-sm',
        state === 'lit'       && 'text-purple/70 border-purple/30 bg-purple-dim/50',
        state === 'dim'       && 'text-muted/40 border-white/5 bg-white/[0.02]',
      )}
    >
      {Icon && (
        <Icon
          size={16}
          strokeWidth={1.8}
          aria-hidden="true"
          className={cn(
            'shrink-0',
            state === 'super-lit' && 'text-purple-light',
            state === 'lit'       && 'text-purple/70',
            state === 'dim'       && 'text-muted/30',
          )}
        />
      )}
      {label}
    </span>
  )
})

interface MarqueeRowProps {
  words: typeof ROW_1 | typeof ROW_2 | typeof ROW_3
  direction: 'left' | 'right'
  duration: string
  wordState: WordState
  offset: number
}

function MarqueeRow({ words, direction, duration, wordState, offset }: MarqueeRowProps) {
  const doubled = [...words, ...words, ...words, ...words]

  function getState(globalIdx: number): WordState['superLit'] extends number ? 'super-lit' | 'lit' | 'dim' : never {
    if (globalIdx === wordState.superLit) return 'super-lit'
    if (wordState.lit.includes(globalIdx)) return 'lit'
    return 'dim'
  }

  return (
    <div className="flex overflow-hidden" aria-hidden="true">
      <div
        className="flex shrink-0"
        style={{
          animation: `${direction === 'left' ? 'marquee' : 'marquee-reverse'} ${duration} linear infinite`,
        }}
      >
        {doubled.map((word, i) => {
          const globalIdx = (i % words.length) + offset
          const state = getState(globalIdx)
          return (
            <WordChip
              key={`${word.label}-${i}`}
              label={word.label}
              icon={word.icon}
              state={state}
            />
          )
        })}
      </div>
    </div>
  )
}

interface MarqueeWordsProps {
  embedded?: boolean
}

export function MarqueeWords({ embedded = false }: MarqueeWordsProps) {
  const [wordState, setWordState] = useState<WordState>({ superLit: 0, lit: [3, 7, 12] })

  useEffect(() => {
    const total = MARQUEE_WORDS.length
    const interval = setInterval(() => {
      const superLit = Math.floor(Math.random() * total)
      const lit: number[] = []
      while (lit.length < 4) {
        const idx = Math.floor(Math.random() * total)
        if (idx !== superLit && !lit.includes(idx)) lit.push(idx)
      }
      setWordState({ superLit, lit })
    }, 1600)
    return () => clearInterval(interval)
  }, [])

  const Wrapper = embedded ? 'div' : 'section'

  return (
    <Wrapper
      className={embedded ? 'overflow-hidden w-full' : 'section-surface py-16 overflow-hidden'}
      aria-label="Servicios de marketing digital"
    >
      <div
        className="flex flex-col gap-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <MarqueeRow
          words={ROW_1}
          direction="left"
          duration="28s"
          wordState={wordState}
          offset={0}
        />
        <MarqueeRow
          words={ROW_2}
          direction="right"
          duration="32s"
          wordState={wordState}
          offset={7}
        />
        <MarqueeRow
          words={ROW_3}
          direction="left"
          duration="38s"
          wordState={wordState}
          offset={14}
        />
      </div>
    </Wrapper>
  )
}
