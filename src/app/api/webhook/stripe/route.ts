import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { kv } from '@vercel/kv'
import { sendPurchaseEmail } from '@/lib/email'

// Initialize Stripe (placeholder key if env missing)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2024-11-20.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
    try {
        const body = await request.text()
        const signature = request.headers.get('stripe-signature')

        let event: Stripe.Event

        if (webhookSecret && signature) {
            try {
                event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
            } catch (err: any) {
                console.error(`⚠️  Webhook signature verification failed.`, err.message)
                return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
            }
        } else {
            console.warn('⚠️  Skipping signature verification (Missing secret or signature)')
            event = JSON.parse(body)
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session

            const email = session.customer_email
            const promptId = session.metadata?.promptId

            if (email && promptId) {
                console.log('Payment completed:', { email, promptId })

                // 1. Store purchase in Vercel KV
                try {
                    await kv.hset(`user:${email}`, {
                        [`prompt:${promptId}`]: 'purchased',
                        lastPurchase: new Date().toISOString()
                    })
                    console.log('Purchase stored in KV')
                } catch (kvError) {
                    console.error('KV Storage Error:', kvError)
                }

                // 2. Send confirmation email
                await sendPurchaseEmail(email, promptId)
                console.log('Confirmation email sent')
            }

            return NextResponse.json({
                success: true,
                message: 'Payment processed'
            })
        }

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json({
        status: 'Stripe webhook endpoint ready',
        timestamp: new Date().toISOString()
    })
}
