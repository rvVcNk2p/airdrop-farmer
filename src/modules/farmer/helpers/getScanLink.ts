import { ChainIds, TxScanners } from '@modules/shared/constants'

export const getScanLink = (chainId: number, txHash: string) => {
	switch (chainId) {
		case ChainIds.ARBITRUM:
			return `${TxScanners.Arbitrum}/tx/${txHash}`
		case ChainIds.ETHEREUM:
			return `${TxScanners.Ethereum}/tx/${txHash}`
		case ChainIds.OPTIMISM:
			return `${TxScanners.Optimism}/tx/${txHash}`
		case ChainIds.POLYGON:
			return `${TxScanners.Polygon}/tx/${txHash}`
	}
}
