'use client'

import { useState } from 'react'
import { X, CreditCard, Smartphone, ArrowRight, Shield } from 'lucide-react'
import { getRazorpayLink, getPromptPrice } from '@/config/products'

interface PaymentModalProps {
    isOpen: boolean
    onClose: () => void
    promptId: number
    tierName: string
}

export function PaymentModal({ isOpen, onClose, promptId, tierName }: PaymentModalProps) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    if (!isOpen) return null

    const amount = getPromptPrice(promptId)

    const handlePayment = () => {
        // Validate email
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address')
            return
        }

        setLoading(true)
        setError('')

        // Get Razorpay payment link with email prefill
        const paymentLink = getRazorpayLink(promptId, email)

        // Store email in localStorage for post-payment verification
        localStorage.setItem('promptos_payment_email', email)
        localStorage.setItem('promptos_payment_promptId', String(promptId))
        localStorage.setItem('promptos_payment_timestamp', Date.now().toString())

        // Redirect to Razorpay payment page
        // After payment, Razorpay webhook will verify and store purchase
        // User will be redirected back to success page
        window.location.href = paymentLink
    }

    return (
        <div className="modal-overlay active" onClick={onClose}>
            <div className="modal max-w-md w-full" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Unlock {tierName}</h3>
                    <div className="text-4xl font-bold text-green-400 mb-2">₹{amount}</div>
                    <p className="text-gray-400 text-sm">Secure payment via Razorpay</p>
                </div>

                <div className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Email for delivery</label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setError('')
                            }}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-gray-900 rounded-xl p-4">
                        <div className="text-sm text-gray-400 mb-3">Accepted Payment Methods</div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-white flex items-center gap-1">
                                <Smartphone className="w-3 h-3" /> UPI
                            </span>
                            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-white">GPay</span>
                            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-white">PhonePe</span>
                            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-white">Paytm</span>
                            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-white flex items-center gap-1">
                                <CreditCard className="w-3 h-3" /> Cards
                            </span>
                            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-white">Net Banking</span>
                        </div>
                    </div>

                    {/* Pay Button */}
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="btn btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Redirecting to Razorpay...
                            </>
                        ) : (
                            <>
                                Pay ₹{amount} <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                        <Shield className="w-4 h-4" />
                        <span>Secured by Razorpay • 256-bit SSL encryption</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
