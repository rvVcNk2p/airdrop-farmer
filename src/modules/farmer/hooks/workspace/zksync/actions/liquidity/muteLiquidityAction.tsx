import { ChainIds, tokenAddresses } from '@modules/shared/constants'
import { erc20Abi, type Address, parseUnits } from 'viem'

import {
	SwapTargetSymbols,
	TxStatusType,
	ZksyncLiquidityProviders,
	type TimeIntervalConfigType,
	type TxHistoryRecordType,
	type ZkSyncMainnetActionsType,
} from '@modules/farmer/types'

import {
	createAndSendContractTxHandler,
	getEstimatedContractTransactionFee,
	getNextNonce,
	useChooseInitialToken,
} from '@modules/farmer/hooks/workspace/_shared'
import { randomWholeNumber } from '@modules/shared/utils'
import { getPriceFeed } from '@/modules/farmer/helpers/getPriceFeed'
import {
	ColorizedTextTypes,
	getColorizedText,
} from '@/modules/farmer/helpers/textColorizer'
import { createWalletClientFactory } from '@/modules/farmer/helpers/createWalletClientFactory'
import { approveSpendingCap } from '@modules/farmer/hooks/workspace/zksync/actions/swap/allowance/approveSpendingCap'
import { randomSleepAndLog } from '@modules/farmer/helpers/sleep'
import { MuteSwapAPI } from '@modules/farmer/hooks/workspace/zksync/actions/_abi/MuteSwap_ABI'
import { convert } from '@/modules/shared/utils/bignumber'

type muteLiquidityActionProps = {
	walletPrivateKey: Address
	actions: ZkSyncMainnetActionsType
	timeIntervals: TimeIntervalConfigType
	loggerFn: ({}: TxHistoryRecordType) => void
}

const USDC_ADDRESS = tokenAddresses[ChainIds.ZKSYNC][
	SwapTargetSymbols.USDC
] as Address
const VOLATILE_MUTE_LP_ADDRESS = tokenAddresses[ChainIds.ZKSYNC][
	SwapTargetSymbols.vMLP
] as Address

const MUTE_ADD_LIQUIDITY_ACTION = 'addLiquidityETH'
const MUTE_REMOVE_LIQUIDITY_ACTION = 'removeLiquidityETH'
const MUTE_SWITCH_ROUTER = '0x8B791913eB07C32779a16750e3868aA8495F5964'

