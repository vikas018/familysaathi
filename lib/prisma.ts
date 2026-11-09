// Prisma client singleton. Returns `null` when DATABASE_URL isn't configured,
// so the rest of the app can gracefully fall back to seed data instead of
// crashing. In dev we cache the client on globalThis to avoid exhausting
// connections during hot-reload.

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma: PrismaClient | null = process.env.DATABASE_URL
  ? globalForPrisma.prisma ?? new PrismaClient()
  : null

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalForPrisma.prisma = prisma
}
