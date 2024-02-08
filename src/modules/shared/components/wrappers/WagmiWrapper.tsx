'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, webSocket } from 'wagmi'
import { WagmiProvider } from 'wagmi'
import {
	arbitrum,
	avalanche,
	bsc,
	fantom,
	mainnet,
	optimism,
	polygon,
} from 'wagmi/chains'

export const config = createConfig({
	chains: [mainnet, arbitrum, bsc, polygon, optimism, avalanche, fantom],
	transports: {
		[mainnet.id]: webSocket(
			process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_WEBSOCKET_API,
		),
		[arbitrum.id]: webSocket(
			process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_WEBSOCKET_API,
		),
		[bsc.id]: webSocket(process.env.NEXT_PUBLIC_GETBLOCK_BSC_WEBSOCKET_API),
		[polygon.id]: webSocket(
			process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_WEBSOCKET_API,
		),
		[optimism.id]: webSocket(
			process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM_WEBSOCKET_API,
		),
		[avalanche.id]: webSocket(
			process.env.NEXT_PUBLIC_GETBLOCK_AVALANCHE_WEBSOCKET_API,
		),
		[fantom.id]: webSocket(
			process.env.NEXT_PUBLIC_GETBLOCK_FANTOM_WEBSOCKET_API,
		),
	},
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const queryClient = new QueryClient()

	return (
		<>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<main className="bg-[#13121d] pt-8">{children}</main>
				</QueryClientProvider>
			</WagmiProvider>
		</>
	)
}
