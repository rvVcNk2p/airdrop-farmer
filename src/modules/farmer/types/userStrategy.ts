export type RawUserStrategyType = Omit<UserStrategyType, 'uid'>
export interface UserStrategyType {
	uid: string
	name: string
	txsGoal: number
	airdropType: AirdropTypes
	signTransactionType: SignTransactionType
	wallets: WalletsType[]
	timeIntervals: TimeIntervalConfigType

	mainnet: LayerZeroMainnetType | ZkSyncMainnetType | ScrollMainnetType

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
		providers: ZksyncSwapActionProviders[]
		maxGasFee: number
		minMaxUsdcInPercentage: BalancePercentageType
		slippage: number
	}
	liquidity: {
		providers: ZksyncLiquidityActionProviders[]
		maxGasFee: number
		maxTimes: number
		minMaxUsdcInPercentage: BalancePercentageType
		timeIntervalToremoveAfterProvided: IntervalType
		slippage: number
	}
	lending: {
		providers: ZksyncLendingActionProviders[]
		maxGasFee: number
		maxTimes: number
		minMaxUsdcInPercentage: BalancePercentageType
		timeIntervalToremoveAfterProvided: IntervalType
	}
	// mint: {
	// 	providers: ZksyncMintProviders[]
	// 	maxGasFee: number
	// 	maxTimes: number
	// }
	wrapping: {}
}

export interface ScrollMainnetType {
	bridge: ScrollMainnetBridgeType
	actions: ScrollMainnetActionsType
}
export interface ScrollMainnetBridgeType {
	isSkip: boolean
	type: ScrollBridges
	maxGasPerBridging: number
	bridgeFullbalance: boolean
	bridgeOnlyEthBalance: boolean
	usdcToBridgeInPercentage: BalancePercentageType
	ethToBridgeInPercentage: BalancePercentageType
}

export interface ScrollMainnetActionsType {
	swap: {
		providers: ScrollSwapActionProviders[]
		maxGasFee: number
		minMaxBalanceInPercentage: BalancePercentageType
		slippage: number
	}
	liquidity: {
		providers: ScrollLiquidityActionProviders[]
		maxGasFee: number
		maxTimes: number
		timeIntervalToRemoveAfterProvided: IntervalType
		minMaxBalanceInPercentage: BalancePercentageType
		slippage: number
	}
	lending: {
		providers: ScrollLendingActionProviders[]
		maxGasFee: number
		maxTimes: number
		minMaxBalanceInPercentage: BalancePercentageType
		timeIntervalToRemoveAfterProvided: IntervalType
	}
	mint: {
		providers: ScrollMintProviders[]
		maxTimes: number
		maxGasFee: number
	}
	deploy: {
		providers: ScrollDeployProviders[]
		maxTimes: number
	}
	// dmail: {
	// 	providers: ScrollDMailProviders[]
	// 	maxTimes: number
	// }
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
	// MINT = 'MINT',
	// WRAPPING = 'WRAPPING',
}

