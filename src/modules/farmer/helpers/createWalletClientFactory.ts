import { ChainIds } from '@modules/shared/constants/chains'
import { Address, Chain, createWalletClient, http, publicActions } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import {
	arbitrum,
	avalanche,
	bsc,
	fantom,
	mainnet,
	optimism,
	polygon,
	zkSync,
	sepolia,
	scroll,
} from 'viem/chains'

const getChainConfiguration = (chainId: number): Chain => {
	switch (chainId) {
		case ChainIds.ETHEREUM:
			return mainnet
		case ChainIds.BSC:
			return bsc
		case ChainIds.OPTIMISM:
			return optimism
		case ChainIds.POLYGON:
			return polygon
		case ChainIds.ARBITRUM:
			return arbitrum
		case ChainIds.AVALANCHE:
			return avalanche
		case ChainIds.FANTOM:
			return fantom
		case ChainIds.ZKSYNC:
			return zkSync
		case ChainIds.SCROLL:
			return scroll
		case ChainIds.SEPOLIA:
			return sepolia
		default:
			return mainnet
	}
}

const getHttpUrl = (chainId: number) => {
	switch (chainId) {
		case ChainIds.ETHEREUM:
			return process.env.NEXT_PUBLIC_ANKR_ETHEREUM_HTTP_API
		case ChainIds.BSC:
			return process.env.NEXT_PUBLIC_ANKR_BSC_HTTP_API
		case ChainIds.OPTIMISM:
			return process.env.NEXT_PUBLIC_ANKR_OPTIMISM_HTTP_API
		case ChainIds.POLYGON:
			return process.env.NEXT_PUBLIC_ANKR_POLYGON_HTTP_API
		case ChainIds.ARBITRUM:
			return process.env.NEXT_PUBLIC_ANKR_ARBITRUM_HTTP_API
		case ChainIds.AVALANCHE:
			return process.env.NEXT_PUBLIC_ANKR_AVALANCHE_HTTP_API
		case ChainIds.FANTOM:
			return process.env.NEXT_PUBLIC_ANKR_FANTOM_HTTP_API
		case ChainIds.ZKSYNC:
			return process.env.NEXT_PUBLIC_ANKR_ZKSYNC_HTTP_API
		case ChainIds.SEPOLIA:
			return process.env.NEXT_PUBLIC_ANKR_SEPOLIA_HTTP_API
		case ChainIds.BASE:
			return process.env.NEXT_PUBLIC_ANKR_BASE_HTTP_API
		case ChainIds.SCROLL:
			return process.env.NEXT_PUBLIC_ANKR_SCROLL_HTTP_API
		default:
			return process.env.NEXT_PUBLIC_ANKR_ETHEREUM_HTTP_API
	}
}

// https://viem.sh/docs/clients/wallet.html
export const createWalletClientFactory = (
	privateKey: Address,
	chainId: number,
) => {
	const account = privateKeyToAccount(privateKey)

	const client = createWalletClient({
		account,
		chain: getChainConfiguration(chainId),
		transport: http(getHttpUrl(chainId), { batch: true }),
	}).extend(publicActions)

	return client
}
