'use client'

import { motion } from 'framer-motion'
import {
  Search, BarChart2, Target, Users, ShoppingBag, MessageCircle,
  type LucideIcon,
} from 'lucide-react'
import { DIFFERENTIALS } from '@/lib/constants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, LucideIcon> = {
  Search, BarChart2, Target, Users, ShoppingBag, MessageCircle,
}

export function Diferencial() {
  return (
    <section
      id="diferencial"
      className="section-dark py-20 px-4"
      aria-label="Por qué elegirnos"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Diferencial"
          title="La IA hace webs. Nosotros hacemos negocios."
          subtitle="La diferencia entre una web y un ecosistema que vende es el detalle de cada integración."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIFFERENTIALS.map((item, i) => {
            const Icon = ICON_MAP[item.icon]
            return (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.07 }}
                className={cn(
                  'group relative flex flex-col gap-4 p-6 rounded-2xl border border-purple/10 bg-card',
                  'hover:border-purple/30 hover:bg-surface transition-all duration-300',
                )}
              >
                {/* Number */}
                <span
                  className="absolute top-4 right-4 font-display font-bold text-3xl leading-none pointer-events-none select-none"
                  style={{ color: 'rgba(91,63,232,0.12)' }}
                  aria-hidden="true"
                >
                  {item.number}
                </span>

                {/* Icon */}
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: 'rgba(91,63,232,0.12)' }}
                >
                  {Icon && (
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="text-purple-light"
                    />
                  )}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display font-bold text-lg text-content group-hover:text-purple-light transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
