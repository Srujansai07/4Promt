'use client'

import { useState } from 'react'
import { X, Check, Copy, Smartphone } from 'lucide-react'

interface UPIModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    amount: number
    tierName: string
}

export function UPIModal({ isOpen, onClose, onSuccess, amount, tierName }: UPIModalProps) {
    const [copied, setCopied] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)

    if (!isOpen) return null

    // Replace with your actual UPI ID
    const UPI_ID = "promptos@upi"
    const UPI_NAME = "PromptOS"

    // UPI Intent Link
    // tr = transaction reference (using timestamp for uniqueness in demo)
    // tn = transaction note
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Unlock ${tierName}`)}`

    const handleCopy = () => {
        navigator.clipboard.writeText(UPI_ID)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleManualVerify = () => {
        setIsVerifying(true)
        // Simulate verification delay
        setTimeout(() => {
            setIsVerifying(false)
            onSuccess()
        }, 1500)
    }

    return (
        <div className="modal-overlay active" onClick={onClose}>
            <div className="modal max-w-md w-full" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Pay via UPI</h3>
                    <p className="text-gray-400">Unlock {tierName} for ₹{amount}</p>
                </div>

                <div className="space-y-6">
                    {/* QR Code Placeholder */}
                    <div className="bg-white p-4 rounded-xl w-48 h-48 mx-auto flex items-center justify-center">
                        {/* In a real app, generate a QR code here using a library like qrcode.react */}
                        <div className="text-black text-center text-sm">
                            <p className="font-bold mb-2">SCAN TO PAY</p>
                            <div className="w-32 h-32 bg-gray-200 mx-auto grid grid-cols-2 gap-1 p-1">
                                <div className="bg-black"></div><div className="bg-black"></div>
                                <div className="bg-black"></div><div className="bg-black"></div>
                            </div>
                        </div>
                    </div>

                    {/* UPI ID Copy */}
                    <div className="bg-dark-800 border border-gray-700 rounded-xl p-4 flex items-center justify-between">
                        <div className="text-left">
                            <div className="text-xs text-gray-500">UPI ID</div>
                            <div className="font-mono text-white">{UPI_ID}</div>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="p-2 hover:bg-gray-700 rounded-lg transition"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                        </button>
                    </div>

                    {/* Mobile Payment Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <a href={upiLink} className="btn bg-[#5f259f] hover:bg-[#4a1d7c] text-white border-none">
                            PhonePe
                        </a>
                        <a href={upiLink} className="btn bg-[#1a73e8] hover:bg-[#1557b0] text-white border-none">
                            GPay
                        </a>
                        <a href={upiLink} className="btn bg-[#00baf2] hover:bg-[#009ac9] text-white border-none">
                            Paytm
                        </a>
                        <a href={upiLink} className="btn bg-orange-600 hover:bg-orange-700 text-white border-none">
                            BHIM
                        </a>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-black text-gray-500">After payment</span>
                        </div>
                    </div>

                    <button
                        onClick={handleManualVerify}
                        disabled={isVerifying}
                        className="btn btn-primary w-full py-4 text-lg"
                    >
                        {isVerifying ? 'Verifying...' : '✅ I Have Paid'}
                    </button>
                </div>
            </div>
        </div>
    )
}
