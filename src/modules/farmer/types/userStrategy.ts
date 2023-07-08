export interface UserStrategyType {
	uid: string
	name: string
	airdropType: AirdropType
	mainnet: MainnetType
	testnet: TestnetType
	randomActions: boolean
	signTransactionType: SignTransactionType
}

export interface MainnetType {
	txsNumberPerWallet: number
	networks: string[]
	maxGasPerTxs: number
	bridges: string[]
}

export type TestnetType = MainnetType & {
	farmingTestnet: boolean
}

export enum SignTransactionType {
	PRIVATE_KEY = 'PRIVATE_KEY',
	MANUAL = 'MANUAL',
}

export enum AirdropType {
	LAYER_ZERO = 'LAYER_ZERO',
	ZK_SYNC = 'ZK_SYNC',
	STARK_NET = 'STARK_NET',
}

export enum LayerZeroNetworks {
	ETHEREUM = 'Ethereum',
	POLYGON = 'Polygon',
	BSC = 'Binance',
	ARBITRUM = 'Arbitrum',
	AVALANCE = 'Avalance',
	OPTIMISM = 'Optimism',
	METIS = 'Metis',
	APTOS = 'Aptos',
	FANTOM = 'Fantom',
	ZKERA = 'ZkEra',
}

export enum LayerZeroBridges {
	STARGATE = 'Stargate',
	WOOFI = 'Woofi',
}
