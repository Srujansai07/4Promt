// src/app/api/webhook/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'

// Note: Full Stripe SDK integration requires: npm install stripe
// For now, this is a simplified webhook handler

interface StripeEvent {
    type: string
    data: {
        object: {
            customer_details?: { email?: string }
            customer_email?: string
            metadata?: { promptId?: string }
            id?: string
        }
    }
}

export async function POST(req: NextRequest) {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // In production, verify signature with Stripe SDK:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    // const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)

    try {
        const event: StripeEvent = JSON.parse(body)
        console.log('✅ Stripe Event:', event.type)

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object

                const email = session.customer_details?.email || session.customer_email
                const promptId = session.metadata?.promptId

                if (!email || !promptId) {
                    console.error('Missing email or promptId in session')
                    return NextResponse.json({ received: true })
                }

                console.log('💳 Payment completed:', { email, promptId })

                // TODO: When using Vercel KV, uncomment:
                // await kv.hset(`user:${email}`, {
                //     [`prompt:${promptId}`]: 'purchased',
                //     [`purchase_date:${promptId}`]: new Date().toISOString(),
                //     lastPurchase: new Date().toISOString(),
                //     source: 'stripe'
                // })

                // TODO: Send email
                // await sendPurchaseEmail(email, promptId)

                console.log('✅ Purchase processed')
                break
            }

            case 'payment_intent.succeeded': {
                console.log('💰 Payment intent succeeded:', event.data.object.id)
                break
            }

            case 'payment_intent.payment_failed': {
                console.error('❌ Payment failed:', event.data.object.id)
                break
            }

            default:
                console.log(`Unhandled event type: ${event.type}`)
        }

        return NextResponse.json({ received: true })

    } catch (error) {
        console.error('❌ Webhook error:', error)
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 400 }
        )
    }
}

export async function GET() {
    return NextResponse.json({
        status: 'Stripe webhook endpoint active',
        timestamp: new Date().toISOString(),
        env: {
            hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
            hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET
        }
    })
}
