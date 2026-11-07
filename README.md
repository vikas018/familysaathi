# FamilySaathi — Static Website

Verified drivers for your own car **+** trusted family assistance in **Meerut** and the
Delhi-NCR corridor. This is the Phase-1 **static** marketing / lead-generation site
(HTML + CSS + JS). It can be migrated to a dynamic **Next.js** app later.

## 📁 Structure

```
familysaathi/
├── index.html        # all page content & structure (single page)
├── css/styles.css    # all styling (brand colours, light/dark, responsive)
├── js/main.js        # interactivity: booking widget, driver search, FAQ, form
├── favicon.svg       # browser tab icon
└── README.md         # this file
```

## ▶️ Run locally

Just open `index.html` in a browser. For a proper local server (recommended):

```powershell
# Python
python -m http.server 5500
# then open http://localhost:5500

# or VS Code: right-click index.html → "Open with Live Server"
```

## ⚙️ Before going live — update these

Everything that needs changing is marked with `TODO` in `js/main.js`:

1. **WhatsApp number** — `WA_NUMBER` in `js/main.js`
   (country code + number, no `+` or spaces, e.g. `"919876543210"`).
2. **Phone number** — `PHONE` in `js/main.js`, plus the `tel:+910000000000` links
   and `+91-XXXXX-XXXXX` placeholders in `index.html`.
3. **Email** — replace `hello@familysaathi.in` placeholders in `index.html`.
4. **Pricing** — the ₹499 / ₹899 / ₹1,199 packages are *indicative*. Confirm real
   Meerut rates and update the Pricing section in `index.html`.
5. **Driver profiles & FAQs** — edit the `drivers` and `faqs` arrays in `js/main.js`.
6. **Driver photos** — profiles currently use coloured initials. Swap for real photos later.

## 🚀 Deploy (pick one — all free)

### GitHub Pages
1. Create a repo on GitHub (account **vikas018**), e.g. `familysaathi`.
2. From this folder:
   ```powershell
   git init
   git add .
   git commit -m "FamilySaathi static site"
   git branch -M main
   git remote add origin https://github.com/vikas018/familysaathi.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages** → Source = `main` branch, `/root` → Save.
   Live at `https://vikas018.github.io/familysaathi/`.

### Netlify / Vercel (drag & drop)
- Netlify: go to app.netlify.com → drag this folder onto the page. Done.
- Vercel: `vercel` CLI, or import the GitHub repo at vercel.com.

## 🔮 Making it dynamic later

The static structure maps cleanly onto Next.js:
- `index.html` sections → React components (Hero, Services, Pricing, Drivers, FAQ, Contact)
- `drivers` / `faqs` arrays in `main.js` → data from an API or CMS
- The WhatsApp enquiry form → a real backend endpoint (e.g. a `/api/enquiry` route)

## 🎨 Brand

| Role | Colour |
|------|--------|
| Primary (Deep Blue) | `#1E3A8A` |
| Secondary (Teal) | `#14B8A6` |
| Accent (Orange) | `#F97316` |

Light & dark themes supported automatically (and a manual toggle in the header).
