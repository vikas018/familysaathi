// Data access layer. Reads drivers & FAQs from the database when available,
// and falls back to built-in seed data when there's no DB (or a query fails),
// so the site always renders. This is the bridge that lets the same build run
// before AND after Supabase is configured.

import { prisma } from './prisma'
import { seedDrivers, seedFaqs } from './seed-data'
import type { Driver, Faq } from './types'

export async function getDrivers(): Promise<Driver[]> {
  if (prisma) {
    try {
      const rows = await prisma.driver.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      })
      if (rows.length) {
        return rows.map((d) => ({
          name: d.name,
          initials: d.initials,
          experience: d.experience,
          languages: d.languages,
          rating: d.rating,
          trips: d.trips,
          spec: d.spec,
          tags: d.tags,
          badges: d.badges,
          gradient: d.gradient,
        }))
      }
    } catch (err) {
      console.error('[data] getDrivers DB error — using seed data:', err)
    }
  }
  return seedDrivers
}

export async function getFaqs(): Promise<Faq[]> {
  if (prisma) {
    try {
      const rows = await prisma.faq.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      })
      if (rows.length) {
        return rows.map((f) => ({ question: f.question, answer: f.answer }))
      }
    } catch (err) {
      console.error('[data] getFaqs DB error — using seed data:', err)
    }
  }
  return seedFaqs
}
