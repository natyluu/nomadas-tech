import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Propuesta Email — Shine Boutique | Nómadas Tech',
  description: 'Vista previa del email de bienvenida diseñado por Nómadas Tech para Shine Boutique.',
  robots: { index: false, follow: false },
}

export default function ShineBoutiquePropuesta() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

        .shine-page {
          background:
            radial-gradient(1200px 600px at 20% 0%, #f7d8e3 0%, transparent 60%),
            radial-gradient(900px 500px at 100% 100%, #fde6e6 0%, transparent 55%),
            #f3e9e6;
          min-height: 100vh;
          padding: 48px 16px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Jost', system-ui, sans-serif;
          color: #3a2a2e;
        }

        /* ── Label de propuesta ── */
        .shine-label {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: #be7f88;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .shine-label::before,
        .shine-label::after {
          content: '';
          width: 32px;
          height: 1px;
          background: #be7f88;
          opacity: .5;
        }

        /* ── Email container ── */
        .shine-email {
          width: 600px;
          max-width: 100%;
          background: #fffef3;
          border-radius: 4px;
          overflow: hidden;
          box-shadow:
            0 1px 0 rgba(190,127,136,.08),
            0 30px 80px -20px rgba(58,42,46,.25),
            0 10px 30px -10px rgba(58,42,46,.18);
        }

        /* ── Brand bar ── */
        .shine-brandbar {
          background: #fffef3;
          padding: 22px 32px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(190,127,136,.18);
        }
        .shine-wordmark {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          font-size: 28px;
          letter-spacing: .42em;
          color: #be7f88;
          text-transform: uppercase;
          padding-left: 6px;
          display: flex;
          align-items: center;
        }
        .shine-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #be7f88;
          margin: 0 2px 4px 6px;
          vertical-align: middle;
          flex-shrink: 0;
        }
        .shine-tagline {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: .32em;
          text-transform: uppercase;
          color: #be7f88;
          opacity: .75;
        }

        /* ── Hero ── */
        .shine-hero {
          position: relative;
          width: 100%;
          aspect-ratio: 600 / 720;
          overflow: hidden;
          background: #e9d6c8;
        }
        .shine-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg,
              rgba(255,254,243,.0) 0%,
              rgba(255,254,243,.0) 38%,
              rgba(242,196,213,.35) 58%,
              rgba(242,196,213,.78) 78%,
              rgba(190,127,136,.92) 100%);
          pointer-events: none;
          z-index: 1;
        }
        .shine-hero-eyebrow {
          position: absolute;
          top: 28px;
          left: 32px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: .36em;
          text-transform: uppercase;
          color: #fffef3;
          text-shadow: 0 1px 8px rgba(58,42,46,.35);
        }
        .shine-hero-eyebrow .line {
          width: 28px;
          height: 1px;
          background: #fffef3;
          opacity: .9;
          flex-shrink: 0;
        }
        .shine-hero-copy {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          padding: 0 40px 44px;
          text-align: center;
        }
        .shine-hero-copy h1 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-style: italic;
          color: #ffffff;
          font-size: 46px;
          line-height: 1.04;
          margin: 0;
          letter-spacing: .005em;
          text-shadow: 0 2px 18px rgba(120,60,72,.35);
        }
        .shine-hero-copy h1 em {
          font-style: italic;
        }
        .shine-hero-underline {
          display: block;
          width: 70px;
          height: 1px;
          background: #ffffff;
          opacity: .85;
          margin: 18px auto 0;
        }

        /* ── Body section ── */
        .shine-body {
          background: #fffef3;
          padding: 44px 48px 8px;
          text-align: center;
        }
        .shine-greeting {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 400;
          font-size: 22px;
          color: #be7f88;
          margin: 0 0 18px;
          letter-spacing: .01em;
        }
        .shine-body h2 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          font-size: 32px;
          line-height: 1.15;
          color: #3a2a2e;
          margin: 0 0 18px;
        }
        .shine-body h2 em {
          font-style: italic;
          color: #be7f88;
        }
        .shine-body p {
          font-size: 15px;
          line-height: 1.7;
          color: #6b5258;
          margin: 0 0 8px;
          max-width: 440px;
          margin-left: auto;
          margin-right: auto;
        }
        .shine-body p strong {
          color: #be7f88;
          font-weight: 500;
        }

        /* ── Code section ── */
        .shine-code-wrap {
          background: #fffef3;
          padding: 32px 48px 36px;
          text-align: center;
        }
        .shine-code-label {
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: .32em;
          text-transform: uppercase;
          color: #be7f88;
          opacity: .7;
          margin-bottom: 14px;
        }
        .shine-code {
          display: inline-block;
          border: 1px solid rgba(190,127,136,.35);
          border-radius: 3px;
          padding: 18px 40px;
          background: rgba(242,196,213,.08);
        }
        .shine-code-value {
          font-family: 'Jost', sans-serif;
          font-size: 22px;
          letter-spacing: .2em;
          font-weight: 400;
          color: #3a2a2e;
          text-transform: uppercase;
        }
        .shine-code-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 13px;
          color: #be7f88;
          margin-top: 6px;
          letter-spacing: .04em;
        }

        /* ── CTA section ── */
        .shine-cta-wrap {
          background: #fffef3;
          padding: 8px 48px 36px;
          text-align: center;
        }
        .shine-cta {
          display: inline-block;
          background: #be7f88;
          color: #fffef3;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: .28em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 16px 42px;
          border-radius: 2px;
          transition: background .2s;
        }
        .shine-cta:hover { background: #a86d76; }
        .shine-cta-note {
          font-size: 12px;
          color: #be7f88;
          opacity: .7;
          margin-top: 14px;
          letter-spacing: .02em;
          font-style: italic;
          font-family: 'Cormorant Garamond', serif;
        }

        /* ── Divider ── */
        .shine-divider {
          display: flex;
          align-items: center;
          padding: 0 48px;
          margin: 8px 0;
          gap: 16px;
        }
        .shine-divider .rule {
          flex: 1;
          height: 1px;
          background: rgba(190,127,136,.22);
        }
        .shine-mono {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: rgba(190,127,136,.45);
          font-weight: 300;
          line-height: 1;
        }

        /* ── Footer ── */
        .shine-footer {
          background: #fffef3;
          padding: 28px 48px 36px;
          text-align: center;
          border-top: 1px solid rgba(190,127,136,.12);
        }
        .shine-signoff {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 15px;
          color: #be7f88;
          margin: 0 0 20px;
        }
        .shine-socials {
          display: flex;
          justify-content: center;
          gap: 18px;
          margin-bottom: 18px;
        }
        .shine-socials a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          color: #be7f88;
          opacity: .65;
          transition: opacity .2s;
          text-decoration: none;
        }
        .shine-socials a:hover { opacity: 1; }
        .shine-socials svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }
        .shine-contact a {
          font-size: 12px;
          color: #be7f88;
          text-decoration: none;
          letter-spacing: .04em;
          opacity: .8;
        }
        .shine-meta {
          font-size: 11px;
          color: #be7f88;
          opacity: .5;
          margin-top: 10px;
          letter-spacing: .02em;
        }
        .shine-meta .sep { margin: 0 6px; }

        /* ── Footer nota Nómadas ── */
        .nomadas-note {
          margin-top: 32px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: #be7f88;
          opacity: .55;
          text-align: center;
        }
      `}</style>

      <div className="shine-page">
        <p className="shine-label">Propuesta · Nómadas Tech · Shine Boutique</p>

        <article className="shine-email" role="article" aria-label="Shine Boutique — email de bienvenida">

          {/* Brand bar */}
          <header className="shine-brandbar">
            <div className="shine-wordmark">
              S<span className="shine-dot" />HINE
            </div>
            <div className="shine-tagline">Fashion&nbsp;·&nbsp;Boutique</div>
          </header>

          {/* Hero */}
          <section className="shine-hero">
            <Image
              src="/clientes/shine/hero.jpg"
              alt="Modelos de Shine Boutique posando en vestidos satinados"
              fill
              sizes="600px"
              style={{ objectFit: 'cover', objectPosition: '50% 22%' }}
              priority
            />
            <div className="shine-hero-eyebrow">
              <span className="line" aria-hidden="true" />
              Edición de bienvenida
            </div>
            <div className="shine-hero-copy">
              <h1>
                Brilla desde tu<br />
                <em>primera compra</em>
              </h1>
              <span className="shine-hero-underline" aria-hidden="true" />
            </div>
          </section>

          {/* Body */}
          <section className="shine-body">
            <p className="shine-greeting">— Bienvenida —</p>
            <h2>Te damos la bienvenida al <em>universo Shine</em></h2>
            <p>
              Cada prenda está pensada para acompañarte en los momentos que importan.
              Usa tu código exclusivo y llévate un{' '}
              <strong>5% de descuento</strong>{' '}
              en tu primer pedido.
            </p>
          </section>

          {/* Code */}
          <section className="shine-code-wrap">
            <div className="shine-code-label">Tu código de bienvenida</div>
            <div className="shine-code">
              <div className="shine-code-value">SHINE5</div>
              <div className="shine-code-sub">— 5% off · primera compra —</div>
            </div>
          </section>

          {/* CTA */}
          <section className="shine-cta-wrap">
            <a className="shine-cta" href="#">Ver colección</a>
            <p className="shine-cta-note">Nuevas piezas cada semana, edición limitada.</p>
          </section>

          {/* Divider */}
          <div className="shine-divider" aria-hidden="true">
            <span className="rule" />
            <span className="shine-mono">S</span>
            <span className="rule" />
          </div>

          {/* Footer */}
          <footer className="shine-footer">
            <p className="shine-signoff">Con cariño, el equipo Shine.</p>

            <div className="shine-socials" aria-label="Redes sociales">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1C2.6 8.5 2.6 8.9 2.6 12s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm5.1-2.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.5 3.5c.5 1.6 1.7 2.9 3.3 3.3v2.6c-1.3 0-2.5-.4-3.5-1v6.4c0 3.2-2.6 5.8-5.8 5.8S4.7 18 4.7 14.8s2.6-5.8 5.8-5.8c.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.2-.9-.2-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1V3.5h2.9z" />
                </svg>
              </a>
              <a href="#" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.3-.1-.8-.2-2 0-2.9.2-.8 1.3-5.2 1.3-5.2s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.5-.9 3.8-.3 1.2.6 2.1 1.7 2.1 2.1 0 3.7-2.2 3.7-5.4 0-2.8-2-4.8-5-4.8-3.4 0-5.4 2.5-5.4 5.2 0 1 .4 2.1.9 2.7.1.1.1.2.1.3-.1.4-.3 1.2-.3 1.4-.1.2-.2.3-.4.2-1.4-.7-2.3-2.8-2.3-4.5 0-3.7 2.7-7.1 7.7-7.1 4.1 0 7.2 2.9 7.2 6.8 0 4-2.5 7.3-6.1 7.3-1.2 0-2.3-.6-2.7-1.4l-.7 2.8c-.3 1-1 2.3-1.5 3.1.9.3 1.9.5 2.9.5 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.5 3.5A10.4 10.4 0 0 0 3.6 16.2L2.5 21.5l5.4-1.4a10.4 10.4 0 0 0 12.6-16.6zM12 19.6c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-3.2.8.9-3.1-.2-.3a8.6 8.6 0 1 1 7.6 4.1zm4.8-6.4c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.9 3 4.7 4.1.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z" />
                </svg>
              </a>
            </div>

            <div className="shine-contact">
              <a href="mailto:info@shineboutique.co">info@shineboutique.co</a>
            </div>
            <div className="shine-meta">
              Shine Boutique <span className="sep">·</span> Bogotá, Colombia
            </div>
          </footer>

        </article>

        <p className="nomadas-note">Diseñado por Nómadas Tech</p>
      </div>
    </>
  )
}
