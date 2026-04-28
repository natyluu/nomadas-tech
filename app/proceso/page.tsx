import type { Metadata } from 'next'
import { Proceso }       from '@/components/home/Proceso'
import { FlowDiagram }   from '@/components/home/FlowDiagram'
import { Cotizador }     from '@/components/home/Cotizador'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Cómo trabajamos | Nómadas Tech',
  description:
    '5 etapas claras para construir tu ecosistema digital. Descubrimiento, estrategia, desarrollo, integración 360° y lanzamiento.',
}

export default function ProcesoPage() {
  return (
    <>
      <section className="section-dark pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            badge="Proceso"
            title="Cómo construimos tu ecosistema"
            subtitle="Sin sorpresas ni letras pequeñas. 5 etapas claras de principio a fin."
          />
        </div>
      </section>
      <FlowDiagram />
      <Proceso />
      <Cotizador />
    </>
  )
}
