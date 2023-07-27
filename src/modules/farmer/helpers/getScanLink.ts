import {
	STARGATE_ARBITRUM_CHAIN_ID,
	STARGATE_AVALANCHE_CHAIN_ID,
	STARGATE_BNB_CHAIN_ID,
	STARGATE_ETHEREUM_CHAIN_ID,
	STARGATE_FANTOM_CHAIN_ID,
	STARGATE_OPTIMISM_CHAIN_ID,
	STARGATE_POLYGON_CHAIN_ID,
} from '@modules/farmer/constants/chains'
import { ChainIds, TxScanners } from '@modules/shared/constants'

export const getScanLink = (chainId: number, txHash: string) => {
	switch (chainId) {
		case ChainIds.ARBITRUM:
		case STARGATE_ARBITRUM_CHAIN_ID:
			return `${TxScanners.Arbitrum}/tx/${txHash}`
		case ChainIds.ETHEREUM:
		case STARGATE_ETHEREUM_CHAIN_ID:
			return `${TxScanners.Ethereum}/tx/${txHash}`
		case ChainIds.OPTIMISM:
		case STARGATE_OPTIMISM_CHAIN_ID:
			return `${TxScanners.Optimism}/tx/${txHash}`
		case ChainIds.POLYGON:
		case STARGATE_POLYGON_CHAIN_ID:
			return `${TxScanners.Polygon}/tx/${txHash}`
		case ChainIds.AVALANCHE:
		case STARGATE_AVALANCHE_CHAIN_ID:
			return `${TxScanners.Avalanche}/tx/${txHash}`
		case ChainIds.BSC:
		case STARGATE_BNB_CHAIN_ID:
			return `${TxScanners.Bsc}/tx/${txHash}`
		case ChainIds.FANTOM:
		case STARGATE_FANTOM_CHAIN_ID:
			return `${TxScanners.Fantom}/tx/${txHash}`
		default:
			return 'SCAN NOT FOUND'
	}
}
