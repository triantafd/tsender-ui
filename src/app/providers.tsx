'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState, useEffect } from 'react'
import { WagmiProvider } from 'wagmi'
import { cookieToInitialState } from 'wagmi'

import { ConnectKitProvider } from 'connectkit';
import { getConfig } from '@/connectKitConfig'

export function Providers(props: {
  children: ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())
  const [config] = useState(() => getConfig())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const initialState = mounted
    ? cookieToInitialState(config, document.cookie)
    : undefined

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{props.children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
