import { Address } from 'viem'

import { ChainIds } from './chains'

interface stargateFinanceType {
	[key: number]: Address
}

export const stargateFinance: stargateFinanceType = {
	[ChainIds.POLYGON]: '0x45a01e4e04f14f7a4a6702c74187c5f6222033cd',
	// [ChainIds.BSC]: null,
	// [ChainIds.ETHEREUM]: null,
	// [ChainIds.OPTIMISM]: null,
	// [ChainIds.ARBITRUM]: null,
}
