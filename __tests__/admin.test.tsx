import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AdminPage from '../src/app/admin/page'
import '@testing-library/jest-dom'

// Mock fetch
global.fetch = jest.fn()

describe('Admin Dashboard', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockReset()
    })

    it('shows login screen initially', () => {
        render(<AdminPage />)
        expect(screen.getByText('🔐 Admin Access')).toBeInTheDocument()
    })

    it('unlocks with correct password', async () => {
        // Mock API responses
        (global.fetch as jest.Mock).mockImplementation((url) => {
            if (url === '/api/health') return Promise.resolve({ json: () => ({ status: 'ok', version: '1.0.0' }) })
            if (url === '/api/analytics') return Promise.resolve({ json: () => ({ totalEvents: 100 }) })
            if (url === '/api/referral') return Promise.resolve({ json: () => ({ totalReferrals: 50 }) })
            return Promise.reject('Unknown URL')
        })

        render(<AdminPage />)

        const input = screen.getByPlaceholderText('Enter admin password')
        fireEvent.change(input, { target: { value: 'promptos2024' } })

        const button = screen.getByText('Access Dashboard')
        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByText('📊 Admin Dashboard')).toBeInTheDocument()
            expect(screen.getByText('System Status')).toBeInTheDocument()
        })
    })

    it('fetches and displays stats', async () => {
        (global.fetch as jest.Mock).mockImplementation((url) => {
            if (url === '/api/health') return Promise.resolve({ json: () => ({ status: 'ok', version: '1.0.0' }) })
            if (url === '/api/analytics') return Promise.resolve({ json: () => ({ totalEvents: 123 }) })
            if (url === '/api/referral') return Promise.resolve({ json: () => ({ totalReferrals: 45 }) })
            return Promise.reject('Unknown URL')
        })

        render(<AdminPage />)

        // Login first
        const input = screen.getByPlaceholderText('Enter admin password')
        fireEvent.change(input, { target: { value: 'promptos2024' } })
        fireEvent.click(screen.getByText('Access Dashboard'))

        await waitFor(() => {
            expect(screen.getByText('123')).toBeInTheDocument() // Total Events
            expect(screen.getByText('45')).toBeInTheDocument() // Total Referrals
        })
    })
})
