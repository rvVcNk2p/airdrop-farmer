// TransferHelper::transferFrom: transferFrom failed  => Not enough allowance for transaction
// UniswapV2Router: INSUFFICIENT_A_AMOUNT => Too tight slippage, try it with 1%+

import { ChainIds, tokenAddresses } from '@modules/shared/constants'
import { erc20Abi, type Address, parseUnits } from 'viem'

import {
	SwapTargetSymbols,
	TxStatusType,
	ScrollLiquidityProviders,
	type TimeIntervalConfigType,
	type TxHistoryRecordType,
	type ScrollMainnetActionsType,
} from '@modules/farmer/types'

import {
	createAndSendContractTxHandler,
	getEstimatedContractTransactionFee,
	getNextNonce,
	useChooseInitialToken,
} from '@modules/farmer/hooks/workspace/_shared'
import { randomWholeNumber } from '@modules/shared/utils'
import {
	ColorizedTextTypes,
	getColorizedText,
} from '@modules/farmer/helpers/textColorizer'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { approveSpendingCap } from '@modules/farmer/hooks/workspace/scroll/actions/swap/allowance/approveSpendingCap'
import { randomSleepAndLog } from '@modules/farmer/helpers/sleep'
import { SpaceFiABI } from '@modules/farmer/hooks/workspace/scroll/actions/_abi/SpaceFiABI'
import {
	adjustValueWithSlippage,
	convert,
} from '@modules/shared/utils/bignumber'

type spacefiLiquidityActionProps = {
	walletPrivateKey: Address
	actions: ScrollMainnetActionsType
	timeIntervals: TimeIntervalConfigType
	loggerFn: ({}: TxHistoryRecordType) => void
}

const USDC_ADDRESS = tokenAddresses[ChainIds.SCROLL][
	SwapTargetSymbols.USDC
] as Address
const SPACEFI_SWAP_NORMAL_LP_ADDRESS = tokenAddresses[ChainIds.SCROLL][
	SwapTargetSymbols.nSLP
] as Address

const SPACEFI_ADD_LIQUIDITY_ACTION = 'addLiquidityETH'
const SPACEFI_REMOVE_LIQUIDITY_ACTION = 'removeLiquidityETH'
const SPACEFI_SWITCH_ROUTER = '0x18b71386418a9fca5ae7165e31c385a5130011b6'

