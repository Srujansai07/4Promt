import { POST } from '../src/app/api/webhook/gumroad/route'
import { NextRequest } from 'next/server'

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

describe('Gumroad Webhook', () => {
    it('processes valid purchase', async () => {
        const formData = new FormData()
        formData.append('email', 'test@gumroad.com')
        formData.append('product_id', 'prod_123')
        formData.append('permalink', 'prompt-3-biz')

        const req = new NextRequest('http://localhost/api/webhook/gumroad', {
            method: 'POST',
            body: formData
        })

        const res = await POST(req)
        const data = await res.json()

        expect(res.status).toBe(200)
        expect(data.success).toBe(true)

        const { kv } = require('@vercel/kv')
        expect(kv.hset).toHaveBeenCalledWith('user:test@gumroad.com', expect.objectContaining({
            'prompt:3': 'purchased',
            source: 'gumroad'
        }))

        const { sendPurchaseEmail } = require('@/lib/email')
        expect(sendPurchaseEmail).toHaveBeenCalledWith('test@gumroad.com', '3')
    })
})
