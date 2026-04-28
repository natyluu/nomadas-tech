import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Diferencial }   from '@/components/home/Diferencial'
import { Contacto }      from '@/components/home/Contacto'

export const metadata: Metadata = {
  title: 'Nosotros | Nómadas Tech',
  description:
    'Somos una agencia de marketing digital 360°. Construimos ecosistemas digitales, no solo webs.',
}

export default function NosotrosPage() {
  return (
    <>
      <section className="section-dark pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            badge="Nosotros"
            title="La IA hace webs. Nosotros hacemos negocios."
            subtitle="Especializados en construir ecosistemas digitales completos — cada herramienta configurada, conectada y lista para generar clientes desde el día 1."
          />
        </div>
      </section>
      <Diferencial />
      <Contacto />
    </>
  )
}
