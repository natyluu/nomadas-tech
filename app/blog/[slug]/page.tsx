import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Artículo | Nómadas Tech Blog',
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="section-dark min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-content transition-colors duration-200 mb-10"
        >
          <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
          Volver al blog
        </Link>
        <p className="font-body text-muted text-center">
          Artículo <code className="font-mono text-purple-light">{params.slug}</code> — próximamente.
        </p>
      </div>
    </main>
  )
}
