import { NextRequest, NextResponse } from 'next/server'

// Stripe webhook handler placeholder
// In production, use actual Stripe SDK

export async function POST(request: NextRequest) {
    try {
        const body = await request.text()
        const signature = request.headers.get('stripe-signature')

        // TODO: Verify Stripe signature
        // const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

        const event = JSON.parse(body)

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object

            // Extract purchase info
            const email = session.customer_email
            const promptId = session.metadata?.promptId

            console.log('Payment completed:', { email, promptId })

            // In production:
            // 1. Store purchase in Vercel KV
            // 2. Send confirmation email via Resend
            // 3. Generate magic link for unlock

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

// Health check
export async function GET() {
    return NextResponse.json({
        status: 'Stripe webhook endpoint ready',
        timestamp: new Date().toISOString()
    })
}
