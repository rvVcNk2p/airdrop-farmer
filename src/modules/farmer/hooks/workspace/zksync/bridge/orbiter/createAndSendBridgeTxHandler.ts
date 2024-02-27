import {
	ColorizedTextTypes,
	getColorizedText,
} from '@modules/farmer/helpers/textColorizer'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { TxStatusType, type TxHistoryRecordType } from '@modules/farmer/types'
import { getScanLink } from '@modules/farmer/helpers/getScanLink'
import { type Address } from 'viem'

type CreateAndSendTxProps = {
	client: ReturnType<typeof createWalletClientFactory>
	configObj: {
		to: Address
		value: bigint
	}
	nonce: number
	amountToBridgeInUsd: string
	token: string
	network: string
	chainId: number
	loggerFn: ({}: TxHistoryRecordType) => void
}

export const createAndSendTxBridgeHandler = () => {
	const createAndSendBridgeTx = async ({
		client,
		configObj,
		nonce,
		amountToBridgeInUsd,
		token,
		network,
		chainId,
		loggerFn,
	}: CreateAndSendTxProps) => {
		loggerFn({
			timestamp: new Date(),
			status: TxStatusType.INFO,
			message: `Created tx ${nonce} to bridge $${amountToBridgeInUsd} of ${getColorizedText(token, ColorizedTextTypes.TOKEN)} from ${getColorizedText(network, ColorizedTextTypes.NETWORK)} to ${getColorizedText('ZKSYNC', ColorizedTextTypes.NETWORK)}`,
		})

		loggerFn({
			message: `Tx ${nonce} was signed.`,
		})

		const transactionHash = await client.sendTransaction(configObj)

		loggerFn({
			message: `Sent bridge tx ${nonce} to ${getColorizedText(network, ColorizedTextTypes.NETWORK)} chain. <a href="${getScanLink(chainId, transactionHash)}" target="_blank">${getColorizedText('View on Scan', ColorizedTextTypes.LINK)}</a>.`,
		})

		const transaction = await client.waitForTransactionReceipt({
			hash: transactionHash,
		})

		loggerFn({
			status: TxStatusType.SUCCESS,
			message: `Bridge tx ${nonce} confirmed. <a href="${getScanLink(chainId, transactionHash)}" target="_blank">${getColorizedText('View on Scan', ColorizedTextTypes.LINK)}</a>`,
		})

		return {
			transactionHash,
			transaction,
		}
	}

	return { createAndSendBridgeTx }
}
