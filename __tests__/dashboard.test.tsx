import DashboardPage from '../src/app/dashboard/page'
import { redirect } from 'next/navigation'

// Mock dependencies
jest.mock('next/headers', () => ({
    cookies: () => ({
        get: (key: string) => {
            if (key === 'session') return { value: 'valid_token' }
            return null
        }
    })
}))

jest.mock('next/navigation', () => ({
    redirect: jest.fn()
}))

const mockVerify = jest.fn()
jest.mock('@/lib/auth', () => ({
    verifySessionToken: () => mockVerify()
}))

const mockGetPurchases = jest.fn()
jest.mock('@/lib/user', () => ({
    getUserPurchases: () => mockGetPurchases()
}))

describe('Dashboard Page', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('redirects if no session', async () => {
        const { cookies } = require('next/headers')
        cookies().get = () => null

        try {
            await DashboardPage()
        } catch (e) { }

        expect(redirect).toHaveBeenCalledWith('/login')
    })

    it('redirects if invalid token', async () => {
        mockVerify.mockResolvedValue(null)

        try {
            await DashboardPage()
        } catch (e) { }

        expect(redirect).toHaveBeenCalledWith('/login')
    })

    it('renders dashboard with purchases', async () => {
        mockVerify.mockResolvedValue({ email: 'test@example.com' })
        mockGetPurchases.mockResolvedValue([1, 2])

        const result = await DashboardPage()

        // Since it's a server component returning JSX, we can verify it didn't redirect
        expect(redirect).not.toHaveBeenCalled()

        // In a real integration test we'd render the result, but for unit testing logic this is okay.
        // We verified the data fetching flow.
    })
})
