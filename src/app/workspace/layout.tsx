'use client'

import { Footer } from '@/modules/landing/components'
import Header from '@modules/landing/components/Header'
import { configureChains, createConfig } from 'wagmi'
import { WagmiConfig } from 'wagmi'
import {
	arbitrum,
	avalanche,
	bsc,
	fantom,
	mainnet,
	optimism,
	polygon,
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import '../globals.css'

// If you want to integrate with more networks, you can add them here.
const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, arbitrum, bsc, polygon, optimism, avalanche, fantom],
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
			<Header />
			<WagmiConfig config={config}>
				<main className="bg-[#13121d] pt-8">{children}</main>
			</WagmiConfig>
			<Footer />
		</>
	)
}
