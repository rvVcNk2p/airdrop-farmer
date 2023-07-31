// https://stargateprotocol.gitbook.io/stargate/developers/pool-ids
import { ChainIds } from '@modules/shared/constants'

export const poolsIds = {
	[ChainIds.ETHEREUM]: {
		USDC: 1,
		USDT: 2,
	},
	[ChainIds.BSC]: {
		USDT: 2,
	},
	[ChainIds.AVALANCHE]: {
		USDC: 1,
		USDT: 2,
	},
	[ChainIds.POLYGON]: {
		USDC: 1,
		USDT: 2,
	},
	[ChainIds.ARBITRUM]: {
		USDC: 1,
		USDT: 2,
	},
	[ChainIds.OPTIMISM]: {
		USDC: 1,
	},
	[ChainIds.FANTOM]: {
		USDC: 21,
	},
}
