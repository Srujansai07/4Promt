import { createSessionToken, verifySessionToken } from '../src/lib/auth'
import { POST as LoginPOST } from '../src/app/api/auth/login/route'
import { GET as VerifyGET } from '../src/app/api/auth/verify/route'
import { NextRequest } from 'next/server'

// Mock KV
const mockStoreToken = jest.fn()
const mockVerifyToken = jest.fn()
jest.mock('@/lib/kv-auth', () => ({
    storeMagicLinkToken: mockStoreToken,
    verifyMagicLinkToken: mockVerifyToken
}))

// Mock Email
const mockSendEmail = jest.fn()
const mockCheckRateLimit = jest.fn()
jest.mock('@/lib/email', () => ({
    sendMagicLinkEmail: mockSendEmail,
    checkEmailRateLimit: mockCheckRateLimit
}))

// Mock Cookies
const mockSetCookie = jest.fn()
jest.mock('next/headers', () => ({
    cookies: () => ({
        set: mockSetCookie
    })
}))

describe('Auth System', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('JWT Logic', () => {
        it('creates and verifies a token', async () => {
            const payload = { email: 'test@example.com' }
            const token = await createSessionToken(payload)
            expect(typeof token).toBe('string')

            const verified = await verifySessionToken(token)
            expect(verified).toMatchObject(payload)
        })

        it('returns null for invalid token', async () => {
            const verified = await verifySessionToken('invalid_token')
            expect(verified).toBeNull()
        })
    })

    describe('Login API', () => {
        it('sends magic link for valid request', async () => {
            mockCheckRateLimit.mockResolvedValue(true)
            mockSendEmail.mockResolvedValue({ success: true })

            const req = new NextRequest('http://localhost/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email: 'test@example.com' })
            })

            const res = await LoginPOST(req)
            const data = await res.json()

            expect(res.status).toBe(200)
            expect(data.success).toBe(true)
            expect(mockStoreToken).toHaveBeenCalled()
            expect(mockSendEmail).toHaveBeenCalled()
        })

        it('blocks rate limited request', async () => {
            mockCheckRateLimit.mockResolvedValue(false)

            const req = new NextRequest('http://localhost/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email: 'test@example.com' })
            })

            const res = await LoginPOST(req)
            expect(res.status).toBe(429)
        })
    })

    describe('Verify API', () => {
        it('verifies token and sets cookie', async () => {
            mockVerifyToken.mockResolvedValue('test@example.com')

            const req = new NextRequest('http://localhost/api/auth/verify?token=valid_token')
            const res = await VerifyGET(req)

            expect(res.status).toBe(307) // Redirect
            expect(mockSetCookie).toHaveBeenCalledWith('session', expect.any(String), expect.any(Object))
        })

        it('rejects invalid token', async () => {
            mockVerifyToken.mockResolvedValue(null)

            const req = new NextRequest('http://localhost/api/auth/verify?token=invalid_token')
            const res = await VerifyGET(req)

            expect(res.status).toBe(401)
        })
    })
})
