import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder')

export async function sendPurchaseEmail(email: string, promptId: string) {
    if (!process.env.RESEND_API_KEY) {
        console.log('Mocking email send to:', email)
        return { success: true, id: 'mock-id' }
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'PromptOS <noreply@promptos.app>',
            to: email,
            subject: 'Your Prompt is Ready! 🚀',
            html: `
                <h1>Thank you for your purchase!</h1>
                <p>You have successfully unlocked Prompt #${promptId}.</p>
                <p><a href="https://4-promt.vercel.app/unlock?prompt=${promptId}&email=${encodeURIComponent(email)}">Click here to access your prompt</a></p>
            `
        })

        if (error) {
            console.error('Resend Error:', error)
            throw error
        }

        return { success: true, id: data?.id }
    } catch (error) {
        console.error('Email Send Failed:', error)
        return { success: false, error }
    }
}

export async function sendMagicLinkEmail(email: string, token: string) {
    if (!process.env.RESEND_API_KEY) {
        console.log('Mocking Magic Link to:', email, 'Token:', token)
        return { success: true, id: 'mock-id' }
    }

    const magicLink = `https://4-promt.vercel.app/api/auth/verify?token=${token}`

    try {
        const { data, error } = await resend.emails.send({
            from: 'PromptOS <noreply@promptos.app>',
            to: email,
            subject: '✨ Your Magic Login Link',
            html: `
                <h1>Welcome back to PromptOS!</h1>
                <p>Click the link below to sign in instantly:</p>
                <p><a href="${magicLink}" style="padding: 12px 24px; background: #22c55e; color: white; text-decoration: none; border-radius: 6px;">Sign In Now</a></p>
                <p>Or copy this link: ${magicLink}</p>
                <p>This link expires in 24 hours.</p>
            `
        })

        if (error) throw error
        return { success: true, id: data?.id }
    } catch (error) {
        console.error('Magic Link Failed:', error)
        return { success: false, error }
    }
}

import { kv } from '@vercel/kv'

export async function checkEmailRateLimit(email: string): Promise<boolean> {
    const key = `rate_limit:email:${email}`
    try {
        const count = await kv.incr(key)
        if (count === 1) {
            await kv.expire(key, 3600) // 1 hour
        }
        return count <= 3
    } catch (error) {
        console.error('Rate Limit Check Failed:', error)
        return true // Fail open
    }
}


