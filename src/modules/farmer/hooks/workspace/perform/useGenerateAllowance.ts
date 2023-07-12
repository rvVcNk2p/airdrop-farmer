import { sleep } from '@modules/shared/utils'

import { TxHistoryRecordType, TxStatusType } from '../useActivityHistory'
import { useChooseInitialToken } from '../useChooseInitialToken'

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
	const { historyMessage } = useChooseInitialToken({
		selectedNetworks,
		wallet,
	})

	const generateAllowance = async () => {
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: 'Sleeping 2 seconds',
		})
		await sleep(2)
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: 'Sleeping 2 seconds',
		})
		await sleep(3)
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: 'Sleeping 2 seconds',
		})
		await sleep(4)
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.SUCCESS,
			message: 'END',
		})
	}

	return {
		history,

		generateAllowance,
	}
}
