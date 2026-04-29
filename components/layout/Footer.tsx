import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'

const FOOTER_SERVICES = [
  { label: 'Diseño Web', href: '/servicios#diseno' },
  { label: 'SEO', href: '/servicios#seo' },
  { label: 'Google Analytics', href: '/servicios#analytics' },
  { label: 'Meta Pixel', href: '/servicios#meta-pixel' },
  { label: 'CRM & Automatizaciones', href: '/servicios#crm' },
  { label: 'Pauta Digital', href: '/servicios#pauta' },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', abbr: 'IG', href: 'https://instagram.com/nomadas.tech' },
  { label: 'LinkedIn',  abbr: 'LI', href: 'https://linkedin.com/company/nomadas-tech' },
  { label: 'X',         abbr: 'X',  href: 'https://twitter.com/nomadastech' },
]

export function Footer() {
  return (
    <footer className="bg-surface border-t border-purple/10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex mb-4" aria-label="Nómadas Tech">
              <img src="/logo.png" height="40" width="auto" alt="Nómadas Tech" style={{ height: 40, width: 'auto' }} />
            </Link>
            <p className="font-body text-sm text-muted leading-relaxed mb-6">
              Diseño web, SEO y ecosistema completo para vender online desde el día 1.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, abbr, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-purple/20 text-muted hover:text-purple-light hover:border-purple/50 transition-all duration-200 font-display font-bold text-xs"
                >
                  {abbr}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-display font-semibold text-content text-sm uppercase tracking-wider mb-4">
              Empresa
            </p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-muted hover:text-content transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/nosotros" className="font-body text-sm text-muted hover:text-content transition-colors duration-200">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/blog" className="font-body text-sm text-muted hover:text-content transition-colors duration-200">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-display font-semibold text-content text-sm uppercase tracking-wider mb-4">
              Servicios
            </p>
            <ul className="flex flex-col gap-2">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="font-body text-sm text-muted hover:text-content transition-colors duration-200"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-display font-semibold text-content text-sm uppercase tracking-wider mb-4">
              Contacto
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hola@nomadas.tech"
                  className="font-body text-sm text-muted hover:text-content transition-colors duration-200"
                >
                  hola@nomadas.tech
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/57XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-muted hover:text-content transition-colors duration-200"
                >
                  WhatsApp Business
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/#cotizacion"
                  className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-purple-light hover:text-purple transition-colors duration-200"
                >
                  Cotizar proyecto &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-purple/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted">
            &copy; {new Date().getFullYear()} Nómadas Tech. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-muted">
            Hecho con ♥ para negocios que quieren crecer
          </p>
        </div>
      </div>
    </footer>
  )
}
