import { sleep } from '@modules/shared/utils'
import { Address } from 'viem'

import { TxHistoryRecordType, TxStatusType } from '../useActivityHistory'
import { useChooseInitialToken } from './useChooseInitialToken'
import { useCreateTxForApproval } from './useCreateTxForApproval'
import { usePlanningToBridge } from './usePlanningToBridge'
import { useSendAllowanceToBlockchain } from './useSendAllowanceToBlockchain'

type PerformAllowanceProps = {
	selectedNetworks: string[]
	wallet: Address
	loggerFn: ({}: TxHistoryRecordType) => void
}

export const usePerformAllowance = ({
	selectedNetworks,
	wallet,
	loggerFn,
}: PerformAllowanceProps) => {
	const { chooseInitialToken } = useChooseInitialToken()
	const { planningToBridge } = usePlanningToBridge()
	const { createTxForApprovalFn } = useCreateTxForApproval()
	// const { historyMessage: sendAllowanceToBlockchainHistory } =
	// 	useSendAllowanceToBlockchain()

	const generateAllowance = async () => {
		try {
			// Step 1
			const chooseInitialTokenHistory = await chooseInitialToken({
				selectedNetworks,
				wallet,
			})

			const { chainWithHighestBalanceToken, chooseInitialTokenHistoryMessage } =
				chooseInitialTokenHistory

			loggerFn({
				timestamp: new Date(),
				wallet,
				status: TxStatusType.INFO,
				message: chooseInitialTokenHistoryMessage,
			})

			// Step 2
			const { planningToBridgeHistory, destination } = planningToBridge({
				selectedNetworks,
				chainWithHighestBalanceToken,
			})

			loggerFn({
				timestamp: new Date(),
				wallet,
				status: TxStatusType.INFO,
				message: planningToBridgeHistory,
			})

			// Step 3
			const { createTxForApprovalHistory } = await createTxForApprovalFn({
				chainWithHighestBalanceToken,
				wallet,
			})

			await sleep(2)

			loggerFn({
				timestamp: new Date(),
				wallet,
				status: TxStatusType.INFO,
				message: createTxForApprovalHistory,
			})
			// loggerFn({
			// 	timestamp: new Date(),
			// 	wallet,
			// 	status: TxStatusType.INFO,
			// 	message: 'Tx 118 was signed.', // TODO: add nonce ${nonce}
			// })
			// loggerFn({
			// 	timestamp: new Date(),
			// 	wallet,
			// 	status: TxStatusType.INFO,
			// 	message: 'Sleeping 2 seconds.',
			// })
			// await sleep(2)
			// loggerFn({
			// 	timestamp: new Date(),
			// 	wallet,
			// 	status: TxStatusType.INFO,
			// 	message: sendAllowanceToBlockchainHistory,
			// })
			// await sleep(1)
			// loggerFn({
			// 	timestamp: new Date(),
			// 	wallet,
			// 	status: TxStatusType.SUCCESS,
			// 	message:
			// 		'<p>Allowance tx 118 confirmed. Scan: <a href="https://bscscan.com/tx/0x4f456d53f7178eb9af502c16f51ded4eb7248ed2914cfef8bbe62ac02bf5a130" className="text-blue-500"> https://bscscan.com/tx/0x4f456d53...c02bf5a130</a>.</p>',
			// })
			// loggerFn({
			// 	timestamp: new Date(),
			// 	wallet,
			// 	status: TxStatusType.INFO,
			// 	message: 'Sleeping 3 second.',
			// })
			// await sleep(3)
		} catch (error) {
			console.error(error)
		}
	}

	return {
		generateAllowance,
	}
}
