import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '../src/app/login/page'
import '@testing-library/jest-dom'

// Mock fetch
global.fetch = jest.fn()

describe('Login Page', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockReset()
    })

    it('renders login form', () => {
        render(<LoginPage />)
        expect(screen.getByText('Welcome Back')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
    })

    it('submits email and shows success message', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({ success: true })
        })

        render(<LoginPage />)

        const input = screen.getByPlaceholderText('you@example.com')
        fireEvent.change(input, { target: { value: 'test@example.com' } })

        const button = screen.getByRole('button', { name: /continue/i })
        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByText('Check your inbox!')).toBeInTheDocument()
        })
    })

    it('shows error message on failure', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Invalid email' })
        })

        render(<LoginPage />)

        const input = screen.getByPlaceholderText('you@example.com')
        fireEvent.change(input, { target: { value: 'bad-email' } })

        const button = screen.getByRole('button', { name: /continue/i })
        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByText('Invalid email')).toBeInTheDocument()
        })
    })
})
