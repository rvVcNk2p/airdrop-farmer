import {
	ColorizedTextTypes,
	getColorizedText,
} from '@modules/farmer/helpers/textColorizer'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { TxStatusType, type TxHistoryRecordType } from '@modules/farmer/types'
import { getScanLink } from '@modules/farmer/helpers/getScanLink'

type CreateAndSendTxProps = {
	client: ReturnType<typeof createWalletClientFactory>
	configObj: any
	chainId: number
	loggerMessage_1: string
	loggerMessage_2: string
	loggerFn: ({}: TxHistoryRecordType) => void
}

export const createAndSendContractTxHandler = () => {
	const createAndSendContractTx = async ({
		client,
		configObj,
		chainId,
		loggerMessage_1,
		loggerMessage_2,
		loggerFn,
	}: CreateAndSendTxProps) => {
		// TODO: Beware. This is a mock. Replace with real sendTransaction
		const simulatedResult = await client.simulateContract(configObj)
		const hash = await client.writeContract(simulatedResult.request)

		const scannerLink = getScanLink(chainId, hash)

		loggerFn({
			message: `${loggerMessage_1} <a href="${scannerLink}" target="_blank">${getColorizedText('View on Scan', ColorizedTextTypes.LINK)}</a>.`,
		})

		const receipt = await client.waitForTransactionReceipt({
			hash,
		})

		loggerFn({
			status: TxStatusType.SUCCESS,
			message: `${loggerMessage_2} <a href="${scannerLink}" target="_blank">${getColorizedText('View on Scan', ColorizedTextTypes.LINK)}</a>`,
		})

		return {
			hash,
			receipt,
		}
	}

	return { createAndSendContractTx }
}
