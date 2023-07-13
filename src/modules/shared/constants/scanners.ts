import { LayerZeroNetworks } from '@modules/farmer/types/userStrategy'

export const TxScanners = {
	[LayerZeroNetworks.BSC]: 'https://bscscan.com/',
	[LayerZeroNetworks.POLYGON]: 'https://polygonscan.com/',
	[LayerZeroNetworks.ARBITRUM]: 'https://arbiscan.io/',
}
