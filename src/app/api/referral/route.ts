// src/app/api/referral/route.ts
import { NextRequest, NextResponse } from 'next/server'

// Referral progress interface
interface ReferralProgress {
    email: string
    referralId: string
    directReferrals: number
    totalReferrals: number
    unlocked: boolean
    referralLink: string
    referredBy?: string
}

// Generate a unique referral ID
function generateReferralId(): string {
    return Math.random().toString(36).substring(2, 10)
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, action, referrerId } = body

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            )
        }

        // Action: Create new referral account
        if (action === 'create') {
            const referralId = generateReferralId()
            const referralLink = `${process.env.NEXT_PUBLIC_APP_URL}/?ref=${referralId}`

            // TODO: When using Vercel KV, store referral data:
            // await kv.hset(`referral:${referralId}`, {
            //     email,
            //     referralId,
            //     directReferrals: 0,
            //     totalReferrals: 0,
            //     unlocked: false,
            //     createdAt: new Date().toISOString()
            // })

            console.log('📝 Created referral:', { email, referralId })

            return NextResponse.json({
                success: true,
                referralId,
                referralLink,
                progress: {
                    email,
                    referralId,
                    directReferrals: 0,
                    totalReferrals: 0,
                    unlocked: false,
                    referralLink
                }
            })
        }

        // Action: Track a referral
        if (action === 'track' && referrerId) {
            console.log('📊 Tracking referral:', { referrerId, newUser: email })

            // TODO: When using Vercel KV:
            // 1. Increment referrer's count
            // 2. Set referred_by on new user
            // 3. Check if unlocked (9+ referrals)

            return NextResponse.json({
                success: true,
                message: 'Referral tracked',
                progress: {
                    email,
                    referralId: referrerId,
                    directReferrals: 1,
                    totalReferrals: 1,
                    unlocked: false,
                    referralLink: `${process.env.NEXT_PUBLIC_APP_URL}/?ref=${referrerId}`
                }
            })
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

    } catch (error) {
        console.error('❌ Referral error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (userId) {
            // TODO: Fetch from Vercel KV
            // const data = await kv.hgetall(`referral:${userId}`)

            const progress: ReferralProgress = {
                email: '',
                referralId: userId,
                directReferrals: 0,
                totalReferrals: 0,
                unlocked: false,
                referralLink: `${process.env.NEXT_PUBLIC_APP_URL}/?ref=${userId}`
            }

            return NextResponse.json({ progress })
        }

        // Get global stats
        return NextResponse.json({
            totalUsers: 0,
            totalUnlocked: 0
        })

    } catch (error) {
        console.error('❌ Referral GET error:', error)
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }
}
