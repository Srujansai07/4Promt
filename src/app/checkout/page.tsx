'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, Suspense } from 'react';

// Prompt data
const PROMPTS = [
    { id: 1, name: '🎁 Basic Prompt', description: 'Simple idea generation', price: 0, tier: 'free' },
    { id: 2, name: '⚡ Form Filler', description: 'Quick form completion prompt', price: 0, tier: 'free' },
    { id: 3, name: '🔓 Share-to-Unlock', description: 'Share with friends to unlock', price: 0, tier: 'share' },
    { id: 4, name: '💎 Architecture Format', description: 'Build complete system architectures', price: 4.30, tier: 'paid' },
    { id: 5, name: '🔥 Full Implementation', description: 'Detailed step-by-step implementation', price: 6.90, tier: 'paid' },
    { id: 6, name: '🚀 Master Prompt Pack', description: 'All prompts + bonus formats', price: 12, tier: 'paid' },
    { id: 7, name: '🔧 Debug & Optimize', description: 'Debug and optimize your code', price: 19, tier: 'coming_soon' },
    { id: 8, name: '◼️ UI/UX Designer', description: 'Create stunning interfaces', price: 29, tier: 'coming_soon' },
    { id: 9, name: '📈 Launch & Scale', description: 'Launch and scale your product', price: 49, tier: 'coming_soon' },
];

function CheckoutContent() {
    const searchParams = useSearchParams();
    const promptId = parseInt(searchParams.get('prompt') || '1');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const prompt = PROMPTS.find(p => p.id === promptId);

    if (!prompt) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Prompt not found</h1>
                    <Link href="/" className="text-purple-400 hover:underline">
                        ← Back to home
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setMessage('');

        try {
            // For free/share prompts, redirect directly
            if (prompt.tier === 'free' || prompt.tier === 'share') {
                window.location.href = `/unlock?prompt=${promptId}`;
                return;
            }

            // For paid prompts, show UPI modal (existing functionality)
            // Here we'll redirect to the main page with parameters
            window.location.href = `/?checkout=${promptId}&email=${encodeURIComponent(email)}`;

        } catch (error) {
            console.error('Checkout error:', error);
            setMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/20">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        PromptOS
                    </Link>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                        ← Back
                    </Link>
                </div>
            </nav>

            {/* Checkout Content */}
            <main className="pt-24 pb-16 px-4">
                <div className="max-w-xl mx-auto">
                    {/* Prompt Card */}
                    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-500/30 p-6 mb-8">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold">{prompt.name}</h1>
                                <p className="text-gray-400 mt-1">{prompt.description}</p>
                            </div>
                            <div className="text-right">
                                {prompt.price > 0 ? (
                                    <div className="text-3xl font-bold text-green-400">
                                        ₹{prompt.price.toFixed(0)}
                                    </div>
                                ) : (
                                    <div className="text-xl font-bold text-green-400">
                                        FREE
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tier Badge */}
                        <div className={`inline-block px-3 py-1 rounded-full text-sm ${prompt.tier === 'free' ? 'bg-green-500/20 text-green-400' :
                                prompt.tier === 'share' ? 'bg-blue-500/20 text-blue-400' :
                                    prompt.tier === 'paid' ? 'bg-purple-500/20 text-purple-400' :
                                        'bg-gray-500/20 text-gray-400'
                            }`}>
                            {prompt.tier === 'free' ? '🎁 Free' :
                                prompt.tier === 'share' ? '🔗 Share to Unlock' :
                                    prompt.tier === 'paid' ? '💎 Premium' :
                                        '🔜 Coming Soon'}
                        </div>
                    </div>

                    {/* Coming Soon Message */}
                    {prompt.tier === 'coming_soon' ? (
                        <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                            <p className="text-gray-400 mb-4">This prompt is coming soon!</p>
                            <Link
                                href="/"
                                className="text-purple-400 hover:underline"
                            >
                                ← Check out our available prompts
                            </Link>
                        </div>
                    ) : (
                        /* Checkout Form */
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            {message && (
                                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
                                    {message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                  w-full py-4 rounded-xl font-bold text-lg transition-all
                  ${loading
                                        ? 'bg-gray-600 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                                    }
                `}
                            >
                                {loading ? 'Processing...' :
                                    prompt.tier === 'free' ? '🎁 Get Free Access' :
                                        prompt.tier === 'share' ? '🔗 Continue to Share' :
                                            `💳 Pay ₹${prompt.price.toFixed(0)}`}
                            </button>

                            {/* Trust Badges */}
                            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                                <span>🔒 Secure</span>
                                <span>⚡ Instant Access</span>
                                <span>💯 No-Risk</span>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-pulse">Loading checkout...</div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
