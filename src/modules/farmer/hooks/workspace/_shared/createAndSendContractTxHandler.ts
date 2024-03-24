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
	isSkip?: boolean
}

export const createAndSendContractTxHandler = () => {
	const createAndSendContractTx = async ({
		client,
		configObj,
		chainId,
		loggerMessage_1,
		loggerMessage_2,
		loggerFn,
		isSkip,
	}: CreateAndSendTxProps) => {
		const simulatedResult = await client.simulateContract(configObj)
		console.log('== simulatedResult', simulatedResult)

		if (isSkip) {
			console.log('%s has been skipped.', configObj.functionName)
			return {
				hash: '0x0',
				receipt: {
					status: 1,
					logs: [],
					contractAddress: '0x0',
					blockNumber: 0,
					transactionIndex: 0,
					cumulativeGasUsed: 0,
					gasUsed: 0,
				},
			}
		}

		// Execute the deposit transaction on the L1.
		const hash = await client.writeContract(simulatedResult.request)

		const scannerLink = getScanLink(chainId, hash)

		loggerFn({
			message: `${loggerMessage_1} <a href="${scannerLink}" target="_blank">${getColorizedText('View on Scan', ColorizedTextTypes.LINK)}</a>.`,
		})

		// Wait for the L1 transaction to be processed.
		const receipt = await client.waitForTransactionReceipt({
			hash,
			confirmations: 2,
			retryCount: 3,
			retryDelay: 2000,
		})

		if (receipt.status === 'reverted') {
			throw new Error('Transaction reverted')
		}

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
