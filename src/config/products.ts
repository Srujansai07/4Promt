// src/config/products.ts
export const PRODUCT_CONFIG = {
    gumroad: {
        baseUrl: 'https://gumroad.com/l',
        products: {
            1: 'promptos-starter',      // Free - Create on Gumroad anyway for tracking
            2: 'promptos-pro-builder',  // Free with form
            3: 'promptos-industry',     // $3
            4: 'promptos-universal',    // $4.30
            5: 'promptos-ultimate',     // $6.90
            6: 'promptos-master-pack',  // $12
            7: 'promptos-debug',        // Coming soon
            8: 'promptos-design',       // Coming soon
            9: 'promptos-launch',       // Coming soon
        }
    },
    stripe: {
        // Replace these with your actual Stripe Payment Links
        paymentLinks: {
            3: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK_3',
            4: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK_4',
            5: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK_5',
            6: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK_6',
        }
    },
    prices: {
        1: 0,
        2: 0,
        3: 3.00,
        4: 4.30,
        5: 6.90,
        6: 12.00,
        7: 4.00,
        8: 5.00,
        9: 5.00,
    }
}

export function getGumroadLink(promptId: number): string {
    const slug = PRODUCT_CONFIG.gumroad.products[promptId as keyof typeof PRODUCT_CONFIG.gumroad.products]
    return `${PRODUCT_CONFIG.gumroad.baseUrl}/${slug}`
}

export function getStripeLink(promptId: number): string {
    const link = PRODUCT_CONFIG.stripe.paymentLinks[promptId as keyof typeof PRODUCT_CONFIG.stripe.paymentLinks]
    if (!link) {
        console.error(`No Stripe link configured for prompt ${promptId}`)
        return '#'
    }
    return link
}

export function getPromptPrice(promptId: number): number {
    return PRODUCT_CONFIG.prices[promptId as keyof typeof PRODUCT_CONFIG.prices] || 0
}
