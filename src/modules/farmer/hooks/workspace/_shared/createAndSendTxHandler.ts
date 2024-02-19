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

export const createAndSendTxHandler = () => {
	const createAndSendTx = async ({
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

		// TODO: Beware. This is a mock. Replace with real sendTransaction
		const transactionHash =
			'0x01528888215a32a2bc75d987d558f4428268e8c665627b186413e51f6d46b833'
		// await client.sendTransaction(configObj)

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

	return { createAndSendTx }
}
