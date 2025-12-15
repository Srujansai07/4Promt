# PromptOS

> The 9-Prompt Framework for Building AI Apps

A Gen-Z aesthetic web platform for selling AI prompt packs with Stripe and Gumroad integration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔧 Setup

### 1. Payment Links

Update the payment links in `src/app/page.tsx`:

```typescript
// Line ~590 - Update with your actual links
const stripeLink = `https://buy.stripe.com/YOUR_STRIPE_LINK_${prompt.id}`
const gumroadLink = `https://YOUR_GUMROAD.gumroad.com/l/prompt${prompt.id}`
```

### 2. Environment Variables (for future features)

Create `.env.local`:

```env
# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Resend (Email)
RESEND_API_KEY=re_xxx

# JWT Secret
JWT_SECRET=your-secret-key

# Vercel KV
KV_URL=xxx
KV_REST_API_TOKEN=xxx
```

### 3. Add Your Prompts

Update the prompt content in `src/app/unlock/page.tsx`:

```typescript
const PROMPT_CONTENT = {
  1: {
    name: 'Starter Format',
    icon: '🌱',
    content: `YOUR ACTUAL PROMPT 1 HERE`
  },
  // ... rest of prompts
}
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css     # Global styles + Tailwind
│   ├── layout.tsx      # Root layout + metadata
│   ├── page.tsx        # Landing page
│   └── unlock/
│       └── page.tsx    # Prompt unlock page
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Hosting**: Vercel
- **Payments**: Stripe + Gumroad

## 📊 Pricing Tiers

| Tier | Name | Price |
|------|------|-------|
| 1 | Starter Format | $1 |
| 2 | Pro Builder Format | $2 |
| 3 | Industry Engineer | $3 |
| 4 | Universal Architecture | $4.30 |
| 5 | Ultimate A→Z Blueprint | $6.90 |
| 6 | Master Super Pack | $12 |
| 7 | Debug & Optimize | $4 |
| 8 | UI/UX Designer | $5 |
| 9 | Launch & Scale | $5 |

## 🔗 Links

- Live Site: https://4-promt.vercel.app
- GitHub: https://github.com/Srujansai07/4Promt

---

Built with ❤️ and AI
