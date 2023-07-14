import { ChainIds } from '@modules/shared/constants/chains'
import { Address, createWalletClient, http, publicActions } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { arbitrum, bsc, mainnet, polygon } from 'viem/chains'

const getChainConfiguration = (chainId: number) => {
	switch (chainId) {
		case ChainIds.ETHEREUM:
			return mainnet
		case ChainIds.BSC:
			return bsc
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
		transport: http(),
	}).extend(publicActions)

	return client
}
