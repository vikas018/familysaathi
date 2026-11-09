// Business configuration, sourced from public env vars with safe placeholder
// defaults. These are NEXT_PUBLIC_* so they're available on both server and
// client, and can be changed in Vercel without a code change.

export const BRAND = 'FamilySaathi'

export const config = {
  brand: BRAND,
  waNumber: process.env.NEXT_PUBLIC_WA_NUMBER || '910000000000',
  phone: process.env.NEXT_PUBLIC_PHONE || '+910000000000',
  email: process.env.NEXT_PUBLIC_EMAIL || 'hello@familysaathi.in',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.familysaathi.in',
}

/** Display form of the phone number, e.g. for the "placeholder" hint. */
export const phoneIsPlaceholder = config.phone === '+910000000000'
