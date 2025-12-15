import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'
import { getUserPurchases } from '@/lib/user'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LogOut, Package, ExternalLink } from 'lucide-react'

// Re-use the prompt content map or import it if shared
// For now, I'll just map IDs to names/icons roughly or fetch from a config
// Ideally, this should be in a shared config file.
const PROMPT_NAMES: Record<number, string> = {
    1: 'Starter Format',
    2: 'Pro Builder Format',
    3: 'Industry Engineer Format',
    4: 'Universal Architecture',
    5: 'Ultimate A→Z Blueprint',
    6: 'Master Super Pack',
    7: 'Debug & Optimize',
    8: 'UI/UX Designer',
    9: 'Launch & Scale',
}

export default async function DashboardPage() {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('session')?.value

    if (!sessionToken) {
        redirect('/login')
    }

    const payload = await verifySessionToken(sessionToken)
    if (!payload || !payload.email) {
        redirect('/login')
    }

    const email = payload.email as string
    const purchases = await getUserPurchases(email)

    // Always include Prompt 1 (Free)
    const allPrompts = new Set([...purchases, 1])
    const promptList = Array.from(allPrompts).sort((a, b) => a - b)

    return (
        <main className="min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
                        <p className="text-gray-400">Welcome back, {email}</p>
                    </div>
                    <form action="/api/auth/logout" method="POST">
                        <button className="btn btn-secondary flex items-center gap-2">
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </form>
                </div>

                {/* Purchases Grid */}
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    Your Prompts
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {promptList.map((id) => (
                        <Link
                            key={id}
                            href={`/unlock?prompt=${id}&email=${email}`}
                            className="glass p-6 rounded-xl hover:bg-white/5 transition group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl">
                                        {id === 6 ? '💎' : '📄'}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold group-hover:text-blue-400 transition">
                                            {PROMPT_NAMES[id] || `Prompt ${id}`}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {id === 1 ? 'Free Tier' : 'Purchased'}
                                        </p>
                                    </div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition" />
                            </div>
                        </Link>
                    ))}
                </div>

                {promptList.length === 1 && (
                    <div className="mt-12 p-8 glass rounded-2xl text-center">
                        <h3 className="text-xl font-bold mb-2">Unlock More Power?</h3>
                        <p className="text-gray-400 mb-6">
                            You only have the starter prompt. Upgrade to the Master Pack to get everything!
                        </p>
                        <Link href="/#prompts" className="btn btn-primary">
                            View All Prompts
                        </Link>
                    </div>
                )}
            </div>
        </main>
    )
}
