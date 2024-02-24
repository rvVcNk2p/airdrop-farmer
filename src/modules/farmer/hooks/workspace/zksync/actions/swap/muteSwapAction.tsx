import {
	ZksyncSwapProviders,
	SwapTargetSymbols,
	TxStatusType,
	type TxHistoryRecordType,
	type ZkSyncMainnetActionsType,
	type TimeIntervalConfigType,
} from '@modules/farmer/types'
import { erc20Abi, type Address, parseUnits } from 'viem'

import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { randomWholeNumber } from '@modules/shared/utils'
import {
	ColorizedTextTypes,
	getColorizedText,
} from '@modules/farmer/helpers/textColorizer'

import {
	getEstimatedContractTransactionFee,
	getNextNonce,
	useChooseInitialToken,
	createAndSendContractTxHandler,
} from '@modules/farmer/hooks/workspace/_shared'

import { tokenAddresses } from '@modules/shared/constants'
import { randomSleepAndLog } from '@modules/farmer/helpers/sleep'
import { approveSpendingCap } from './allowance/approveSpendingCap'
import { ChainIds } from '@modules/shared/constants/chains'

import { MuteSwapAPI } from '@modules/farmer/hooks/workspace/zksync/actions/_abi/MuteSwap_ABI'

type muteSwapActionProps = {
	walletPrivateKey: Address
	actions: ZkSyncMainnetActionsType
	timeIntervals: TimeIntervalConfigType
	loggerFn: ({}: TxHistoryRecordType) => void
}

// https://wiki.mute.io/mute/mute-switch-api/contracts#era-mainnet
const MUTE_SWAP_ROUTER_ADDRESS = '0x8B791913eB07C32779a16750e3868aA8495F5964'
const USDC_ADDRESS = tokenAddresses[ChainIds.ZKSYNC][SwapTargetSymbols.USDC]
const WETH_ADDRESS = tokenAddresses[ChainIds.ZKSYNC][SwapTargetSymbols.WETH]

