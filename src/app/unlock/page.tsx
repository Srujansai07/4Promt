'use client'

import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import { Copy, Download, Check, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'

// Prompt content - You will add your actual prompts here
const PROMPT_CONTENT: Record<number, { name: string; icon: string; content: string }> = {
    1: {
        name: 'Starter Format',
        icon: '🌱',
        content: `# STARTER FORMAT PROMPT

[Your Prompt 1 content will go here]

## Instructions
1. Copy this prompt
2. Paste into ChatGPT or Claude
3. Fill in your app idea
4. Watch the magic happen!

---
© PromptOS - Purchased Prompt`
    },
    2: {
        name: 'Pro Builder Format',
        icon: '⚡',
        content: `# PRO BUILDER FORMAT PROMPT

[Your Prompt 2 content will go here]

## LLM Shortcuts
- LLM = ...
- JSON = ...
- RAG = ...

---
© PromptOS - Purchased Prompt`
    },
    3: {
        name: 'Industry Engineer Format',
        icon: '🏭',
        content: `# INDUSTRY ENGINEER FORMAT PROMPT

[Your Prompt 3 content will go here]

## Enterprise Features
- Production-grade architecture
- Scalable design patterns
- Security best practices

---
© PromptOS - Purchased Prompt`
    },
    4: {
        name: 'Universal Architecture',
        icon: '🌐',
        content: `# UNIVERSAL ARCHITECTURE PROMPT

[Your Prompt 4 content will go here]

## Multi-Platform Support
- Web applications
- Mobile apps
- Desktop software

---
© PromptOS - Purchased Prompt`
    },
    5: {
        name: 'Ultimate A→Z Blueprint',
        icon: '🗺️',
        content: `# ULTIMATE A→Z BLUEPRINT PROMPT

[Your Prompt 5 content will go here]

## Complete Roadmap
- Idea validation
- Architecture design
- Development
- Testing
- Deployment

---
© PromptOS - Purchased Prompt`
    },
    6: {
        name: 'Master Super Pack',
        icon: '💎',
        content: `# MASTER SUPER PACK

Congratulations! You have access to ALL 9 prompts.

## Included Formats:
- Markdown (.md)
- JSON (.json)
- TOML (.toml)

[All prompts content here]

---
© PromptOS - Master Pack Owner`
    },
    7: {
        name: 'Debug & Optimize',
        icon: '🔧',
        content: `# DEBUG & OPTIMIZE PROMPT

[Your Prompt 7 content will go here]

## Debugging Features
- Error analysis
- Performance optimization
- Code cleanup

---
© PromptOS - Purchased Prompt`
    },
    8: {
        name: 'UI/UX Designer',
        icon: '🎨',
        content: `# UI/UX DESIGNER PROMPT

[Your Prompt 8 content will go here]

## Design Features
- Modern aesthetics
- Responsive layouts
- Animation patterns

---
© PromptOS - Purchased Prompt`
    },
    9: {
        name: 'Launch & Scale',
        icon: '🚀',
        content: `# LAUNCH & SCALE PROMPT

[Your Prompt 9 content will go here]

## Deployment Guide
- Hosting setup
- CI/CD pipeline
- Scaling strategies

---
© PromptOS - Purchased Prompt`
    },
}

function UnlockContent() {
    const searchParams = useSearchParams()
    const promptId = parseInt(searchParams.get('prompt') || '1')
    const email = searchParams.get('email') || ''

    const [copied, setCopied] = useState(false)

    const prompt = PROMPT_CONTENT[promptId] || PROMPT_CONTENT[1]

    const handleCopy = async () => {
        await navigator.clipboard.writeText(prompt.content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
        const blob = new Blob([prompt.content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `PromptOS-${prompt.name.replace(/\s+/g, '-')}.txt`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <main className="min-h-screen py-20 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to PromptOS
                </Link>

                {/* Success Message */}
                <div className="glass rounded-2xl p-8 mb-8 text-center">
                    <div className="text-6xl mb-4">{prompt.icon}</div>
                    <h1 className="text-3xl font-bold mb-2">🎉 You've Unlocked It!</h1>
                    <h2 className="text-xl text-gradient font-semibold mb-4">{prompt.name}</h2>
                    {email && (
                        <p className="text-gray-400 text-sm">
                            Purchased by: {email}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-6">
                    <button onClick={handleCopy} className="btn btn-primary flex-1">
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button onClick={handleDownload} className="btn btn-secondary flex-1">
                        <Download className="w-5 h-5" /> Download
                    </button>
                </div>

                {/* Prompt Content */}
                <div className="glass rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Your Prompt</h3>
                        <button
                            onClick={handleCopy}
                            className="text-gray-400 hover:text-white transition"
                        >
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>
                    <pre className="bg-dark-900 rounded-xl p-6 overflow-x-auto text-sm font-mono text-gray-300 whitespace-pre-wrap">
                        {prompt.content}
                    </pre>
                </div>

                {/* Share Button */}
                <div className="text-center">
                    <p className="text-gray-400 text-sm mb-4">
                        Love PromptOS? Share it with your friends!
                    </p>
                    <a
                        href={`https://twitter.com/intent/tweet?text=Just%20unlocked%20the%20${encodeURIComponent(prompt.name)}%20from%20PromptOS!%20🚀%20Building%20AI%20apps%20has%20never%20been%20easier.&url=https://4-promt.vercel.app`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                    >
                        <Share2 className="w-4 h-4" /> Share on Twitter
                    </a>
                </div>

                {/* Upgrade CTA */}
                {promptId !== 6 && (
                    <div className="mt-12 text-center glass rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-2">Want All 9 Prompts?</h3>
                        <p className="text-gray-400 mb-4">
                            Upgrade to the Master Pack for just $12 and get everything!
                        </p>
                        <Link href="/#prompts" className="btn btn-master">
                            👑 Get Master Pack
                        </Link>
                    </div>
                )}
            </div>
        </main>
    )
}

export default function UnlockPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="text-gray-400">Loading your prompt...</p>
                </div>
            </div>
        }>
            <UnlockContent />
        </Suspense>
    )
}
