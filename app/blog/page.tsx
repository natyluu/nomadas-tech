import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Nómadas Tech — Marketing Digital Colombia',
  description:
    'Artículos sobre SEO, marketing digital, e-commerce y automatizaciones para negocios en Colombia.',
}

export default function BlogPage() {
  return (
    <>
      <section className="section-dark pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            badge="Blog"
            title="Marketing digital sin tecnicismos"
            subtitle="Guías, casos de estudio y estrategias para hacer crecer tu negocio online en Colombia."
          />
        </div>
      </section>

      <section className="section-surface py-20 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
          <div
            className="flex items-center justify-center w-16 h-16 rounded-2xl"
            style={{ backgroundColor: 'rgba(91,63,232,0.12)' }}
          >
            <FileText size={28} strokeWidth={1.8} className="text-purple-light" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-2xl text-content">
            Próximamente
          </h2>
          <p className="font-body text-muted max-w-md leading-relaxed">
            Estamos preparando contenido de valor sobre SEO, pauta digital y ecosistemas de marketing para negocios en Colombia.
          </p>
        </div>
      </section>
    </>
  )
}
