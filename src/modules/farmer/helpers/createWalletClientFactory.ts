import { ChainIds } from '@modules/shared/constants/chains'
import { Address, createWalletClient, publicActions, webSocket } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import {
	arbitrum,
	avalanche,
	bsc,
	fantom,
	mainnet,
	optimism,
	polygon,
} from 'viem/chains'

const getChainConfiguration = (chainId: number) => {
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
		default:
			return mainnet
	}
}

const getAlchemyUrl = (chainId: number) => {
	switch (chainId) {
		case ChainIds.ETHEREUM:
			return process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_WEBSOCKET_API
		case ChainIds.OPTIMISM:
			return process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM_WEBSOCKET_API
		case ChainIds.POLYGON:
			return process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_WEBSOCKET_API
		case ChainIds.ARBITRUM:
			return process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_WEBSOCKET_API
		case ChainIds.BSC:
			return process.env.NEXT_PUBLIC_GETBLOCK_BSC_WEBSOCKET_API
		case ChainIds.AVALANCHE:
			return process.env.NEXT_PUBLIC_GETBLOCK_AVALANCHE_WEBSOCKET_API
		case ChainIds.FANTOM:
			return process.env.NEXT_PUBLIC_GETBLOCK_FANTOM_WEBSOCKET_API
		default:
			return process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_WEBSOCKET_API
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
		transport: webSocket(getAlchemyUrl(chainId)),
	}).extend(publicActions)

	return client
}
