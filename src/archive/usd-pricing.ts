// ARCHIVED: Stripe/Gumroad USD Pricing
// This file is kept for reference - use Razorpay for Indian payments

// USD Pricing (for Stripe/Gumroad international payments)
export const USD_PRICING = {
    3: { usd: 3.00, label: '$3.00' },
    4: { usd: 4.30, label: '$4.30' },
    5: { usd: 6.90, label: '$6.90' },
    6: { usd: 12.00, label: '$12.00' },
}

// Stripe Payment Links (ARCHIVED - replace with real links if needed)
export const STRIPE_CONFIG = {
    paymentLinks: {
        3: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK_3',
        4: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK_4',
        5: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK_5',
        6: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK_6',
    }
}

// Gumroad Product Slugs (ARCHIVED)
export const GUMROAD_CONFIG = {
    baseUrl: 'https://gumroad.com/l',
    products: {
        1: 'promptos-starter',
        2: 'promptos-pro-builder',
        3: 'promptos-industry',
        4: 'promptos-universal',
        5: 'promptos-ultimate',
        6: 'promptos-master-pack',
    }
}

// To re-enable Stripe/Gumroad:
// 1. Copy this config to src/config/products.ts
// 2. Move webhook handlers from src/archive/ back to src/app/api/webhook/
// 3. Update .env.local with Stripe/Gumroad credentials
