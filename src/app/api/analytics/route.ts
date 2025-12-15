import { NextRequest, NextResponse } from 'next/server'

// Simple analytics tracking
// In production: Use Vercel Analytics, Plausible, or PostHog

interface AnalyticsEvent {
    event: string
    properties?: Record<string, string | number>
    userId?: string
    timestamp?: string
}

const events: AnalyticsEvent[] = []

export async function POST(request: NextRequest) {
    try {
        const body: AnalyticsEvent = await request.json()

        const event: AnalyticsEvent = {
            ...body,
            timestamp: new Date().toISOString()
        }

        events.push(event)
        console.log('Analytics event:', event)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Analytics error:', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}

export async function GET() {
    // Return analytics summary
    const summary = {
        totalEvents: events.length,
        eventCounts: events.reduce((acc, e) => {
            acc[e.event] = (acc[e.event] || 0) + 1
            return acc
        }, {} as Record<string, number>),
        recentEvents: events.slice(-10)
    }

    return NextResponse.json(summary)
}
