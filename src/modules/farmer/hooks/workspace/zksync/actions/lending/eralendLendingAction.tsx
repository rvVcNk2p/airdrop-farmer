import { type Address, erc20Abi, parseUnits } from 'viem'
import { randomSleepAndLog } from '@modules/farmer/helpers/sleep'
import { ChainIds, tokenAddresses } from '@modules/shared/constants'

import {
	SwapTargetSymbols,
	TxStatusType,
	ZksyncLendingProviders,
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
import {
	ColorizedTextTypes,
	getColorizedText,
} from '@modules/farmer/helpers/textColorizer'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { approveSpendingCap } from '@modules/farmer/hooks/workspace/zksync/actions/swap/allowance/approveSpendingCap'
import { convert } from '@/modules/shared/utils/bignumber'

type EralandLendingActionProps = {
	walletPrivateKey: Address
	actions: ZkSyncMainnetActionsType
	timeIntervals: TimeIntervalConfigType
	loggerFn: ({}: TxHistoryRecordType) => void
}

const USDC_ADDRESS = tokenAddresses[ChainIds.ZKSYNC][
	SwapTargetSymbols.USDC
] as Address

const ERALEND_LENDING_ROUTER_ADDRESS_USDC =
	'0x90973213E2a230227BD7CCAfB30391F4a52439ee'
const ERALEND_LENDING_ROUTER_ADDRESS_ETH =
	'0x22D8b71599e14F20a49a397b88c1C878c86F5579'

const ERALEND_ADD_LENDING_ACTION = 'mint'
const ERALEND_REMOVE_LENDING_ACTION = 'redeemUnderlying'

export const eralendLendingAction = async ({
	walletPrivateKey,
	actions,
	timeIntervals,
	loggerFn,
}: EralandLendingActionProps) => {
	// Provide ETH to the Eralend pool
	// https://era.zksync.network/tx/0x54dbc623fc13d20cb0e1a348aaba4062b38a5a77e5f990eb0439d21b653ae683
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { chooseInitialTokenFn } = useChooseInitialToken()
	const { createAndSendContractTx } = createAndSendContractTxHandler()

	await randomSleepAndLog({
		wallet: walletPrivateKey,
		loggerFn,
		min: 1,
		max: 3,
	})

	return 23.45

	// TODO: Safety check for the wallet balance USDC, ETH
	try {
		// Biggest balance is $23.23 USDC or ETH on ZKSYNC
		const { chainWithHighestBalanceToken, ethPrice } =
			await chooseInitialTokenFn({
				wallet: walletPrivateKey,
				selectedNetworks: ['ZKSYNC'],
				externalChainAvailableTokens: ['ETH', 'USDC'],
				loggerFn,
			})

		const {
			minMaxUsdcInPercentage: { min, max },
			timeIntervalToremoveAfterProvided,
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

		// Plan to do lending activity on ERALEND with $60.12 USDC
		loggerFn({
			message: `Plan to do lending activity on ${getColorizedText(ZksyncLendingProviders.ERALEND, ColorizedTextTypes.ACTION)} with $${amountToSwapInUsd} ${getColorizedText(token, ColorizedTextTypes.TOKEN)}`,
		})

		const client = createWalletClientFactory(walletPrivateKey, chainId)

		// (OPTIONAL) Approve spending cap if token is USDC
		if (token === SwapTargetSymbols.USDC) {
			await approveSpendingCap({
				allowanceConfigObjParams: {
					chainId,
					address: USDC_ADDRESS,
					abi: erc20Abi,
					account: client.account,
					routerAddress: ERALEND_LENDING_ROUTER_ADDRESS_USDC,
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
					swapProvider: ZksyncLendingProviders.ERALEND,
				},
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
			message: `Will add lending on ${getColorizedText(ZksyncLendingProviders.ERALEND, ColorizedTextTypes.NETWORK)} $${amountToSwapInUsd} ${getColorizedText(token, ColorizedTextTypes.TOKEN)} to ${getColorizedText(token, ColorizedTextTypes.TOKEN)}.`,
		})

		const baseConfigObjParams = {
			chainId,
			account: client.account,
		}

		const amountIn = parseUnits(amountToSwap + '', decimal)

		// Lend USDC
		// https://era.zksync.network/tx/0x1b2e76382a4a3a5b0c5640ef033f6e3c6f4d01454cc6e5952821a6ddf4d3e421
		const configObjUsdcToEth = {
			...baseConfigObjParams,
			address: ERALEND_LENDING_ROUTER_ADDRESS_USDC,
			abi: [
				{
					name: 'mint',
					type: 'function',
					inputs: [
						{
							name: '',
							type: 'uint256',
						},
					],
					outputs: [],
					stateMutability: 'nonpayable',
					constant: false,
					payable: false,
				},
			],
			functionName: ERALEND_ADD_LENDING_ACTION,
			args: [amountIn],
		}

		// Lend ETH
		// https://era.zksync.network/tx/0x445bf7fe5c3221dd3f90812ab218967d29120b306a7989bef6c1eb6f3cc583d3
		const configObjEthToUsdc = {
			...baseConfigObjParams,
			address: ERALEND_LENDING_ROUTER_ADDRESS_ETH,
			value: amountIn,
			abi: [
				{
					name: 'mint',
					type: 'function',
					inputs: [],
					outputs: [],
					stateMutability: 'payable',
					constant: false,
					payable: true,
				},
			],
			functionName: ERALEND_ADD_LENDING_ACTION,
			args: [],
		}

		const lendingConfigObj =
			token === SwapTargetSymbols.USDC ? configObjUsdcToEth : configObjEthToUsdc

		const { gasPriceInUsd: swapGasPriceInUsd } =
			await getEstimatedContractTransactionFee({
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
			message: `Created tx ${nextNonce} to lending on ${getColorizedText(ZksyncLendingProviders.ERALEND, ColorizedTextTypes.NETWORK)}.`,
		})

		// Tx 1233 was signed.
		loggerFn({
			message: `Tx ${nextNonce} was signed.`,
		})

		// Sent lending tx 1234 to ZKSYNC chain. Wiew on Scan.
		// Lending tx 1234 confirmed. View on Scan.
		await createAndSendContractTx({
			client,
			chainId,
			configObj: lendingConfigObj,
			loggerMessage_1: `Sent lending tx ${nextNonce} to ${getColorizedText('ZKSYNC', ColorizedTextTypes.NETWORK)} chain.`,
			loggerMessage_2: `Lending tx ${nextNonce} confirmed.`,
			loggerFn,
		})

		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn,
			min: timeIntervalToremoveAfterProvided.from,
			max: timeIntervalToremoveAfterProvided.to,
		})

		// ======================
		// ======================
		// == Remove lending ==
		// ======================
		// ======================

		// Fetch the available liquidity
		// DO NOT NEED TO DO THIS, BECAUSE WE ALREADY KNOW THE AMOUNT

		loggerFn({
			message: `Will remove ${getColorizedText(token, ColorizedTextTypes.TOKEN)} lending on ${getColorizedText(ZksyncLendingProviders.ERALEND, ColorizedTextTypes.NETWORK)}.`,
		})

		// Remove liquidity from ETH/USDC on ERALEND
		// Example:  https://era.zksync.network/tx/0xcdf4665196fcb1e401c0420d877b6a1df45f8896c974bf112c480b6036b07129
		const removeLendingConfigObj = {
			...baseConfigObjParams,
			address:
				token === SwapTargetSymbols.USDC
					? ERALEND_LENDING_ROUTER_ADDRESS_USDC
					: ERALEND_LENDING_ROUTER_ADDRESS_ETH,
			abi: [
				{
					constant: false,
					inputs: [
						{
							name: 'redeemAmount',
							type: 'uint256',
						},
					],
					name: 'redeemUnderlying',
					outputs: [],
					payable: false,
					stateMutability: 'nonpayable',
					type: 'function',
				},
			],
			functionName: ERALEND_REMOVE_LENDING_ACTION,
			args: [amountIn],
		}

		const { gasPriceInUsd: removeLendingGasPrice } =
			await getEstimatedContractTransactionFee({
				client,
				configObj: removeLendingConfigObj,
				ethPrice,
				maxGasPerTransaction: maxGasFee,
			})

		// Will spend on gas up to $1.36
		loggerFn({
			message: `Will spend on gas up to $${removeLendingGasPrice}`,
		})

		// Create tx 1234 to remove lending on ERALEND
		loggerFn({
			message: `Created tx ${nextNonce + 1} to remove lending on ${getColorizedText(ZksyncLendingProviders.ERALEND, ColorizedTextTypes.NETWORK)}.`,
		})

		// Tx 1233 was signed.
		loggerFn({
			message: `Tx ${nextNonce + 1} was signed.`,
		})

		// Sent remove lending tx 1233 to ZKSYNC chain. Wiew on Scan.
		// Remove lending tx 1233 confirmed. View on Scan.
		await createAndSendContractTx({
			client,
			chainId,
			configObj: removeLendingConfigObj,
			loggerMessage_1: `Sent remove lending tx ${nextNonce} to ${getColorizedText('ZKSYNC', ColorizedTextTypes.NETWORK)} chain.`,
			loggerMessage_2: `Remove lending tx ${nextNonce} confirmed.`,
			loggerFn,
		})

		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn,
			min: timeIntervals.timeIntervalAfterTransactions.from,
			max: timeIntervals.timeIntervalAfterTransactions.to,
		})

		// IMPROVEMENT: This amount needs to be multiplied by 2 to get the actual amount. There was a LP provide and LP remove action.
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
