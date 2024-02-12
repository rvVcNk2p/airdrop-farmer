export type RawUserStrategyType = Omit<UserStrategyType, 'uid'>
export interface UserStrategyType {
	uid: string
	name: string
	txsGoal: number
	airdropType: AirdropTypes
	signTransactionType: SignTransactionType
	wallets: WalletsType[]
	timeIntervals?: TimeIntervalConfigType

	mainnet: LayerZeroMainnetType | ZkSyncMainnetType

	// Additional functionality in future
	testnet?: null // ZkSyncTestnetType | null
	farmingTestnet?: boolean
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
	bridge: {
		isSkip: boolean
		type: ZksyncBridges
		maxGasPerBridging: number
		bridgeFullbalance: boolean
		usdcToBridgeInPercentage: BalancePercentageType
		ethToBridgeInPercentage: BalancePercentageType
	}
	actions: {
		swap: {
			providers: ZksyncSwapProviders[]
			maxGasFee: number
			minMaxUsdcInPercentage: BalancePercentageType
			slippage: number
		}
		lending: {
			providers: ZksyncLendingProviders[]
			maxGasFee: number
			maxTimes: number
			timeIntervalToremoveAfterProvided: IntervalType
			minMaxUsdcInPercentage: BalancePercentageType
		}
		liquidity: {
			providers: ZksyncLiquidityProviders
			maxGasFee: number
			maxTimes: number
			minMaxUsdcInPercentage: BalancePercentageType
			slippage: number
		}
		mint: {
			maxGasFee: number
			maxTimes: number
		}
		wrapping: {}
	}
	// useRpcNode: boolean // signTransactionType
}

// LayerZero constants
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

// zkSync constants
export enum ZksyncBridges {
	ZKSYNC, // Official
	ORBITER,
}

export enum ZksyncSwapProviders {
	SYNCSWAP,
	VELOCORE,
	MUTE,
	SPACEFI,
	ONE_INCH,
}

export enum ZksyncLendingProviders {
	ERALEND,
	REACTORFUSION,
}

export enum ZksyncLiquidityProviders {
	SYNCSWAP,
	VELOCORE,
	MUTE,
	SPACEFI,
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
