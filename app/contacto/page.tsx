import type { Metadata } from 'next'
import { Contacto }      from '@/components/home/Contacto'
import { Cotizador }     from '@/components/home/Cotizador'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Contacto | Nómadas Tech',
  description:
    'Contáctanos por WhatsApp, cotizador online o agenda una llamada 30 min gratis.',
}

export default function ContactoPage() {
  return (
    <>
      <section className="section-dark pt-32 pb-0 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            badge="Contacto"
            title="Hablemos de tu proyecto"
            subtitle="Elige el canal que prefieras."
          />
        </div>
      </section>
      <Contacto />
      <Cotizador />
    </>
  )
}
