import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { type ReactNode } from 'react'
import Header from "@/components/Header"

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TSender',
  description: 'Hyper gas-optimized bulk ERC20 token transfer',
}

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {props.children}</Providers>
      </body>
    </html>
  )
}
