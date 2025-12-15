'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, TrendingUp, Mail, RefreshCw } from 'lucide-react'

interface Stats {
    health: { status: string; version: string } | null
    analytics: { totalEvents: number; eventCounts: Record<string, number> } | null
    referrals: { totalReferrals: number; activeUsers: number } | null
}

export default function AdminPage() {
    const [stats, setStats] = useState<Stats>({
        health: null,
        analytics: null,
        referrals: null
    })
    const [loading, setLoading] = useState(true)
    const [password, setPassword] = useState('')
    const [authenticated, setAuthenticated] = useState(false)

    // Simple password protection (use proper auth in production)
    const ADMIN_PASSWORD = 'promptos2024'

    const fetchStats = async () => {
        setLoading(true)
        try {
            const [health, analytics, referrals] = await Promise.all([
                fetch('/api/health').then(r => r.json()).catch(() => null),
                fetch('/api/analytics').then(r => r.json()).catch(() => null),
                fetch('/api/referral').then(r => r.json()).catch(() => null)
            ])

            setStats({ health, analytics, referrals })
        } catch (error) {
            console.error('Failed to fetch stats:', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (authenticated) {
            fetchStats()
        }
    }, [authenticated])

    const [error, setError] = useState('')

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true)
            setError('')
        } else {
            setError('Incorrect password')
        }
    }

    if (!authenticated) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <div className="glass rounded-2xl p-8 max-w-md w-full">
                    <h1 className="text-2xl font-bold mb-6 text-center">🔐 Admin Access</h1>
                    <input
                        type="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value)
                            setError('')
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleLogin()}
                        className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 mb-2"
                    />
                    {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
                    <button
                        onClick={handleLogin}
                        className="btn btn-primary w-full"
                    >
                        Access Dashboard
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Site
                        </Link>
                        <h1 className="text-3xl font-bold">📊 Admin Dashboard</h1>
                    </div>
                    <button
                        onClick={fetchStats}
                        disabled={loading}
                        className="btn btn-secondary"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* System Status */}
                    <div className="glass rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                            </div>
                            <h3 className="font-semibold">System Status</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Status</span>
                                <span className={stats.health?.status === 'ok' ? 'text-green-400' : 'text-red-400'}>
                                    {stats.health?.status || 'Unknown'}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Version</span>
                                <span>{stats.health?.version || '-'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Analytics */}
                    <div className="glass rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-blue-500" />
                            </div>
                            <h3 className="font-semibold">Analytics</h3>
                        </div>
                        <div className="text-4xl font-bold mb-2">
                            {stats.analytics?.totalEvents || 0}
                        </div>
                        <p className="text-gray-400 text-sm">Total Events</p>
                    </div>

                    {/* Referrals */}
                    <div className="glass rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                <Users className="w-5 h-5 text-purple-500" />
                            </div>
                            <h3 className="font-semibold">Referrals</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Total Referrals</span>
                                <span>{stats.referrals?.totalReferrals || 0}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Active Users</span>
                                <span>{stats.referrals?.activeUsers || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Breakdown */}
                {stats.analytics?.eventCounts && Object.keys(stats.analytics.eventCounts).length > 0 && (
                    <div className="glass rounded-2xl p-6">
                        <h3 className="font-semibold mb-4">Event Breakdown</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(stats.analytics.eventCounts).map(([event, count]) => (
                                <div key={event} className="bg-dark-800 rounded-xl p-4">
                                    <div className="text-2xl font-bold">{count}</div>
                                    <div className="text-sm text-gray-400">{event}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="glass rounded-2xl p-6 mt-8">
                    <h3 className="font-semibold mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                        <a href="/api/health" target="_blank" className="btn btn-secondary text-sm">
                            View Health API
                        </a>
                        <a href="/api/analytics" target="_blank" className="btn btn-secondary text-sm">
                            View Analytics API
                        </a>
                        <a href="/api/referral" target="_blank" className="btn btn-secondary text-sm">
                            View Referral API
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}
