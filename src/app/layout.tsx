import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* Animated Background */}
                <div className="bg-grid" />
                <div className="bg-glow bg-glow-1" />
                <div className="bg-glow bg-glow-2" />

                {children}
            </body>
        </html>
    )
}
