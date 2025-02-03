'use client'

import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import { mainnet, optimism, arbitrum, anvil, base, zksync, } from 'wagmi/chains';

export function getConfig() {
  return createConfig(
    getDefaultConfig({
      appName: 'TSender',
      chains: [mainnet, optimism, arbitrum, base, zksync, anvil],
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    })
  );
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
