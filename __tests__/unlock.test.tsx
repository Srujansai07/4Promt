import { render, screen, fireEvent } from '@testing-library/react'
import UnlockPage from '../src/app/unlock/page'
import '@testing-library/jest-dom'

// Mock useSearchParams
const mockGet = jest.fn()
jest.mock('next/navigation', () => ({
    useSearchParams: () => ({
        get: mockGet
    })
}))

describe('Unlock Page', () => {
    beforeEach(() => {
        mockGet.mockReset()
    })

    it('renders the correct prompt content', () => {
        mockGet.mockImplementation((key) => {
            if (key === 'prompt') return '3'
            if (key === 'email') return 'test@example.com'
            return null
        })
        render(<UnlockPage />)
        expect(screen.getByText('Industry Engineer Format')).toBeInTheDocument()
    })

    it('defaults to Prompt 1 if ID is invalid', () => {
        mockGet.mockImplementation((key) => {
            if (key === 'prompt') return '999' // Invalid ID
            return null
        })
        render(<UnlockPage />)
        expect(screen.getByText('Starter Format')).toBeInTheDocument()
    })

    it('allows copying content', () => {
        mockGet.mockImplementation((key) => {
            if (key === 'prompt') return '1'
            return null
        })
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
