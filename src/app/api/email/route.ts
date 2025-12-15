import { NextRequest, NextResponse } from 'next/server'

// Email sending via Resend
// In production: npm install resend && add RESEND_API_KEY to env

interface EmailPayload {
    to: string
    subject: string
    template: 'welcome' | 'unlock' | 'purchase'
    data: Record<string, string>
}

// Email templates
const templates = {
    welcome: (data: Record<string, string>) => ({
        subject: `Welcome to PromptOS, ${data.name}! 🚀`,
        html: `
            <div style="font-family: system-ui; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #3b82f6;">Welcome to PromptOS!</h1>
                <p>Hey ${data.name},</p>
                <p>Thanks for joining PromptOS! You've unlocked your first prompt.</p>
                <a href="${data.unlockUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
                    Access Your Prompt
                </a>
                <p>Happy building! 🛠️</p>
                <p style="color: #666;">- The PromptOS Team</p>
            </div>
        `
    }),
    unlock: (data: Record<string, string>) => ({
        subject: `Your ${data.promptName} Prompt is Ready! 🎉`,
        html: `
            <div style="font-family: system-ui; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #3b82f6;">Prompt Unlocked!</h1>
                <p>Your <strong>${data.promptName}</strong> prompt is ready to use.</p>
                <a href="${data.unlockUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
                    Access Your Prompt
                </a>
                <p style="color: #666;">Tip: Paste this prompt into ChatGPT or Claude for best results!</p>
            </div>
        `
    }),
    purchase: (data: Record<string, string>) => ({
        subject: `Receipt for ${data.promptName} - PromptOS`,
        html: `
            <div style="font-family: system-ui; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #3b82f6;">Thank You for Your Purchase!</h1>
                <p>Hi ${data.name},</p>
                <p>Here's your receipt:</p>
                <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Product:</strong> ${data.promptName}</p>
                    <p><strong>Amount:</strong> $${data.amount}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
                <a href="${data.unlockUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">
                    Access Your Prompt
                </a>
            </div>
        `
    })
}

export async function POST(request: NextRequest) {
    try {
        const body: EmailPayload = await request.json()
        const { to, template, data } = body

        if (!to || !template) {
            return NextResponse.json(
                { error: 'Email and template are required' },
                { status: 400 }
            )
        }

        const emailContent = templates[template](data)

        // In production with Resend:
        // const resend = new Resend(process.env.RESEND_API_KEY)
        // await resend.emails.send({
        //     from: 'PromptOS <hello@promptos.app>',
        //     to: [to],
        //     subject: emailContent.subject,
        //     html: emailContent.html
        // })

        console.log('Email would be sent:', { to, subject: emailContent.subject })

        return NextResponse.json({
            success: true,
            message: 'Email sent successfully',
            preview: emailContent.subject
        })
    } catch (error) {
        console.error('Email error:', error)
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        )
    }
}
