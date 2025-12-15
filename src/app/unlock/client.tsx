'use client'

import { useState } from 'react'
import { Copy, Download, Check, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'

interface UnlockClientProps {
    prompt: {
        name: string
        icon: string
        content: string
    }
    email: string
    promptId: number
}

export default function UnlockClient({ prompt, email, promptId }: UnlockClientProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(prompt.content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Persist email to cookie for session retention
    if (typeof window !== 'undefined' && email) {
        document.cookie = `promptos-email=${email}; path=/; max-age=31536000` // 1 year
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
