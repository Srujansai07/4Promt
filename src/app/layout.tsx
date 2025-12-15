/**
 * @fileoverview Root Layout Component for PromptOS
 * @description Wraps all pages with global styles, fonts, and error handling
 * @author PromptOS Team
 * @version 1.0.0
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

/**
 * Inter font configuration
 * @description Google Font loaded with Latin subset for optimal performance
 */
const inter = Inter({ subsets: ['latin'] })

/**
 * Page Metadata for SEO
 * @description Defines title, description, and social sharing info
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
    title: 'PromptOS — The 9-Prompt Framework for Building AI Apps',
    description: 'Build complete AI applications with just 9 powerful prompts. The ultimate framework for prompt engineering. No coding required.',
    keywords: 'AI prompts, ChatGPT, prompt engineering, AI app builder, prompt framework, GPT-4, Claude',
    authors: [{ name: 'PromptOS' }],
    openGraph: {
        title: 'PromptOS — Build AI Apps With 9 Prompts',
        description: 'The complete prompt framework for building AI applications. Unlock pro prompts. Build faster.',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PromptOS — The 9-Prompt Framework',
        description: 'Build complete AI apps with just prompts.',
    },
}

/**
 * Root Layout Component
 * @description Wraps all pages with consistent styling, fonts, and background
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} The root HTML structure
 * 
 * @example
 * // This layout automatically wraps all pages in /app directory
 * // No manual import needed - Next.js handles this
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* Animated Background Grid */}
                <div className="bg-grid" aria-hidden="true" />

                {/* Main Content */}
                {children}
            </body>
        </html>
    )
}
