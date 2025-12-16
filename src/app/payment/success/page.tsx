// src/app/payment/success/page.tsx
// Page that user is redirected to after successful Razorpay payment

import { Suspense } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Download, Copy } from 'lucide-react'

function SuccessContent() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                </div>

                <h1 className="text-3xl font-bold mb-4">Payment Successful! 🎉</h1>

                <p className="text-gray-400 mb-8">
                    Your payment has been verified. Check your email for the access link,
                    or click below to access your prompt now.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/unlock"
                        className="btn btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
                    >
                        Access Your Prompt <ArrowRight className="w-5 h-5" />
                    </Link>

                    <Link
                        href="/"
                        className="btn btn-secondary w-full"
                    >
                        Back to Home
                    </Link>
                </div>

                <div className="mt-8 p-4 bg-gray-900 rounded-xl">
                    <p className="text-sm text-gray-400">
                        💡 <strong>Tip:</strong> The prompt access link has also been sent to your email.
                        Save it for future reference!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Verifying payment...</p>
                </div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    )
}
