import { arbitrum, bsc, mainnet, optimism, polygon } from 'viem/chains'

export interface ChainIdMap {
	[key: string]: number
}

export const ChainIds: ChainIdMap = {
	ARBITRUM: arbitrum.id,
	BSC: bsc.id,
	POLYGON: polygon.id,
	ETHEREUM: mainnet.id,
	OPTIMISM: optimism.id,
}
