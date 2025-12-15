import { POST } from '../src/app/api/webhook/stripe/route'
import { NextRequest } from 'next/server'

describe('Stripe Webhook', () => {
    it('returns 200 for unhandled event types', async () => {
        const req = new NextRequest('http://localhost/api/webhook/stripe', {
            method: 'POST',
            body: JSON.stringify({ type: 'payment_intent.succeeded' })
        })
        const res = await POST(req)
        const data = await res.json()

        expect(res.status).toBe(200)
        expect(data).toEqual({ received: true })
    })

    it('processes checkout.session.completed', async () => {
        const req = new NextRequest('http://localhost/api/webhook/stripe', {
            method: 'POST',
            body: JSON.stringify({
                type: 'checkout.session.completed',
                data: {
                    object: {
                        customer_email: 'test@example.com',
                        metadata: { promptId: '1' }
                    }
                }
            })
        })
        const res = await POST(req)
        const data = await res.json()

        expect(res.status).toBe(200)
        expect(data.success).toBe(true)
    })

    it('handles invalid JSON gracefully', async () => {
        const req = new NextRequest('http://localhost/api/webhook/stripe', {
            method: 'POST',
            body: 'invalid-json'
        })
        const res = await POST(req)

        expect(res.status).toBe(500)
    })
})
