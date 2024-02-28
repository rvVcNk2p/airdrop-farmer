import { useUpdateDatabase } from '@modules/shared/hooks/useUpdateDatabase'
import { useActionHistory } from '@modules/farmer/stores'
import { WorkspaceTransactionStatusType } from '@modules/farmer/stores/useActionHistory'
import { ActionStatusType, ExecutionActionType } from '@modules/farmer/types'

export const usePerformActions = () => {
	const { incrementUsedQuota } = useUpdateDatabase()
	const updateAction = useActionHistory((state) => state.updateAction)
	const updateWorkspaceTransactions = useActionHistory(
		(state) => state.updateWorkspaceTransactions,
	)
	const updateWorkspaceAggregatedValue = useActionHistory(
		(state) => state.updateWorkspaceAggregatedValue,
	)
	const updateWorkspaceAggregatedBridgeValue = useActionHistory(
		(state) => state.updateWorkspaceAggregatedBridgeValue,
	)

	const executeNextAction = async (
		nextAction: any,
		executionType: ExecutionActionType,
		usedQuota: number,
	) => {
		return new Promise(async (resolve, reject) => {
			updateAction({
				...nextAction,
				status: ActionStatusType.RUNNING,
			})

			try {
				if (executionType === ExecutionActionType.BRIDGE) {
					const bridgedValue = await nextAction.action()
					if (bridgedValue) {
						updateWorkspaceAggregatedBridgeValue(
							nextAction.strategyUid,
							bridgedValue,
						)
					}
				} else if (executionType === ExecutionActionType.ACTION) {
					const actionValue = await nextAction.action()
					if (actionValue) {
						updateWorkspaceAggregatedValue(nextAction.strategyUid, actionValue)
					}
				}

				updateAction({
					...nextAction,
					status: ActionStatusType.FINISHED,
				})
				updateWorkspaceTransactions(
					nextAction.strategyUid,
					WorkspaceTransactionStatusType.FINISHED,
				)

				if (usedQuota > -1) {
					await incrementUsedQuota(usedQuota)
				}

				resolve('OK')
			} catch (error) {
				updateAction({
					...nextAction,
					status: ActionStatusType.FAILED,
				})
				updateWorkspaceTransactions(
					nextAction.strategyUid,
					WorkspaceTransactionStatusType.FAILED,
				)

				reject(new Error('Failed to execute transaction.'))
			}
		})
	}

	return { executeNextAction }
}