export enum ZksyncSwapProviders {
	SYNCSWAP = 'SYNCSWAP',
	VELOCORE = 'VELOCORE',
	MUTE = 'MUTE',
	SPACEFI = 'SPACEFI',
	// ONE_INCH = 'ONE_INCH',
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

export enum ZksyncSwapActionProviders {
	SYNCSWAP_SWAP = 'SYNCSWAP_SWAP',
	VELOCORE_SWAP = 'VELOCORE_SWAP',
	MUTE_SWAP = 'MUTE_SWAP',
	SPACEFI_SWAP = 'SPACEFI_SWAP',
	// ONE_INCH_SWAP = 'ONE_INCH_SWAP',
}
export enum ZksyncLendingActionProviders {
	ERALEND_LENDING = 'ERALEND_LENDING',
	REACTORFUSION_LENDING = 'REACTORFUSION_LENDING',
}
export enum ZksyncLiquidityActionProviders {
	SYNCSWAP_LIQUIDITY = 'SYNCSWAP_LIQUIDITY',
	VELOCORE_LIQUIDITY = 'VELOCORE_LIQUIDITY',
	MUTE_LIQUIDITY = 'MUTE_LIQUIDITY',
	SPACEFI_LIQUIDITY = 'SPACEFI_LIQUIDITY',
}
export enum ZksyncMintActionProviders {
	ZKNS_DOMAINS_MINT = 'ZKNS_DOMAINS_MINT',
}

export enum SwapTargetSymbols {
	'USDC' = 'USDC',
	'USDT' = 'USDT',
	'WETH' = 'WETH',
	'ETH' = 'ETH',
	'vMLP' = 'vMLP',
}

// Scroll constants
export enum ScrollBridges {
	OFFICIAL = 'OFFICIAL',
	ORBITER = 'ORBITER',
}
export enum ScrollActionProviders {
	SWAP = 'SWAP',
	LIQUIDITY = 'LIQUIDITY',
	LENDING = 'LENDING',
	MINT = 'MINT',
	// DMAIL = 'DMAIL',
	// DEBPLOY_CONTRACT = 'DEPLOY_CONTRACT',
}

export enum ScrollSwapProviders {
	SYNCSWAP = 'SYNCSWAP', // ETH-USDC, ETH-USDT, USDC-USDT
	SPACEFI = 'SPACEFI', // ETH-USDC, ETH-USDT, USDC-USDT
	SKYDROME = 'SKYDROME', // ETH-USDC, ETH-USDT, USDC-USDT
	IZUMI = 'IZUMI', // ETH-USDC, ETH-USDT, USDC-USDT
	NATIVE = 'NATIVE', // ETH-USDC, ETH-USDT, USDC-USDT
	OPEN_OCEAN = 'OPEN_OCEAN', // ETH-USDC, ETH-USDT, USDC-USDT
}
export enum ScrollLiquidityProviders {
	SYNCSWAP = 'SYNCSWAP', // ETH-USDC
	SPACEFI = 'SPACEFI', // ETH-USDC
}
export enum ScrollLendingProviders {
	LAYER_BANK = 'LAYER_BANK', // ETH, USDC
}
export enum ScrollMintProviders {
	SCROLLNS = 'SCROLLNS',
}
export enum ScrollDeployProviders {
	MERKLY = 'MERKLY',
}

export enum ScrollSwapActionProviders {
	SYNCSWAP_SWAP = 'SYNCSWAP_SWAP', // ETH-USDC, ETH-USDT, USDC-USDT
	SPACEFI_SWAP = 'SPACEFI_SWAP', // ETH-USDC, ETH-USDT, USDC-USDT
	SKYDROME_SWAP = 'SKYDROME_SWAP', // ETH-USDC, ETH-USDT, USDC-USDT
	IZUMI_SWAP = 'IZUMI_SWAP', // ETH-USDC, ETH-USDT, USDC-USDT
	NATIVE_SWAP = 'NATIVE_SWAP', // ETH-USDC, ETH-USDT, USDC-USDT
	OPEN_OCEAN_SWAP = 'OPEN_OCEAN_SWAP', // ETH-USDC, ETH-USDT, USDC-USDT
}
export enum ScrollLiquidityActionProviders {
	SYNCSWAP_LIQUIDITY = 'SYNCSWAP_LIQUIDITY', // ETH-USDC
	SPACEFI_LIQUIDITY = 'SPACEFI_LIQUIDITY', // ETH-USDC
}
export enum ScrollLendingActionProviders {
	LAYER_BANK_LENDING = 'LAYER_BANK_LENDING', // ETH, USDC
}
export enum ScrollMintActionProviders {
	SCROLLNS_MINT = 'SCROLLNS_MINT',
}
export enum ScrollDeployActionProviders {
	MERKLY_BASIC_DEPLOY = 'MERKLY_BASIC_DEPLOY',
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
