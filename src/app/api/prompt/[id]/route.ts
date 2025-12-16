import { NextRequest, NextResponse } from 'next/server';

// Prompt metadata (content is stored in PROMPT_CONTENT on the unlock page)
const PROMPTS = [
    { id: 1, name: 'Basic Prompt', price: 0, tier: 'free' },
    { id: 2, name: 'Form Filler', price: 0, tier: 'free' },
    { id: 3, name: 'Share-to-Unlock', price: 0, tier: 'share' },
    { id: 4, name: 'Architecture Format', price: 4.30, tier: 'paid' },
    { id: 5, name: 'Full Implementation', price: 6.90, tier: 'paid' },
    { id: 6, name: 'Master Prompt Pack', price: 12, tier: 'paid' },
    { id: 7, name: 'Debug & Optimize', price: 19, tier: 'coming_soon' },
    { id: 8, name: 'UI/UX Designer', price: 29, tier: 'coming_soon' },
    { id: 9, name: 'Launch & Scale', price: 49, tier: 'coming_soon' },
];

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const promptId = parseInt(params.id);
        const email = request.nextUrl.searchParams.get('email');

        // Validate prompt ID
        const prompt = PROMPTS.find(p => p.id === promptId);
        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt not found', unlocked: false },
                { status: 404 }
            );
        }

        // Check if prompt is coming soon
        if (prompt.tier === 'coming_soon') {
            return NextResponse.json({
                id: promptId,
                name: prompt.name,
                tier: prompt.tier,
                unlocked: false,
                message: 'This prompt is coming soon!'
            });
        }

        // Free prompts are always unlocked
        if (prompt.tier === 'free') {
            return NextResponse.json({
                id: promptId,
                name: prompt.name,
                tier: prompt.tier,
                unlocked: true,
                // Note: Actual content is served from the unlock page
                contentUrl: `/unlock?prompt=${promptId}`
            });
        }

        // Share-to-unlock prompt (Prompt 3)
        if (prompt.tier === 'share') {
            return NextResponse.json({
                id: promptId,
                name: prompt.name,
                tier: prompt.tier,
                unlockMethod: 'share',
                requiredShares: 3,
                contentUrl: `/unlock?prompt=${promptId}`
            });
        }

        // Paid prompts - check if email has purchased
        if (!email) {
            return NextResponse.json({
                id: promptId,
                name: prompt.name,
                tier: prompt.tier,
                price: prompt.price,
                unlocked: false,
                message: 'Email required to verify purchase'
            });
        }

        // TODO: Check purchase in database/KV store
        // For now, assume unlocked if email is provided
        // In production, this would verify against Vercel KV or database

        return NextResponse.json({
            id: promptId,
            name: prompt.name,
            tier: prompt.tier,
            unlocked: true,
            contentUrl: `/unlock?prompt=${promptId}`
        });

    } catch (error) {
        console.error('Prompt API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
