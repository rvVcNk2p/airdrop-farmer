import {
	ScrollSwapProviders,
	SwapTargetSymbols,
	TxStatusType,
	type TxHistoryRecordType,
	type ScrollMainnetActionsType,
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
import { approveSpendingCap } from '@modules/farmer/hooks/workspace/scroll/actions/swap/allowance'
import { ChainIds } from '@modules/shared/constants/chains'

import { SpaceFiABI } from '@modules/farmer/hooks/workspace/scroll/actions/_abi/SpaceFiABI'

type spacefiSwapActionProps = {
	walletPrivateKey: Address
	actions: ScrollMainnetActionsType
	timeIntervals: TimeIntervalConfigType
	loggerFn: ({}: TxHistoryRecordType) => void
}

// https://docs.spacefi.io/contracts-and-abis
const SPACEFI_SWAP_ROUTER_ADDRESS = '0x18b71386418a9fca5ae7165e31c385a5130011b6'
const USDC_ADDRESS = tokenAddresses[ChainIds.SCROLL][SwapTargetSymbols.USDC]
const WETH_ADDRESS = tokenAddresses[ChainIds.SCROLL][SwapTargetSymbols.WETH]

export const spacefiSwapAction = async ({
	walletPrivateKey,
	actions,
	timeIntervals,
	loggerFn,
}: spacefiSwapActionProps) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { chooseInitialTokenFn } = useChooseInitialToken()
	const { createAndSendContractTx } = createAndSendContractTxHandler()

	try {
		// Choose the chain with the highest balance of ETH
		// Biggest balance is $64.23 USDC on SCROLL
		const { chainWithHighestBalanceToken, ethPrice } =
			await chooseInitialTokenFn({
				wallet: walletPrivateKey,
				selectedNetworks: ['SCROLL'],
				externalChainAvailableTokens: ['ETH', 'USDC'],
				loggerFn,
			})

		const {
			chainId,
			selected: { amount, token },
		} = chainWithHighestBalanceToken

		const {
			minMaxBalanceInPercentage: { min, max },
			maxGasFee,
			slippage,
		} = actions.swap

		// Swap 15-35% of the balance if token is ETH
		const swapPercentage =
			token === SwapTargetSymbols.ETH
				? randomWholeNumber(15, 35)
				: randomWholeNumber(min, max)

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

		// Plan to do swap activity on SPACEFI $60.12 USDC to ETH
		loggerFn({
			message: `Plan to do swap activity on ${getColorizedText(ScrollSwapProviders.SPACEFI, ColorizedTextTypes.ACTION)} $${amountToSwapInUsd} ${getColorizedText(token, ColorizedTextTypes.TOKEN)} to ${getColorizedText(swapTargetSymbol, ColorizedTextTypes.TOKEN)}`,
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
					routerAddress: SPACEFI_SWAP_ROUTER_ADDRESS,
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
					swapProvider: ScrollSwapProviders.SPACEFI,
				},
				doubleGas: true,
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

		// Will swap on SPACEFI $60.12 USDC to ETH
		loggerFn({
			message: `Will swap on ${getColorizedText(ScrollSwapProviders.SPACEFI, ColorizedTextTypes.NETWORK)} $${amountToSwapInUsd} ${getColorizedText(token, ColorizedTextTypes.TOKEN)} to ${getColorizedText(swapTargetSymbol, ColorizedTextTypes.TOKEN)}.`,
		})

		const amountIn = parseUnits(amountToSwap + '', decimal)
		const amountOutMin = 0
		const deadline = Math.floor(new Date(Date.now()).getTime() / 1000) + 3600 // 1 hour

		const baseConfigObjParams = {
			chainId,
			address: SPACEFI_SWAP_ROUTER_ADDRESS,
			abi: SpaceFiABI,
			account: client.account,
		}
		// Swap USDC to ETH
		const spacefiSwapConfigObjUsdcToEth = {
			...baseConfigObjParams,
			functionName: 'swapExactTokensForETH',
			args: [
				amountIn,
				amountOutMin,
				[USDC_ADDRESS, WETH_ADDRESS],
				client.account.address,
				deadline,
			],
		}

		// Swap ETH to USDC
		const spacefiSwapConfigObjEthToUsdc = {
			...baseConfigObjParams,
			functionName: 'swapExactETHForTokens',
			value: amountIn,
			args: [
				amountOutMin,
				[WETH_ADDRESS, USDC_ADDRESS],
				client.account.address,
				deadline,
			],
		}

		let spacefiSwapConfigObj =
			token === SwapTargetSymbols.USDC
				? spacefiSwapConfigObjUsdcToEth
				: spacefiSwapConfigObjEthToUsdc

		const { gasPriceInUsd: swapGasPriceInUsd, estimatedGas } =
			await getEstimatedContractTransactionFee({
				client,
				configObj: spacefiSwapConfigObj,
				ethPrice,
				maxGasPerTransaction: maxGasFee,
			})

		// Will spend on gas up to $0.17
		loggerFn({
			message: `Will spend on gas up to $${swapGasPriceInUsd}`,
		})

		const { transactionCount } = await getNextNonce(client)

		// Create tx 1234 to swap on SPACEFI
		loggerFn({
			message: `Created tx ${transactionCount} to swap on ${getColorizedText(ScrollSwapProviders.SPACEFI, ColorizedTextTypes.NETWORK)}.`,
		})

		// Tx 1233 was signed.
		loggerFn({
			message: `Tx ${transactionCount} was signed.`,
		})

		spacefiSwapConfigObj = {
			...spacefiSwapConfigObj,
			// @ts-ignore
			gas: estimatedGas * BigInt(2),
			nonce: transactionCount,
		}

		// Sent swap tx 1234 to SCROLL chain. Wiew on Scan.
		// Swap tx 1234 confirmed. View on Scan.
		await createAndSendContractTx({
			client,
			chainId,
			configObj: spacefiSwapConfigObj,
			loggerMessage_1: `Sent swap tx ${transactionCount} to ${getColorizedText('SCROLL', ColorizedTextTypes.NETWORK)} chain.`,
			loggerMessage_2: `Swap tx ${transactionCount} confirmed.`,
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
