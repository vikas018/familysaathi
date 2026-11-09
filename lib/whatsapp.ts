// Build a WhatsApp deep link with a pre-filled message. The whole ordering
// philosophy in one function — no cart, no backend, just a message.

import { config, BRAND } from './config'

export function waLink(message?: string): string {
  const text = message || `Hi ${BRAND}, I'd like to know more.`
  return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(text)}`
}
