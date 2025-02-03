'use client'

import { useEffect, useState } from 'react'
import AirdropForm from '@/components/AirdropForm'
import { useAccount } from 'wagmi'

const DEFAULT_UNSAFE_MODE = false

export default function Home() {
  const [isUnsafeMode, setIsUnsafeMode] = useState(DEFAULT_UNSAFE_MODE)
  const account = useAccount()

  useEffect(() => {
    console.log(account.address)
  }, [account.status])

  if (account.address == null) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <h2 className="text-xl font-medium text-gray-600">
          Please connect your wallet first
        </h2>
      </div>
    )
  }

  return (
    <main>
      <div className="container mx-auto p-4">
        <AirdropForm isUnsafeMode={isUnsafeMode} onModeChange={setIsUnsafeMode} />
      </div>
    </main>
  )
}