import { NextRequest, NextResponse } from 'next/server'

// Referral tracking store (replace with Vercel KV in production)
interface Referral {
    referrerId: string
    referredEmail: string
    level: number
    timestamp: string
}

const referrals: Referral[] = []
const userProgress: Record<string, { direct: number; total: number; unlocked: boolean }> = {}

// Generate a simple referral ID from email
function generateReferralId(email: string): string {
    return Buffer.from(email).toString('base64').slice(0, 12)
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { referrerId, email, action } = body

        if (action === 'register') {
            // Generate referral link for user
            const userId = generateReferralId(email)

            if (!userProgress[userId]) {
                userProgress[userId] = { direct: 0, total: 0, unlocked: false }
            }

            return NextResponse.json({
                success: true,
                referralId: userId,
                referralLink: `https://4-promt.vercel.app/?ref=${userId}`,
                progress: userProgress[userId]
            })
        }

        if (action === 'track' && referrerId) {
            // Track referral
            const newReferral: Referral = {
                referrerId,
                referredEmail: email,
                level: 1,
                timestamp: new Date().toISOString()
            }

            referrals.push(newReferral)

            // Update referrer's progress
            if (!userProgress[referrerId]) {
                userProgress[referrerId] = { direct: 0, total: 0, unlocked: false }
            }
            userProgress[referrerId].direct += 1
            userProgress[referrerId].total += 1

            // Check if user has enough referrals (3 direct + 6 indirect = 9 total)
            if (userProgress[referrerId].total >= 9) {
                userProgress[referrerId].unlocked = true
            }

            console.log('Referral tracked:', newReferral)
            console.log('User progress:', userProgress[referrerId])

            return NextResponse.json({
                success: true,
                message: 'Referral tracked',
                progress: userProgress[referrerId]
            })
        }

        return NextResponse.json(
            { error: 'Invalid action' },
            { status: 400 }
        )
    } catch (error) {
        console.error('Referral error:', error)
        return NextResponse.json(
            { error: 'Failed to process referral' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (userId && userProgress[userId]) {
        return NextResponse.json({
            progress: userProgress[userId]
        })
    }

    return NextResponse.json({
        totalReferrals: referrals.length,
        activeUsers: Object.keys(userProgress).length
    })
}
