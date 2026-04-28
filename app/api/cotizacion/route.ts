import { NextRequest, NextResponse } from 'next/server'

/* ─── Payload ────────────────────────────────────────────────────── */
type CotizacionPayload = {
  // Step 1
  businessDesc:   string
  projectType:    string
  // Step 2 — web
  webPages?:      string
  webServices?:   string
  // Step 2 — tienda
  storeProducts?: string
  storePayments?: string
  // Step 2 — app
  appDesc?:       string
  appPrototype?:  string
  // Step 3
  metaBusiness:   string
  googleBusiness: string
  // Step 4
  pauta:          string
  // Step 5
  name:           string
  whatsapp:       string
  email:          string
  note?:          string
}

/* ─── Helpers ────────────────────────────────────────────────────── */
function row(label: string, value: string | undefined) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:10px 12px;color:#8A88A8;font-size:13px;white-space:nowrap;vertical-align:top;width:200px;">${label}</td>
      <td style="padding:10px 12px;font-weight:600;color:#0F0F1A;font-size:13px;">${value}</td>
    </tr>`
}

function section(title: string, rows: string) {
  return `
    <tr>
      <td colspan="2" style="padding:18px 12px 6px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5B3FE8;">
        ${title}
      </td>
    </tr>
    ${rows}
    <tr><td colspan="2" style="padding:0 12px;"><div style="height:1px;background:#EDE9FF;"></div></td></tr>`
}

function projectTypeLabel(t: string) {
  const map: Record<string, string> = {
    'web': 'Web', 'tienda': 'Tienda online',
    'app': 'App', 'los-tres': 'Web + Tienda + App',
  }
  return map[t] ?? t
}

/* ─── Email al equipo ────────────────────────────────────────────── */
function buildTeamEmail(d: CotizacionPayload): string {
  const step2Rows =
    d.projectType === 'web' ? `
      ${row('Páginas', d.webPages)}
      ${row('Servicios', d.webServices)}` :
    d.projectType === 'tienda' ? `
      ${row('Productos', d.storeProducts)}
      ${row('Pagos online', d.storePayments)}` :
    d.projectType === 'app' ? `
      ${row('Descripción app', d.appDesc)}
      ${row('Prototipo', d.appPrototype)}` :
    d.projectType === 'los-tres' ? `
      ${row('Páginas web', d.webPages)}
      ${row('Productos tienda', d.storeProducts)}
      ${row('Pagos online', d.storePayments)}` : ''

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F4F2FF;font-family:'DM Sans',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F2FF;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(91,63,232,.10);">

  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#5B3FE8 0%,#7B5FFF 100%);padding:32px 36px;">
      <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.6);">Nómadas Tech</p>
      <h1 style="margin:8px 0 4px;font-size:24px;font-weight:800;color:#ffffff;">Nueva cotización recibida</h1>
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,.75);">Un cliente llenó el formulario y está listo para hablar.</p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:28px 24px 8px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #EDE9FF;">

        ${section('Contacto', `
          ${row('Nombre', d.name)}
          ${row('WhatsApp', d.whatsapp)}
          ${row('Email', d.email)}`
        )}

        ${section('Su negocio', `
          ${row('Descripción', d.businessDesc)}
          ${row('Qué necesita', projectTypeLabel(d.projectType))}`
        )}

        ${step2Rows ? section('Detalles del proyecto', step2Rows) : ''}

        ${section('Presencia digital', `
          ${row('Meta Business Manager', d.metaBusiness)}
          ${row('Google My Business', d.googleBusiness)}`
        )}

        ${section('Pauta', `
          ${row('Publicidad pagada', d.pauta)}`
        )}

        ${d.note ? section('Nota', row('Mensaje', d.note)) : ''}

      </table>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td style="padding:24px 36px 36px;">
      <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}?text=Hola%20${encodeURIComponent(d.name ?? '')}%2C%20recibimos%20tu%20cotización%20en%20Nómadas%20Tech%20✌️"
         style="display:inline-block;background:#5B3FE8;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:14px;font-weight:700;">
        Responder por WhatsApp →
      </a>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="padding:20px 36px;border-top:1px solid #EDE9FF;text-align:center;font-size:12px;color:#B0AECE;">
      Nómadas Tech &bull; Marketing Digital 360° &bull; Colombia
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

/* ─── Email al cliente ───────────────────────────────────────────── */
function buildClientEmail(d: CotizacionPayload): string {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nomadas.tech'

  const summaryRows = [
    d.projectType    && row('Lo que necesitas', projectTypeLabel(d.projectType)),
    d.webPages       && row('Páginas', d.webPages),
    d.storeProducts  && row('Productos', d.storeProducts),
    d.appPrototype   && row('Prototipo app', d.appPrototype),
    d.metaBusiness   && row('Meta Business', d.metaBusiness),
    d.googleBusiness && row('Google My Business', d.googleBusiness),
    d.pauta          && row('Pauta', d.pauta),
  ].filter(Boolean).join('')

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F4F2FF;font-family:'DM Sans',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F2FF;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(91,63,232,.10);">

  <!-- Logo header -->
  <tr>
    <td style="background:#08080E;padding:28px 36px;text-align:center;">
      <img src="${siteUrl}/logo.png" alt="Nómadas Tech" height="36"
           style="height:36px;width:auto;display:inline-block;" />
    </td>
  </tr>

  <!-- Purple bar -->
  <tr>
    <td style="background:linear-gradient(135deg,#5B3FE8 0%,#7B5FFF 100%);padding:32px 36px;">
      <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#ffffff;">
        ¡Recibimos tu solicitud!
      </h1>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,.8);line-height:1.6;">
        Te contactamos en <strong>menos de 24 horas</strong> con una propuesta hecha a tu medida.
      </p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:32px 36px;">
      <p style="margin:0 0 16px;font-size:16px;color:#0F0F1A;line-height:1.6;">
        Hola <strong>${d.name}</strong>,
      </p>
      <p style="margin:0 0 24px;font-size:14px;color:#4A4870;line-height:1.7;">
        Gracias por confiar en <strong>Nómadas Tech</strong>. Ya tenemos tu información y nuestro equipo está
        revisando los detalles para prepararte una propuesta personalizada.
      </p>

      <!-- Summary box -->
      <div style="background:#F7F5FF;border:1px solid #EDE9FF;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5B3FE8;">
          Resumen de tu solicitud
        </p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row('Negocio', d.businessDesc.length > 80 ? d.businessDesc.slice(0, 80) + '…' : d.businessDesc)}
          ${summaryRows}
        </table>
      </div>

      <p style="margin:0 0 24px;font-size:14px;color:#4A4870;line-height:1.7;">
        ¿Tienes algo urgente? Escríbenos directamente por WhatsApp y te respondemos al toque.
      </p>

      <!-- WhatsApp CTA -->
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="border-radius:10px;overflow:hidden;">
            <a href="https://wa.me/${wa}?text=Hola%2C%20soy%20${encodeURIComponent(d.name ?? '')}%20y%20acabo%20de%20llenar%20el%20cotizador%20de%20Nómadas%20Tech"
               style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:14px 28px;font-size:14px;font-weight:700;border-radius:10px;">
              Escribir por WhatsApp
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="padding:20px 36px;border-top:1px solid #EDE9FF;text-align:center;font-size:12px;color:#B0AECE;line-height:1.6;">
      Nómadas Tech &bull; Marketing Digital 360° &bull; Colombia<br>
      <a href="${siteUrl}" style="color:#7B5FFF;text-decoration:none;">${siteUrl.replace('https://', '')}</a>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

/* ─── Route handler ──────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  let data: CotizacionPayload

  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 })
  }

  if (!data.name || !data.email || !data.whatsapp) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 422 })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const CONTACT_EMAIL  = process.env.CONTACT_EMAIL ?? 'hola@nomadas.tech'
  const FROM_EMAIL     = 'Nómadas Tech <onboarding@resend.dev>'

  // Dev mode: log and return success without sending
  if (!RESEND_API_KEY) {
    console.log('[Cotización — modo dev]', JSON.stringify(data, null, 2))
    return NextResponse.json({ success: true, dev: true })
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(RESEND_API_KEY)

    // Send both emails in parallel
    const [teamResult, clientResult] = await Promise.all([
      resend.emails.send({
        from:    FROM_EMAIL,
        to:      [CONTACT_EMAIL],
        subject: `Nueva cotización: ${data.name} — ${projectTypeLabel(data.projectType)}`,
        html:    buildTeamEmail(data),
      }),
      resend.emails.send({
        from:    FROM_EMAIL,
        to:      [data.email],
        replyTo: CONTACT_EMAIL,
        subject: 'Recibimos tu solicitud — Nómadas Tech',
        html:    buildClientEmail(data),
      }),
    ])

    if (teamResult.error || clientResult.error) {
      console.error('[Cotización] Error email equipo:', JSON.stringify(teamResult.error, null, 2))
      console.error('[Cotización] Error email cliente:', JSON.stringify(clientResult.error, null, 2))
      return NextResponse.json({ error: 'Error al enviar emails' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Cotización] Error inesperado:', JSON.stringify(err, null, 2))
    console.error('[Cotización] Error raw:', err)
    return NextResponse.json({ error: 'Error al enviar emails' }, { status: 500 })
  }
}
