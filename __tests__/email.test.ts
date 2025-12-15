import { sendPurchaseEmail, sendMagicLinkEmail, checkEmailRateLimit } from '../src/lib/email'

// Mock Resend
const mockSend = jest.fn()
jest.mock('resend', () => ({
    Resend: jest.fn().mockImplementation(() => ({
        emails: {
            send: mockSend
        }
    }))
}))

// Mock KV
const mockIncr = jest.fn()
const mockExpire = jest.fn()
jest.mock('@vercel/kv', () => ({
    kv: {
        incr: mockIncr,
        expire: mockExpire
    }
}))

describe('Email System', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        process.env.RESEND_API_KEY = 're_test_key'
    })

    describe('sendPurchaseEmail', () => {
        it('sends purchase email with correct link', async () => {
            mockSend.mockResolvedValue({ data: { id: 'email_123' }, error: null })

            const result = await sendPurchaseEmail('test@example.com', '1')

            expect(result.success).toBe(true)
            expect(mockSend).toHaveBeenCalledWith(expect.objectContaining({
                to: 'test@example.com',
                subject: 'Your Prompt is Ready! 🚀',
                html: expect.stringContaining('prompt=1')
            }))
        })
    })

    describe('sendMagicLinkEmail', () => {
        it('sends magic link email with token', async () => {
            mockSend.mockResolvedValue({ data: { id: 'email_456' }, error: null })

            const result = await sendMagicLinkEmail('test@example.com', 'token_abc')

            expect(result.success).toBe(true)
            expect(mockSend).toHaveBeenCalledWith(expect.objectContaining({
                to: 'test@example.com',
                subject: '✨ Your Magic Login Link',
                html: expect.stringContaining('token=token_abc')
            }))
        })
    })

    describe('checkEmailRateLimit', () => {
        it('allows first request', async () => {
            mockIncr.mockResolvedValue(1)
            const allowed = await checkEmailRateLimit('test@example.com')
            expect(allowed).toBe(true)
            expect(mockExpire).toHaveBeenCalled()
        })

        it('blocks 4th request', async () => {
            mockIncr.mockResolvedValue(4)
            const allowed = await checkEmailRateLimit('test@example.com')
            expect(allowed).toBe(false)
        })
    })
})
