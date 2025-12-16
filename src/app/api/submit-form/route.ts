// src/app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, promptId } = body

        // Validation
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            )
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        const finalPromptId = promptId || 2 // Default to Tier 2

        console.log('📝 Form submission:', { name, email, promptId: finalPromptId })

        try {
            // TODO: When using Vercel KV, uncomment:
            // await kv.hset(`user:${email}`, {
            //     name,
            //     email,
            //     [`prompt:${finalPromptId}`]: 'unlocked',
            //     [`unlock_date:${finalPromptId}`]: new Date().toISOString(),
            //     source: 'form',
            //     lastActivity: new Date().toISOString()
            // })
            // console.log('✅ Stored in KV')

            // TODO: Store submission for admin tracking
            // await kv.lpush('submissions', JSON.stringify({
            //     name,
            //     email,
            //     promptId: finalPromptId,
            //     timestamp: new Date().toISOString()
            // }))

            // TODO: Send email
            // await sendFormUnlockEmail(email, name, finalPromptId.toString())
            // console.log('✅ Email sent')

            console.log('✅ Form processed successfully')

            return NextResponse.json({
                success: true,
                message: 'Prompt unlocked successfully!',
                unlockUrl: `/unlock?prompt=${finalPromptId}&email=${encodeURIComponent(email)}`
            })

        } catch (storageError) {
            console.error('❌ Storage error:', storageError)
            return NextResponse.json(
                { error: 'Failed to store data' },
                { status: 500 }
            )
        }

    } catch (error) {
        console.error('❌ Form submission error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        // TODO: When using Vercel KV:
        // const count = await kv.llen('submissions')
        // const recent = await kv.lrange('submissions', 0, 9)

        return NextResponse.json({
            totalSubmissions: 0,
            recentSubmissions: [],
            status: 'Form submission endpoint active'
        })

    } catch (error) {
        console.error('❌ Form GET error:', error)
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }
}
