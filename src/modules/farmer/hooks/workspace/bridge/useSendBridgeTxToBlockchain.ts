// 4. Step
import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { ChainIds } from '@modules/shared/constants'
import { TxScanners } from '@modules/shared/constants'
import { shortenerAddress } from '@modules/shared/utils'
import { Address } from 'viem'

type SendAllowanceToBlockchainProps = {
	loggerFn: ({}: TxHistoryRecordType) => void
}
type SendBridgeToBlockchainFnProps = {
	wallet: Address
	client: any
	bridgeConfigObj: any
	nextBridgeNonce: number
}

const getScanLink = (chainId: number, txHash: string) => {
	switch (chainId) {
		case ChainIds.ARBITRUM:
			return `${TxScanners.Arbitrum}/tx/${txHash}`
		case ChainIds.ETHEREUM:
			return `${TxScanners.Ethereum}/tx/${txHash}`
		case ChainIds.OPTIMISM:
			return `${TxScanners.Optimism}/tx/${txHash}`
		case ChainIds.POLYGON:
			return `${TxScanners.Polygon}/tx/${txHash}`
	}
}

type MessageGeneratorProps = {
	nonce: number
	source: {
		chainId: number
	}
	txHash: string
	status: 'SENT' | 'CONFIRMED'
}

// 'Sent bridge tx 118 to blockchain OR Bridge tx 118 confirmed. Scan: https://bscscan.com/tx/{HASH}',
const generateMessage = ({
	nonce,
	source,
	txHash,
	status,
}: MessageGeneratorProps): string => {
	const statusText =
		status === 'SENT'
			? `Sent bridge tx ${nonce} to blockchain`
			: `Bridge tx ${nonce} confirmed`
	return `${statusText}. Scan: <a href="${getScanLink(
		source.chainId,
		txHash,
	)}" target="_blank" className="text-blue-500">${getScanLink(
		source.chainId,
		shortenerAddress(txHash, 10, 10),
	)}</a>.`
}

export const useSendBridgeTxToBlockchain = ({
	loggerFn,
}: SendAllowanceToBlockchainProps) => {
	const sendBridgeTxToBlockchainFn = async ({
		wallet,
		client,
		bridgeConfigObj,
		nextBridgeNonce,
	}: SendBridgeToBlockchainFnProps) => {
		// TODO: Handle LayerZero: not enough native for fees
		// TODO: Not enough native for fees

		const simulatedResult = await client.simulateContract(bridgeConfigObj)
		const hash = await client.writeContract(simulatedResult.request)

		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: generateMessage({
				nonce: nextBridgeNonce,
				source: {
					chainId: bridgeConfigObj.chainId,
				},
				txHash: hash,
				status: 'SENT',
			}),
		})

		const receipt = await client.waitForTransactionReceipt({
			hash,
			chainId: bridgeConfigObj.chainId,
		})

		console.log('=== Waiting for transaction receipt... DONE')

		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.SUCCESS,
			message: generateMessage({
				nonce: nextBridgeNonce,
				source: {
					chainId: bridgeConfigObj.chainId,
				},
				txHash: hash,
				status: 'CONFIRMED',
			}),
		})

		return receipt
	}

	return {
		sendBridgeTxToBlockchainFn,
	}
}
