import type { Metadata } from 'next'
import { Marketing360 } from '@/components/home/Marketing360'
import { Diferencial }  from '@/components/home/Diferencial'
import { Cotizador }    from '@/components/home/Cotizador'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Servicios | Nómadas Tech — Marketing Digital 360°',
  description:
    'Diseño web, SEO, Google Analytics, Meta Pixel, CRM y automatizaciones. El ecosistema completo para vender online en Colombia.',
}

export default function ServiciosPage() {
  return (
    <>
      <section className="section-dark pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            badge="Servicios"
            title="Todo lo que necesitas para vender online"
            subtitle="No vendemos servicios sueltos. Construimos el ecosistema completo — configurado, conectado y listo."
          />
        </div>
      </section>
      <Marketing360 />
      <Diferencial />
      <Cotizador />
    </>
  )
}
