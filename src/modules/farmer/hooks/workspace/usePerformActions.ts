import { useActionHistory } from '@modules/farmer/stores'
import { ActionStatusType } from '@modules/farmer/types'
import { useEffect } from 'react'

import { WorkspaceTransactionStatusType } from '../../stores/useActionHistory'

export const usePerformActions = () => {
	const actions = useActionHistory((state) => state.actions)
	const updateAction = useActionHistory((state) => state.updateAction)
	const updateWorkspaceTransactions = useActionHistory(
		(state) => state.updateWorkspaceTransactions,
	)

	const executeNextAction = async () => {
		if (actions.length === 0) return

		const isRunning = actions.find(
			(action) => action.status === ActionStatusType.RUNNING,
		)
		if (isRunning) return

		const nextAction = actions.find(
			(action) => action.status === ActionStatusType.QUEUED,
		)
		if (!nextAction) return

		updateAction({
			...nextAction,
			status: ActionStatusType.RUNNING,
		})

		try {
			await nextAction.action()
			updateAction({
				...nextAction,
				status: ActionStatusType.FINISHED,
			})
			// TODO: Aggregate the value of the transaction
			updateWorkspaceTransactions(
				nextAction.groupUid,
				WorkspaceTransactionStatusType.FINISHED,
			)
		} catch (error) {
			console.error(error)
			updateAction({
				...nextAction,
				status: ActionStatusType.FAILED,
			})
			// TODO: Aggregate the value of the transaction
			updateWorkspaceTransactions(
				nextAction.groupUid,
				WorkspaceTransactionStatusType.FAILED,
			)
		}
	}

	useEffect(() => {
		executeNextAction()
		console.log('actions', actions)
	}, [actions])
}
