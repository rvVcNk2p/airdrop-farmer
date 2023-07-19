import {
	arbitrum,
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
	BSC: bsc.id,
	POLYGON: polygon.id,
	ETHEREUM: mainnet.id,
	OPTIMISM: optimism.id,
	FANTOM: fantom.id,
	METIS: metis.id,
}

// https://layerzero.gitbook.io/docs/technical-reference/mainnet/supported-chain-ids
export const LayertZeroDestinationChains = {
	[ChainIds.POLYGON]: {
		chainId: 109,
		endpoint: 0x3c2269811836af69497e5f486a85d7316753cf62,
	},
	[ChainIds.ARBITRUM]: {
		chainId: 110,
		endpoint: 0x3c2269811836af69497e5f486a85d7316753cf62,
	},
}
