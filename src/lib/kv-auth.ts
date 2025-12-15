import { kv } from '@vercel/kv'

export async function storeMagicLinkToken(token: string, email: string, expiresInSeconds: number = 86400) {
    // Store token -> email with expiration
    await kv.set(`auth:token:${token}`, email, { ex: expiresInSeconds })
}

export async function verifyMagicLinkToken(token: string): Promise<string | null> {
    const email = await kv.get<string>(`auth:token:${token}`)
    if (email) {
        // Burn the token (single use)
        await kv.del(`auth:token:${token}`)
        return email
    }
    return null
}
