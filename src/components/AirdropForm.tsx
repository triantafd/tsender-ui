'use client'

import { useState, useMemo } from 'react'
import { AiTwotoneAlert } from "react-icons/ai"

interface AirdropFormProps {
    isUnsafeMode: boolean
    onModeChange: (unsafe: boolean) => void
}

export default function AirdropForm({ isUnsafeMode, onModeChange }: AirdropFormProps) {
    const [tokenAddress, setTokenAddress] = useState('')
    const [recipients, setRecipients] = useState('')
    const [amounts, setAmounts] = useState('')

    const total = useMemo(() => {
        try {
            const amountArray = amounts
                .split(',')
                .map(amt => amt.trim())
                .filter(amt => amt !== '')
                .map(amt => parseFloat(amt))

            return amountArray.reduce((acc, curr) => acc + curr, 0).toString()
        } catch (error) {
            return 'Invalid input'
        }
    }, [amounts])

    return (
        <div className={`max-w-2xl mx-auto p-6 ${isUnsafeMode ? 'border-2 border-red-500 rounded-lg' : 'border-2 border-blue-500 rounded-lg'}`}>
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => onModeChange(false)}
                    className={`p-3 rounded-lg ${!isUnsafeMode ? 'bg-blue-50 text-blue-600' : 'cursor-pointer hover:bg-gray-50'}`}
                >
                    Safe Mode
                </button>
                <button
                    onClick={() => onModeChange(true)}
                    className={`p-3 flex items-center gap-2 rounded-lg ${isUnsafeMode
                        ? 'bg-red-50 text-red-600 border-2 border-red-500'
                        : 'cursor-pointer text-red-500 border-2 border-red-500 hover:bg-red-50'
                        }`}
                >
                    <AiTwotoneAlert size={20} />
                    Unsafe Mode
                </button>
            </div>

            {isUnsafeMode && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                    <AiTwotoneAlert size={20} />
                    <span>Using unsafe super gas optimized mode</span>
                    <div className="relative group">
                        <div className="cursor-help ml-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                />
                            </svg>
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-64">
                            This mode skips certain safety checks to optimize for gas, which could potentially make the transaction vulnerable issues if you are not 100% sure of how to verify your calldata.
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 border-8 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Token Address</label>
                    <input
                        type="text"
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        placeholder="0x..."
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Recipients (comma separated)</label>
                    <textarea
                        value={recipients}
                        onChange={(e) => setRecipients(e.target.value)}
                        placeholder="0x123..., 0x456..."
                        className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Amounts (comma separated)</label>
                    <textarea
                        value={amounts}
                        onChange={(e) => setAmounts(e.target.value)}
                        placeholder="100, 200, 300..."
                        className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Total Amount</label>
                    <input
                        type="text"
                        value={total}
                        disabled
                        className="w-full p-2 border rounded-lg bg-gray-50"
                    />
                </div>

                <button
                    className={`cursor-pointer w-full p-3 rounded-lg text-white transition-colors ${isUnsafeMode
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                >
                    {isUnsafeMode ? 'Send Tokens (Unsafe)' : 'Send Tokens'}
                </button>
            </div>
        </div>
    )
}