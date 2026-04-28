import { HeroBanner }   from '@/components/home/HeroBanner'
import { Marketing360 } from '@/components/home/Marketing360'
import { FlowDiagram }  from '@/components/home/FlowDiagram'
import { Proceso }      from '@/components/home/Proceso'
import { Portafolio }   from '@/components/home/Portafolio'
import { Diferencial }  from '@/components/home/Diferencial'
import { Cotizador }    from '@/components/home/Cotizador'
import { Contacto }     from '@/components/home/Contacto'

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <Marketing360 />
      <FlowDiagram />
      <Proceso />
      <Portafolio />
      <Diferencial />
      <Cotizador />
      <Contacto />
    </>
  )
}
