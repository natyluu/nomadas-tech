'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

/* ─── Types ──────────────────────────────────────────────────────── */
type ProjectType = 'web' | 'tienda' | 'app' | 'los-tres' | ''

type FormData = {
  // Step 1
  businessDesc: string
  projectType: ProjectType
  // Step 2A — Web
  webPages: string
  webServices: string
  // Step 2B — Tienda
  storeProducts: string
  storePayments: string
  // Step 2C — App
  appDesc: string
  appPrototype: string
  // Step 3 — Presencia
  metaBusiness: string
  googleBusiness: string
  // Step 4 — Pauta
  pauta: string
  // Step 5 — Contacto
  name: string
  whatsapp: string
  email: string
  company: string
  note: string
}

const INITIAL: FormData = {
  businessDesc: '', projectType: '',
  webPages: '', webServices: '',
  storeProducts: '', storePayments: '',
  appDesc: '', appPrototype: '',
  metaBusiness: '', googleBusiness: '',
  pauta: '',
  name: '', whatsapp: '', email: '', company: '', note: '',
}

/* ─── Options ────────────────────────────────────────────────────── */
const PROJECT_TYPES = [
  { value: 'web',       label: 'Web' },
  { value: 'tienda',    label: 'Tienda online' },
  { value: 'app',       label: 'App' },
  { value: 'los-tres',  label: 'Los tres' },
]

const WEB_PAGES    = ['1–3 páginas', '4–8 páginas', 'Más de 8', 'No sé']
const WEB_SERVICES = ['1–5', '6–20', 'Más de 20']

const STORE_PRODUCTS = ['1–20', '21–100', 'Más de 100']
const STORE_PAYMENTS = ['Sí', 'No', 'No sé']

const APP_PROTOTYPE = ['Sí tengo', 'No tengo']

const META_OPTIONS   = ['Sí configurado', 'Sí pero sin configurar', 'No tengo']
const GOOGLE_OPTIONS = ['Sí', 'No', '¿Qué es eso?']

const PAUTA_OPTIONS  = ['Meta Ads', 'Google Ads', 'Ambas', 'No, quiero empezar', 'No hago pauta']

/* ─── Step labels ────────────────────────────────────────────────── */
const STEPS = ['Tu negocio', 'Detalles', 'Presencia', 'Pauta', 'Contacto']

/* ─── Animation ──────────────────────────────────────────────────── */
const slide = {
  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
}

/* ─── Reusable UI ────────────────────────────────────────────────── */
function OptionCard({
  label, sub, selected, onClick,
}: {
  label: string; sub?: string; selected: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col gap-0.5 text-left px-5 py-4 rounded-xl border font-body transition-all duration-200 cursor-pointer w-full"
      style={{
        background: selected ? 'rgba(91,63,232,0.3)' : 'rgba(255,255,255,0.05)',
        borderColor: selected ? '#5B3FE8' : 'rgba(255,255,255,0.15)',
        color: '#FFFFFF',
      }}
    >
      <span className="font-medium text-sm text-white">{label}</span>
      {sub && <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{sub}</span>}
    </button>
  )
}

function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="font-body text-sm font-medium text-white">
      {children}
      {optional && <span className="font-normal ml-1" style={{ color: '#8A88A8' }}>(opcional)</span>}
    </label>
  )
}

function QuestionLabel({ children }: { children: React.ReactNode }) {
  return (
    <legend className="font-display font-bold text-lg text-white mb-4">
      {children}
    </legend>
  )
}

const inputClass =
  'h-11 px-4 rounded-xl border font-body text-sm focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all duration-200 text-white placeholder-[#8A88A8] [background:rgba(255,255,255,0.08)] [border-color:rgba(255,255,255,0.15)]'

const textareaClass =
  'px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all duration-200 resize-none text-white placeholder-[#8A88A8] [background:rgba(255,255,255,0.08)] [border-color:rgba(255,255,255,0.15)]'

