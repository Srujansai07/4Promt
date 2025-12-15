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
