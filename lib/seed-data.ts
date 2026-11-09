// Single source of truth for the initial drivers & FAQs.
// Used by `prisma/seed.ts` to populate the database, AND by `lib/data.ts` as a
// graceful fallback so the site renders fully before a database is configured.
// Ported verbatim from the original static site's js/main.js.

import type { Driver, Faq } from './types'

export const seedDrivers: Driver[] = [
  {
    name: 'Rajesh Kumar',
    initials: 'RK',
    experience: '12 yrs experience',
    languages: 'Hindi & English',
    rating: '4.9',
    trips: 250,
    spec: 'Senior Citizen Assistance',
    tags: ['driver', 'senior'],
    badges: ['Aadhaar', 'Police', 'DL'],
    gradient: 'linear-gradient(135deg,#1E3A8A,#14B8A6)',
  },
  {
    name: 'Amit Verma',
    initials: 'AV',
    experience: '10 yrs experience',
    languages: 'Hindi & English',
    rating: '4.9',
    trips: 320,
    spec: 'Outstation & Airport (Delhi-NCR)',
    tags: ['driver', 'outstation'],
    badges: ['Aadhaar', 'Police', 'DL'],
    gradient: 'linear-gradient(135deg,#1d4ed8,#1E3A8A)',
  },
  {
    name: 'Manoj Tyagi',
    initials: 'MT',
    experience: '15 yrs experience',
    languages: 'Hindi & English',
    rating: '5.0',
    trips: 410,
    spec: 'Weddings & Functions',
    tags: ['driver', 'wedding', 'outstation'],
    badges: ['Aadhaar', 'Police', 'DL'],
    gradient: 'linear-gradient(135deg,#0f766e,#14B8A6)',
  },
  {
    name: 'Sunita Devi',
    initials: 'SD',
    experience: '8 yrs experience',
    languages: 'Hindi',
    rating: '4.8',
    trips: 180,
    spec: 'Hospital & Diagnostic Help',
    tags: ['senior'],
    badges: ['Aadhaar', 'Police', 'Address'],
    gradient: 'linear-gradient(135deg,#14B8A6,#0f766e)',
  },
  {
    name: 'Pooja Sharma',
    initials: 'PS',
    experience: '6 yrs experience',
    languages: 'Hindi & English',
    rating: '4.7',
    trips: 140,
    spec: 'Banking & Govt Errands',
    tags: ['senior'],
    badges: ['Aadhaar', 'Police', 'Address'],
    gradient: 'linear-gradient(135deg,#F97316,#ea6a0c)',
  },
  {
    name: 'Kavita Singh',
    initials: 'KS',
    experience: '9 yrs experience',
    languages: 'Hindi',
    rating: '4.8',
    trips: 210,
    spec: 'Parent Care & Companionship',
    tags: ['senior'],
    badges: ['Aadhaar', 'Police', 'Emergency'],
    gradient: 'linear-gradient(135deg,#1E3A8A,#1d4ed8)',
  },
]

export const seedFaqs: Faq[] = [
  {
    question: 'Do your drivers drive my own car?',
    answer:
      "Yes — our drivers drive your car. We don't provide the vehicle. Ideal when you own a car but need a trained, trusted driver for a few hours or a full outstation trip.",
  },
  {
    question: 'Are your drivers verified?',
    answer:
      'Every saathi passes 5-point verification — Aadhaar, licence, police, address and emergency contact — plus an in-person interview, re-verified every 6 months.',
  },
  {
    question: 'Can I talk to a driver before booking?',
    answer:
      "Yes — that's our 'Talk Before Booking' promise. View the profile, read reviews and have a short intro call before you confirm.",
  },
  {
    question: 'Do you go outstation to Delhi-NCR?',
    answer:
      'Yes — one-way and round-trip runs to Delhi, Noida and Ghaziabad (airports, hospitals, offices) via the Delhi–Meerut Expressway, in your own car.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'In-city uses simple hourly packages (4h/8h/12h). Outstation, night and one-way have clear add-ons. Your exact fare is always confirmed before you book.',
  },
  {
    question: 'Can you help my parents when I live away?',
    answer:
      "That's exactly why we exist — hospital visits, medicines, bills, banking and companionship, with updates after every visit and the same trusted saathi each time.",
  },
]
