'use client'

import { useEffect, useState } from 'react'
import {
  Globe, Search, BarChart2, Box, Users, Target, DollarSign,
  type LucideIcon,
} from 'lucide-react'
import { FLOW_NODES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'

const ICON_MAP: Record<string, LucideIcon> = {
  Globe, Search, BarChart2, Box, Users, Target, DollarSign,
}

export function FlowDiagram() {
  const [active, setActive] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % FLOW_NODES.length
        if (next === 0) setCompleted([])
        else setCompleted((c) => [...c, prev])
        return next
      })
    }, 1400)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="flujo"
      className="section-dark py-20 px-4"
      aria-label="Flujo de trabajo — 7 pasos"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Ecosistema 360°"
          title="Nuestro ecosistema digital 360°"
          subtitle="7 herramientas configuradas, conectadas y listas para generar clientes desde el día 1."
          className="mb-16"
        />

        {/* Desktop flow — horizontal */}
        <div className="hidden md:flex items-center justify-between" role="list" aria-label="Pasos del flujo">
          {FLOW_NODES.map((node, i) => {
            const Icon = ICON_MAP[node.icon]
            const isActive = i === active
            const isDone = completed.includes(i)
            const isPending = !isActive && !isDone

            return (
              <div key={node.label} className="flex items-center" role="listitem">
                {/* Node */}
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={cn(
                      'relative flex items-center justify-center w-16 h-16 rounded-2xl border-2 transition-all duration-500',
                      isActive && 'bg-purple border-purple-light glow-purple scale-110',
                      isDone  && 'bg-purple/20 border-purple/50',
                      isPending && 'bg-card border-purple/20',
                    )}
                    aria-label={`${node.label}${isActive ? ' — activo' : isDone ? ' — completado' : ''}`}
                  >
                    {Icon && (
                      <Icon
                        size={24}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className={cn(
                          'transition-colors duration-500',
                          isActive  && 'text-white',
                          isDone    && 'text-purple-light',
                          isPending && 'text-muted/50',
                        )}
                      />
                    )}
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-2xl bg-purple/30 animate-ping"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      'font-body text-xs font-medium transition-colors duration-500',
                      isActive  && 'text-purple-light',
                      isDone    && 'text-content',
                      isPending && 'text-muted/50',
                    )}
                  >
                    {node.label}
                  </span>
                </div>

                {/* Connector */}
                {i < FLOW_NODES.length - 1 && (
                  <div className="flex-1 mx-2 h-0.5 bg-purple/10 relative overflow-hidden" aria-hidden="true">
                    <div
                      className={cn(
                        'absolute inset-0 h-full bg-purple transition-all duration-700',
                        isDone ? 'w-full' : 'w-0',
                      )}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile flow — vertical */}
        <div className="md:hidden flex flex-col gap-0" role="list" aria-label="Pasos del flujo">
          {FLOW_NODES.map((node, i) => {
            const Icon = ICON_MAP[node.icon]
            const isActive = i === active
            const isDone = completed.includes(i)
            const isPending = !isActive && !isDone

            return (
              <div key={node.label} className="flex items-stretch gap-4" role="listitem">
                {/* Timeline column */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all duration-500 shrink-0',
                      isActive  && 'bg-purple border-purple-light glow-purple-sm',
                      isDone    && 'bg-purple/20 border-purple/50',
                      isPending && 'bg-card border-purple/20',
                    )}
                  >
                    {Icon && (
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className={cn(
                          'transition-colors duration-500',
                          isActive  && 'text-white',
                          isDone    && 'text-purple-light',
                          isPending && 'text-muted/40',
                        )}
                      />
                    )}
                  </div>
                  {i < FLOW_NODES.length - 1 && (
                    <div className="w-0.5 flex-1 mt-1 mb-1 bg-purple/10 relative overflow-hidden">
                      <div
                        className={cn(
                          'absolute top-0 left-0 right-0 bg-purple transition-all duration-700',
                          isDone ? 'h-full' : 'h-0',
                        )}
                      />
                    </div>
                  )}
                </div>
                {/* Label */}
                <div className="flex items-center pb-6">
                  <span
                    className={cn(
                      'font-body text-sm font-medium transition-colors duration-500',
                      isActive  && 'text-purple-light',
                      isDone    && 'text-content',
                      isPending && 'text-muted/50',
                    )}
                  >
                    {node.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Active step description */}
        <div className="mt-12 text-center">
          <p className="font-body text-sm text-muted">
            Paso{' '}
            <span className="text-purple-light font-semibold">{active + 1}</span>
            {' '}de {FLOW_NODES.length} &mdash;{' '}
            <span className="text-content">{FLOW_NODES[active].label}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
