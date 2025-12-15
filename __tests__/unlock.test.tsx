import { render, screen, fireEvent } from '@testing-library/react'
import UnlockClient from '../src/app/unlock/client'
import '@testing-library/jest-dom'

const MOCK_PROMPT = {
    name: 'Test Prompt',
    icon: '🧪',
    content: '# Test Content'
}

describe('Unlock Client', () => {
    it('renders the prompt content', () => {
        render(<UnlockClient prompt={MOCK_PROMPT} email="test@example.com" promptId={1} />)
        expect(screen.getByText('Test Prompt')).toBeInTheDocument()
        expect(screen.getByText('# Test Content')).toBeInTheDocument()
    })

    it('shows purchase email', () => {
        render(<UnlockClient prompt={MOCK_PROMPT} email="test@example.com" promptId={1} />)
        expect(screen.getByText('Purchased by: test@example.com')).toBeInTheDocument()
    })

    it('allows copying content', () => {
        // Mock clipboard
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn().mockResolvedValue(undefined)
            }
        })

        render(<UnlockClient prompt={MOCK_PROMPT} email="test@example.com" promptId={1} />)

        const copyButton = screen.getByText('Copy to Clipboard')
        fireEvent.click(copyButton)

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('# Test Content')
        expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
})
