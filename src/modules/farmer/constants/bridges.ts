import { ChainIds } from '@modules/shared/constants'
import { Address } from 'viem'

interface stargateFinanceType {
	[key: number]: Address
}
// Bridge Router
// https://stargateprotocol.gitbook.io/stargate/developers/contract-addresses/mainnet
export const stargateFinance: stargateFinanceType = {
	[ChainIds.POLYGON]: '0x45a01e4e04f14f7a4a6702c74187c5f6222033cd',
	[ChainIds.BSC]: '0x4a364f8c717cAAD9A442737Eb7b8A55cc6cf18D8',
	[ChainIds.ETHEREUM]: '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
	[ChainIds.OPTIMISM]: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
	[ChainIds.ARBITRUM]: '0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614',
	[ChainIds.AVALANCHE]: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
	[ChainIds.FANTOM]: '0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6',
	[ChainIds.METIS]: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
}
