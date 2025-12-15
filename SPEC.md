# PROMPTOS - Complete Specification Document

> Full spec saved for reference during implementation

## Quick Reference

### Pricing Tiers
| Tier | Name | Price |
|------|------|-------|
| 1 | Starter Format | $1 |
| 2 | Pro Builder Format | $2 |
| 3 | Industry Engineer Format | $3 |
| 4 | Universal Architecture | $4.30 |
| 5 | Ultimate A→Z Blueprint | $6.90 |
| 6 | Master Super Pack | $12 |
| 7 | Debug & Optimize | $4 |
| 8 | UI/UX Designer | $5 |
| 9 | Launch & Scale | $5 |

### Tech Stack
- **Frontend**: Next.js 14 + Tailwind CSS + shadcn/ui
- **Backend**: Vercel Serverless Functions
- **Database**: Vercel KV (Redis)
- **Payments**: Stripe + Gumroad
- **Email**: Resend
- **Hosting**: Vercel

### Pages
1. `/` - Landing Page
2. `/checkout?prompt=X` - Checkout Flow
3. `/unlock?email=XXX&prompt=X` - Unlock Page
4. `/dashboard?email=XXX` - User Dashboard
5. `/auth?token=XXX` - Magic Link Verification

### API Endpoints
1. `POST /api/create-checkout` - Create Stripe session
2. `POST /api/webhook/stripe` - Handle payment webhook
3. `POST /api/send-magic-link` - Send auth email
4. `GET /api/verify-token` - Verify JWT token
5. `GET /api/prompt/:id` - Get prompt content
6. `POST /api/track-share` - Track share-to-unlock

### Folder Structure
```
promptos/
├── app/
│   ├── page.tsx
│   ├── checkout/page.tsx
│   ├── unlock/page.tsx
│   ├── dashboard/page.tsx
│   ├── auth/page.tsx
│   └── api/...
├── components/
├── lib/
└── public/prompts/
```
