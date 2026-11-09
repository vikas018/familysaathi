import { NextResponse } from 'next/server'
import { getDrivers } from '@/lib/data'

// GET /api/drivers — the active driver list (DB-backed, seed fallback).
// Handy for future client-side refresh or an external integration.
export async function GET() {
  const drivers = await getDrivers()
  return NextResponse.json({ drivers })
}
