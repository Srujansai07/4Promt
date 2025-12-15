import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../src/app/page'
import '@testing-library/jest-dom'

// Mock the components to isolate logic
jest.mock('../src/app/page', () => {
    const originalModule = jest.requireActual('../src/app/page')
    return {
        __esModule: true,
        ...originalModule,
        Navbar: () => <div data-testid="navbar">Navbar</div>,
        Hero: () => <div data-testid="hero">Hero</div>,
        HowItWorks: () => <div data-testid="how-it-works">HowItWorks</div>,
        Testimonials: () => <div data-testid="testimonials">Testimonials</div>,
        FAQ: () => <div data-testid="faq">FAQ</div>,
        CTASection: () => <div data-testid="cta">CTA</div>,
        Footer: () => <div data-testid="footer">Footer</div>,
    }
})

describe('Home Page Logic', () => {
    it('renders all sections', () => {
        render(<Home />)
        expect(screen.getByTestId('navbar')).toBeInTheDocument()
        expect(screen.getByTestId('hero')).toBeInTheDocument()
        expect(screen.getByTestId('how-it-works')).toBeInTheDocument()
    })

    it('opens free unlock modal when Tier 1 is clicked', () => {
        render(<Home />)

        // Find the Tier 1 button (Get Free Now)
        const freeButton = screen.getByText('🎁 Get Free Now')
        fireEvent.click(freeButton)

        // Check if modal opens
        expect(screen.getByText("It's FREE!")).toBeInTheDocument()
    })

    it('opens form modal when Tier 2 is clicked', () => {
        render(<Home />)

        // Find the Tier 2 button
        const formButton = screen.getByText('📝 Fill Form to Unlock')
        fireEvent.click(formButton)

        // Check if modal opens
        expect(screen.getByText('Unlock Pro Builder Format')).toBeInTheDocument()
    })

    it('opens referral modal when Tier 3 is clicked', () => {
        render(<Home />)

        // Find the Tier 3 button
        const referralButton = screen.getByText('🔓 Unlock Now')
        fireEvent.click(referralButton)

        // Check if modal opens
        expect(screen.getByText('Option 1: Pay $3')).toBeInTheDocument()
    })
})
