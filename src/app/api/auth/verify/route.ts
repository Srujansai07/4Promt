import { NextRequest, NextResponse } from 'next/server'
import { verifyMagicLinkToken } from '@/lib/kv-auth'
import { createSessionToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')

    if (!token) {
        return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    // 1. Verify and Burn Token
    const email = await verifyMagicLinkToken(token)

    if (!email) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }

    // 2. Create Session JWT
    const sessionToken = await createSessionToken({ email })

    // 3. Set Cookie
    cookies().set('session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
    })

    // 4. Redirect to Dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
}
