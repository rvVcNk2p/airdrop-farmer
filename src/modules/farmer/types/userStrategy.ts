export type RawUserStrategyType = Omit<UserStrategyType, 'uid'>
export interface UserStrategyType {
	uid: string
	name: string
	airdropType: AirdropTypes
	mainnet: MainnetType // LayerZeroMainnetType | ZkSyncMainnetType
	testnet?: TestnetType | null
	farmingTestnet: boolean
	signTransactionType: SignTransactionType
	wallets: { label: string; value: string }[]
	randomActions: boolean
	shardedConfig?: ShardedConfig
}

interface ShardedConfig {
	txsNumberPerWallet: number
	sleepTimeBetweenTxs: number
	maxGasPerTxs: number
}

interface LayerZeroMainnetType {
	networks: LayerZeroNetworks[]
	bridges: LayerZeroBridges[]
}
export interface MainnetType {
	txsNumberPerWallet: number
	networks: string[]
	maxGasPerTxs: number
	bridges: string[]
}

export type TestnetType = MainnetType

export enum SignTransactionType {
	PRIVATE_KEY = 'PRIVATE_KEY',
	MANUAL = 'MANUAL',
}

export enum AirdropTypes {
	LAYER_ZERO = 'LAYER_ZERO',
	ZK_SYNC = 'ZK_SYNC',
	STARK_NET = 'STARK_NET',
	BASE = 'BASE',
	SCROLL = 'SCROLL',
	LINEA = 'LINEA',
}

export enum LayerZeroNetworks {
	ETHEREUM = 'Ethereum',
	ARBITRUM = 'Arbitrum',
	POLYGON = 'Polygon',
	OPTIMISM = 'Optimism',
	BSC = 'Bsc',
	AVALANCHE = 'Avalanche',
	FANTOM = 'Fantom',
	METIS = 'Metis',
	APTOS = 'Aptos',
}

export enum LayerZeroBridges {
	STARGATE = 'Stargate',
	WOOFI = 'Woofi',
}
