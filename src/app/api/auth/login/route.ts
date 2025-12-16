import { NextRequest, NextResponse } from 'next/server'
import { sendMagicLinkEmail, checkEmailRateLimit } from '@/lib/email'
import { storeMagicLinkToken } from '@/lib/kv-auth'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        // 1. Rate Limit
        const { allowed } = checkEmailRateLimit(email)
        if (!allowed) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
        }

        // 2. Generate Token (UUID)
        const token = randomUUID()

        // 3. Store in KV
        await storeMagicLinkToken(token, email)

        // 4. Send Email
        const result = await sendMagicLinkEmail(email, token)

        if (!result.success) {
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Login Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
