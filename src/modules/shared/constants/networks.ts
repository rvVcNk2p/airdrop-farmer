import { Address } from 'viem'

import { ChainIds } from './chains'

interface TokenAddresses {
	[key: number]: {
		[key: string]: Address | undefined
	}
}
// https://stargateprotocol.gitbook.io/stargate/developers/official-erc20-addresses
export const tokenAddresses: TokenAddresses = {
	[ChainIds.BSC]: {
		USDT: '0x55d398326f99059ff775485246999027b3197955', // 18 decimals // (BSC-USD) // ATTENTION
		NATIVE_TOKEN: undefined,
	},
	[ChainIds.ARBITRUM]: {
		USDC: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8', // 6 decimals // USDC.e // ATTENTION
		USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', // 6 decimals // USDT
		NATIVE_TOKEN: undefined,
	},
	[ChainIds.POLYGON]: {
		USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // 6 decimals // USDC
		USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // 6 decimals // USDT
		NATIVE_TOKEN: undefined,
	},
	[ChainIds.ETHEREUM]: {
		USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // 6 decimals // USDC
		USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // 6 decimals // USDT
		NATIVE_TOKEN: undefined,
	},
	[ChainIds.OPTIMISM]: {
		USDC: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', // 6 decimals // USDC
		NATIVE_TOKEN: undefined,
	},
	[ChainIds.AVALANCHE]: {
		USDC: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', // 6 decimals // USDC
		USDT: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', // 6 decimals // USDt // ATTENTION
		NATIVE_TOKEN: undefined,
	},
	[ChainIds.FANTOM]: {
		USDC: '0x28a92dde19d9989f39a49905d7c9c2fac7799bdf', // 6 decimals // USDC_LZ // ATTENTION
		NATIVE_TOKEN: undefined,
	},
}

//
export const chainAvailableTokens = {
	[ChainIds.ARBITRUM]: ['USDC', 'USDT', 'NATIVE_TOKEN'],
	[ChainIds.POLYGON]: ['USDC', 'USDT', 'NATIVE_TOKEN'],
	[ChainIds.ETHEREUM]: ['USDC', 'USDT', 'NATIVE_TOKEN'],
	[ChainIds.OPTIMISM]: ['USDC', 'NATIVE_TOKEN'],
	[ChainIds.AVALANCHE]: ['USDC', 'USDT', 'NATIVE_TOKEN'],
	[ChainIds.BSC]: ['USDT', 'NATIVE_TOKEN'],
	[ChainIds.AVALANCHE]: ['USDC', 'USDT', 'NATIVE_TOKEN'],
	[ChainIds.FANTOM]: ['USDC', 'NATIVE_TOKEN'],
}
