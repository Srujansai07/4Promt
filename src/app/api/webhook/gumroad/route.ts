import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { sendPurchaseEmail } from '@/lib/email'

// Gumroad sends form-encoded data, not JSON
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const productId = formData.get('product_id') as string
        const permalink = formData.get('permalink') as string // e.g. "prompt-3-biz"

        // Verify logic (Gumroad doesn't use signatures like Stripe, but we can check product_id)
        // In production, you might want to verify the request IP or use a secret in the URL

        console.log('Gumroad purchase:', { email, productId, permalink })

        if (email) {
            // Map permalink to prompt ID (simple heuristic or lookup)
            // For now, we'll extract ID from permalink "prompt-X-..."
            const match = permalink?.match(/prompt-(\d+)/)
            const promptId = match ? match[1] : 'unknown'

            // 1. Store in KV
            try {
                await kv.hset(`user:${email}`, {
                    [`prompt:${promptId}`]: 'purchased',
                    source: 'gumroad',
                    lastPurchase: new Date().toISOString()
                })
            } catch (e) {
                console.error('KV Error:', e)
            }

            // 2. Send Email
            if (promptId !== 'unknown') {
                await sendPurchaseEmail(email, promptId)
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Gumroad Webhook Error:', error)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
