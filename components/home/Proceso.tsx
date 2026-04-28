'use client'

import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/constants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

export function Proceso() {
  return (
    <section
      id="proceso"
      className="section-surface py-20 px-4"
      aria-label="Proceso de trabajo — 5 pasos"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          badge="Proceso"
          title="Cómo construimos tu ecosistema"
          subtitle="5 etapas claras, sin sorpresas. Sabes exactamente en qué estamos en cada momento."
          className="mb-16"
        />

        <ol className="relative flex flex-col gap-0" aria-label="Pasos del proceso">
          {PROCESS_STEPS.map((step, i) => {
            const isLast = i === PROCESS_STEPS.length - 1
            return (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
                className="flex gap-6 group"
              >
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  {/* Number circle */}
                  <div
                    className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-full border-2 font-display font-bold text-sm shrink-0 transition-all duration-300',
                      'border-purple/30 text-purple-light bg-purple-dim group-hover:border-purple group-hover:bg-purple/20',
                    )}
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                  {/* Vertical line */}
                  {!isLast && (
                    <div
                      className="w-0.5 flex-1 mt-2 mb-2 bg-purple/15 min-h-12"
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Content */}
                <div className={cn('flex flex-col gap-3 pb-10', isLast && 'pb-0')}>
                  <h3 className="font-display font-bold text-xl text-content group-hover:text-purple-light transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block font-body text-xs px-3 py-1 rounded-full border border-purple/20 text-muted/70 bg-purple-dim/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