export const muteSwapAction = async ({
	walletPrivateKey,
	actions,
	timeIntervals,
	loggerFn,
}: muteSwapActionProps) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { chooseInitialTokenFn } = useChooseInitialToken()
	const { createAndSendContractTx } = createAndSendContractTxHandler()

	await randomSleepAndLog({
		wallet: walletPrivateKey,
		loggerFn,
		min: 1,
		max: 3,
	})

	return 43.45

	try {
		// Choose the chain with the highest balance of ETH
		// Biggest balance is $64.23 USDC on ZKSYNC
		const { chainWithHighestBalanceToken, ethPrice } =
			await chooseInitialTokenFn({
				wallet: walletPrivateKey,
				selectedNetworks: ['ZKSYNC'],
				externalChainAvailableTokens: ['ETH', 'USDC'],
				loggerFn,
			})

		const {
			chainId,
			selected: { amount, token },
		} = chainWithHighestBalanceToken

		const {
			minMaxUsdcInPercentage: { min, max },
			maxGasFee,
			slippage,
		} = actions.swap

		const swapPercentage = randomWholeNumber(min, max)
		const amountToSwap = ((amount * swapPercentage) / 100).toFixed(4)
		const amountToSwapInUsd =
			token === SwapTargetSymbols.USDC
				? amountToSwap
				: (ethPrice * parseFloat(amountToSwap)).toFixed(4)

		const swapTargetSymbol =
			token === SwapTargetSymbols.USDC
				? SwapTargetSymbols.ETH
				: SwapTargetSymbols.USDC

		let decimal = 18
		if (token === SwapTargetSymbols.USDC) decimal = 6

		// Plan to do swap activity on MUTE $60.12 USDC to ETH
		loggerFn({
			message: `Plan to do swap activity on ${getColorizedText(ZksyncSwapProviders.MUTE, ColorizedTextTypes.ACTION)} $${amountToSwapInUsd} ${getColorizedText(token, ColorizedTextTypes.TOKEN)} to ${getColorizedText(swapTargetSymbol, ColorizedTextTypes.TOKEN)}`,
		})

		const client = createWalletClientFactory(walletPrivateKey, chainId)

		// (OPTIONAL) Approve spending cap if token is not ETH
		if (token !== SwapTargetSymbols.ETH) {
			await approveSpendingCap({
				allowanceConfigObjParams: {
					chainId,
					address: tokenAddresses[chainId][token] as Address,
					abi: erc20Abi,
					account: client.account,
					routerAddress: MUTE_SWAP_ROUTER_ADDRESS,
					amountToApprove: amountToSwap,
					token: swapTargetSymbol,
					decimal,
				},
				client,
				ethPrice,
				maxGasPerTransaction: maxGasFee,
				loggerFn,
				loggetConfigObj: {
					amountInUsd: amountToSwapInUsd,
					swapProvider: ZksyncSwapProviders.MUTE,
				},
			})

			await randomSleepAndLog({
				wallet: walletPrivateKey,
				loggerFn,
				min: timeIntervals.sleepIntervalAfterApproval.from,
				max: timeIntervals.sleepIntervalAfterApproval.to,
			})
		}

		// ============
		// ============
		// === Swap ===
		// ============
		// ============

		// Will swap on MUTE $60.12 USDC to ETH
		loggerFn({
			message: `Will swap on ${getColorizedText(ZksyncSwapProviders.MUTE, ColorizedTextTypes.NETWORK)} $${amountToSwapInUsd} ${getColorizedText(token, ColorizedTextTypes.TOKEN)} to ${getColorizedText(swapTargetSymbol, ColorizedTextTypes.TOKEN)}.`,
		})

		const amountIn = parseUnits(amountToSwap + '', decimal)
		const amountOutMin = 0
		const deadline = Math.floor(new Date(Date.now()).getTime() / 1000) + 3600 // 1 hour

		const baseConfigObjParams = {
			chainId,
			address: MUTE_SWAP_ROUTER_ADDRESS,
			abi: MuteSwapAPI,
			account: client.account,
		}
		// Swap USDC to ETH
		const muteSwapConfigObjUsdcToEth = {
			...baseConfigObjParams,
			functionName: 'swapExactTokensForETH',
			args: [
				amountIn,
				amountOutMin,
				[USDC_ADDRESS, WETH_ADDRESS],
				client.account.address,
				deadline,
				[true, false],
			],
		}

		// Swap ETH to USDC
		const muteSwapConfigObjEthToUsdc = {
			...baseConfigObjParams,
			functionName: 'swapExactETHForTokens',
			value: amountIn,
			args: [
				amountOutMin,
				[WETH_ADDRESS, USDC_ADDRESS],
				client.account.address,
				deadline,
				[true, false],
			],
		}

		const muteSwapConfigObj =
			token === SwapTargetSymbols.USDC
				? muteSwapConfigObjUsdcToEth
				: muteSwapConfigObjEthToUsdc

		const { gasPriceInUsd: swapGasPriceInUsd } =
			await getEstimatedContractTransactionFee({
				client,
				configObj: muteSwapConfigObj,
				ethPrice,
				maxGasPerTransaction: maxGasFee,
			})

		// Will spend on gas up to $0.17
		loggerFn({
			message: `Will spend on gas up to $${swapGasPriceInUsd}`,
		})

		const { nextNonce } = await getNextNonce(client)

		// Create tx 1234 to swap on MUTE
		loggerFn({
			message: `Created tx ${nextNonce} to swap on ${getColorizedText(ZksyncSwapProviders.MUTE, ColorizedTextTypes.NETWORK)}.`,
		})

		// Tx 1233 was signed.
		loggerFn({
			message: `Tx ${nextNonce} was signed.`,
		})

		// Sent swap tx 1234 to ZKSYNC chain. Wiew on Scan.
		// Swap tx 1234 confirmed. View on Scan.
		await createAndSendContractTx({
			client,
			chainId,
			configObj: muteSwapConfigObj,
			loggerMessage_1: `Sent swap tx ${nextNonce} to ${getColorizedText('ZKSYNC', ColorizedTextTypes.NETWORK)} chain.`,
			loggerMessage_2: `Swap tx ${nextNonce} confirmed.`,
			loggerFn,
		})

		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn,
			min: timeIntervals.timeIntervalAfterTransactions.from,
			max: timeIntervals.timeIntervalAfterTransactions.to,
		})

		return Number(amountToSwapInUsd)
	} catch (error: any) {
		console.log('== error', error)
		const message = error?.shortMessage ?? error.message

		loggerFn({
			status: TxStatusType.ERROR,
			message,
		})
	}
}
