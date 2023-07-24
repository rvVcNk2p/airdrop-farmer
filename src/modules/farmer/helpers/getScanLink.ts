import {
	STARGATE_ARBITRUM_CHAIN_ID,
	STARGATE_POLYGON_CHAIN_ID,
} from '@modules/farmer/constants/chains'
import { ChainIds, TxScanners } from '@modules/shared/constants'

export const getScanLink = (chainId: number, txHash: string) => {
	switch (chainId) {
		case ChainIds.ARBITRUM:
		case STARGATE_ARBITRUM_CHAIN_ID:
			return `${TxScanners.Arbitrum}/tx/${txHash}`
		case ChainIds.ETHEREUM:
			return `${TxScanners.Ethereum}/tx/${txHash}`
		case ChainIds.OPTIMISM:
			return `${TxScanners.Optimism}/tx/${txHash}`
		case ChainIds.POLYGON:
		case STARGATE_POLYGON_CHAIN_ID:
			return `${TxScanners.Polygon}/tx/${txHash}`
		default:
			return 'SCAN NOT FOUND'
	}
}
