// TODO: Adjust the gas price and gas limit for the LayerBank lending action
import { type Address, erc20Abi, parseUnits } from 'viem'
import { randomSleepAndLog } from '@modules/farmer/helpers/sleep'
import { ChainIds, tokenAddresses } from '@modules/shared/constants'

import {
	SwapTargetSymbols,
	TxStatusType,
	ScrollLendingProviders,
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
import { LayerBankABI } from '@modules/farmer/hooks/workspace/scroll/actions/_abi/LayerBankABI'

type LayerBankLendingActionProps = {
	walletPrivateKey: Address
	actions: ScrollMainnetActionsType
	timeIntervals: TimeIntervalConfigType
	loggerFn: ({}: TxHistoryRecordType) => void
}

const USDC_ADDRESS = tokenAddresses[ChainIds.SCROLL][
	SwapTargetSymbols.USDC
] as Address

const LAYER_BANK_LENDING_ROUTER_ADDRESS =
	'0xec53c830f4444a8a56455c6836b5d2aa794289aa'

const LAYER_BANK_LENDING_ROUTER_ADDRESS_IUSDC =
	'0x0D8F8e271DD3f2fC58e5716d3Ff7041dBe3F0688'
const LAYER_BANK_LENDING_ROUTER_ADDRESS_IETH =
	'0x274C3795dadfEbf562932992bF241ae087e0a98C'

const LAYER_BANK_ADD_LENDING_ACTION = 'supply'
const LAYER_BANK_REMOVE_LENDING_ACTION = 'redeemUnderlying'

export const layerBankLendingAction = async ({
	walletPrivateKey,
	actions,
	timeIntervals,
	loggerFn,
}: LayerBankLendingActionProps) => {
	// Provide ETH to the LayerBank pool
	// https://scrollscan.com/tx/0xd5c36b95530389ceedf2c45b4af487cade82e2135d260d92c473f8629eb72c4f
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { chooseInitialTokenFn } = useChooseInitialToken()
	const { createAndSendContractTx } = createAndSendContractTxHandler()

	try {
		// Biggest balance is $23.23 USDC or ETH on SCROLL
		const { chainWithHighestBalanceToken, ethPrice } =
			await chooseInitialTokenFn({
				wallet: walletPrivateKey,
				selectedNetworks: ['SCROLL'],
				externalChainAvailableTokens: ['ETH', 'USDC'],
				loggerFn,
			})

		const {
			minMaxBalanceInPercentage: { min, max },
			timeIntervalToRemoveAfterProvided,
			maxGasFee,
		} = actions.lending

		const {
			chainId,
			selected: { amount, token },
		} = chainWithHighestBalanceToken

		const swapPercentage = randomWholeNumber(min, max)
		const amountToSwap = ((amount * swapPercentage) / 100).toFixed(4)
		const amountToSwapInUsd =
			token === SwapTargetSymbols.USDC
				? amountToSwap
				: (ethPrice * parseFloat(amountToSwap)).toFixed(4)

		let decimal = 18
		if (token === SwapTargetSymbols.USDC) decimal = 6

		// Plan to do lending activity on LAYER BANK with $60.12 USDC
		loggerFn({
			message: `Plan to do lending activity on ${getColorizedText(ScrollLendingProviders.LAYER_BANK, ColorizedTextTypes.ACTION)} with $${amountToSwapInUsd} ${getColorizedText(token, ColorizedTextTypes.TOKEN)}`,
		})

		const client = createWalletClientFactory(walletPrivateKey, chainId)

		// (OPTIONAL) Approve spending cap if token is USDC
		// https://scrollscan.com/tx/0x93fcc84050c9e5ba07d0fc38bde044bb2b6fa4e18bd4596bdd00a46fbe94df6e
		if (token === SwapTargetSymbols.USDC) {
			await approveSpendingCap({
				allowanceConfigObjParams: {
					chainId,
					address: USDC_ADDRESS,
					abi: erc20Abi,
					account: client.account,
					routerAddress: LAYER_BANK_LENDING_ROUTER_ADDRESS_IUSDC,
					amountToApprove: amountToSwap,
					token: SwapTargetSymbols.USDC,
					decimal,
				},
				client,
				ethPrice,
				maxGasPerTransaction: maxGasFee,
				loggerFn,
				loggetConfigObj: {
					amountInUsd: amountToSwapInUsd,
					swapProvider: ScrollLendingProviders.LAYER_BANK,
				},
				isSkip: false,
			})

			await randomSleepAndLog({
				wallet: walletPrivateKey,
				loggerFn,
				min: timeIntervals.sleepIntervalAfterApproval.from,
				max: timeIntervals.sleepIntervalAfterApproval.to,
			})
		}

		// ===============
		// ===============
		// === Lending ===
		// ===============
		// ===============

		// Will add lending on MUTE $2.12 USDC
		loggerFn({
			message: `Will add lending on ${getColorizedText(ScrollLendingProviders.LAYER_BANK, ColorizedTextTypes.NETWORK)} $${amountToSwapInUsd} ${getColorizedText(token, ColorizedTextTypes.TOKEN)} to ${getColorizedText(token, ColorizedTextTypes.TOKEN)}.`,
		})

		const baseConfigObjParams = {
			chainId,
			account: client.account,
			address: LAYER_BANK_LENDING_ROUTER_ADDRESS,
		}

		const uAmount = parseUnits(amountToSwap + '', decimal)

		// Lend USDC
		// https://scrollscan.com/tx/0x0e029ea6d8113bdaad36a884b7af44292b4eb53a203d1b852e8f0f4bc9ff390b
		const configObjUsdcToEth = {
			...baseConfigObjParams,
			abi: LayerBankABI,
			functionName: LAYER_BANK_ADD_LENDING_ACTION,
			args: [LAYER_BANK_LENDING_ROUTER_ADDRESS_IUSDC, uAmount],
		}

		// Lend ETH
		// https://scrollscan.com/tx/0xd5c36b95530389ceedf2c45b4af487cade82e2135d260d92c473f8629eb72c4f
		const configObjEthToUsdc = {
			...baseConfigObjParams,
			value: uAmount,
			abi: LayerBankABI,
			functionName: LAYER_BANK_ADD_LENDING_ACTION,
			args: [LAYER_BANK_LENDING_ROUTER_ADDRESS_IETH, uAmount],
		}

		let lendingConfigObj =
			token === SwapTargetSymbols.USDC ? configObjUsdcToEth : configObjEthToUsdc

		const {
			gasPriceInUsd: swapGasPriceInUsd,
			estimatedGas: addLendingEstimatedGas,
		} = await getEstimatedContractTransactionFee({
			client,
			configObj: lendingConfigObj,
			ethPrice,
			maxGasPerTransaction: maxGasFee,
		})

		// Will spend on gas up to $0.17
		loggerFn({
			message: `Will spend on gas up to $${swapGasPriceInUsd}`,
		})

		const { nextNonce } = await getNextNonce(client)

		// Create tx 1234 to lending on SYNCSWAP
		loggerFn({
			message: `Created tx ${nextNonce} to lending on ${getColorizedText(ScrollLendingProviders.LAYER_BANK, ColorizedTextTypes.NETWORK)}.`,
		})

		// Tx 1233 was signed.
		loggerFn({
			message: `Tx ${nextNonce} was signed.`,
		})

		// It will revert with error - If we don't adjust the args.uAmount and we do not raise the gas with simulated result
		const lendingProvideSimulatedResult = await client.simulateContract(
			lendingConfigObj as any,
		)
		lendingConfigObj.args = [
			lendingConfigObj.args[0],
			lendingProvideSimulatedResult.result,
		]
		lendingConfigObj = {
			...lendingConfigObj,
			// @ts-ignore
			gas: addLendingEstimatedGas * BigInt(2),
		}

		// Sent lending tx 1234 to SCROLL chain. Wiew on Scan.
		// Lending tx 1234 confirmed. View on Scan.
		await createAndSendContractTx({
			client,
			chainId,
			configObj: lendingConfigObj,
			loggerMessage_1: `Sent lending tx ${nextNonce} to ${getColorizedText('SCROLL', ColorizedTextTypes.NETWORK)} chain.`,
			loggerMessage_2: `Lending tx ${nextNonce} confirmed.`,
			loggerFn,
			isSkip: false,
		})

		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn,
			min: timeIntervalToRemoveAfterProvided.from,
			max: timeIntervalToRemoveAfterProvided.to,
		})

		// ======================
		// ======================
		// == Remove lending ==
		// ======================
		// ======================

		loggerFn({
			message: `Will remove ${getColorizedText(token, ColorizedTextTypes.TOKEN)} lending on ${getColorizedText(ScrollLendingProviders.LAYER_BANK, ColorizedTextTypes.NETWORK)}.`,
		})

		// Remove liquidity from ETH/USDC on LAYER_BANK
		// USDC Example: https://scrollscan.com/tx/0x6dcae62afd3adf59a4acb74b8ce56a553493493610b7fbc1fd8c73c1970a1f2c
		// ETH Example: https://scrollscan.com/tx/0xda2163e7cc95de57c6fee7d3a5efe696b252b8546e9182ed14ce4aa15a7b7e90
		let removeLendingConfigObj = {
			...baseConfigObjParams,
			abi: LayerBankABI,
			functionName: LAYER_BANK_REMOVE_LENDING_ACTION,
			args: [
				token === SwapTargetSymbols.USDC
					? LAYER_BANK_LENDING_ROUTER_ADDRESS_IUSDC
					: LAYER_BANK_LENDING_ROUTER_ADDRESS_IETH,
				uAmount,
			],
		}

		const {
			gasPriceInUsd: removeLendingGasPrice,
			estimatedGas: removeLendingEstimatedGas,
		} = await getEstimatedContractTransactionFee({
			client,
			configObj: removeLendingConfigObj,
			ethPrice,
			maxGasPerTransaction: maxGasFee,
		})

		// Will spend on gas up to $1.36
		loggerFn({
			message: `Will spend on gas up to $${removeLendingGasPrice}`,
		})

		// Create tx 1234 to remove lending on LAYER_BANK
		loggerFn({
			message: `Created tx ${nextNonce + 1} to remove lending on ${getColorizedText(ScrollLendingProviders.LAYER_BANK, ColorizedTextTypes.NETWORK)}.`,
		})

		// Tx 1233 was signed.
		loggerFn({
			message: `Tx ${nextNonce + 1} was signed.`,
		})

		// It will revert with error - If we don't adjust the the args.uAmount and we do not raise the gas with simulated result
		const removeLendingSimulatedResult = await client.simulateContract(
			removeLendingConfigObj as any,
		)
		removeLendingConfigObj.args = [
			removeLendingConfigObj.args[0],
			removeLendingSimulatedResult.result,
		]
		removeLendingConfigObj = {
			...removeLendingConfigObj,
			// @ts-ignore
			gas: removeLendingEstimatedGas * BigInt(2),
		}

		// Sent remove lending tx 1233 to SCROLL chain. Wiew on Scan.
		// Remove lending tx 1233 confirmed. View on Scan.
		await createAndSendContractTx({
			client,
			chainId,
			configObj: removeLendingConfigObj,
			loggerMessage_1: `Sent remove lending tx ${nextNonce} to ${getColorizedText('SCROLL', ColorizedTextTypes.NETWORK)} chain.`,
			loggerMessage_2: `Remove lending tx ${nextNonce} confirmed.`,
			loggerFn,
			isSkip: false,
		})

		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn,
			min: timeIntervals.timeIntervalAfterTransactions.from,
			max: timeIntervals.timeIntervalAfterTransactions.to,
		})

		// IMPROVEMENT: This amount needs to be multiplied by 2 to get the actual amount. There was a LP provide and LP remove action.
		return Number(amountToSwapInUsd) * 2
	} catch (error: any) {
		console.log('== error', error)
		const message = error?.shortMessage ?? error.message

		loggerFn({
			status: TxStatusType.ERROR,
			message,
		})
	}
}
