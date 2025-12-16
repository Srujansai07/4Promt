'use client'

import { useState } from 'react'
import {
    ArrowRight, Menu, X, Zap, Sparkles, Check,
    ChevronDown, Star, Clock, Copy, Download, Share2,
    Mail, User, Lock, Shield
} from 'lucide-react'
import Link from 'next/link'
import { PaymentModal } from '@/components/PaymentModal'
import { PROMPTS, FAQ_ITEMS } from '@/config/constants'

// ============================================
// COMPONENTS
// ============================================

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b-2 border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="#" className="flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        <span className="font-bold text-xl">PromptOS</span>
                    </a>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#prompts" className="text-gray-400 hover:text-white transition">Prompts</a>
                        <a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a>
                        <a href="#faq" className="text-gray-400 hover:text-white transition">FAQ</a>
                        <a href="#prompts" className="btn btn-primary text-sm py-2 px-4">
                            Get Free Prompt <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                    <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-black border-t-2 border-gray-800">
                    <div className="px-4 py-4 space-y-3">
                        <a href="#prompts" className="block py-2 text-gray-400 hover:text-white">Prompts</a>
                        <a href="#pricing" className="block py-2 text-gray-400 hover:text-white">Pricing</a>
                        <a href="#faq" className="block py-2 text-gray-400 hover:text-white">FAQ</a>
                        <a href="#prompts" className="btn btn-primary w-full mt-2">Get Free Prompt</a>
                    </div>
                </div>
            )}
        </nav>
    )
}

