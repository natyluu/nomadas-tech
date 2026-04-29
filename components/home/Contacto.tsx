'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Calculator, Video } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '57XXXXXXXXXX'
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/nomadas-tech/30min'

const CHANNELS = [
  {
    icon: MessageCircle,
    title: 'WhatsApp directo',
    description: 'Respuesta en menos de 1 hora. Cuéntanos tu proyecto y te orientamos sin compromiso.',
    cta: 'Escribir ahora',
    accent: '#25D366',
    accentDim: 'rgba(37,211,102,0.12)',
    onClick: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me interesa conocer más sobre sus servicios.')}`, '_blank'),
  },
  {
    icon: Calculator,
    title: 'Cotizador online',
    description: 'Responde 4 preguntas y recibe una propuesta personalizada en menos de 24 horas.',
    cta: 'Iniciar cotización',
    accent: '#5B3FE8',
    accentDim: 'rgba(91,63,232,0.12)',
    onClick: () => document.getElementById('cotizacion')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    icon: Video,
    title: 'Llamada 30 min gratis',
    description: 'Agenda una videollamada con nuestro equipo. Sin compromisos, solo ideas.',
    cta: 'Agendar llamada',
    accent: '#7B5FFF',
    accentDim: 'rgba(123,95,255,0.12)',
    onClick: () => window.open(CALENDLY_URL, '_blank'),
  },
]

export function Contacto() {
  return (
    <section
      id="contacto"
      className="section-surface py-20 px-4"
      aria-label="Canales de contacto"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Contacto"
          title="Hablemos de tu proyecto"
          subtitle="Elige el canal que prefieras. Estamos listos para ayudarte."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHANNELS.map((channel, i) => {
            const Icon = channel.icon
            return (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
                className="flex flex-col gap-5 p-6 rounded-2xl border border-purple/10 bg-card hover:border-purple/25 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl"
                  style={{ backgroundColor: channel.accentDim }}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    style={{ color: channel.accent }}
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-display font-bold text-lg text-content">
                    {channel.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {channel.description}
                  </p>
                </div>

                {/* CTA */}
                <Button
                  size="sm"
                  className="w-full"
                  onClick={channel.onClick}
                  aria-label={channel.cta}
                >
                  {channel.cta}
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
