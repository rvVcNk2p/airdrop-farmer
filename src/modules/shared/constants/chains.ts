import {
	arbitrum,
	avalanche,
	bsc,
	fantom,
	mainnet,
	metis,
	optimism,
	polygon,
} from 'viem/chains'

export interface ChainIdMap {
	[key: string]: number
}

export const ChainIds: ChainIdMap = {
	ARBITRUM: arbitrum.id,
	AVALANCHE: avalanche.id,
	BSC: bsc.id,
	POLYGON: polygon.id,
	ETHEREUM: mainnet.id,
	OPTIMISM: optimism.id,
	FANTOM: fantom.id,
	METIS: metis.id,
}
