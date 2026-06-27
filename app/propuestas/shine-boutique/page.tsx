import type { Metadata } from 'next'
import ShineProposal from './ShineProposal'

export const metadata: Metadata = {
  title: 'Propuesta de Servicios — Shine Boutique | Nómadas Tech',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ShineProposal />
}
