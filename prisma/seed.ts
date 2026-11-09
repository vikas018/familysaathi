// Seeds the database with the initial drivers & FAQs.
// Run with:  npm run db:seed   (after `npm run db:push`)
// Idempotent-ish: clears both tables first, then inserts in order.

import { PrismaClient } from '@prisma/client'
import { seedDrivers, seedFaqs } from '../lib/seed-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database…')

  await prisma.driver.deleteMany()
  await prisma.faq.deleteMany()

  await prisma.driver.createMany({
    data: seedDrivers.map((d, i) => ({ ...d, order: i })),
  })
  await prisma.faq.createMany({
    data: seedFaqs.map((f, i) => ({ ...f, order: i })),
  })

  const drivers = await prisma.driver.count()
  const faqs = await prisma.faq.count()
  console.log(`Seeded ${drivers} drivers and ${faqs} FAQs.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
