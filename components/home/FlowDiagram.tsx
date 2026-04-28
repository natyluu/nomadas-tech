'use client'

import React, { useEffect, useState } from 'react'
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

        {/* Mobile flow — horizontal scroll */}
        <div className="md:hidden">
          <div
            className="flex flex-row gap-3 overflow-x-auto scrollbar-hide pb-2"
            style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
            role="list"
            aria-label="Pasos del flujo"
          >
            {FLOW_NODES.map((node, i) => {
              const Icon = ICON_MAP[node.icon]
              const isActive = i === active
              const isDone = completed.includes(i)
              const isPending = !isActive && !isDone

              return (
                <div
                  key={node.label}
                  role="listitem"
                  className="flex flex-col items-center gap-1.5 shrink-0"
                  style={{ width: 72 }}
                >
                  <div
                    className={cn(
                      'flex items-center justify-center rounded-xl border-2 transition-all duration-500',
                      isActive  && 'bg-purple border-purple-light glow-purple-sm',
                      isDone    && 'bg-purple/20 border-purple/50',
                      isPending && 'bg-card border-purple/20',
                    )}
                    style={{ width: 32, height: 32 }}
                    aria-label={`${node.label}${isActive ? ' — activo' : isDone ? ' — completado' : ''}`}
                  >
                    {Icon && (
                      <Icon
                        size={14}
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
                  <span
                    className={cn(
                      'font-body font-medium text-center leading-tight transition-colors duration-500',
                      isActive  && 'text-purple-light',
                      isDone    && 'text-content',
                      isPending && 'text-muted/50',
                    )}
                    style={{ fontSize: 10 }}
                  >
                    {node.label}
                  </span>
                </div>
              )
            })}
          </div>
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
