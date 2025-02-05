'use client'

import { useState } from 'react'
import AirdropForm from '@/components/AirdropForm'
import { useAccount } from 'wagmi'

export default function HomeContent() {
    const [isUnsafeMode, setIsUnsafeMode] = useState(false)
    const { isConnected } = useAccount()

    return (
        <main>
            {!isConnected ? (
                <div className="flex items-center justify-center min-h-screen">
                    <h2 className="text-xl font-medium text-gray-600">Please connect a wallet...</h2>
                </div>
            ) : (
                <div className="container mx-auto p-4">
                    <AirdropForm isUnsafeMode={isUnsafeMode} onModeChange={setIsUnsafeMode} />
                </div>
            )}
        </main>
    )
}