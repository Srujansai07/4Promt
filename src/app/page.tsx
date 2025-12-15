'use client'

import { useState } from 'react'
import {
    Zap, Sparkles, Rocket, Code, Copy, Download, Share2,
    ChevronDown, Check, Star, ArrowRight, Menu, X
} from 'lucide-react'

// ============================================
// PROMPT DATA
// ============================================

const PROMPTS = [
    {
        id: 1,
        name: 'Starter Format',
        tier: 'Tier 1',
        price: 1,
        icon: '🌱',
        description: 'The foundation prompt for simple apps and quick prototypes. Perfect for beginners.',
        features: ['Instant access', 'Copy-to-clipboard'],
        popular: false,
    },
    {
        id: 2,
        name: 'Pro Builder Format',
        tier: 'Tier 2',
        price: 2,
        icon: '⚡',
        description: 'Advanced structure with shortcuts for LLM, JSON, and RAG configurations.',
        features: ['LLM shortcuts', 'JSON templates'],
        popular: false,
    },
    {
        id: 3,
        name: 'Industry Engineer Format',
        tier: 'Tier 3',
        price: 3,
        icon: '🏭',
        description: 'Production-grade prompt for enterprise-level applications.',
        features: ['Enterprise-ready', 'Share to unlock option'],
        popular: true,
    },
    {
        id: 4,
        name: 'Universal Architecture',
        tier: 'Tier 4',
        price: 4.30,
        icon: '🌐',
        description: 'Multi-platform prompt that works across web, mobile, and desktop.',
        features: ['Cross-platform', 'Architecture docs'],
        popular: false,
    },
    {
        id: 5,
        name: 'Ultimate A→Z Blueprint',
        tier: 'Tier 5',
        price: 6.90,
        icon: '🗺️',
        description: 'Complete end-to-end application blueprint from idea to deployment.',
        features: ['Full roadmap', 'Deployment guide'],
        popular: false,
    },
    {
        id: 6,
        name: 'Master Super Pack',
        tier: 'Master Tier',
        price: 12,
        icon: '💎',
        description: 'All prompts in one bundle. Includes Markdown, JSON & TOML formats.',
        features: ['All formats included', 'Future updates', 'Priority support'],
        popular: false,
        isMaster: true,
    },
    {
        id: 7,
        name: 'Debug & Optimize',
        tier: 'Tier 7',
        price: 4,
        icon: '🔧',
        description: 'Specialized prompt for debugging and optimizing AI-generated code.',
        features: ['Error fixing', 'Performance tips'],
        popular: false,
    },
    {
        id: 8,
        name: 'UI/UX Designer',
        tier: 'Tier 8',
        price: 5,
        icon: '🎨',
        description: 'Create stunning, modern interfaces with this design-focused prompt.',
        features: ['Modern aesthetics', 'Responsive design'],
        popular: false,
    },
    {
        id: 9,
        name: 'Launch & Scale',
        tier: 'Tier 9',
        price: 5,
        icon: '🚀',
        description: 'Final prompt for deployment, scaling, and production optimization.',
        features: ['Hosting guides', 'Scaling strategies'],
        popular: false,
    },
]

const FAQ_ITEMS = [
    {
        q: 'What exactly do I get after payment?',
        a: 'Instant access to your purchased prompt(s). You\'ll see the full prompt text with a copy-to-clipboard button. Use it unlimited times with ChatGPT, Claude, or any AI.',
    },
    {
        q: 'Which AI does this work with?',
        a: 'All major AI models: ChatGPT (GPT-4), Claude, Gemini, and any other LLM. The prompts are engineered to work universally.',
    },
    {
        q: 'Can I get a refund?',
        a: 'Due to the digital nature of the product, we don\'t offer refunds once the prompt is revealed. But we\'re confident you\'ll love it!',
    },
    {
        q: 'What\'s the difference between tiers?',
        a: 'Each tier builds on the previous. Tier 1 is for simple apps, while higher tiers handle complex architectures, deployment, and scaling. The Master Pack includes everything.',
    },
    {
        q: 'How is this different from free prompts online?',
        a: 'These aren\'t generic prompts. Each is a carefully engineered SYSTEM with proper structure, context, and output formatting. They\'re designed to produce production-ready code, not demos.',
    },
    {
        q: 'Do I need coding experience?',
        a: 'No! The prompts are designed so that the AI does the coding. You just describe what you want. Basic understanding helps, but it\'s not required.',
    },
]

