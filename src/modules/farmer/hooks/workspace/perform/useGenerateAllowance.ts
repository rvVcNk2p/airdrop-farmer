import { sleep } from '@modules/shared/utils'

import { TxHistoryRecordType, TxStatusType } from '../useActivityHistory'
import { useChooseInitialToken } from '../useChooseInitialToken'
import { useCreateTxForApproval } from '../useCreateTxForApproval'
import { usePlanningToBridge } from '../usePlanningToBridge'
import { useSendAllowanceToBlockchain } from '../useSendAllowanceToBlockchain'

type PerformAllowanceProps = {
	selectedNetworks: string[]
	wallet: string
	loggerFn: ({}: TxHistoryRecordType) => void
}

export const usePerformAllowance = ({
	selectedNetworks,
	wallet,
	loggerFn,
}: PerformAllowanceProps) => {
	const { historyMessage: chooseInitialTokenHistory } = useChooseInitialToken({
		selectedNetworks,
		wallet,
	})
	const { historyMessage: planningToBridgeHistory } = usePlanningToBridge()
	const { historyMessage: createTxForApprovalHistory } =
		useCreateTxForApproval()
	const { historyMessage: sendAllowanceToBlockchainHistory } =
		useSendAllowanceToBlockchain()

	const generateAllowance = async () => {
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: chooseInitialTokenHistory,
		})
		await sleep(2)
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: planningToBridgeHistory,
		})
		await sleep(3)
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: createTxForApprovalHistory,
		})
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: 'Tx 118 was signed.', // TODO: add nonce ${nonce}
		})
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: 'Sleeping 2 seconds.',
		})
		await sleep(2)
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: sendAllowanceToBlockchainHistory,
		})
		await sleep(1)
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.SUCCESS,
			message:
				'<p>Allowance tx 118 confirmed. Scan: <a href="https://bscscan.com/tx/0x4f456d53f7178eb9af502c16f51ded4eb7248ed2914cfef8bbe62ac02bf5a130" className="text-blue-500"> https://bscscan.com/tx/0x4f456d53...c02bf5a130</a>.</p>',
		})
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: 'Sleeping 3 second.',
		})
		await sleep(3)
	}

	return {
		generateAllowance,
	}
}
