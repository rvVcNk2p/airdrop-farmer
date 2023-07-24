import { ChainIds } from '@modules/shared/constants'

export const STARGATE_POLYGON_CHAIN_ID = 109
export const STARGATE_ARBITRUM_CHAIN_ID = 110

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
}

interface ChainNames {
	[key: number]: string
}
interface ReversChainIds {
	[key: number]: number
}

export const stargateChainsToName: ChainNames = {
	[STARGATE_POLYGON_CHAIN_ID]: 'POLYGON',
	[STARGATE_ARBITRUM_CHAIN_ID]: 'ARBITRUM',
}

export const stargateReverseChains: ReversChainIds = {
	[STARGATE_POLYGON_CHAIN_ID]: ChainIds.POLYGON,
	[STARGATE_ARBITRUM_CHAIN_ID]: ChainIds.ARBITRUM,
}
