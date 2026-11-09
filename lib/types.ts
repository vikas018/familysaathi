// Shared view-model types used by both the data layer and the UI components.

export type Driver = {
  name: string
  initials: string
  experience: string
  languages: string
  rating: string
  trips: number
  spec: string
  tags: string[]
  badges: string[]
  gradient: string
}

export type Faq = {
  question: string
  answer: string
}

export type EnquiryInput = {
  name: string
  phone: string
  service: string
  message?: string
}
