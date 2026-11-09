# FamilySaathi — Dynamic App

Verified drivers for your own car **+** trusted family assistance in **Meerut**
and the Delhi-NCR corridor. This is the **dynamic** version — a **Next.js** app
with a **Postgres (Supabase)** database behind the drivers, FAQs, and enquiry
capture. (Phase-1 was a static HTML/CSS/JS site; see git history.)

## 🧱 Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Prisma** ORM → **Supabase Postgres**
- Deployed on **Vercel** (serverless)
- Plain CSS (ported from the original), light/dark theme, fully responsive

## 📁 Structure

```
familysaathi/
├── app/
│   ├── layout.tsx         # root layout, SEO metadata, JSON-LD
│   ├── page.tsx           # home page (server component) — composes all sections
│   ├── globals.css        # all styling (brand colours, light/dark, responsive)
│   ├── icon.svg           # favicon
│   └── api/
│       ├── enquiry/route.ts   # POST — saves a lead to the DB
│       └── drivers/route.ts   # GET  — active drivers (DB + seed fallback)
├── components/            # client islands: Header, BookingWidget, Drivers,
│                          #   Faq, Contact, MoreBand, RevealObserver
├── lib/
│   ├── prisma.ts          # Prisma singleton (null when no DATABASE_URL)
│   ├── data.ts            # getDrivers()/getFaqs() — DB with seed fallback
│   ├── seed-data.ts       # initial drivers & FAQs (single source of truth)
│   ├── config.ts          # business details from NEXT_PUBLIC_* env
│   ├── whatsapp.ts        # WhatsApp deep-link helper
│   └── types.ts
├── prisma/
│   ├── schema.prisma      # Driver, Faq, Enquiry models
│   └── seed.ts            # seeds the DB from lib/seed-data.ts
└── .env.example
```

## ▶️ Run locally

```powershell
npm install
npm run dev        # http://localhost:3000
```

The site **works immediately without a database** — `lib/data.ts` falls back to
the built-in seed data, and the enquiry form still opens WhatsApp. Configure a
database (below) to make everything fully dynamic and to capture leads.

## 🗄️ Database setup (Supabase)

1. Create a project at [supabase.com](https://supabase.com).
2. **Project Settings → Database → Connection string** — copy both the **pooled**
   (port 6543) and **direct** (port 5432) strings.
3. Copy `.env.example` → `.env` and fill in:
   ```
   DATABASE_URL="…pooler…:6543/postgres?pgbouncer=true&connection_limit=1"
   DIRECT_URL="…:5432/postgres"
   ```
4. Create the tables and seed them:
   ```powershell
   npm run db:push     # create tables from schema.prisma
   npm run db:seed     # load the initial drivers & FAQs
   ```
5. (Optional) browse/edit data: `npm run db:studio`.

## ⚙️ Before going live — set these env vars

Public business details (safe for the browser). Set in `.env` locally and in
**Vercel → Project → Settings → Environment Variables**:

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_WA_NUMBER` | WhatsApp number (cc + number, no `+`/spaces) | `919876543210` |
| `NEXT_PUBLIC_PHONE` | Phone number | `+919876543210` |
| `NEXT_PUBLIC_EMAIL` | Contact email | `hello@familysaathi.in` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | `https://www.familysaathi.in` |

No code change needed — change the env var and redeploy.

## 🚀 Deploy (Vercel)

The repo is already connected to Vercel (GitHub integration). Every push to
`main` auto-deploys. Add the env vars above (plus `DATABASE_URL` / `DIRECT_URL`)
in the Vercel dashboard. `prisma generate` runs automatically on install.

## 🔌 How "dynamic" works

- **Drivers & FAQs** render from the database at request time (home page is
  `force-dynamic`), so edits appear without a redeploy. No DB? → seed fallback.
- **Enquiries** POST to `/api/enquiry`, get validated and saved to the `Enquiry`
  table, *and* still open a pre-filled WhatsApp chat — leads are captured even if
  WhatsApp is the customer's preferred channel.

## 🎨 Brand

| Role | Colour |
|------|--------|
| Primary (Deep Blue) | `#1E3A8A` |
| Secondary (Teal) | `#14B8A6` |
| Accent (Orange) | `#F97316` |

Light & dark themes supported automatically (with a manual toggle, persisted).
