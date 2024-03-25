import {
	SwapTargetSymbols,
	TxHistoryRecordType,
	ScrollLiquidityProviders,
} from '@modules/farmer/types'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import {
	getEstimatedContractTransactionFee,
	createAndSendContractTxHandler,
	getNextNonce,
} from '@modules/farmer/hooks/workspace/_shared'

import { parseUnits, type Address, PrivateKeyAccount } from 'viem'
import {
	ColorizedTextTypes,
	getColorizedText,
} from '@modules/farmer/helpers/textColorizer'

type ApproveSpendingCapProps = {
	allowanceConfigObjParams: {
		chainId: number
		address: Address
		abi: any
		account: PrivateKeyAccount
		routerAddress: Address
		amountToApprove: string
		token: SwapTargetSymbols
		decimal?: number
	}
	client: ReturnType<typeof createWalletClientFactory>
	ethPrice: number
	maxGasPerTransaction: number
	loggerFn: ({}: TxHistoryRecordType) => void
	loggetConfigObj: {
		amountInUsd: string
		swapProvider: ScrollLiquidityProviders | string
	}
	isSkip?: boolean
	doubleGas?: boolean
}

export const approveSpendingCap = async ({
	allowanceConfigObjParams,
	client,
	ethPrice,
	maxGasPerTransaction,
	loggerFn,
	loggetConfigObj,
	isSkip,
	doubleGas,
}: ApproveSpendingCapProps) => {
	const {
		chainId,
		address,
		abi,
		account,
		routerAddress,
		amountToApprove,
		token,
		decimal,
	} = allowanceConfigObjParams
	const { amountInUsd, swapProvider } = loggetConfigObj

	const amount = decimal
		? parseUnits(amountToApprove + '', decimal)
		: amountToApprove
	// STEP 1. | Configure allowance tx
	let allowanceConfigObj = {
		chainId,
		address,
		abi,
		functionName: 'approve',
		account,
		args: [routerAddress, amount],
	}

	// STEP 2. | Send allowance tx + Get estimated approvel transaction fee
	const { gasPriceInUsd, estimatedGas } =
		await getEstimatedContractTransactionFee({
			client,
			configObj: allowanceConfigObj,
			ethPrice,
			maxGasPerTransaction,
		})

	if (doubleGas) {
		allowanceConfigObj = {
			...allowanceConfigObj,
			// @ts-ignore
			gas: estimatedGas * BigInt(2),
		}
	}

	// STEP 3. | Log approvel transaction fee
	// Will spend on gas up to $0.52
	loggerFn({
		message: `Will spend on gas up to $${gasPriceInUsd}`,
	})

	const { nextNonce } = await getNextNonce(client)

	// STEP 4. | Log allowance tx
	// Create allowance tx 1233 to approve spending 60.121734 USDC on ZKSYNC for MUTE contract.
	loggerFn({
		message: `Created allowance tx ${nextNonce} to approve spending $${amountInUsd} in ${getColorizedText(token, ColorizedTextTypes.TOKEN)} on ${getColorizedText('ZKSYNC', ColorizedTextTypes.NETWORK)} for ${getColorizedText(swapProvider, ColorizedTextTypes.NETWORK)} contract.`,
	})

	// Tx 1233 was signed.
	loggerFn({
		message: `Tx ${nextNonce} was signed.`,
	})

	// Sent allowance tx 1233 to ZKSYNC chain. Wiew on Scan.
	// Approve tx 1233 confirmed. View on Scan.
	const { createAndSendContractTx } = createAndSendContractTxHandler()
	await createAndSendContractTx({
		client,
		configObj: allowanceConfigObj,
		chainId,
		loggerMessage_1: `Sent allowance tx ${nextNonce} to ${getColorizedText('SCROLL', ColorizedTextTypes.NETWORK)} chain.`,
		loggerMessage_2: `Allowance tx ${nextNonce} confirmed.`,
		loggerFn,
		isSkip,
	})

	return { allowanceConfigObj, gasPriceInUsd }
}