// ============================================
// COMPONENTS
// ============================================

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        <span className="font-bold text-xl">PromptOS</span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#prompts" className="text-gray-400 hover:text-white transition">Prompts</a>
                        <a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a>
                        <a href="#faq" className="text-gray-400 hover:text-white transition">FAQ</a>
                        <a href="#prompts" className="btn btn-primary text-sm py-2 px-4">
                            Unlock Now <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-t border-white/5">
                    <div className="px-4 py-4 space-y-3">
                        <a href="#prompts" className="block py-2 text-gray-400 hover:text-white">Prompts</a>
                        <a href="#pricing" className="block py-2 text-gray-400 hover:text-white">Pricing</a>
                        <a href="#faq" className="block py-2 text-gray-400 hover:text-white">FAQ</a>
                        <a href="#prompts" className="btn btn-primary w-full mt-2">Unlock Now</a>
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
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-gray-400">The Future of AI App Building</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            Build Complete Apps<br />
                            <span className="text-gradient">With One Prompt.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl text-gray-400 max-w-lg">
                            The 9-Prompt Framework that transforms ChatGPT into your personal
                            full-stack developer. No coding required. Just prompts that work.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <a href="#prompts" className="btn btn-primary">
                                <Zap className="w-5 h-5" /> Unlock All Prompts
                            </a>
                            <a href="#how-it-works" className="btn btn-secondary">
                                <Sparkles className="w-5 h-5" /> See How It Works
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-8 pt-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient">9</div>
                                <div className="text-sm text-gray-500">Power Prompts</div>
                            </div>
                            <div className="w-px h-12 bg-white/10"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient">∞</div>
                                <div className="text-sm text-gray-500">Apps Possible</div>
                            </div>
                            <div className="w-px h-12 bg-white/10"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient">0</div>
                                <div className="text-sm text-gray-500">Coding Needed</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative hidden lg:block">
                        {/* Floating Cards */}
                        <div className="absolute -top-8 -left-8 p-4 glass rounded-2xl animate-float">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">🚀</span>
                                <span className="font-medium">Full-Stack Apps</span>
                            </div>
                        </div>

                        <div className="absolute top-1/2 -right-4 p-4 glass rounded-2xl animate-float" style={{ animationDelay: '1s' }}>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">🤖</span>
                                <span className="font-medium">AI-Powered</span>
                            </div>
                        </div>

                        <div className="absolute -bottom-4 left-12 p-4 glass rounded-2xl animate-float" style={{ animationDelay: '2s' }}>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">⚡</span>
                                <span className="font-medium">Instant Results</span>
                            </div>
                        </div>

                        {/* Code Window */}
                        <div className="glass rounded-2xl overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
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
        { num: '01', icon: '🔓', title: 'Unlock Your Prompt', desc: 'Choose the prompt tier that matches your project complexity. Instant access after payment.' },
        { num: '02', icon: '📋', title: 'Copy & Customize', desc: 'Copy the prompt, fill in your app idea, and paste it into ChatGPT or Claude.' },
        { num: '03', icon: '🚀', title: 'Build Your App', desc: 'Watch the AI generate complete, production-ready code for your entire application.' },
    ]

    return (
        <section id="how-it-works" className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full glass text-sm text-gray-400 mb-4">
                        Simple Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
                    <p className="text-gray-400">Three steps to build any app you can imagine</p>
                </div>

                {/* Steps */}
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

function PromptCard({ prompt, onUnlock }: { prompt: typeof PROMPTS[0], onUnlock: (id: number) => void }) {
    return (
        <div className={`prompt-card ${prompt.popular ? 'featured' : ''} ${prompt.isMaster ? 'master' : ''}`}>
            {/* Badge */}
            {prompt.popular && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    🔥 Popular
                </div>
            )}
            {prompt.isMaster && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                    👑 Best Value
                </div>
            )}

            {/* Content */}
            <div className="space-y-4">
                <div className="text-xs font-mono text-gray-500">{prompt.tier}</div>
                <div className="text-4xl">{prompt.icon}</div>
                <h3 className="text-xl font-semibold">{prompt.name}</h3>
                <p className="text-gray-400 text-sm">{prompt.description}</p>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">${prompt.price}</span>
                    <span className="text-gray-500 text-sm">one-time</span>
                </div>

                {/* Button */}
                <button
                    onClick={() => onUnlock(prompt.id)}
                    className={`btn ${prompt.isMaster ? 'btn-master' : 'btn-unlock'} w-full`}
                >
                    {prompt.isMaster ? '👑 Unlock Master Pack' : '🔓 Unlock Now'}
                </button>

                {/* Features */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {prompt.features.map((f, i) => (
                        <span key={i} className="text-xs text-gray-400">✓ {f}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

function PromptsSection({ onUnlock }: { onUnlock: (id: number) => void }) {
    return (
        <section id="prompts" className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full glass text-sm text-gray-400 mb-4">
                        🔥 The Framework
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">9 Unlockable Prompt Modules</h2>
                    <p className="text-gray-400">Each prompt is engineered for maximum AI output quality</p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROMPTS.map(prompt => (
                        <PromptCard key={prompt.id} prompt={prompt} onUnlock={onUnlock} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function PricingSection({ onUnlock }: { onUnlock: (id: number) => void }) {
    return (
        <section id="pricing" className="py-24 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full glass text-sm text-gray-400 mb-4">
                        💰 Simple Pricing
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Path</h2>
                    <p className="text-gray-400">No subscriptions. Pay once, own forever.</p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Individual */}
                    <div className="prompt-card text-center">
                        <h3 className="text-xl font-semibold mb-4">Individual Prompts</h3>
                        <div className="mb-4">
                            <span className="text-4xl font-bold">$1</span>
                            <span className="text-gray-500"> - $6.90</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">Buy only what you need</p>
                        <ul className="space-y-2 text-left mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-green-500" /> Single prompt access
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-green-500" /> Instant delivery
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-green-500" /> Copy-to-clipboard
                            </li>
                        </ul>
                        <a href="#prompts" className="btn btn-secondary w-full">Browse Prompts</a>
                    </div>

                    {/* Master Pack */}
                    <div className="prompt-card master text-center relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                            Best Value
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Master Pack</h3>
                        <div className="mb-4">
                            <span className="text-4xl font-bold">$12</span>
                            <span className="text-gray-500"> one-time</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">Everything included</p>
                        <ul className="space-y-2 text-left mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-amber-500" /> All 9 prompts
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-amber-500" /> Markdown format
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-amber-500" /> JSON format
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-amber-500" /> TOML format
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-amber-500" /> Future updates
                            </li>
                        </ul>
                        <button onClick={() => onUnlock(6)} className="btn btn-master w-full">
                            👑 Get Master Pack
                        </button>
                    </div>

                    {/* Share & Unlock */}
                    <div className="prompt-card text-center">
                        <h3 className="text-xl font-semibold mb-4">Share & Unlock</h3>
                        <div className="mb-4">
                            <span className="text-4xl font-bold">FREE</span>
                            <span className="text-gray-500"> with shares</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">Share with 3 friends</p>
                        <ul className="space-y-2 text-left mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-green-500" /> Tier 3 prompt free
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-green-500" /> Share on X/Twitter
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-green-500" /> Instant unlock
                            </li>
                        </ul>
                        <button className="btn btn-secondary w-full">
                            <Share2 className="w-4 h-4" /> Share to Unlock
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Testimonials() {
    const reviews = [
        { rating: 5, text: "Built my entire SaaS in 2 days using the Master Pack. The prompts are insanely detailed.", name: "Alex K.", title: "Indie Hacker", avatar: "👨‍💻" },
        { rating: 5, text: "These prompts saved me 100+ hours. Worth every penny. The A→Z Blueprint is 🔥", name: "Sarah M.", title: "Designer & Developer", avatar: "👩‍🎨" },
        { rating: 5, text: "Finally, prompts that actually work. Not generic garbage. Pure engineering gold.", name: "Dev R.", title: "AI Engineer", avatar: "🧑‍🔬" },
    ]

    return (
        <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full glass text-sm text-gray-400 mb-4">
                        💬 What People Say
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold">Built With PromptOS</h2>
                </div>

                {/* Reviews */}
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
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full glass text-sm text-gray-400 mb-4">
                        ❓ FAQ
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
                </div>

                {/* FAQ Items */}
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
                <div className="glass rounded-3xl p-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Build Your First AI-Powered App?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Join 500+ builders who are already using PromptOS to create amazing applications.
                    </p>
                    <a href="#prompts" className="btn btn-primary text-lg px-8 py-4">
                        🚀 Start Building Now
                    </a>
                </div>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="border-t border-white/5 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <a href="#" className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">⚡</span>
                            <span className="font-bold text-xl">PromptOS</span>
                        </a>
                        <p className="text-gray-500 text-sm">
                            The 9-Prompt Framework for Building AI Apps
                        </p>
                    </div>

                    {/* Links */}
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
                            <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            <li><a href="#" className="hover:text-white transition">Twitter/X</a></li>
                            <li><a href="#" className="hover:text-white transition">Discord</a></li>
                            <li><a href="#" className="hover:text-white transition">Email</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm">
                    © 2024 PromptOS. All rights reserved. Built with ❤️ and AI.
                </div>
            </div>
        </footer>
    )
}

function PaymentModal({
    isOpen,
    onClose,
    prompt
}: {
    isOpen: boolean;
    onClose: () => void;
    prompt: typeof PROMPTS[0] | null;
}) {
    if (!isOpen || !prompt) return null

    // TODO: Replace with your Stripe/Gumroad links
    const stripeLink = `https://buy.stripe.com/YOUR_STRIPE_LINK_${prompt.id}`
    const gumroadLink = `https://YOUR_GUMROAD.gumroad.com/l/prompt${prompt.id}`

    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center">
                    <div className="text-5xl mb-4">{prompt.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">Unlock {prompt.name}</h3>
                    <p className="text-gray-400 mb-4">Choose your preferred payment method</p>
                    <div className="text-4xl font-bold mb-6">${prompt.price}</div>

                    <div className="space-y-3">
                        <a
                            href={stripeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary w-full justify-between"
                        >
                            <span className="flex items-center gap-2">
                                💳 Pay with Stripe
                            </span>
                            <span className="text-sm opacity-70">Credit/Debit Card</span>
                        </a>

                        <a
                            href={gumroadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary w-full justify-between"
                        >
                            <span className="flex items-center gap-2">
                                🛒 Pay with Gumroad
                            </span>
                            <span className="text-sm opacity-70">Multiple options</span>
                        </a>
                    </div>

                    <p className="text-sm text-gray-500 mt-6">
                        🔒 Secure payment • Instant delivery
                    </p>
                </div>
            </div>
        </div>
    )
}

// ============================================
// MAIN PAGE
// ============================================

export default function Home() {
    const [selectedPrompt, setSelectedPrompt] = useState<typeof PROMPTS[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleUnlock = (id: number) => {
        const prompt = PROMPTS.find(p => p.id === id)
        if (prompt) {
            setSelectedPrompt(prompt)
            setIsModalOpen(true)
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
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                prompt={selectedPrompt}
            />
        </main>
    )
}
