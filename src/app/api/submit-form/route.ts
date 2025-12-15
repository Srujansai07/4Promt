import { NextRequest, NextResponse } from 'next/server'

// In-memory store (replace with Vercel KV or database in production)
const submissions: Array<{
    name: string
    email: string
    promptId: number
    timestamp: string
}> = []

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, promptId } = body

        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            )
        }

        // Store submission
        const submission = {
            name,
            email,
            promptId: promptId || 2,
            timestamp: new Date().toISOString()
        }

        submissions.push(submission)

        // In production, you would:
        // 1. Store in Vercel KV: await kv.lpush('submissions', JSON.stringify(submission))
        // 2. Send welcome email via Resend
        // 3. Generate unlock token

        console.log('New form submission:', submission)

        return NextResponse.json({
            success: true,
            message: 'Prompt unlocked successfully!',
            unlockUrl: `/unlock?prompt=${promptId}&email=${encodeURIComponent(email)}`
        })
    } catch (error) {
        console.error('Form submission error:', error)
        return NextResponse.json(
            { error: 'Failed to process submission' },
            { status: 500 }
        )
    }
}

export async function GET() {
    // Return count for admin purposes
    return NextResponse.json({
        totalSubmissions: submissions.length
    })
}
