import { useUpdateDatabase } from '@/modules/shared/hooks/useUpdateDatabase'
import { useActionHistory } from '@modules/farmer/stores'
import { WorkspaceTransactionStatusType } from '@modules/farmer/stores/useActionHistory'
import { ActionStatusType } from '@modules/farmer/types'

export const usePerformActions = () => {
	const { incrementUsedQuota } = useUpdateDatabase()
	const updateAction = useActionHistory((state) => state.updateAction)
	const updateWorkspaceTransactions = useActionHistory(
		(state) => state.updateWorkspaceTransactions,
	)
	const updateWorkspaceAggregatedValue = useActionHistory(
		(state) => state.updateWorkspaceAggregatedValue,
	)

	const executeNextAction = async (nextAction: any, usedQuota: number) => {
		return new Promise(async (resolve, reject) => {
			updateAction({
				...nextAction,
				status: ActionStatusType.RUNNING,
			})

			try {
				const bridgedValue = await nextAction.action()

				updateAction({
					...nextAction,
					status: ActionStatusType.FINISHED,
				})
				updateWorkspaceTransactions(
					nextAction.groupUid,
					WorkspaceTransactionStatusType.FINISHED,
				)
				updateWorkspaceAggregatedValue(nextAction.groupUid, bridgedValue)

				await incrementUsedQuota(usedQuota)

				resolve('OK')
			} catch (error) {
				updateAction({
					...nextAction,
					status: ActionStatusType.FAILED,
				})
				updateWorkspaceTransactions(
					nextAction.groupUid,
					WorkspaceTransactionStatusType.FAILED,
				)

				reject(new Error('Failed to execute transaction.'))
			}
		})
	}

	return { executeNextAction }
}
