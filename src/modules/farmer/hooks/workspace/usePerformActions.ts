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
		usedQuota: number,
		executionType: ExecutionActionType,
	) => {
		return new Promise(async (resolve, reject) => {
			updateAction({
				...nextAction,
				status: ActionStatusType.RUNNING,
			})

			try {
				if (executionType === ExecutionActionType.BRIDGE) {
					const bridgedValue = await nextAction.action()
					updateWorkspaceAggregatedBridgeValue(
						nextAction.strategyUid,
						bridgedValue,
					)
				} else if (executionType === ExecutionActionType.ACTION) {
					const actionValue = await nextAction.action()
					updateWorkspaceAggregatedValue(nextAction.strategyUid, actionValue)
				}

				updateAction({
					...nextAction,
					status: ActionStatusType.FINISHED,
				})
				updateWorkspaceTransactions(
					nextAction.strategyUid,
					WorkspaceTransactionStatusType.FINISHED,
				)

				await incrementUsedQuota(usedQuota)

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

				console.log('== error: ', error)
				reject(new Error('Failed to execute transaction.'))
			}
		})
	}

	return { executeNextAction }
}
