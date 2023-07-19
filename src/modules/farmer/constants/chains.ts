import { ChainIds } from '@modules/shared/constants'

// https://layerzero.gitbook.io/docs/technical-reference/mainnet/supported-chain-ids
// https://stargateprotocol.gitbook.io/stargate/developers/chain-ids
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
