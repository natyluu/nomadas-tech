import type { Metadata } from 'next'
import { Portafolio }    from '@/components/home/Portafolio'
import { Cotizador }     from '@/components/home/Cotizador'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Portafolio | Nómadas Tech',
  description:
    'Proyectos de marketing digital en retail, servicios profesionales y educación.',
}

export default function PortafolioPage() {
  return (
    <>
      <section className="section-dark pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            badge="Portafolio"
            title="Resultados en tu industria"
            subtitle="Ecosistemas digitales construidos para negocios reales."
          />
        </div>
      </section>
      <Portafolio />
      <Cotizador />
    </>
  )
}
