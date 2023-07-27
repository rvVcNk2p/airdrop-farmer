import { ChainIds } from '@modules/shared/constants'

export const STARGATE_ETHEREUM_CHAIN_ID = 101
export const STARGATE_BNB_CHAIN_ID = 102
export const STARGATE_AVALANCHE_CHAIN_ID = 106
export const STARGATE_POLYGON_CHAIN_ID = 109
export const STARGATE_ARBITRUM_CHAIN_ID = 110
export const STARGATE_OPTIMISM_CHAIN_ID = 111
export const STARGATE_FANTOM_CHAIN_ID = 112

// https://layerzero.gitbook.io/docs/technical-reference/mainnet/supported-chain-ids
// https://stargateprotocol.gitbook.io/stargate/developers/chain-ids
export const layertZeroDestinationChains = {
	[ChainIds.POLYGON]: {
		chainId: STARGATE_POLYGON_CHAIN_ID,
		endpoint: 0x3c2269811836af69497e5f486a85d7316753cf62,
	},
	[ChainIds.ARBITRUM]: {
		chainId: STARGATE_ARBITRUM_CHAIN_ID,
		endpoint: 0x3c2269811836af69497e5f486a85d7316753cf62,
	},
	[ChainIds.OPTIMISM]: {
		chainId: STARGATE_OPTIMISM_CHAIN_ID,
		endpoint: 0x3c2269811836af69497e5f486a85d7316753cf62,
	},
	[ChainIds.ETHEREUM]: {
		chainId: STARGATE_ETHEREUM_CHAIN_ID,
		endpoint: 0x3c2269811836af69497e5f486a85d7316753cf62,
	},
	[ChainIds.BSC]: {
		chainId: STARGATE_BNB_CHAIN_ID,
		endpoint: 0x3c2269811836af69497e5f486a85d7316753cf62,
	},
	[ChainIds.AVALANCHE]: {
		chainId: STARGATE_AVALANCHE_CHAIN_ID,
		endpoint: 0x3c2269811836af69497e5f486a85d7316753cf62,
	},
	[ChainIds.FANTOM]: {
		chainId: STARGATE_FANTOM_CHAIN_ID,
		endpoint: 0x3c2269811836af69497e5f486a85d7316753cf62,
	},
}

interface ChainNames {
	[key: number]: string
}
interface ReversChainIds {
	[key: number]: number
}

export const stargateChainsToName: ChainNames = {
	[STARGATE_ETHEREUM_CHAIN_ID]: 'ETHEREUM',
	[STARGATE_BNB_CHAIN_ID]: 'BSC',
	[STARGATE_AVALANCHE_CHAIN_ID]: 'AVALANCHE',
	[STARGATE_POLYGON_CHAIN_ID]: 'POLYGON',
	[STARGATE_ARBITRUM_CHAIN_ID]: 'ARBITRUM',
	[STARGATE_OPTIMISM_CHAIN_ID]: 'OPTIMISM',
	[STARGATE_FANTOM_CHAIN_ID]: 'FANTOM',
}

export const stargateReverseChains: ReversChainIds = {
	[STARGATE_ETHEREUM_CHAIN_ID]: ChainIds.ETHEREUM,
	[STARGATE_BNB_CHAIN_ID]: ChainIds.BSC,
	[STARGATE_AVALANCHE_CHAIN_ID]: ChainIds.AVALANCHE,
	[STARGATE_POLYGON_CHAIN_ID]: ChainIds.POLYGON,
	[STARGATE_ARBITRUM_CHAIN_ID]: ChainIds.ARBITRUM,
	[STARGATE_OPTIMISM_CHAIN_ID]: ChainIds.OPTIMISM,
	[STARGATE_FANTOM_CHAIN_ID]: ChainIds.FANTOM,
}
