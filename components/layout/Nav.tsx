'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-dark/90 backdrop-blur-md border-b border-purple/10 shadow-lg shadow-dark/50'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Nómadas Tech - Inicio"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Nómadas Tech"
              height={36}
              style={{ height: 36, width: 'auto' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium text-muted hover:text-content transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Button size="sm" asChild>
              <Link href="/#cotizacion">Cotizar proyecto &rarr;</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-muted hover:text-content transition-colors p-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? (
              <X size={22} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={1.8} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden bg-surface/95 backdrop-blur-md border-b border-purple/10 overflow-hidden transition-all duration-300',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
        aria-hidden={!open}
      >
        <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Navegación móvil">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-muted hover:text-content py-3 border-b border-purple/10 transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <Button size="sm" className="w-full" onClick={() => setOpen(false)} asChild>
              <Link href="/#cotizacion">Cotizar proyecto &rarr;</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
