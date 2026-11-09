import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/enquiry — capture a lead. Validates input and saves to the DB when
// one is configured. Always returns 200 on valid input so the client can
// proceed to open WhatsApp even if persistence is unavailable.
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phoneDigits =
    typeof body.phone === 'string' ? body.phone.replace(/\D/g, '') : ''
  const service = typeof body.service === 'string' ? body.service.trim() : ''
  const message =
    typeof body.message === 'string' && body.message.trim()
      ? body.message.trim().slice(0, 2000)
      : null

  if (!name || phoneDigits.length < 10 || !service) {
    return NextResponse.json(
      { ok: false, error: 'Missing or invalid fields' },
      { status: 400 },
    )
  }

  if (prisma) {
    try {
      await prisma.enquiry.create({
        data: { name, phone: phoneDigits, service, message },
      })
      return NextResponse.json({ ok: true, saved: true })
    } catch (err) {
      console.error('[api/enquiry] DB error:', err)
      // Fall through — treat as accepted; WhatsApp remains the primary channel.
    }
  }

  return NextResponse.json({ ok: true, saved: false })
}
