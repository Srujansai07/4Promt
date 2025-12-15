import { Suspense } from 'react'
import UnlockClient from './client'
import { hasUserPurchased } from '@/lib/user'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'

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

interface PageProps {
    searchParams: {
        prompt?: string
        email?: string
    }
}

async function UnlockContent({ searchParams }: PageProps) {
    const promptId = parseInt(searchParams.prompt || '1')
    const email = searchParams.email || ''

    // 1. Verify Purchase
    let hasAccess = false

    // Allow free prompt (ID 1) without verification if desired, 
    // OR enforce verification for all. 
    // For now, let's say Prompt 1 is free but we still track it? 
    // Actually, the landing page says "First Prompt is FREE!".
    // So if promptId === 1, we might allow it.
    // BUT, the goal is to capture email.
    // So we check if they "purchased" (registered) it.

    if (promptId === 1) {
        hasAccess = true // Free tier is always accessible
    } else if (email) {
        hasAccess = await hasUserPurchased(email, promptId)
    }

    // Fallback for demo/testing if needed (remove in production)
    // if (process.env.NODE_ENV === 'development') hasAccess = true

    if (!hasAccess) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md w-full glass rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
                    <p className="text-gray-400 mb-6">
                        You don't have access to this prompt yet. Please purchase it to unlock.
                    </p>
                    <Link href="/#prompts" className="btn btn-primary w-full">
                        View Pricing
                    </Link>
                    <div className="mt-4">
                        <Link href="/" className="text-sm text-gray-500 hover:text-white">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    const prompt = PROMPT_CONTENT[promptId] || PROMPT_CONTENT[1]

    return <UnlockClient prompt={prompt} email={email} promptId={promptId} />
}

export default function UnlockPage(props: PageProps) {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="text-gray-400">Verifying access...</p>
                </div>
            </div>
        }>
            <UnlockContent {...props} />
        </Suspense>
    )
}

