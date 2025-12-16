// src/lib/email.ts
import { Resend } from 'resend'

// Lazy initialization to avoid build-time errors when RESEND_API_KEY is not set
let resend: Resend | null = null
function getResend(): Resend {
    if (!resend) {
        resend = new Resend(process.env.RESEND_API_KEY || '')
    }
    return resend
}
const FROM_EMAIL = 'PromptOS <onboarding@resend.dev>' // Use your verified domain

// Simple in-memory rate limiting for emails
const emailRateLimits = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_MAX = 5 // Max emails per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in ms

export function checkEmailRateLimit(email: string): { allowed: boolean; remainingAttempts: number } {
    const now = Date.now()
    const limit = emailRateLimits.get(email)

    if (!limit || now > limit.resetTime) {
        // Reset or create new rate limit entry
        emailRateLimits.set(email, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
        return { allowed: true, remainingAttempts: RATE_LIMIT_MAX - 1 }
    }

    if (limit.count >= RATE_LIMIT_MAX) {
        return { allowed: false, remainingAttempts: 0 }
    }

    limit.count++
    return { allowed: true, remainingAttempts: RATE_LIMIT_MAX - limit.count }
}

// Email Templates
const getPromptName = (promptId: string): string => {
    const names: Record<string, string> = {
        '1': 'Starter Format',
        '2': 'Pro Builder Format',
        '3': 'Industry Engineer Format',
        '4': 'Universal Architecture',
        '5': 'Ultimate A→Z Blueprint',
        '6': 'Master Super Pack',
    }
    return names[promptId] || `Prompt #${promptId}`
}

export async function sendPurchaseEmail(email: string, promptId: string) {
    const promptName = getPromptName(promptId)
    const unlockUrl = `${process.env.NEXT_PUBLIC_APP_URL}/unlock?prompt=${promptId}&email=${encodeURIComponent(email)}`

    try {
        const { data, error } = await getResend().emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: `🎉 Your ${promptName} is Ready!`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { background: linear-gradient(135deg, #0ea5e9, #a855f7); padding: 40px; border-radius: 12px 12px 0 0; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { background: #f8fafc; padding: 40px; border-radius: 0 0 12px 12px; }
        .button { display: inline-block; background: #0ea5e9; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { text-align: center; margin-top: 40px; color: #64748b; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚡ Purchase Successful!</h1>
        </div>
        <div class="content">
            <p>Hi there! 👋</p>
            <p>Thank you for purchasing <strong>${promptName}</strong> from PromptOS!</p>
            <p>Your prompt is ready to use. Click the button below to access it:</p>
            <p style="text-align: center;">
                <a href="${unlockUrl}" class="button">🚀 Access Your Prompt</a>
            </p>
            <p><strong>What's next?</strong></p>
            <ul>
                <li>Copy the prompt to your clipboard</li>
                <li>Open ChatGPT, Claude, or any AI tool</li>
                <li>Paste and start building!</li>
            </ul>
            <p>Need help? Reply to this email anytime.</p>
            <p>Happy building! 🛠️<br><strong>The PromptOS Team</strong></p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} PromptOS. All rights reserved.</p>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL}">Visit PromptOS</a></p>
        </div>
    </div>
</body>
</html>
            `
        })

        if (error) {
            console.error('❌ Email error:', error)
            throw error
        }

        console.log('✅ Email sent:', data?.id)
        return { success: true, id: data?.id }

    } catch (error) {
        console.error('❌ Failed to send email:', error)
        return { success: false, error }
    }
}

export async function sendMagicLinkEmail(email: string, token: string) {
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`

    try {
        const { data, error } = await getResend().emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: '✨ Your Magic Login Link',
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .content { background: #f8fafc; padding: 40px; border-radius: 12px; }
        .button { display: inline-block; background: #0ea5e9; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h2>🔐 Login to PromptOS</h2>
            <p>Click the button below to log in. This link expires in 15 minutes.</p>
            <p style="text-align: center;">
                <a href="${magicLink}" class="button">🚀 Log In</a>
            </p>
            <p style="color: #64748b; font-size: 14px;">If you didn't request this link, you can safely ignore this email.</p>
        </div>
    </div>
</body>
</html>
            `
        })

        if (error) {
            console.error('❌ Magic link email error:', error)
            throw error
        }

        console.log('✅ Magic link sent:', data?.id)
        return { success: true, id: data?.id }

    } catch (error) {
        console.error('❌ Failed to send magic link:', error)
        return { success: false, error }
    }
}

export async function sendFormUnlockEmail(email: string, name: string, promptId: string) {
    const promptName = getPromptName(promptId)
    const unlockUrl = `${process.env.NEXT_PUBLIC_APP_URL}/unlock?prompt=${promptId}&email=${encodeURIComponent(email)}`

    try {
        const { data, error } = await getResend().emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: `🎁 ${name}, Your Free ${promptName} is Ready!`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { background: linear-gradient(135deg, #10b981, #3b82f6); padding: 40px; border-radius: 12px 12px 0 0; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { background: #f8fafc; padding: 40px; border-radius: 0 0 12px 12px; }
        .button { display: inline-block; background: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎁 Free Prompt Unlocked!</h1>
        </div>
        <div class="content">
            <p>Hi ${name}! 👋</p>
            <p>Thank you for signing up! Your <strong>${promptName}</strong> is ready to use.</p>
            <p style="text-align: center;">
                <a href="${unlockUrl}" class="button">🚀 Access Your Prompt</a>
            </p>
            <p>Happy building! 🛠️</p>
        </div>
    </div>
</body>
</html>
            `
        })

        if (error) {
            console.error('❌ Form unlock email error:', error)
            throw error
        }

        console.log('✅ Form unlock email sent:', data?.id)
        return { success: true, id: data?.id }

    } catch (error) {
        console.error('❌ Failed to send form unlock email:', error)
        return { success: false, error }
    }
}
