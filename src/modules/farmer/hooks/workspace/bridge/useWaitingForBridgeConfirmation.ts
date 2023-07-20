import { waitForMessageReceived } from '@layerzerolabs/scan-client'
import { getScanLink } from '@modules/farmer/helpers/getScanLink'
import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { shortenerAddress } from '@modules/shared/utils'
import { Address } from 'viem'

type WaitingForBridgeConfirmationProps = {
	wallet: Address
	loggerFn: ({}: TxHistoryRecordType) => void
}
type WaitingForBridgeConfirmationFnProps = {
	txHash: string
	srcChainId: number
}

export const useWaitingForBridgeConfirmation = ({
	wallet,
	loggerFn,
}: WaitingForBridgeConfirmationProps) => {
	const waitingForBridgeConfirmationFn = async ({
		txHash,
		srcChainId,
	}: WaitingForBridgeConfirmationFnProps) => {
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: `Waiting for bridge confirmation. Hash: ${txHash}.`,
		})

		const message = await waitForMessageReceived(srcChainId, txHash)
		const { dstChainId, dstTxHash } = message

		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.SUCCESS,
			message: `Bridge successfully from ${srcChainId}  to ${dstChainId}. Scan: ${getScanLink(
				dstChainId,
				dstTxHash,
			)}`,
		})
	}

	return {
		waitingForBridgeConfirmationFn,
	}
}
