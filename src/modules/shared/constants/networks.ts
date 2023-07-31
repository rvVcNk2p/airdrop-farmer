import { Address } from 'viem'

import { ChainIds } from './chains'

interface TokenAddresses {
	[key: number]: {
		[key: string]: Address | undefined
	}
}

export const tokenAddresses: TokenAddresses = {
	[ChainIds.BSC]: {
		USDT: '0x55d398326f99059ff775485246999027b3197955', // 18 decimals // (BSC-USD) // ATTENTION
		NATIVE_TOKEN: undefined,
	},
	[ChainIds.ARBITRUM]: {
		USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // 6 decimals // USDC.e // ATTENTION
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
		USDC: '0x04068da6c83afcfa0e13ba15a6696662335d5b75', // 6 decimals // USDC
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
	[ChainIds.AVALANCHE]: ['USDC', 'NATIVE_TOKEN'],
}

// export const tokenAddresses = [
// 	{
// 		network: LayerZeroNetworks.BSC,
// 		tokenList: [
// 			{
// 				name: 'BNB',
// 				address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
// 				decimals: 18,
// 				symbol: 'BNB',
// 			},
// 			{
// 				name: 'USDT',
// 				address: '0x55d398326f99059ff775485246999027b3197955',
// 				decimals: 18,
// 				symbol: 'USDT',
// 			},
// 		],
// 	},
// 	{
// 		network: LayerZeroNetworks.POLYGON,
// 		tokenList: [
// 			{
// 				name: 'MATIC',
// 				address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
// 				decimals: 18,
// 				symbol: 'BNB',
// 			},
// 			{
// 				name: 'USDC',
// 				address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
// 				decimals: 6,
// 				symbol: 'USDC',
// 			},
// 			{
// 				name: 'USDT',
// 				address: '0x55d398326f99059ff775485246999027b3197955',
// 				decimals: 18,
// 				symbol: 'USDT',
// 			},
// 		],
// 	},
// 	{
// 		network: LayerZeroNetworks.ARBITRUM,
// 		tokenList: [
// 			{
// 				name: 'ARBITRUM',
// 				address: '0x912ce59144191c1204e64559fe8253a0e49e6548',
// 				decimals: 18,
// 				symbol: 'ARB',
// 			},
// 			{
// 				name: 'USDC',
// 				address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
// 				decimals: 6,
// 				symbol: 'USDC',
// 			},
// 			{
// 				name: 'USDT',
// 				address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
// 				decimals: 6,
// 				symbol: 'USDT',
// 			},
// 		],
// 	},
// ]
