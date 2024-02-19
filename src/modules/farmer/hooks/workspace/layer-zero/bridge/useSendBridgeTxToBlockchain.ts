// 4. Step
import { getScanLink } from '@modules/farmer/helpers/getScanLink'
import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { shortenerAddress } from '@modules/shared/utils'
import { Address } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

type SendBridgeToBlockchainFnProps = {
	wallet: Address
	client: any
	bridgeConfigObj: any
	nextBridgeNonce: number
	loggerFn: ({}: TxHistoryRecordType) => void
}

type MessageGeneratorProps = {
	nonce: number
	source: {
		chainId: number
	}
	txHash: string
	status: 'SENT' | 'CONFIRMED'
}

// 'Sent bridge tx 118 to blockchain OR Bridge tx 118 confirmed. Scan: https://<SCANNER>/tx/{HASH}',
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

export const useSendBridgeTxToBlockchain = () => {
	const sendBridgeTxToBlockchainFn = async ({
		wallet,
		client,
		bridgeConfigObj,
		nextBridgeNonce,
		loggerFn,
	}: SendBridgeToBlockchainFnProps) => {
		// TODO: Handle LayerZero: not enough native for fees
		// TODO: Not enough native for fees

		const simulatedResult = await client.simulateContract(bridgeConfigObj)
		const hash = await client.writeContract(simulatedResult.request)

		loggerFn({
			timestamp: new Date(),
			wallet: privateKeyToAccount(wallet).address,
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

		loggerFn({
			timestamp: new Date(),
			wallet: privateKeyToAccount(wallet).address,
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
