export const PRODUCT_CONFIG = {
    gumroad: {
        baseUrl: process.env.NEXT_PUBLIC_GUMROAD_URL || 'https://gumroad.com/l',
        products: {
            1: 'prompt-1-starter',
            2: 'prompt-2-pro',
            3: 'prompt-3-biz',
            4: 'prompt-4-master',
            5: 'prompt-5-design',
            6: 'prompt-6-scale',
            7: 'prompt-7-agency',
            8: 'prompt-8-enterprise',
            9: 'prompt-9-ultimate',
        }
    },
    stripe: {
        baseUrl: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL || 'https://buy.stripe.com',
        products: {
            1: 'link_1',
            2: 'link_2',
            3: 'link_3',
            4: 'link_4',
            5: 'link_5',
            6: 'link_6',
            7: 'link_7',
            8: 'link_8',
            9: 'link_9',
        }
    }
}

export function getGumroadLink(id: number): string {
    const slug = PRODUCT_CONFIG.gumroad.products[id as keyof typeof PRODUCT_CONFIG.gumroad.products]
    return `${PRODUCT_CONFIG.gumroad.baseUrl}/${slug}`
}

export function getStripeLink(id: number): string {
    const slug = PRODUCT_CONFIG.stripe.products[id as keyof typeof PRODUCT_CONFIG.stripe.products]
    return `${PRODUCT_CONFIG.stripe.baseUrl}/${slug}`
}
