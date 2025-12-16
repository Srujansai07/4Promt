import { NextRequest, NextResponse } from 'next/server';

// Simple JWT-like token generation (for demo purposes)
// In production, use a proper JWT library like jose
function generateToken(email: string): string {
    const payload = {
        email,
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        jti: Math.random().toString(36).substring(2, 15)
    };
    // Base64 encode the payload
    return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        // Validate email
        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { success: false, message: 'Valid email is required' },
                { status: 400 }
            );
        }

        // Generate magic link token
        const token = generateToken(email);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://4-promt.vercel.app';
        const magicLink = `${baseUrl}/api/auth/verify?token=${token}`;

        // Check if Resend API key is configured
        const resendApiKey = process.env.RESEND_API_KEY;

        if (resendApiKey) {
            // Send email using Resend
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'PromptOS <noreply@resend.dev>',
                    to: email,
                    subject: '🔓 Your PromptOS Magic Link',
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #7c3aed;">PromptOS</h1>
              <p>Click the button below to access your prompts:</p>
              <a href="${magicLink}" style="
                display: inline-block;
                background: linear-gradient(to right, #7c3aed, #ec4899);
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                margin: 20px 0;
              ">Access My Prompts</a>
              <p style="color: #666; font-size: 14px;">
                This link expires in 24 hours.<br>
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
          `,
                }),
            });

            if (!response.ok) {
                console.error('Resend API error:', await response.text());
                return NextResponse.json(
                    { success: false, message: 'Failed to send email' },
                    { status: 500 }
                );
            }
        } else {
            // For development without Resend key - log the link
            console.log('Magic Link (dev mode):', magicLink);
        }

        return NextResponse.json({
            success: true,
            message: 'Check your email for the magic link',
            // Include link in dev mode for testing
            ...(process.env.NODE_ENV === 'development' && { devLink: magicLink })
        });

    } catch (error) {
        console.error('Magic link error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
