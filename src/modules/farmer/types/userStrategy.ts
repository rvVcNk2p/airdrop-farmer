export type RawUserStrategyType = Omit<UserStrategyType, 'uid'>
export interface UserStrategyType {
	uid: string
	name: string
	airdropType: AirdropTypes
	mainnet: MainnetType
	randomActions: boolean
	signTransactionType: SignTransactionType
	farmingTestnet: boolean
	testnet?: TestnetType | null
	wallets: { label: string; value: string }[]
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
