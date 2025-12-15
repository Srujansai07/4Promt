import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        app: 'PromptOS',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            submitForm: '/api/submit-form',
            referral: '/api/referral',
            stripeWebhook: '/api/webhook/stripe'
        }
    })
}
