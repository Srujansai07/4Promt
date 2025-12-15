import { kv } from '@vercel/kv'

export interface UserData {
    email: string
    purchases: number[]
    lastPurchase?: string
}

export async function getUserPurchases(email: string): Promise<number[]> {
    try {
        const data = await kv.hgetall(`user:${email}`)
        if (!data) return []

        // Extract keys that start with "prompt:"
        const purchases = Object.keys(data)
            .filter(key => key.startsWith('prompt:'))
            .map(key => parseInt(key.split(':')[1]))
            .filter(id => !isNaN(id))

        return purchases
    } catch (error) {
        console.error('Error fetching user purchases:', error)
        return []
    }
}

export async function hasUserPurchased(email: string, promptId: number): Promise<boolean> {
    try {
        const status = await kv.hget(`user:${email}`, `prompt:${promptId}`)
        return status === 'purchased'
    } catch (error) {
        console.error('Error checking purchase status:', error)
        return false
    }
}

export async function incrementShareCount(email: string): Promise<number> {
    try {
        // Increment share count
        const count = await kv.hincrby(`user:${email}`, 'shareCount', 1)
        return count
    } catch (error) {
        console.error('Error incrementing share count:', error)
        return 0
    }
}

export async function getShareCount(email: string): Promise<number> {
    try {
        const count = await kv.hget(`user:${email}`, 'shareCount')
        return typeof count === 'number' ? count : parseInt(count as string || '0')
    } catch (error) {
        console.error('Error getting share count:', error)
        return 0
    }
}
