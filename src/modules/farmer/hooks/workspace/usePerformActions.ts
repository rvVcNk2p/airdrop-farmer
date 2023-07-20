import { useActionHistory } from '@modules/farmer/stores'
import { ActionStatusType } from '@modules/farmer/types'
import { useEffect } from 'react'

export const usePerformActions = () => {
	const actions = useActionHistory((state) => state.actions)
	const updateAction = useActionHistory((state) => state.updateAction)

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

		await nextAction.action()

		updateAction({
			...nextAction,
			status: ActionStatusType.FINISHED,
		})
	}

	useEffect(() => {
		console.log('== Actions:', actions)
		executeNextAction()
	}, [actions])
}