function Hero() {
    return (
        <header className="relative pt-32 pb-20 px-4 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-800 bg-black text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-gray-400">First Prompt is FREE!</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            Build Complete Apps<br />
                            <span className="text-gradient">With One Prompt.</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-lg">
                            The 9-Prompt Framework that transforms ChatGPT into your personal
                            full-stack developer. Start FREE. No coding required.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#prompts" className="btn btn-primary">
                                <Zap className="w-5 h-5" /> Get Free Prompt
                            </a>
                            <a href="#how-it-works" className="btn btn-secondary">
                                <Sparkles className="w-5 h-5" /> See How It Works
                            </a>
                        </div>
                        <div className="flex items-center gap-8 pt-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient">9</div>
                                <div className="text-sm text-gray-500">Power Prompts</div>
                            </div>
                            <div className="w-px h-12 bg-white/10"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient">2</div>
                                <div className="text-sm text-gray-500">Free Tiers</div>
                            </div>
                            <div className="w-px h-12 bg-white/10"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient">0</div>
                                <div className="text-sm text-gray-500">Coding Needed</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <div className="absolute -top-8 -left-8 p-4 glass rounded-2xl animate-float">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">🎁</span>
                                <span className="font-medium">Tier 1 FREE</span>
                            </div>
                        </div>
                        <div className="absolute top-1/2 -right-4 p-4 glass rounded-2xl animate-float" style={{ animationDelay: '1s' }}>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">📝</span>
                                <span className="font-medium">Fill Form = Tier 2</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-4 left-12 p-4 glass rounded-2xl animate-float" style={{ animationDelay: '2s' }}>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">👥</span>
                                <span className="font-medium">Refer = Tier 3</span>
                            </div>
                        </div>
                        <div className="glass rounded-2xl overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-gray-800">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span className="ml-2 text-sm text-gray-500">prompt.txt</span>
                            </div>
                            <div className="p-6 font-mono text-sm">
                                <p><span className="text-blue-400">PROMPT:</span> Build me a complete</p>
                                <p>e-commerce platform with</p>
                                <p>user auth, payments, and</p>
                                <p>admin dashboard...</p>
                                <span className="inline-block w-2 h-5 bg-blue-400 animate-pulse ml-1"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

function HowItWorks() {
    const steps = [
        { num: '01', icon: '🎁', title: 'Get Free Prompt', desc: 'Tier 1 is completely FREE. Just click and access instantly!' },
        { num: '02', icon: '📝', title: 'Unlock More', desc: 'Fill a simple form to unlock Tier 2. Or invite friends for Tier 3!' },
        { num: '03', icon: '🚀', title: 'Build Your App', desc: 'Paste the prompt into ChatGPT or Claude and watch the magic happen.' },
    ]

    return (
        <section id="how-it-works" className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full border-2 border-gray-800 bg-black text-sm text-gray-400 mb-4">
                        Simple Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
                    <p className="text-gray-400">Three steps to build any app you can imagine</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="prompt-card text-center">
                            <div className="text-xs font-mono text-gray-500 mb-4">{step.num}</div>
                            <div className="text-5xl mb-4">{step.icon}</div>
                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-gray-400">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function PromptCard({ prompt, onUnlock }: { prompt: typeof PROMPTS[0], onUnlock: (id: number, type: string) => void }) {
    const isComingSoon = prompt.unlockType === 'coming-soon'
    const isFree = prompt.unlockType === 'free' || prompt.unlockType === 'form'

    const getButtonText = () => {
        switch (prompt.unlockType) {
            case 'free': return '🎁 Get FREE Now'
            case 'form': return '⚡ Instant Unlock (Free)'
            case 'referral': return '🔓 Unlock (₹249 or Refer)'
            case 'paid': return `💳 Unlock ₹${prompt.price}`
            case 'coming-soon': return '🔔 Coming Soon'
            default: return '🔓 Unlock'
        }
    }

    const getButtonClass = () => {
        if (isComingSoon) return 'btn btn-secondary opacity-60 cursor-not-allowed'
        if (isFree) return 'btn bg-green-600 hover:bg-green-700 text-white'
        if (prompt.isMaster) return 'btn btn-master'
        return 'btn btn-unlock'
    }

    return (
        <div className={`prompt-card ${prompt.popular ? 'featured' : ''} ${prompt.isMaster ? 'master' : ''} ${isComingSoon ? 'opacity-70' : ''}`}>
            {prompt.popular && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    🔥 Popular
                </div>
            )}
            {isFree && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    🎁 FREE
                </div>
            )}
            {isComingSoon && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-gray-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Coming Soon
                </div>
            )}

            <div className="space-y-4">
                <div className="text-xs font-mono text-gray-500">{prompt.tier}</div>
                <div className="text-4xl">{prompt.icon}</div>
                <h3 className="text-xl font-semibold">{prompt.name}</h3>
                <p className="text-gray-400 text-sm">{prompt.description}</p>

                <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold ${prompt.unlockType === 'free' || prompt.unlockType === 'form' ? 'text-green-400' : ''}`}>
                        {prompt.priceLabel}
                    </span>
                </div>

                <button
                    onClick={() => !isComingSoon && onUnlock(prompt.id, prompt.unlockType)}
                    disabled={isComingSoon}
                    className={`${getButtonClass()} w-full`}
                >
                    {getButtonText()}
                </button>

                <div className="flex flex-wrap gap-2 pt-2">
                    {prompt.features.map((f, i) => (
                        <span key={i} className="text-xs text-gray-400">✓ {f}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

function PromptsSection({ onUnlock }: { onUnlock: (id: number, type: string) => void }) {
    return (
        <section id="prompts" className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full border-2 border-gray-800 bg-black text-sm text-gray-400 mb-4">
                        🔥 The Framework
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">9 Unlockable Prompt Modules</h2>
                    <p className="text-gray-400">Start FREE • Earn more by inviting friends</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROMPTS.map(prompt => (
                        <PromptCard key={prompt.id} prompt={prompt} onUnlock={onUnlock} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function PricingSection({ onUnlock }: { onUnlock: (id: number, type: string) => void }) {
    return (
        <section id="pricing" className="py-24 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full border-2 border-gray-800 bg-black text-sm text-gray-400 mb-4">
                        💰 Unlock Options
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Path</h2>
                    <p className="text-gray-400">Start free, unlock more as you grow</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Tier 1 - FREE */}
                    <div className="prompt-card text-center border-2 border-green-500">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                            Start Here!
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Tier 1: Starter</h3>
                        <div className="mb-4">
                            <span className="text-4xl font-bold text-green-400">FREE</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">Instant access, no strings</p>
                        <ul className="space-y-2 text-left mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-green-500" /> Instant unlock
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-green-500" /> Copy-to-clipboard
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-green-500" /> Basic app prompts
                            </li>
                        </ul>
                        <button onClick={() => onUnlock(1, 'free')} className="btn bg-green-600 hover:bg-green-700 text-white w-full">
                            🎁 Get Free Now
                        </button>
                    </div>

                    {/* Tier 2 - Form */}
                    <div className="prompt-card text-center">
                        <h3 className="text-xl font-semibold mb-4">Tier 2: Pro Builder</h3>
                        <div className="mb-4">
                            <span className="text-4xl font-bold text-white">FREE</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">Instant access. No forms required.</p>
                        <ul className="space-y-2 text-left mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-white" /> Instant Access
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-white" /> LLM shortcuts included
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-white" /> JSON templates
                            </li>
                        </ul>
                        <button onClick={() => onUnlock(2, 'form')} className="btn btn-primary w-full">
                            ⚡ Instant Unlock (Free)
                        </button>
                    </div>

                    {/* Tier 3 - Referral */}
                    <div className="prompt-card featured text-center relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold rounded-full">
                            🔥 Popular
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Tier 3: Industry Pro</h3>
                        <div className="mb-4">
                            <span className="text-4xl font-bold">$3</span>
                            <span className="text-gray-500 text-sm ml-2">or referral</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">Pay OR invite 3 friends who each invite 3</p>
                        <ul className="space-y-2 text-left mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-white" /> Enterprise-ready
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-white" /> 3-level referral unlock
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-white" /> Production-grade
                            </li>
                        </ul>
                        <button onClick={() => onUnlock(3, 'referral')} className="btn btn-unlock w-full">
                            🔓 Unlock with UPI
                        </button>
                    </div>
                </div>

                {/* Coming Soon */}
                <div className="mt-12 text-center">
                    <div className="glass rounded-2xl p-8">
                        <Clock className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                        <h3 className="text-2xl font-bold mb-2">Tiers 7-9 Coming Soon</h3>
                        <p className="text-gray-400 mb-4">Debug, Design, and Launch prompts are on the way!</p>
                        <p className="text-sm text-gray-500">Get Tier 1 FREE now and be the first to know when new tiers launch</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Testimonials() {
    const reviews = [
        { rating: 5, text: "Built my entire SaaS in 2 days. The free tier alone is insanely valuable!", name: "Alex K.", title: "Indie Hacker", avatar: "👨‍💻" },
        { rating: 5, text: "Invited 3 friends, they invited 3 more, got Tier 3 for free. Genius model!", name: "Sarah M.", title: "Designer", avatar: "👩‍🎨" },
        { rating: 5, text: "Finally, prompts that actually work. Pure engineering gold.", name: "Dev R.", title: "AI Engineer", avatar: "🧑‍🔬" },
    ]

    return (
        <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full border-2 border-gray-800 bg-black text-sm text-gray-400 mb-4">
                        💬 What People Say
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold">Built With PromptOS</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((r, i) => (
                        <div key={i} className="prompt-card">
                            <div className="flex gap-1 mb-4">
                                {[...Array(r.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-6">"{r.text}"</p>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{r.avatar}</span>
                                <div>
                                    <div className="font-semibold">{r.name}</div>
                                    <div className="text-sm text-gray-500">{r.title}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function FAQ() {
    const [open, setOpen] = useState<number | null>(null)

    return (
        <section id="faq" className="py-24 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full glass text-sm text-gray-400 mb-4">
                        ❓ FAQ
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                    {FAQ_ITEMS.map((item, i) => (
                        <div key={i} className="glass rounded-xl overflow-hidden">
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className="font-medium">{item.q}</span>
                                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} />
                            </button>
                            {open === i && (
                                <div className="px-5 pb-5 text-gray-400">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function CTASection() {
    return (
        <section className="py-24 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="thick-card p-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Start Building for FREE Right Now
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Tier 1 is completely free. No credit card. No catch. Just prompts that work.
                    </p>
                    <a href="#prompts" className="btn btn-primary text-lg px-8 py-4">
                        🎁 Get Free Prompt Now
                    </a>
                </div>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="border-t-2 border-gray-800 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <a href="#" className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">⚡</span>
                            <span className="font-bold text-xl">PromptOS</span>
                        </a>
                        <p className="text-gray-500 text-sm">
                            The 9-Prompt Framework for Building AI Apps
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li><a href="#prompts" className="hover:text-white transition">All Prompts</a></li>
                            <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                            <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li><a href="#" className="hover:text-white transition">Twitter/X</a></li>
                            <li><a href="#" className="hover:text-white transition">Discord</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t-2 border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    © 2024 PromptOS. All rights reserved. Built with ❤️ and AI.
                </div>
            </div>
        </footer>
    )
}

// ============================================
// MODALS
// ============================================

// Modals removed


// FormUnlockModal removed as per new requirements



// ReferralModal removed - archived in archive/payment_integrations/

// PaymentModal removed - using UPIModal for Indian payments now

// ============================================
// MAIN PAGE
// ============================================

export default function Home() {
    const [selectedPrompt, setSelectedPrompt] = useState<typeof PROMPTS[0] | null>(null)
    const [showPayment, setShowPayment] = useState(false)

    const handleUnlock = (id: number, type: string) => {
        const prompt = PROMPTS.find(p => p.id === id)
        if (!prompt) return

        if (type === 'free' || type === 'form') {
            // Instant unlock for Tier 1 and Tier 2 - no email required
            window.location.href = `/unlock?prompt=${id}`
        } else if (type === 'referral' || type === 'paid') {
            setSelectedPrompt(prompt)
            setShowPayment(true)
        }
    }

    return (
        <main>
            <Navbar />
            <Hero />
            <HowItWorks />
            <PromptsSection onUnlock={handleUnlock} />
            <PricingSection onUnlock={handleUnlock} />
            <Testimonials />
            <FAQ />
            <CTASection />
            <Footer />

            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                promptId={selectedPrompt?.id || 3}
                tierName={selectedPrompt?.name || 'Tier'}
            />
        </main>
    )
}

function FreeUnlockModal({ isOpen, onClose, prompt }: { isOpen: boolean; onClose: () => void; prompt: typeof PROMPTS[0] | null }) {
    if (!isOpen || !prompt) return null

    return (
        <div className="modal-overlay active" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <div className="text-6xl mb-4">🎁</div>
                    <h3 className="text-2xl font-bold mb-2">It&apos;s FREE!</h3>
                    <p className="text-gray-400 mb-6">Click below to access your free prompt instantly</p>
                    <Link
                        href={`/unlock?prompt=${prompt.id}`}
                        className="btn btn-primary w-full text-lg py-4"
                    >
                        ✨ Access Free Prompt
                    </Link>
                </div>
            </div>
        </div>
    )
}

