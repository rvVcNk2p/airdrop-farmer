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
	const { chooseInitialTokenFn } = useChooseInitialToken({ loggerFn })
	const { planningToBridgeFn } = usePlanningToBridge({ loggerFn })
	const { createTxForApprovalFn } = useCreateTxForApproval({ loggerFn })
	const { sendAllowanceToBlockchainFn } = useSendAllowanceToBlockchain({
		loggerFn,
	})

	const generateAllowance = async () => {
		try {
			// Step 1
			const chooseInitialTokenHistory = await chooseInitialTokenFn({
				selectedNetworks,
				wallet,
			})

			const { chainWithHighestBalanceToken } = chooseInitialTokenHistory

			// Step 2
			await planningToBridgeFn({
				selectedNetworks,
				chainWithHighestBalanceToken,
				wallet,
			})

			// Step 3
			const { client, configObj } = await createTxForApprovalFn({
				chainWithHighestBalanceToken,
				wallet,
			})

			// Step 4
			await sendAllowanceToBlockchainFn({
				wallet,
				client,
				configObj,
				chainWithHighestBalanceToken,
			})

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