export const muteLiquidityAction = async ({
	walletPrivateKey,
	actions,
	timeIntervals,
	loggerFn,
}: muteLiquidityActionProps) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { chooseInitialTokenFn } = useChooseInitialToken()
	const { createAndSendContractTx } = createAndSendContractTxHandler()

	// TODO: Safety check for the wallet balance USDC, ETH
	try {
		// Biggest balance is $23.23 USDC on ZKSYNC
		const { chainWithHighestBalanceToken: _usdcToken } =
			await chooseInitialTokenFn({
				wallet: walletPrivateKey,
				selectedNetworks: ['ZKSYNC'],
				externalChainAvailableTokens: ['USDC'],
				loggerFn,
			})

		// Biggest balance is $10.23 ETH on ZKSYNC
		const { chainWithHighestBalanceToken: _ethToken, ethPrice } =
			await chooseInitialTokenFn({
				wallet: walletPrivateKey,
				selectedNetworks: ['ZKSYNC'],
				externalChainAvailableTokens: ['ETH'],
				loggerFn,
			})

		const {
			minMaxUsdcInPercentage: { min, max },
			timeIntervalToremoveAfterProvided,
			maxGasFee,
			slippage,
		} = actions.liquidity

		const {
			chainId,
			selected: { amount: usdcAmount, token: usdcToken },
		} = _usdcToken
		const {
			selected: { amount: ethAmount, token: ethToken },
		} = _ethToken

		// Fetch USDC-USD price feed
		const usdcUsdPrice = await getPriceFeed({
			privateKey: walletPrivateKey,
			pairSymbol: 'USDC-USD',
		})

		const swapPercentage = randomWholeNumber(min, max)

		const usdcDecimal = 6
		const usdcAmountToSwap = (
			(usdcAmount * usdcUsdPrice * swapPercentage) /
			100
		).toFixed(4)

		const ethDecimal = 18
		const ethAmountToSwap = parseFloat(usdcAmountToSwap) / ethPrice
		const ethAmountToSwapInUsd = (ethPrice * ethAmountToSwap).toFixed(4)

		// Plan to do liquidity activity on MUTE $60.12 USDC to ETH
		loggerFn({
			message: `Plan to do liquidity activity on 
		${getColorizedText(ZksyncLiquidityProviders.MUTE, ColorizedTextTypes.ACTION)} 
		$${ethAmountToSwapInUsd} 
		${getColorizedText(`${usdcToken}/${ethToken}`, ColorizedTextTypes.TOKEN)}`,
		})

		const client = createWalletClientFactory(walletPrivateKey, chainId)

		// Approve USDC spending cap
		await approveSpendingCap({
			allowanceConfigObjParams: {
				chainId,
				address: USDC_ADDRESS,
				abi: erc20Abi,
				account: client.account,
				routerAddress: MUTE_SWITCH_ROUTER,
				amountToApprove: usdcAmountToSwap,
				token: SwapTargetSymbols.USDC,
				decimal: usdcDecimal,
			},
			client,
			ethPrice,
			maxGasPerTransaction: maxGasFee,
			loggerFn,
			loggetConfigObj: {
				amountInUsd: ethAmountToSwapInUsd,
				swapProvider: ZksyncLiquidityProviders.MUTE,
			},
		})

		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn,
			min: timeIntervals.sleepIntervalAfterApproval.from,
			max: timeIntervals.sleepIntervalAfterApproval.to,
		})

		// Will add liquidity on MUTE $2.12 USDC
		loggerFn({
			message: `Will add liquidity on 
		${getColorizedText(ZksyncLiquidityProviders.MUTE, ColorizedTextTypes.ACTION)} 
		$${ethAmountToSwapInUsd} 
		${getColorizedText(`${usdcToken}/${ethToken}`, ColorizedTextTypes.TOKEN)}`,
		})

		const baseConfigObjParams = {
			chainId,
			address: MUTE_SWITCH_ROUTER,
			abi: MuteSwapAPI,
			account: client.account,
		}

		// TODO: Add slippage to the amount
		const ethAmountValue = parseUnits(ethAmountToSwap + '', ethDecimal)
		const amountTokenDesired = parseUnits(usdcAmountToSwap + '', usdcDecimal)
		const amountTokenMin = 0 // TODO: Calculate min amount
		const amountETHMin = 0 // TODO: Calculate min amount
		const to = client.account.address
		const deadline = Math.floor(new Date(Date.now()).getTime() / 1000) + 60 * 60 // 1 hour
		const feeType = 50 // TODO: Calculate fee type
		const stable = false

		// Add liquidity to vMLP (USDC/WETH) on MUTE
		// Example: https://era.zksync.network/tx/0x4263a51ae83bb6478fcb28ba8b6f6d5c10bb59843f8b71818e266b665d8c34ab
		const addLiquidityConfigObj = {
			...baseConfigObjParams,
			functionName: MUTE_ADD_LIQUIDITY_ACTION,
			value: ethAmountValue,
			args: [
				USDC_ADDRESS,
				amountTokenDesired,
				amountTokenMin,
				amountETHMin,
				to,
				deadline,
				feeType,
				stable,
			],
		}

		const { gasPriceInUsd: addLiquidityGasPrice } =
			await getEstimatedContractTransactionFee({
				client,
				configObj: addLiquidityConfigObj,
				ethPrice,
				maxGasPerTransaction: maxGasFee,
			})

		// Will spend on gas up to $1.36
		loggerFn({
			message: `Will spend on gas up to $${addLiquidityGasPrice}`,
		})

		const { nextNonce } = await getNextNonce(client)

		// Create tx 1234 to add liquidity on MUTE
		loggerFn({
			message: `Created tx ${nextNonce} add liquidity on ${getColorizedText(ZksyncLiquidityProviders.MUTE, ColorizedTextTypes.NETWORK)}.`,
		})

		// Tx 1233 was signed.
		loggerFn({
			message: `Tx ${nextNonce} was signed.`,
		})

		// Sent liquidity tx 1233 to ZKSYNC chain. Wiew on Scan.
		// Add liquidity tx 1233 confirmed. View on Scan.
		await createAndSendContractTx({
			client,
			chainId,
			configObj: addLiquidityConfigObj,
			loggerMessage_1: `Sent liquidity tx ${nextNonce} to ${getColorizedText('ZKSYNC', ColorizedTextTypes.NETWORK)} chain.`,
			loggerMessage_2: `Add liquidity tx ${nextNonce} confirmed.`,
			loggerFn,
		})

		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn,
			min: timeIntervalToremoveAfterProvided.from,
			max: timeIntervalToremoveAfterProvided.to,
		})

		// ======================
		// == Remove liquidity ==
		// ======================

		// Fetch the available liquidity
		const { chainWithHighestBalanceToken: _vMLP } = await chooseInitialTokenFn({
			wallet: walletPrivateKey,
			selectedNetworks: ['ZKSYNC'],
			externalChainAvailableTokens: ['vMLP'],
			loggerFn,
		})

		const liquidity = convert(_vMLP.selected.amount + '', 'eth', 'wei')

		// Approve vMLP (USDC/WETH) spending cap
		// Example: https://era.zksync.network/tx/0xf69312c7aed059cda42fcab5fb981b91a33a233bada178a65299f5340833b37d
		await approveSpendingCap({
			allowanceConfigObjParams: {
				chainId,
				address: VOLATILE_MUTE_LP_ADDRESS,
				abi: erc20Abi,
				account: client.account,
				routerAddress: MUTE_SWITCH_ROUTER,
				amountToApprove: liquidity,
				token: SwapTargetSymbols.vMLP,
			},
			client,
			ethPrice,
			maxGasPerTransaction: maxGasFee,
			loggerFn,
			loggetConfigObj: {
				amountInUsd: _vMLP.selected.amountInUsd + '',
				swapProvider: ZksyncLiquidityProviders.MUTE,
			},
		})

		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn,
			min: timeIntervals.sleepIntervalAfterApproval.from,
			max: timeIntervals.sleepIntervalAfterApproval.to,
		})

		// Remove liquidity from vMLP (USDC/WETH) on MUTE
		// Example: https://era.zksync.network/tx/0xa24ed441d0af93eae005653f2dfbd4d0a8e8fca49e404d18b7f1a90a0da45d3d
		const removeLiquidityConfigObj = {
			...baseConfigObjParams,
			functionName: MUTE_REMOVE_LIQUIDITY_ACTION,
			args: [
				USDC_ADDRESS,
				liquidity,
				amountTokenMin,
				amountETHMin,
				to,
				deadline,
				stable,
			],
		}

		const { gasPriceInUsd: removeLiquidityGasPrice } =
			await getEstimatedContractTransactionFee({
				client,
				configObj: removeLiquidityConfigObj,
				ethPrice,
				maxGasPerTransaction: maxGasFee,
			})

		// Will spend on gas up to $1.36
		loggerFn({
			message: `Will spend on gas up to $${removeLiquidityGasPrice}`,
		})

		// Create tx 1234 to remove liquidity on MUTE
		loggerFn({
			message: `Created tx ${nextNonce + 1} to remove liquidity on ${getColorizedText(ZksyncLiquidityProviders.MUTE, ColorizedTextTypes.NETWORK)}.`,
		})

		// Tx 1233 was signed.
		loggerFn({
			message: `Tx ${nextNonce + 1} was signed.`,
		})

		// Sent remove liquidity tx 1233 to ZKSYNC chain. Wiew on Scan.
		// Remove liquidity tx 1233 confirmed. View on Scan.
		await createAndSendContractTx({
			client,
			chainId,
			configObj: removeLiquidityConfigObj,
			loggerMessage_1: `Sent remove liquidity tx ${nextNonce} to ${getColorizedText('ZKSYNC', ColorizedTextTypes.NETWORK)} chain.`,
			loggerMessage_2: `Remove liquidity tx ${nextNonce} confirmed.`,
			loggerFn,
		})

		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn,
			min: timeIntervals.timeIntervalAfterTransactions.from,
			max: timeIntervals.timeIntervalAfterTransactions.to,
		})

		// IMPROVEMENT: This amount needs to be multiplied by 2 to get the actual amount. There was a LP provide and LP remove action.
		return Number(ethAmountToSwapInUsd)
	} catch (error: any) {
		console.log('== error', error)
		const message = error?.shortMessage ?? error.message

		loggerFn({
			status: TxStatusType.ERROR,
			message,
		})
	}
}
