import { LayerZeroNetworks } from '@modules/farmer/types/userStrategy'

export const TxScanners = {
	[LayerZeroNetworks.POLYGON]: 'https://polygonscan.com/',
	[LayerZeroNetworks.ARBITRUM]: 'https://arbiscan.io/',
	[LayerZeroNetworks.ETHEREUM]: 'https://etherscan.com/',
	[LayerZeroNetworks.OPTIMISM]: 'https://optimistic.etherscan.io/',
	[LayerZeroNetworks.BSC]: 'https://bscscan.com/',
}