/* ─── Step 2 variants ────────────────────────────────────────────── */
function Step2A({ data, set }: { data: FormData; set: SetFn }) {
  return (
    <div className="flex flex-col gap-7">
      <fieldset>
        <QuestionLabel>¿Cuántas páginas necesitas?</QuestionLabel>
        <div className="grid grid-cols-2 gap-3">
          {WEB_PAGES.map((o) => (
            <OptionCard key={o} label={o} selected={data.webPages === o} onClick={() => set('webPages', o)} />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <QuestionLabel>¿Cuántos servicios tienes para mostrar?</QuestionLabel>
        <div className="grid grid-cols-3 gap-3">
          {WEB_SERVICES.map((o) => (
            <OptionCard key={o} label={o} selected={data.webServices === o} onClick={() => set('webServices', o)} />
          ))}
        </div>
      </fieldset>
    </div>
  )
}

function Step2B({ data, set }: { data: FormData; set: SetFn }) {
  return (
    <div className="flex flex-col gap-7">
      <fieldset>
        <QuestionLabel>¿Cuántos productos tienes?</QuestionLabel>
        <div className="grid grid-cols-3 gap-3">
          {STORE_PRODUCTS.map((o) => (
            <OptionCard key={o} label={o} selected={data.storeProducts === o} onClick={() => set('storeProducts', o)} />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <QuestionLabel>¿Necesitas pagos online?</QuestionLabel>
        <div className="grid grid-cols-3 gap-3">
          {STORE_PAYMENTS.map((o) => (
            <OptionCard key={o} label={o} selected={data.storePayments === o} onClick={() => set('storePayments', o)} />
          ))}
        </div>
      </fieldset>
    </div>
  )
}

function Step2C({ data, set }: { data: FormData; set: SetFn }) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <QuestionLabel>Cuéntanos de tu app, qué hace y para quién es</QuestionLabel>
        <textarea
          id="appDesc"
          rows={4}
          value={data.appDesc}
          onChange={(e) => set('appDesc', e.target.value)}
          placeholder="Ej: Una app para que los clientes de mi restaurante hagan pedidos desde su celular..."
          className={textareaClass}
        />
      </div>
      <fieldset>
        <QuestionLabel>¿Tienes diseño o prototipo?</QuestionLabel>
        <div className="grid grid-cols-2 gap-3">
          {APP_PROTOTYPE.map((o) => (
            <OptionCard key={o} label={o} selected={data.appPrototype === o} onClick={() => set('appPrototype', o)} />
          ))}
        </div>
      </fieldset>
    </div>
  )
}

function Step2D({ data, set }: { data: FormData; set: SetFn }) {
  return (
    <div className="flex flex-col gap-7">
      <fieldset>
        <QuestionLabel>¿Cuántas páginas necesita la web?</QuestionLabel>
        <div className="grid grid-cols-2 gap-3">
          {WEB_PAGES.map((o) => (
            <OptionCard key={o} label={o} selected={data.webPages === o} onClick={() => set('webPages', o)} />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <QuestionLabel>¿Cuántos productos tiene la tienda?</QuestionLabel>
        <div className="grid grid-cols-3 gap-3">
          {STORE_PRODUCTS.map((o) => (
            <OptionCard key={o} label={o} selected={data.storeProducts === o} onClick={() => set('storeProducts', o)} />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <QuestionLabel>¿Necesitas pagos online?</QuestionLabel>
        <div className="grid grid-cols-3 gap-3">
          {STORE_PAYMENTS.map((o) => (
            <OptionCard key={o} label={o} selected={data.storePayments === o} onClick={() => set('storePayments', o)} />
          ))}
        </div>
      </fieldset>
    </div>
  )
}

/* ─── Types for set helper ───────────────────────────────────────── */
type SetFn = <K extends keyof FormData>(key: K, value: FormData[K]) => void

/* ─── Main component ─────────────────────────────────────────────── */
export function Cotizador() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const cotizadorRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (submitted) {
      cotizadorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [submitted])

  const set: SetFn = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }))

  function goTo(next: number) {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  function canProceed(): boolean {
    switch (step) {
      case 1:
        return !!(formData.businessDesc.trim() && formData.projectType)
      case 2:
        if (formData.projectType === 'web')      return !!(formData.webPages && formData.webServices)
        if (formData.projectType === 'tienda')   return !!(formData.storeProducts && formData.storePayments)
        if (formData.projectType === 'app')      return !!(formData.appDesc.trim() && formData.appPrototype)
        if (formData.projectType === 'los-tres') return !!(formData.webPages && formData.storeProducts && formData.storePayments)
        return false
      case 3:
        return !!(formData.metaBusiness && formData.googleBusiness)
      case 4:
        return !!formData.pauta
      case 5:
        return !!(formData.name.trim() && formData.whatsapp.trim() && formData.email.trim())
      default:
        return false
    }
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/cotizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setSubmitted(true)
    } catch {
      setError('Hubo un problema. Por favor inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  /* ── Success ── */
  if (submitted) {
    return (
      <section ref={cotizadorRef} id="cotizacion" className="section-dark py-20 px-4" aria-label="Cotizador enviado">
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-purple/10">
            <CheckCircle size={40} strokeWidth={1.8} className="text-purple" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-3xl text-white">¡Recibido!</h2>
          <p className="font-body text-lg leading-relaxed" style={{ color: 'rgba(240,238,255,0.6)' }}>
            Te contactamos en menos de 24 horas. Mientras tanto, revisa tu WhatsApp y correo.
          </p>
          <Button
            variant="outline"
            onClick={() => { setSubmitted(false); setStep(1); setFormData(INITIAL) }}
          >
            Enviar otra cotización
          </Button>
        </div>
      </section>
    )
  }

  /* ── Step 2 label — reflects project type ── */
  const step2Label =
    formData.projectType === 'app' ? 'Tu app' :
    formData.projectType === 'tienda' ? 'Tu tienda' :
    formData.projectType === 'los-tres' ? 'Tu proyecto' :
    'Tu web'

  const stepLabels = [STEPS[0], step2Label, ...STEPS.slice(2)]

  return (
    <section ref={cotizadorRef} id="cotizacion" className="section-dark py-20 px-4" aria-label="Cotizador de proyectos">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          badge="Cotizador"
          title="Cotiza tu proyecto"
          subtitle="5 preguntas y te enviamos una propuesta hecha a tu medida."
          light
          className="mb-12"
        />

        {/* Progress bar */}
        <div className="mb-8" aria-label={`Paso ${step} de ${STEPS.length}`}>
          <div className="flex items-center justify-between mb-3">
            {stepLabels.map((label, i) => (
              <div
                key={label + i}
                className={cn(
                  'flex items-center gap-1.5 font-body text-xs font-medium transition-colors duration-300',
                  i + 1 < step  && 'text-purple-light',
                  i + 1 === step && 'text-white',
                  i + 1 > step  && 'text-white/30',
                )}
              >
                <span
                  className={cn(
                    'flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold transition-all duration-300 shrink-0',
                    i + 1 < step  && 'bg-purple text-white',
                    i + 1 === step && 'bg-white text-dark',
                    i + 1 > step  && 'text-white/30',
                  )}
                  style={i + 1 > step ? { background: 'rgba(255,255,255,0.1)' } : undefined}
                  aria-hidden="true"
                >
                  {i + 1 < step ? '✓' : i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </div>
            ))}
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full bg-purple rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
              role="progressbar"
              aria-valuenow={Math.round(((step - 1) / (STEPS.length - 1)) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="relative overflow-hidden min-h-72">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >

              {/* ── Step 1: Tu negocio ── */}
              {step === 1 && (
                <div className="flex flex-col gap-7">
                  <div className="flex flex-col gap-2">
                    <FieldLabel htmlFor="businessDesc">
                      ¿Cómo se llama tu negocio y a qué se dedica?
                    </FieldLabel>
                    <textarea
                      id="businessDesc"
                      rows={3}
                      value={formData.businessDesc}
                      onChange={(e) => set('businessDesc', e.target.value)}
                      placeholder="Ej: Restaurante La Mesa, vendemos comida italiana..."
                      className={textareaClass}
                    />
                  </div>
                  <fieldset>
                    <QuestionLabel>¿Qué necesitas?</QuestionLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {PROJECT_TYPES.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          selected={formData.projectType === opt.value}
                          onClick={() => set('projectType', opt.value as ProjectType)}
                        />
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {/* ── Step 2: Conditional ── */}
              {step === 2 && formData.projectType === 'web'      && <Step2A data={formData} set={set} />}
              {step === 2 && formData.projectType === 'tienda'   && <Step2B data={formData} set={set} />}
              {step === 2 && formData.projectType === 'app'      && <Step2C data={formData} set={set} />}
              {step === 2 && formData.projectType === 'los-tres' && <Step2D data={formData} set={set} />}

              {/* ── Step 3: Presencia digital ── */}
              {step === 3 && (
                <div className="flex flex-col gap-7">
                  <fieldset>
                    <QuestionLabel>¿Tienes Meta Business Manager verificado?</QuestionLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {META_OPTIONS.map((o) => (
                        <OptionCard key={o} label={o} selected={formData.metaBusiness === o} onClick={() => set('metaBusiness', o)} />
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <QuestionLabel>¿Tienes Google My Business optimizado?</QuestionLabel>
                    <div className="grid grid-cols-3 gap-3">
                      {GOOGLE_OPTIONS.map((o) => (
                        <OptionCard key={o} label={o} selected={formData.googleBusiness === o} onClick={() => set('googleBusiness', o)} />
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {/* ── Step 4: Pauta ── */}
              {step === 4 && (
                <fieldset>
                  <QuestionLabel>¿Haces publicidad pagada?</QuestionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PAUTA_OPTIONS.map((o) => (
                      <OptionCard key={o} label={o} selected={formData.pauta === o} onClick={() => set('pauta', o)} />
                    ))}
                  </div>
                </fieldset>
              )}

              {/* ── Step 5: Contacto ── */}
              {step === 5 && (
                <div className="flex flex-col gap-5">
                  <h3 className="font-display font-bold text-xl text-white">Datos de contacto</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <FieldLabel htmlFor="name">
                        Nombre <span className="text-purple" aria-hidden="true">*</span>
                      </FieldLabel>
                      <input
                        id="name" type="text" required
                        value={formData.name}
                        onChange={(e) => set('name', e.target.value)}
                        placeholder="Tu nombre"
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <FieldLabel htmlFor="whatsapp">
                        WhatsApp <span className="text-purple" aria-hidden="true">*</span>
                      </FieldLabel>
                      <input
                        id="whatsapp" type="tel" required
                        value={formData.whatsapp}
                        onChange={(e) => set('whatsapp', e.target.value)}
                        placeholder="+57 300 000 0000"
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <FieldLabel htmlFor="email">
                        Email <span className="text-purple" aria-hidden="true">*</span>
                      </FieldLabel>
                      <input
                        id="email" type="email" required
                        value={formData.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder="tu@empresa.com"
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <FieldLabel htmlFor="company" optional>Empresa</FieldLabel>
                      <input
                        id="company" type="text"
                        value={formData.company}
                        onChange={(e) => set('company', e.target.value)}
                        placeholder="Nombre de tu empresa"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel htmlFor="note" optional>Nota adicional</FieldLabel>
                    <textarea
                      id="note" rows={3}
                      value={formData.note}
                      onChange={(e) => set('note', e.target.value)}
                      placeholder="Cuéntanos más sobre tu proyecto..."
                      className={textareaClass}
                    />
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Error */}
        {error && (
          <p role="alert" className="font-body text-sm text-red-600 mt-4 text-center">
            {error}
          </p>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <Button
            variant="ghost"
            onClick={() => goTo(step - 1)}
            disabled={step === 1}
            className="text-white/50 hover:text-white"
          >
            <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
            Anterior
          </Button>

          {step < 5 ? (
            <Button onClick={() => goTo(step + 1)} disabled={!canProceed()}>
              Siguiente
              <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed() || loading}>
              {loading ? (
                <>
                  <Loader2 size={16} strokeWidth={1.8} className="animate-spin" aria-hidden="true" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar cotización
                  <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
