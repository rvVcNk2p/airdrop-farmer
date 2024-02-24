import { erc20Abi, type Address, parseUnits } from 'viem'
import {
	ZksyncSwapProviders,
	SwapTargetSymbols,
	TxStatusType,
	type TimeIntervalConfigType,
	type TxHistoryRecordType,
	type ZkSyncMainnetActionsType,
} from '@modules/farmer/types'
import { SyncSwapRouterABI } from '@modules/farmer/hooks/workspace/zksync/actions/_abi/SyncSwapRouterV2_ABI'
import {
	getEstimatedContractTransactionFee,
	getNextNonce,
	useChooseInitialToken,
	createAndSendContractTxHandler,
} from '@modules/farmer/hooks/workspace/_shared'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { randomWholeNumber } from '@modules/shared/utils'
import {
	ColorizedTextTypes,
	getColorizedText,
} from '@modules/farmer/helpers/textColorizer'
import { ChainIds, tokenAddresses } from '@modules/shared/constants'
import { randomSleepAndLog } from '@/modules/farmer/helpers/sleep'
import { approveSpendingCap } from './allowance/approveSpendingCap'

type SyncswapSwapActionProps = {
	walletPrivateKey: Address
	actions: ZkSyncMainnetActionsType
	timeIntervals: TimeIntervalConfigType
	loggerFn: ({}: TxHistoryRecordType) => void
}

const SYNCSWAP_SWAP_ADDRESS = '0x9B5def958d0f3b6955cBEa4D5B7809b2fb26b059'
const SYNCSWAP_POOL_ADDRESS = '0x80115c708E12eDd42E504c1cD52Aea96C547c05c'
const ZERO_CALLBACK = '0x0000000000000000000000000000000000000000'
const USDC_ADDRESS = tokenAddresses[ChainIds.ZKSYNC][SwapTargetSymbols.USDC]

export const syncswapSwapAction = async ({
	walletPrivateKey,
	actions,
	timeIntervals,
	loggerFn,
}: SyncswapSwapActionProps) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { chooseInitialTokenFn } = useChooseInitialToken()
	const { createAndSendContractTx } = createAndSendContractTxHandler()

	await randomSleepAndLog({
		wallet: walletPrivateKey,
		loggerFn,
		min: 1,
		max: 3,
	})

	return 3.45

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

		// Plan to do swap activity on SYNCSWAP $60.12 USDC to ETH
		loggerFn({
			message: `Plan to do swap activity on ${getColorizedText(ZksyncSwapProviders.SYNCSWAP, ColorizedTextTypes.ACTION)} $${amountToSwapInUsd} ${getColorizedText(token, ColorizedTextTypes.TOKEN)} to ${getColorizedText(swapTargetSymbol, ColorizedTextTypes.TOKEN)}`,
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
					routerAddress: SYNCSWAP_SWAP_ADDRESS,
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
					swapProvider: ZksyncSwapProviders.SYNCSWAP,
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

		// Will swap on SYNCSWAP $60.12 USDC to ETH
		loggerFn({
			message: `Will swap on ${getColorizedText(ZksyncSwapProviders.SYNCSWAP, ColorizedTextTypes.NETWORK)} $${amountToSwapInUsd} ${getColorizedText(token, ColorizedTextTypes.TOKEN)} to ${getColorizedText(swapTargetSymbol, ColorizedTextTypes.TOKEN)}.`,
		})

		const amountIn = parseUnits(amountToSwap + '', decimal)
		const amountOutMin = 0
		const deadline = Math.floor(new Date(Date.now()).getTime() / 1000) + 3600 // 1 hour

		const baseConfigObjParams = {
			chainId,
			address: SYNCSWAP_SWAP_ADDRESS,
			abi: SyncSwapRouterABI,
			account: client.account,
		}

		// Swap USDC to ETH
		const swapConfigObjUsdcToEth = {
			...baseConfigObjParams,
			functionName: 'swap',
			args: [
				[
					{
						steps: [
							{
								pool: SYNCSWAP_POOL_ADDRESS,
								data: '0x0000000000000000000000003355df6d4c9c3035724fd0e3914de96a5a83aaf4000000000000000000000000e5e666497f6bf120d64e972bbbfbdeb7797aab9d0000000000000000000000000000000000000000000000000000000000000001',
								callback: ZERO_CALLBACK,
								callbackData: '0x',
								useVault: true,
							},
						],
						tokenIn: USDC_ADDRESS,
						amountIn: parseUnits(amountToSwap + '', decimal),
					},
				],
				amountOutMin,
				deadline,
			],
		}

		// Swap ETH to USDC
		// https://era.zksync.network/tx/0x69cfe5765041f0ef4cbf086bcbf03ac317ccbf77f5f2231e356cc13fa31b6300
		const swapConfigObjEthToUsdc = {
			...baseConfigObjParams,
			value: amountIn,
			functionName: 'swap',
			args: [
				[
					{
						steps: [
							{
								pool: SYNCSWAP_POOL_ADDRESS,
								data: '0x0000000000000000000000005aea5775959fbc2557cc8789bc1bf90a239d9a91000000000000000000000000e5e666497f6bf120d64e972bbbfbdeb7797aab9d0000000000000000000000000000000000000000000000000000000000000002',
								callback: ZERO_CALLBACK,
								callbackData: '0x',
								useVault: true,
							},
						],
						tokenIn: ZERO_CALLBACK,
						amountIn,
					},
				],
				amountOutMin,
				deadline,
			],
		}

		const swapConfigObj =
			token === SwapTargetSymbols.USDC
				? swapConfigObjUsdcToEth
				: swapConfigObjEthToUsdc

		const { gasPriceInUsd: swapGasPriceInUsd } =
			await getEstimatedContractTransactionFee({
				client,
				configObj: swapConfigObj,
				ethPrice,
				maxGasPerTransaction: maxGasFee,
			})

		// Will spend on gas up to $0.17
		loggerFn({
			message: `Will spend on gas up to $${swapGasPriceInUsd}`,
		})

		const { nextNonce } = await getNextNonce(client)

		// Create tx 1234 to swap on SYNCSWAP
		loggerFn({
			message: `Created tx ${nextNonce} to swap on ${getColorizedText(ZksyncSwapProviders.SYNCSWAP, ColorizedTextTypes.NETWORK)}.`,
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
			configObj: swapConfigObj,
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
