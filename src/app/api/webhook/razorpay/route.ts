// src/app/api/webhook/razorpay/route.ts
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
    try {
        const body = await request.text()
        const signature = request.headers.get('x-razorpay-signature')

        if (!signature) {
            return NextResponse.json({ error: 'No signature' }, { status: 400 })
        }

        // Verify webhook signature
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
        if (webhookSecret) {
            const expectedSignature = crypto
                .createHmac('sha256', webhookSecret)
                .update(body)
                .digest('hex')

            if (expectedSignature !== signature) {
                console.error('❌ Invalid Razorpay signature')
                return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
            }
        }

        const event = JSON.parse(body)
        console.log('✅ Razorpay Event:', event.event)

        // Handle payment success
        if (event.event === 'payment.captured' || event.event === 'payment_link.paid') {
            const payment = event.payload.payment.entity
            const email = payment.email
            const notes = payment.notes || {}
            const promptId = notes.promptId || '1'

            console.log('💰 Payment captured:', { email, promptId, amount: payment.amount / 100 })

            if (email && promptId) {
                try {
                    // TODO: When using Vercel KV, uncomment:
                    // await kv.hset(`user:${email}`, {
                    //     [`prompt:${promptId}`]: 'purchased',
                    //     [`purchase_date:${promptId}`]: new Date().toISOString(),
                    //     [`razorpay_payment_id:${promptId}`]: payment.id,
                    //     lastPurchase: new Date().toISOString(),
                    //     source: 'razorpay'
                    // })
                    // console.log('✅ Stored in KV')

                    // Track analytics
                    try {
                        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/analytics`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                event: 'purchase',
                                properties: { promptId, source: 'razorpay', amount: payment.amount / 100 },
                                userId: email
                            })
                        })
                    } catch (e) {
                        console.error('Analytics failed:', e)
                    }

                    console.log('✅ Razorpay purchase processed')

                } catch (error) {
                    console.error('❌ Post-payment processing failed:', error)
                }
            }
        }

        return NextResponse.json({ status: 'ok' })

    } catch (error) {
        console.error('❌ Razorpay webhook error:', error)
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
    }
}

export async function GET() {
    return NextResponse.json({
        status: 'Razorpay webhook endpoint active',
        timestamp: new Date().toISOString(),
        env: {
            hasWebhookSecret: !!process.env.RAZORPAY_WEBHOOK_SECRET
        }
    })
}
