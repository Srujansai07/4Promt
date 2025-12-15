# ⚡ PromptOS

> The 9-Prompt Framework for Building AI Apps

**Live**: [https://4-promt.vercel.app](https://4-promt.vercel.app)

---

## 🎯 Features

### Pricing Tiers
| Tier | Name | Price | Unlock Method |
|------|------|-------|---------------|
| 1 | Starter Format | FREE | Instant |
| 2 | Pro Builder | FREE | Fill form |
| 3 | Industry Engineer | $3 | Pay or Referral |
| 4 | Universal Architecture | $4.30 | Stripe/Gumroad |
| 5 | A→Z Blueprint | $6.90 | Stripe/Gumroad |
| 6 | Master Pack | $12 | Stripe/Gumroad |
| 7-9 | Advanced | - | Coming Soon |

### Pages
- `/` - Landing page
- `/unlock?prompt=X` - Unlock page
- `/admin` - Admin dashboard (password: `promptos2024`)

### API Routes
- `GET /api/health` - System status
- `POST /api/submit-form` - Form submissions
- `POST /api/referral` - Referral tracking
- `POST /api/email` - Send emails
- `GET /api/analytics` - View analytics
- `POST /api/webhook/stripe` - Stripe webhooks

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
src/app/
├── page.tsx              # Landing page
├── unlock/page.tsx       # Unlock page
├── admin/page.tsx        # Admin dashboard
├── layout.tsx            # Root layout
├── globals.css           # Global styles
└── api/
    ├── health/route.ts       # Health check
    ├── submit-form/route.ts  # Form handler
    ├── referral/route.ts     # Referral system
    ├── email/route.ts        # Email sending
    ├── analytics/route.ts    # Analytics
    └── webhook/stripe/route.ts # Stripe webhooks
```

---

## ⚙️ Environment Variables

Create `.env.local`:

```env
# Stripe (for payments)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend (for emails)
RESEND_API_KEY=re_...

# Optional: Vercel KV (for persistence)
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

---

## 🔗 Setup Payment Links

1. Create Stripe products/prices
2. Create Gumroad products
3. Update links in `src/app/page.tsx`:
   - Search for `YOUR_STRIPE_LINK`
   - Search for `YOUR_GUMROAD`

---

## 📧 Email Templates

- `welcome` - New user welcome
- `unlock` - Prompt unlock confirmation
- `purchase` - Payment receipt

---

## 🎨 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide Icons
- Vercel Hosting

---

## 📊 Admin Dashboard

Access at `/admin` with password: `promptos2024`

View:
- System status
- Analytics events
- Referral stats

---

Built with ❤️ by PromptOS
