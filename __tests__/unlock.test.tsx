import { render, screen, fireEvent } from '@testing-library/react'
import UnlockPage from '../src/app/unlock/page'
import '@testing-library/jest-dom'

// Mock useSearchParams
jest.mock('next/navigation', () => ({
    useSearchParams: () => ({
        get: (key: string) => {
            if (key === 'prompt') return '3'
            if (key === 'email') return 'test@example.com'
            return null
        }
    })
}))

describe('Unlock Page', () => {
    it('renders the correct prompt content', () => {
        render(<UnlockPage />)
        expect(screen.getByText('Industry Engineer Format')).toBeInTheDocument()
        expect(screen.getByText('Purchased by: test@example.com')).toBeInTheDocument()
    })

    it('allows copying content', () => {
        // Mock clipboard
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn().mockResolvedValue(undefined)
            }
        })

        render(<UnlockPage />)
        const copyButton = screen.getByText('Copy to Clipboard')
        fireEvent.click(copyButton)
        expect(navigator.clipboard.writeText).toHaveBeenCalled()
    })
})
