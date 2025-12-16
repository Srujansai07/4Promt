'use client'

import { useState } from 'react'
import { Copy, Download, Check, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

interface UnlockClientProps {
    prompt: {
        id: number
        name: string
        icon: string
        content: string
    }
    email: string
    promptId: number
}

export default function UnlockClient({ prompt, email, promptId }: UnlockClientProps) {
    const [copied, setCopied] = useState(false)
    const [activeTab, setActiveTab] = useState('main')
    const [viewMode, setViewMode] = useState<'rendered' | 'code'>('rendered')

    // Helper to extract sections from the big Prompt 6 text
    const extractSection = (text: string, startMarker: string, endMarker?: string) => {
        const startIndex = text.indexOf(startMarker)
        if (startIndex === -1) return text // Fallback

        let endIndex = text.length
        if (endMarker) {
            const foundEnd = text.indexOf(endMarker, startIndex + startMarker.length)
            if (foundEnd !== -1) endIndex = foundEnd
        }

        return text.substring(startIndex, endIndex).trim()
    }

    const getContentToCopy = () => {
        if (prompt.id === 6) {
            if (activeTab === 'markdown') return extractSection(prompt.content, 'MARKDOWN MASTER SUPER')
            if (activeTab === 'json') return extractSection(prompt.content, 'JSON MASTER SUPER')
            if (activeTab === 'toml') return extractSection(prompt.content, 'TOML MASTER SUPER')
            if (activeTab === 'main') return extractSection(prompt.content, 'HIGH - LEVEL SUMMARY', 'BONUS:')
        }
        return prompt.content
    }

    const handleCopy = async () => {
        const content = getContentToCopy()
        await navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Persist email to cookie for session retention
    if (typeof window !== 'undefined' && email) {
        document.cookie = `promptos-email=${email}; path=/; max-age=31536000` // 1 year
    }

    const handleDownload = () => {
        const content = getContentToCopy()
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `PromptOS-${prompt.name.replace(/\s+/g, '-')}-${activeTab}.txt`
        a.click()
        URL.revokeObjectURL(url)
    }

    const renderContent = () => {
        let contentToShow = prompt.content

        if (prompt.id === 6) {
            if (activeTab === 'main') contentToShow = extractSection(prompt.content, 'HIGH - LEVEL SUMMARY', 'BONUS:')
            else if (activeTab === 'markdown') contentToShow = extractSection(prompt.content, 'MARKDOWN MASTER SUPER')
            else if (activeTab === 'json') contentToShow = extractSection(prompt.content, 'JSON MASTER SUPER')
            else if (activeTab === 'toml') contentToShow = extractSection(prompt.content, 'TOML MASTER SUPER')
        }

        return (
            <pre className={`w-full overflow-x-auto p-6 text-sm font-mono leading-relaxed whitespace-pre-wrap ${viewMode === 'code' ? 'text-green-400 bg-[#0d1117]' : 'text-gray-300 bg-black'}`}>
                {contentToShow}
            </pre>
        )
    }

    return (
        <main className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to PromptOS
                </Link>

                {/* Success Message */}
                <div className="thick-card p-8 mb-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
                    <div className="text-6xl mb-4">{prompt.icon}</div>
                    <h1 className="text-3xl font-bold mb-2">🎉 You've Unlocked It!</h1>
                    <h2 className="text-xl text-gradient font-semibold mb-4">{prompt.name}</h2>
                    {email && (
                        <p className="text-gray-400 text-sm">
                            Purchased by: {email}
                        </p>
                    )}
                </div>

                {/* Prompt Content Area */}
                <div className="bg-black border-2 border-gray-800 rounded-2xl overflow-hidden shadow-2xl mb-8">
                    {/* Toolbar */}
                    <div className="border-b-2 border-gray-800 p-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-dark-900">

                        {/* Tabs for Prompt 6 */}
                        {prompt.id === 6 ? (
                            <div className="flex bg-dark-800 rounded-lg p-1 border border-gray-700">
                                <button
                                    onClick={() => setActiveTab('main')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'main' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Base
                                </button>
                                <button
                                    onClick={() => setActiveTab('markdown')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'markdown' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    MD
                                </button>
                                <button
                                    onClick={() => setActiveTab('json')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'json' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    JSON
                                </button>
                                <button
                                    onClick={() => setActiveTab('toml')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'toml' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    TOML
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                </div>
                                <span className="text-sm text-gray-500 font-mono ml-2">prompt.txt</span>
                            </div>
                        )}

                        <div className="flex items-center gap-3">
                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-2 mr-4 border-r border-gray-700 pr-4">
                                <span className="text-xs text-gray-500">VIEW:</span>
                                <button
                                    onClick={() => setViewMode('rendered')}
                                    className={`p-1.5 rounded ${viewMode === 'rendered' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                                    title="Reader View"
                                >
                                    <div className="w-4 h-4 border-2 border-current rounded-sm" />
                                </button>
                                <button
                                    onClick={() => setViewMode('code')}
                                    className={`p-1.5 rounded ${viewMode === 'code' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                                    title="Code View"
                                >
                                    <div className="w-4 h-4 font-mono text-xs flex items-center justify-center">{'<>'}</div>
                                </button>
                            </div>

                            <button
                                onClick={handleCopy}
                                className="btn bg-white text-black hover:bg-gray-200 flex items-center gap-2 px-4 py-2 text-sm"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                            <button
                                onClick={handleDownload}
                                className="btn btn-secondary p-2"
                                title="Download .txt"
                            >
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`relative min-h-[400px] ${viewMode === 'code' ? 'bg-[#0d1117]' : 'bg-black'}`}>
                        {renderContent()}
                    </div>
                </div>

                {/* Share Section */}
                <div className="text-center mb-12">
                    {promptId === 3 ? (
                        // Share-to-Unlock for Prompt 3
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-lg font-bold mb-2">🔓 Share-to-Unlock</h3>
                            <ShareButton
                                url="https://4-promt.vercel.app"
                                text={`Just unlocked the ${prompt.name} from PromptOS! 🚀 Building AI apps has never been easier.`}
                                onShareComplete={(platform) => console.log(`Shared on ${platform}`)}
                            />
                        </div>
                    ) : (
                        // Regular share for other prompts
                        <>
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
                        </>
                    )}
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
