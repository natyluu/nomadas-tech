import { NextRequest, NextResponse } from 'next/server'

type ContactPayload = {
  name:    string
  email:   string
  message: string
}

export async function POST(req: NextRequest) {
  let data: ContactPayload

  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 })
  }

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 422 })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const CONTACT_EMAIL  = process.env.CONTACT_EMAIL ?? 'hola@nomadas.tech'

  if (!RESEND_API_KEY) {
    console.log('[Contacto recibido — modo dev]', data)
    return NextResponse.json({ success: true, dev: true })
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(RESEND_API_KEY)

    await resend.emails.send({
      from:    'Nómadas Tech <noreply@nomadas.tech>',
      to:      [CONTACT_EMAIL],
      subject: `Contacto web: ${data.name}`,
      html:    `
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Mensaje:</strong> ${data.message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contacto] Error enviando email:', err)
    return NextResponse.json({ error: 'Error al enviar email' }, { status: 500 })
  }
}
