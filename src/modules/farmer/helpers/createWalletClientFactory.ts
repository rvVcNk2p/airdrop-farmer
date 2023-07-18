import { ChainIds } from '@modules/shared/constants/chains'
import { Address, createWalletClient, publicActions, webSocket } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { arbitrum, bsc, mainnet, optimism, polygon } from 'viem/chains'

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
		default:
			return mainnet
	}
}

// https://viem.sh/docs/clients/wallet.html
export const createWalletClientFactory = (
	privateKey: Address,
	chainId: number,
) => {
	const account = privateKeyToAccount(privateKey)
	// account.address

	const client = createWalletClient({
		account,
		chain: getChainConfiguration(chainId),
		transport: webSocket(process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_WEBSOCKET_API),
	}).extend(publicActions)

	return client
}
