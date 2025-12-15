'use client'

import { useState } from 'react'
import { ArrowRight, Mail, Check } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setMessage('')

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

            const data = await res.json()

            if (res.ok) {
                setStatus('success')
            } else {
                setStatus('error')
                setMessage(data.error || 'Something went wrong')
            }
        } catch (error) {
            setStatus('error')
            setMessage('Failed to connect to server')
        }
    }

    if (status === 'success') {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Check your inbox!</h1>
                    <p className="text-gray-400 mb-6">
                        We sent a magic login link to <span className="text-white">{email}</span>.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="text-sm text-gray-500 hover:text-white"
                    >
                        Try a different email
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="glass rounded-2xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Enter your email to access your prompts</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    {status === 'error' && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn btn-primary w-full flex items-center justify-center gap-2"
                    >
                        {status === 'loading' ? (
                            <span className="animate-spin">⏳</span>
                        ) : (
                            <>
                                Continue <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-gray-500 hover:text-white">
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    )
}
