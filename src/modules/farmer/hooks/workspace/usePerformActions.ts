import { useEffect, useState } from 'react'
import { Address } from 'viem'

export enum TxStatusType {
	INFO = 'INFO',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

export type TxHistoryRecordType = {
	timestamp: Date
	wallet: Address
	status: TxStatusType
	message: string
}

type PerformActionsType = {}

type ActionsType = {
	uid: string
	type: 'ALLOWANCE' | 'BRIDGE'
	status: 'QUEUED' | 'RUNNING' | 'FINISHED' | 'FAILED'
	action: () => void
}

export const usePerformActions = () => {
	const [actions, setActions] = useState<ActionsType[]>([])

	const executeNextAction = async () => {
		if (actions.length === 0) return

		const isRunning = actions.find((action) => action.status === 'RUNNING')
		if (isRunning) return

		const nextAction = actions.find((action) => action.status === 'QUEUED')
		if (!nextAction) return

		// console.log('== nextAction', nextAction)

		await nextAction.action()

		// console.log('== ACTION COMPLETED')

		setActions((actions) =>
			actions.map((action) =>
				action.uid === nextAction.uid
					? { ...action, status: 'FINISHED' }
					: action,
			),
		)
	}

	useEffect(() => {
		// console.log('== actions', actions)
		executeNextAction()
	}, [actions])

	return {
		actions,
		setActions,
	}
}
