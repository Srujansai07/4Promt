import { getGumroadLink, getStripeLink } from '../src/config/products'

describe('Product Config', () => {
    it('generates correct Gumroad links', () => {
        expect(getGumroadLink(1)).toBe('https://gumroad.com/l/prompt-1-starter')
        expect(getGumroadLink(9)).toBe('https://gumroad.com/l/prompt-9-ultimate')
    })

    it('generates correct Stripe links', () => {
        expect(getStripeLink(1)).toBe('https://buy.stripe.com/link_1')
    })
})