export const spacefiLiquidityAction = async ({
	walletPrivateKey,
	actions,
	timeIntervals,
	loggerFn,
}: spacefiLiquidityActionProps) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { chooseInitialTokenFn } = useChooseInitialToken()
	const { createAndSendContractTx } = createAndSendContractTxHandler()

	try {
		// Biggest balance is $23.23 USDC on SCROLL
		const { chainWithHighestBalanceToken: _usdcToken } =
			await chooseInitialTokenFn({
				wallet: walletPrivateKey,
				selectedNetworks: ['SCROLL'],
				externalChainAvailableTokens: ['USDC'],
				loggerFn,
			})

		// Biggest balance is $10.23 ETH on SCROLL
		const { chainWithHighestBalanceToken: _ethToken, ethPrice } =
			await chooseInitialTokenFn({
				wallet: walletPrivateKey,
				selectedNetworks: ['SCROLL'],
				externalChainAvailableTokens: ['ETH'],
				loggerFn,
			})

		const {
			minMaxBalanceInPercentage: { min, max },
			timeIntervalToRemoveAfterProvided,
			maxGasFee,
			slippage,
		} = actions.liquidity

		const {
			chainId,
			selected: {
				amount: usdcAmount,
				token: usdcToken,
				amountInUsd: usdcAmountInUsd,
			},
		} = _usdcToken
		const {
			selected: {
				amount: ethAmount,
				token: ethToken,
				amountInUsd: ethAmountInUsd,
			},
		} = _ethToken

		// In case of liquidity, we look for the MIN token amount and check its MIN-MAX part
		const smallestAmountSymbol =
			Math.min(usdcAmountInUsd, ethAmountInUsd) == Number(usdcAmountInUsd)
				? usdcToken
				: ethToken

		const swapPercentage = randomWholeNumber(min, max)

		// smallestAmountSymbol is USDC
		const usdcDecimal = 6
		let usdcAmountToSwap = ((usdcAmount * swapPercentage) / 100).toFixed(4)

		const ethDecimal = 18
		let ethAmountToSwap = parseFloat(usdcAmountToSwap) / ethPrice
		let ethAmountToSwapInUsd = (ethPrice * ethAmountToSwap).toFixed(4)

		// smallestAmountSymbol is ETH
		if (smallestAmountSymbol === ethToken) {
			ethAmountToSwap = parseFloat(
				((ethAmount * swapPercentage) / 100).toFixed(4),
			)
			ethAmountToSwapInUsd = (ethPrice * ethAmountToSwap).toFixed(4)
			usdcAmountToSwap = (ethAmountToSwap * ethPrice).toFixed(4)
		}

		// Plan to do liquidity activity on SCROLL $60.12 USDC to ETH
		loggerFn({
			message: `Plan to do liquidity activity on
		${getColorizedText(ScrollLiquidityProviders.SPACEFI, ColorizedTextTypes.ACTION)}
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
				routerAddress: SPACEFI_SWITCH_ROUTER,
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
				swapProvider: ScrollLiquidityProviders.SPACEFI,
			},
			isSkip: false,
		})

		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn,
			min: timeIntervals.sleepIntervalAfterApproval.from,
			max: timeIntervals.sleepIntervalAfterApproval.to,
		})

		// Will add liquidity on SPACEFI $2.12 USDC
		loggerFn({
			message: `Will add liquidity on
		${getColorizedText(ScrollLiquidityProviders.SPACEFI, ColorizedTextTypes.ACTION)}
		$${ethAmountToSwapInUsd}
		${getColorizedText(`${usdcToken}/${ethToken}`, ColorizedTextTypes.TOKEN)}`,
		})

		const baseConfigObjParams = {
			chainId,
			address: SPACEFI_SWITCH_ROUTER,
			abi: SpaceFiABI,
			account: client.account,
		}
		const ethAmountValue = parseUnits(ethAmountToSwap + '', ethDecimal)
		const amountTokenDesired = parseUnits(usdcAmountToSwap + '', usdcDecimal)
		// amountTokenDesired * BigInt(10000 - slippage * 100) / BigInt(10000)
		const amountTokenMin = adjustValueWithSlippage(amountTokenDesired, slippage)
		// (ethAmountValue * BigInt(10000 - slippage * 100)) / BigInt(10000)
		const amountETHMin = adjustValueWithSlippage(ethAmountValue, slippage)
		const to = client.account.address
		const deadline = Math.floor(new Date(Date.now()).getTime() / 1000) + 60 * 60 // 1 hour

		// Add liquidity to nSLP (USDC/ETH) on SPACEFI
		// Example: https://scrollscan.com/tx/0x3c776ae9eb6c6d9b402b41e9cd09b2d3f9210aebceae744dd2a920c9efbaa4c8
		const addLiquidityConfigObj = {
			...baseConfigObjParams,
			functionName: SPACEFI_ADD_LIQUIDITY_ACTION,
			value: ethAmountValue,
			args: [
				USDC_ADDRESS,
				amountTokenDesired,
				amountTokenMin,
				amountETHMin,
				to,
				deadline,
			],
		}

		console.log('== addLiquidityConfigObj', addLiquidityConfigObj)

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

		// Create tx 1234 to add liquidity on SCROLL
		loggerFn({
			message: `Created tx ${nextNonce} add liquidity on ${getColorizedText(ScrollLiquidityProviders.SPACEFI, ColorizedTextTypes.NETWORK)}.`,
		})

		// Tx 1233 was signed.
		loggerFn({
			message: `Tx ${nextNonce} was signed.`,
		})

		// Sent liquidity tx 1233 to SCROLL chain. Wiew on Scan.
		// Add liquidity tx 1233 confirmed. View on Scan.
		const { receipt: addReceipt } = await createAndSendContractTx({
			client,
			chainId,
			configObj: addLiquidityConfigObj,
			loggerMessage_1: `Sent liquidity tx ${nextNonce} to ${getColorizedText('SCROLL', ColorizedTextTypes.NETWORK)} chain.`,
			loggerMessage_2: `Add liquidity tx ${nextNonce} confirmed.`,
			loggerFn,
			isSkip: false,
		})

		if (addReceipt.status === 'reverted') {
			throw new Error('Transaction reverted')
		}

		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn,
			min: timeIntervalToRemoveAfterProvided.from,
			max: timeIntervalToRemoveAfterProvided.to,
		})

		// ======================
		// ======================
		// == Remove liquidity ==
		// ======================
		// ======================

		// Fetch the available liquidity
		const { chainWithHighestBalanceToken: _nSLP } = await chooseInitialTokenFn({
			wallet: walletPrivateKey,
			selectedNetworks: ['SCROLL'],
			externalChainAvailableTokens: ['nSLP'],
			loggerFn,
		})

		const liquidity = convert(_nSLP.selected.amount + '', 'eth', 'wei')

		// Approve nSLP (USDC/ETH) spending cap
		// Example: https://era.zksync.network/tx/0xf69312c7aed059cda42fcab5fb981b91a33a233bada178a65299f5340833b37d
		await approveSpendingCap({
			allowanceConfigObjParams: {
				chainId,
				address: SPACEFI_SWAP_NORMAL_LP_ADDRESS,
				abi: erc20Abi,
				account: client.account,
				routerAddress: SPACEFI_SWITCH_ROUTER,
				amountToApprove: liquidity,
				token: SwapTargetSymbols.nSLP,
			},
			client,
			ethPrice,
			maxGasPerTransaction: maxGasFee,
			loggerFn,
			loggetConfigObj: {
				amountInUsd: _nSLP.selected.amountInUsd + '',
				swapProvider: ScrollLiquidityProviders.SPACEFI,
			},
			isSkip: false,
		})

		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn,
			min: timeIntervals.sleepIntervalAfterApproval.from,
			max: timeIntervals.sleepIntervalAfterApproval.to,
		})

		// Remove liquidity from nSLP (USDC/ETH) on SCROLL
		// Example: https://scrollscan.com/tx/0x8f2358c4fa566e17948d49afd725956e66a65226910076555d86dd27ed07aa5b
		const removeLiquidityConfigObj = {
			...baseConfigObjParams,
			functionName: SPACEFI_REMOVE_LIQUIDITY_ACTION,
			args: [
				USDC_ADDRESS,
				liquidity,
				amountTokenMin,
				amountETHMin,
				to,
				deadline,
			],
		}

		console.log('== removeLiquidityConfigObj', removeLiquidityConfigObj)

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

		// Create tx 1234 to remove liquidity on SCROLL
		loggerFn({
			message: `Created tx ${nextNonce + 1} to remove liquidity on ${getColorizedText(ScrollLiquidityProviders.SPACEFI, ColorizedTextTypes.NETWORK)}.`,
		})

		// Tx 1233 was signed.
		loggerFn({
			message: `Tx ${nextNonce + 1} was signed.`,
		})

		// Sent remove liquidity tx 1233 to SCROLL chain. Wiew on Scan.
		// Remove liquidity tx 1233 confirmed. View on Scan.
		// https://scrollscan.com/tx/0xfbcaab7561ff199818e2dc85134e9d494770de62f835f9d4056b55f647df9d07
		const { receipt: removeReceipt } = await createAndSendContractTx({
			client,
			chainId,
			configObj: removeLiquidityConfigObj,
			loggerMessage_1: `Sent remove liquidity tx ${nextNonce} to ${getColorizedText('SCROLL', ColorizedTextTypes.NETWORK)} chain.`,
			loggerMessage_2: `Remove liquidity tx ${nextNonce} confirmed.`,
			loggerFn,
			isSkip: false,
		})

		if (removeReceipt.status === 'reverted') {
			throw new Error('Transaction reverted')
		}

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
