import { watch } from 'fs'
import { useState } from 'react'

type PerformActionsType = {
	loggerFn: () => void
}
type ActionsType = {
	uid: string
	type: 'ALLOWANCE' | 'BRIDGE'
	status: 'QUEUED' | 'RUNNING' | 'FINISHED' | 'FAILED'
	action: (loggerFn: (message: string) => void) => void
}

export const usePerformActions = ({ loggerFn }: PerformActionsType) => {
	const [actions, setActions] = useState<ActionsType[]>([])

	// TODO: Check the actions array, if length > 0, there is no action that running and has any action that is not finished
	// TODO: grab the next QUEUED element and execute it

	watch
	return {
		setActions,
	}
}
