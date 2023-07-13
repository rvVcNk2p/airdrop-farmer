import { arbitrum, bsc, polygon } from 'viem/chains'

export interface ChainIdMap {
	[key: string]: number
}

export const ChainIds: ChainIdMap = {
	ARBITRUM: arbitrum.id,
	BSC: bsc.id,
	POLYGON: polygon.id,
}
