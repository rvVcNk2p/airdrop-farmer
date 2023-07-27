import { shortenerAddress } from '@/modules/shared/utils'
import { MessageStatus, createClient } from '@layerzerolabs/scan-client'
import { stargateChainsToName } from '@modules/farmer/constants/chains'
import { getScanLink } from '@modules/farmer/helpers/getScanLink'
import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { Address } from 'viem'

type WaitingForBridgeConfirmationProps = {
	loggerFn: ({}: TxHistoryRecordType) => void
}

type WaitingForBridgeConfirmationFnProps = {
	txHash: string
	wallet: Address
}

const pollForSrcTxMessages = async ({
	layerZeroClient,
	txHash,
	type,
	intervalMs = 1000,
}: {
	layerZeroClient: any
	txHash: string
	type: string[]
	intervalMs?: number
}) => {
	while (1) {
		try {
			const result = await layerZeroClient.getMessagesBySrcTxHash(txHash)

			if (
				result.messages.length > 0 &&
				type.includes(result.messages[0]?.status)
			) {
				return {
					srcChainId: result.messages[0].srcChainId,
					srcUaAddress: result.messages[0].srcUaAddress,
					dstChainId: result.messages[0].dstChainId,
					dstUaAddress: result.messages[0].dstUaAddress,
					srcUaNonce: result.messages[0].srcUaNonce,
					dstTxHash: result.messages[0].dstTxHash,
				}
			}
		} catch (error) {
			console.error('Error occurred while fetching messages:', error)
		}
		await new Promise((resolve) => setTimeout(resolve, intervalMs))
	}
	throw new Error('Max polling attempts reached. Result not available.')
}

type GenerateBridgeConfimationMessageProps = {
	srcChainId: number
	srcUaAddress: string
	dstChainId: number
	dstUaAddress: string
	srcUaNonce: number
}

// Waiting for bridge confirmation. Scan: https://<SCANNER>.com/tx/{HASH}
const generateBridgeConfirmationMessage = ({
	srcChainId,
	srcUaAddress,
	dstChainId,
	dstUaAddress,
	srcUaNonce,
}: GenerateBridgeConfimationMessageProps): string => {
	return `Waiting for bridge confirmation. Scan: <a href="https://layerzeroscan.com/${srcChainId}/address/${srcUaAddress}/message/${dstChainId}/address/${dstUaAddress}/nonce/${srcUaNonce}" target="_blank" className="text-blue-500">
		https://layerzeroscan.com/${srcChainId}/.../nonce/${srcUaNonce}
	</a>.`
}

type GeneratedSuccessfullBridgeMessageProps = {
	srcChainId: number
	dstChainId: number
	dstTxHash: string
}

// Bridge successfully from SOURCE to DESTIONATION. Scan: https://<SCANNER>.com/tx/{HASH}
const generatedSuccessfullBridgeMessage = ({
	srcChainId,
	dstChainId,
	dstTxHash,
}: GeneratedSuccessfullBridgeMessageProps) => {
	const scanLink = getScanLink(dstChainId, dstTxHash)
	return `Bridge successfully from <span className="text-yellow-500">${
		stargateChainsToName[srcChainId]
	}</span> to <span className="text-yellow-500">${
		stargateChainsToName[dstChainId]
	}</span>. Scan: <a href="${scanLink}" target="_blank" className="text-blue-500"> ${shortenerAddress(
		scanLink,
		20,
		10,
	)}</a>.`
}

export const useWaitingForBridgeConfirmation = ({
	loggerFn,
}: WaitingForBridgeConfirmationProps) => {
	const waitingForBridgeConfirmationFn = async ({
		txHash,
		wallet,
	}: WaitingForBridgeConfirmationFnProps) => {
		try {
			loggerFn({
				timestamp: new Date(),
				wallet,
				status: TxStatusType.INFO,
				message: `Waiting for bridge confirmation. It may take a few minutes.`,
			})

			const layerZeroClient = createClient('mainnet')

			const { srcChainId, srcUaAddress, dstChainId, dstUaAddress, srcUaNonce } =
				await pollForSrcTxMessages({
					layerZeroClient,
					txHash,
					type: [MessageStatus.INFLIGHT],
				})

			loggerFn({
				timestamp: new Date(),
				wallet,
				status: TxStatusType.INFO,
				message: generateBridgeConfirmationMessage({
					srcChainId,
					srcUaAddress,
					dstChainId,
					dstUaAddress,
					srcUaNonce,
				}),
			})

			const { dstTxHash } = await pollForSrcTxMessages({
				layerZeroClient,
				txHash,
				type: [MessageStatus.DELIVERED, MessageStatus.FAILED],
				intervalMs: 5000,
			})

			loggerFn({
				timestamp: new Date(),
				wallet,
				status: TxStatusType.SUCCESS,
				message: generatedSuccessfullBridgeMessage({
					srcChainId,
					dstChainId,
					dstTxHash,
				}),
			})
		} catch (error) {
			throw new Error('Error occurred while waiting for bridge confirmation.')
		}
	}

	return {
		waitingForBridgeConfirmationFn,
	}
}
