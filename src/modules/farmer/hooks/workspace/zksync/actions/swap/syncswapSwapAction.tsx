import {
	ZksyncSwapProviders,
	type TxHistoryRecordType,
	type ZkSyncMainnetActionsType,
	SwapTargetSymbols,
	TxStatusType,
} from '@modules/farmer/types'
import { erc20Abi, type Address, parseUnits } from 'viem'

import { SyncSwapRouterABI } from './abi/SyncSwapRouterV2_ABI'

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
import { tokenAddresses } from '@/modules/shared/constants'
import { randomSleepAndLog } from '@/modules/farmer/helpers/sleep'
import { getScanLink } from '@/modules/farmer/helpers/getScanLink'
import { MuteSwapAPI } from './abi/MuteSwap_ABI'

type SyncswapSwapActionProps = {
	walletPrivateKey: Address
	actions: ZkSyncMainnetActionsType
	loggerFn: ({}: TxHistoryRecordType) => void
}

export const syncswapSwapAction = async ({
	walletPrivateKey,
	actions,
	loggerFn,
}: SyncswapSwapActionProps) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { chooseInitialTokenFn } = useChooseInitialToken()
	const { createAndSendContractTx } = createAndSendContractTxHandler()

	try {
		// STEP 1. Choose the chain with the highest balance of ETH
		// Biggest balance is $64.23 USDC on ZKSYNC
		const { chainWithHighestBalanceToken, ethPrice } =
			await chooseInitialTokenFn({
				wallet: walletPrivateKey,
				selectedNetworks: ['ZKSYNC'],
				externalChainAvailableTokens: ['ETH', 'USDC', 'WETH'],
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

		// Plan to do swap activity on SYNCSWAP $60.12 USDC to ETH
		loggerFn({
			message: `Plan to do swap activity on ${getColorizedText(ZksyncSwapProviders.SYNCSWAP, ColorizedTextTypes.ACTION)} $${amountToSwapInUsd} ${getColorizedText(token, ColorizedTextTypes.TOKEN)} to ${getColorizedText(swapTargetSymbol, ColorizedTextTypes.TOKEN)}`,
		})

		const client = createWalletClientFactory(walletPrivateKey, chainId)

		// STEP 3. | Get estimated approvel transaction fee
		// Will spend on gas up to $0.52
		// If ETH skip this step
		const SYNCSWAP_SWAP_ADDRESS = '0x9B5def958d0f3b6955cBEa4D5B7809b2fb26b059'
		let decimal = 18
		if (token === SwapTargetSymbols.USDC) decimal = 6

		const allowanceConfigObj = {
			chainId,
			address: tokenAddresses[chainId][token],
			abi: erc20Abi,
			functionName: 'approve',
			account: client.account,
			args: [SYNCSWAP_SWAP_ADDRESS, parseUnits(amountToSwap + '', decimal)],
		}

		const { gasPriceInUsd } = await getEstimatedContractTransactionFee({
			client,
			configObj: allowanceConfigObj,
			ethPrice,
			maxGasPerTransaction: maxGasFee,
		})

		loggerFn({
			message: `Will spend on gas up to $${gasPriceInUsd}`,
		})

		// STEP 4. | Create and send tx
		const { nextNonce } = await getNextNonce(client)

		// Create allowance tx 1233 to approve spending 60.121734 USDC on ZKSYNC for VELOCORE contract.
		loggerFn({
			message: `Created allowance tx ${nextNonce} to approve spending $${amountToSwapInUsd} in ${getColorizedText(token, ColorizedTextTypes.TOKEN)} on ${getColorizedText('ZKSYNC', ColorizedTextTypes.NETWORK)} for ${getColorizedText(ZksyncSwapProviders.SYNCSWAP, ColorizedTextTypes.NETWORK)} contract.`,
		})

		// Tx 1233 was signed.
		loggerFn({
			message: `Tx ${nextNonce} was signed.`,
		})

		// Sent allowance tx 1233 to ZKSYNC chain. Wiew on Scan.
		// Approve tx 1233 confirmed. View on Scan.
		// await createAndSendContractTx({
		// 	client,
		// 	configObj: allowanceConfigObj,
		// 	chainId,
		// 	loggerMessage_1: `Sent allowance tx ${nextNonce} to ${getColorizedText('ZKSYNC', ColorizedTextTypes.NETWORK)} chain.`,
		// 	loggerMessage_2: `Bridge tx ${nextNonce} confirmed.`,
		// 	loggerFn,
		// })

		// await randomSleepAndLog({ wallet: walletPrivateKey, loggerFn })

		// === Swap ===

		// Will swap on SYNCSWAP $60.12 USDC to ETH
		loggerFn({
			message: `Will swap on ${getColorizedText(ZksyncSwapProviders.SYNCSWAP, ColorizedTextTypes.NETWORK)} $${amountToSwapInUsd} ${getColorizedText(token, ColorizedTextTypes.TOKEN)} to ${getColorizedText(swapTargetSymbol, ColorizedTextTypes.TOKEN)}.`,
		})

		// https://era.zksync.network/tx/0x936437af9312e5d4b34683c56c627cdd766f53c7dc1aca2b40a13fcaad5e5ab3
		// https://era.zksync.network/tx/0x69cfe5765041f0ef4cbf086bcbf03ac317ccbf77f5f2231e356cc13fa31b6300
		const swapConfigObjEthToUsd = {
			args: [
				[
					[
						'0x80115c708E12eDd42E504c1cD52Aea96C547c05c',
						'0x0000000000000000000000005aea5775959fbc2557cc8789bc1bf90a239d9a910000000000000000000000004f0abdc39b2bb0e00d08f750d5a1cc177547a00b0000000000000000000000000000000000000000000000000000000000000002',
						'0x0000000000000000000000000000000000000000',
						'0x',
						true,
					],
					'0x0000000000000000000000000000000000000000',
					parseUnits(amountToSwap + '', decimal),
				],
				// 2	amountOutMin	uint256	3734803
				// 3	deadline	uint256	1708459142
			],
		}

		const amountOutMin = 0
		const deadline = Math.floor(new Date(Date.now()).getTime() / 1000) + 3600 // 1 hour

		// https://era.zksync.network/tx/0x045b0dac88a9846b4516196bd3a895b836c85bb34a2263336f4cd1dbc247bcab
		const swapConfigObjUsdcToEth = {
			chainId,
			address: SYNCSWAP_SWAP_ADDRESS,
			abi: SyncSwapRouterABI,
			functionName: 'swap',
			account: client.account,
			args: [
				[
					[
						'0x80115c708E12eDd42E504c1cD52Aea96C547c05c',
						'0x0000000000000000000000003355df6d4c9c3035724fd0e3914de96a5a83aaf4000000000000000000000000d6881db45ad9a4e3ba7d33b4df8e990f236937e90000000000000000000000000000000000000000000000000000000000000001,',
						'0x0000000000000000000000000000000000000000',
						'0x',
						true,
					],
					tokenAddresses[chainId][token],
					[parseUnits(amountToSwap + '', decimal)],
				],
				amountOutMin,
				deadline,
			],
		}

		// TODO: NOT WORKING... NEED TO FIX

		const { gasPriceInUsd: swapGasPriceInUsd } =
			await getEstimatedContractTransactionFee({
				client,
				configObj: swapConfigObjUsdcToEth,
				ethPrice,
				maxGasPerTransaction: maxGasFee,
			})

		// Will spend on gas up to $0.17
		loggerFn({
			message: `Will spend on gas up to $${swapGasPriceInUsd}`,
		})

		// Create tx 1234 to swap on VELOCORE
		// Tx 1234 was signed.
		// Sent swap tx 1234 to ZKSYNC chain. Wiew on Scan.
		// Swap tx 1234 confirmed. View on Scan.

		// Sleep 27 seconds.
		// return Number(amountToSwapInUsd)
	} catch (error: any) {
		console.log('== error', error)
		const message = error?.shortMessage ?? error.message

		loggerFn({
			status: TxStatusType.ERROR,
			message,
		})
	}
}
