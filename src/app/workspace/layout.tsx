'use client'

import { Footer } from '@/modules/landing/components'
import { configureChains, createConfig } from 'wagmi'
import { WagmiConfig } from 'wagmi'
import { arbitrum, bsc, mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import '../globals.css'

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, arbitrum, bsc, polygon],
	[publicProvider()],
)

const config = createConfig({
	publicClient,
	webSocketPublicClient,
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<WagmiConfig config={config}>
				<main className="bg-[#13121d]">{children}</main>
			</WagmiConfig>
			<Footer />
		</>
	)
}
