// src/app/api/webhook/gumroad/route.ts
import { NextRequest, NextResponse } from 'next/server'

// Gumroad webhook payload interface
interface GumroadPayload {
    email: string
    product_id: string
    product_name: string
    sale_id: string
    sale_timestamp: string
    price: string
    variants?: string
    custom_fields?: Record<string, string>
}

// Product ID to Prompt ID mapping
const PRODUCT_MAP: Record<string, number> = {
    'promptos-starter': 1,
    'promptos-pro-builder': 2,
    'promptos-industry': 3,
    'promptos-universal': 4,
    'promptos-ultimate': 5,
    'promptos-master-pack': 6,
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()

        // Parse Gumroad payload
        const payload: GumroadPayload = {
            email: formData.get('email') as string,
            product_id: formData.get('product_id') as string,
            product_name: formData.get('product_name') as string,
            sale_id: formData.get('sale_id') as string,
            sale_timestamp: formData.get('sale_timestamp') as string,
            price: formData.get('price') as string,
        }

        if (!payload.email) {
            return NextResponse.json({ error: 'No email provided' }, { status: 400 })
        }

        console.log('🛒 Gumroad sale:', payload)

        // Determine prompt ID from product
        const productSlug = payload.product_name.toLowerCase().replace(/\s+/g, '-')
        const promptId = PRODUCT_MAP[productSlug] || parseInt(payload.product_id) || 1

        console.log('📦 Mapped to prompt:', promptId)

        // TODO: When using Vercel KV, uncomment:
        // await kv.hset(`user:${payload.email}`, {
        //     [`prompt:${promptId}`]: 'purchased',
        //     [`purchase_date:${promptId}`]: new Date().toISOString(),
        //     lastPurchase: new Date().toISOString(),
        //     source: 'gumroad',
        //     gumroad_sale_id: payload.sale_id
        // })

        // TODO: Send email
        // await sendPurchaseEmail(payload.email, promptId.toString())

        console.log('✅ Gumroad purchase processed')

        return NextResponse.json({
            success: true,
            message: 'Purchase recorded',
            email: payload.email,
            promptId
        })

    } catch (error) {
        console.error('❌ Gumroad webhook error:', error)
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json({
        status: 'Gumroad webhook endpoint active',
        timestamp: new Date().toISOString(),
        products: Object.keys(PRODUCT_MAP)
    })
}
