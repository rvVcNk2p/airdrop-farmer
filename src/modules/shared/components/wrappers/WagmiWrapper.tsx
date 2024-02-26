'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, http } from 'wagmi'
import { WagmiProvider } from 'wagmi'
import {
	arbitrum,
	avalanche,
	bsc,
	fantom,
	mainnet,
	optimism,
	polygon,
	sepolia,
	zkSync,
} from 'wagmi/chains'

export const config = createConfig({
	chains: [
		mainnet,
		arbitrum,
		bsc,
		polygon,
		optimism,
		avalanche,
		fantom,
		zkSync,
		sepolia,
	],
	transports: {
		[mainnet.id]: http(process.env.NEXT_PUBLIC_GETBLOCK_ETHEREUM_HTTP_API),
		[arbitrum.id]: http(process.env.NEXT_PUBLIC_GETBLOCK_ARBITRUM_HTTP_API),
		[bsc.id]: http(process.env.NEXT_PUBLIC_GETBLOCK_BSC_HTTP_API),
		[polygon.id]: http(process.env.NEXT_PUBLIC_GETBLOCK_POLYGON_HTTP_API),
		[optimism.id]: http(process.env.NEXT_PUBLIC_GETBLOCK_OPTIMISM_HTTP_API),
		[avalanche.id]: http(process.env.NEXT_PUBLIC_GETBLOCK_AVALANCHE_HTTP_API),
		[fantom.id]: http(process.env.NEXT_PUBLIC_GETBLOCK_FANTOM_HTTP_API),
		[zkSync.id]: http(process.env.NEXT_PUBLIC_ZKSYNC_HTTP_API),
		[sepolia.id]: http(process.env.NEXT_PUBLIC_GETBLOCK_SEPOLIA_HTTP_API),
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
					{children}
				</QueryClientProvider>
			</WagmiProvider>
		</>
	)
}
