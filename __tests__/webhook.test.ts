import { POST } from '../src/app/api/webhook/stripe/route'
import { NextRequest } from 'next/server'

// Mock Stripe
jest.mock('stripe', () => {
    return jest.fn().mockImplementation(() => ({
        webhooks: {
            constructEvent: jest.fn((body, sig, secret) => {
                if (sig === 'invalid') throw new Error('Invalid signature')
                return JSON.parse(body)
            })
        }
    }))
})

// Mock Vercel KV
jest.mock('@vercel/kv', () => ({
    kv: {
        hset: jest.fn().mockResolvedValue(1)
    }
}))

// Mock Email
jest.mock('@/lib/email', () => ({
    sendPurchaseEmail: jest.fn().mockResolvedValue({ success: true })
}))

describe('Stripe Webhook', () => {
    const originalEnv = process.env

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...originalEnv, STRIPE_WEBHOOK_SECRET: 'whsec_test' }
    })

    afterAll(() => {
        process.env = originalEnv
    })

    it('returns 400 for invalid signature', async () => {
        const req = new NextRequest('http://localhost/api/webhook/stripe', {
            method: 'POST',
            headers: { 'stripe-signature': 'invalid' },
            body: JSON.stringify({ type: 'test' })
        })
        const res = await POST(req)
        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data.error).toBe('Invalid signature')
    })

    it('processes valid checkout.session.completed, stores in KV, and sends email', async () => {
        const req = new NextRequest('http://localhost/api/webhook/stripe', {
            method: 'POST',
            headers: { 'stripe-signature': 'valid' },
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

        const { kv } = require('@vercel/kv')
        expect(kv.hset).toHaveBeenCalled()

        const { sendPurchaseEmail } = require('@/lib/email')
        expect(sendPurchaseEmail).toHaveBeenCalled()
    })

    it('returns 200 even if KV storage fails (partial failure)', async () => {
        // Force KV failure
        const { kv } = require('@vercel/kv')
        kv.hset.mockRejectedValueOnce(new Error('KV Down'))

        const req = new NextRequest('http://localhost/api/webhook/stripe', {
            method: 'POST',
            headers: { 'stripe-signature': 'valid' },
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

        // Should still return success to Stripe so it doesn't retry indefinitely
        expect(res.status).toBe(200)
        expect(data.success).toBe(true)
    })
})
