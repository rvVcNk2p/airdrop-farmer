export type RawUserStrategyType = Omit<UserStrategyType, 'uid'>
export interface UserStrategyType {
	uid: string
	name: string
	txsGoal: number
	airdropType: AirdropTypes
	signTransactionType: SignTransactionType
	wallets: WalletsType[]
	timeIntervals: TimeIntervalConfigType

	mainnet: LayerZeroMainnetType | ZkSyncMainnetType

	// Additional functionality in future
	testnet?: null // ZkSyncTestnetType | null
	farmingTestnet?: boolean
}

export type TypedUserStrategyType<T> = Omit<
	UserStrategyType,
	'mainnet' | 'uid'
> & {
	mainnet: T
}

export type TypedUserStrategyTypeWithUid<T> = Omit<
	UserStrategyType,
	'mainnet'
> & {
	mainnet: T
}

// UserStrategyTypes
export enum AirdropTypes {
	LAYER_ZERO = 'LAYER_ZERO',
	ZK_SYNC = 'ZK_SYNC',
	STARK_NET = 'STARK_NET',
	BASE = 'BASE',
	SCROLL = 'SCROLL',
	LINEA = 'LINEA',
}

export enum SignTransactionType {
	PRIVATE_KEY = 'PRIVATE_KEY',
	MANUAL = 'MANUAL',
}

export interface WalletsType {
	label: string
	value: string
}

export interface TimeIntervalConfigType {
	timeIntervalAfterTransactions: IntervalType
	sleepIntervalAfterApproval: IntervalType
	// intervalBetweenWalletsStartTime: IntervalType
	// sleepIntervalWhenGasIsAboveYourLimits: IntervalType
}

// Mainnet Type
export interface LayerZeroMainnetType {
	networks: LayerZeroNetworks[]
	bridges: LayerZeroBridges[]
}

export interface ZkSyncMainnetType {
	bridge: ZkSyncMainnetBridgeType
	actions: ZkSyncMainnetActionsType
	// useRpcNode: boolean // signTransactionType
}

export interface ZkSyncMainnetBridgeType {
	isSkip: boolean
	type: ZksyncBridges
	maxGasPerBridging: number
	bridgeFullbalance: boolean
	usdcToBridgeInPercentage: BalancePercentageType
	ethToBridgeInPercentage: BalancePercentageType
}
export interface ZkSyncMainnetActionsType {
	swap: {
		providers: ZksyncSwapProviders[]
		maxGasFee: number
		minMaxUsdcInPercentage: BalancePercentageType
		slippage: number
	}
	liquidity: {
		providers: ZksyncLiquidityProviders[]
		maxGasFee: number
		maxTimes: number
		minMaxUsdcInPercentage: BalancePercentageType
		timeIntervalToremoveAfterProvided: IntervalType
		slippage: number
	}
	lending: {
		providers: ZksyncLendingProviders[]
		maxGasFee: number
		maxTimes: number
		minMaxUsdcInPercentage: BalancePercentageType
		timeIntervalToremoveAfterProvided: IntervalType
	}
	mint: {
		providers: ZksyncMintProviders[]
		maxGasFee: number
		maxTimes: number
	}
	wrapping: {}
}

// LayerZero constants
export enum LayerZeroNetworks {
	ETHEREUM = 'ETHEREUM',
	ARBITRUM = 'ARBITRUM',
	POLYGON = 'POLYGON',
	OPTIMISM = 'OPTIMISM',
	BSC = 'BSC',
	AVALANCHE = 'AVALANCHE',
	FANTOM = 'FANTOM',
	METIS = 'METIS',
	APTOS = 'APTOS',
}

export type PossibleNetworks = LayerZeroNetworks

export enum LayerZeroBridges {
	STARGATE = 'STARGATE',
	WOOFI = 'WOOFI',
}

// zkSync constants
export enum ZksyncBridges {
	ZKSYNC = 'ZKSYNC', // Official
	ORBITER = 'ORBITER',
}

export enum ZksyncActionProviders {
	SWAP = 'SWAP',
	LIQUIDITY = 'LIQUIDITY',
	LENDING = 'LENDING',
	MINT = 'MINT',
	// WRAPPING = 'WRAPPING',
}

export enum ZksyncSwapProviders {
	SYNCSWAP = 'SYNCSWAP',
	VELOCORE = 'VELOCORE',
	MUTE = 'MUTE',
	SPACEFI = 'SPACEFI',
	ONE_INCH = 'ONE_INCH',
}

export enum ZksyncLendingProviders {
	ERALEND = 'ERALEND',
	REACTORFUSION = 'REACTORFUSION',
}

export enum ZksyncLiquidityProviders {
	SYNCSWAP = 'SYNCSWAP',
	VELOCORE = 'VELOCORE',
	MUTE = 'MUTE',
	SPACEFI = 'SPACEFI',
}

export enum ZksyncMintProviders {
	ZKNS_DOMAINS = 'ZKNS_DOMAINS',
}

// Shared Types
interface IntervalType {
	from: number // seconds
	to: number // seconds
}

interface BalancePercentageType {
	min: number
	max: number
}
