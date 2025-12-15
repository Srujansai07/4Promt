import { SignJWT, jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'default_secret_key_change_me')

export async function createSessionToken(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(SECRET_KEY)
}

export async function verifySessionToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY)
        return payload
    } catch (error) {
        return null
    }
}
