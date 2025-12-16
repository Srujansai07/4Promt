// src/config/products.ts - Indian Payment Gateway (Razorpay/UPI)

export const PRODUCT_CONFIG = {
    razorpay: {
        // Get these from: https://dashboard.razorpay.com/app/payment-pages
        paymentPages: {
            3: 'https://rzp.io/l/YOUR_LINK_TIER_3',
            4: 'https://rzp.io/l/YOUR_LINK_TIER_4',
            5: 'https://rzp.io/l/YOUR_LINK_TIER_5',
            6: 'https://rzp.io/l/YOUR_LINK_TIER_6',
        }
    },
    // INR Pricing
    prices: {
        1: 0,      // Free
        2: 0,      // Free
        3: 249,    // ~$3 USD
        4: 349,    // ~$4.30 USD
        5: 549,    // ~$6.90 USD
        6: 999,    // ~$12 USD
    }
}

// Archived: Stripe and Gumroad config moved to src/archive/

export function getRazorpayLink(promptId: number, email?: string): string {
    const link = PRODUCT_CONFIG.razorpay.paymentPages[promptId as keyof typeof PRODUCT_CONFIG.razorpay.paymentPages]

    if (!link) {
        console.error(`No Razorpay link configured for prompt ${promptId}`)
        return '#'
    }

    // Add email as query param if provided
    if (email) {
        return `${link}?prefill[email]=${encodeURIComponent(email)}`
    }

    return link
}

export function getPromptPrice(promptId: number): number {
    return PRODUCT_CONFIG.prices[promptId as keyof typeof PRODUCT_CONFIG.prices] || 0
}
