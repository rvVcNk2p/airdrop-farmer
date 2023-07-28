import { usePerformAllowanceAndBridge } from '@modules/farmer/hooks/workspace/actions/usePerformAllowanceAndBridge'
import { useActionHistory } from '@modules/farmer/stores'
import { WorkspaceStatusType } from '@modules/farmer/stores/useActionHistory'
import { TxStatusType } from '@modules/farmer/types'
import type { UserGroupType } from '@modules/farmer/types'
import { v4 as uuidv4 } from 'uuid'

import { usePerformActions } from './usePerformActions'

type CoordinateActionsProps = {
	iteration: number
	group: UserGroupType
	selectedNetworks: string[]
}

type GenerateAllowanceAndBridgeProps = {
	group: UserGroupType
	selectedNetworks: string[]
	addNewAction: ({}: any) => void
	generateAllowanceAndBridge: ({}: any) => void
}

const generateAllowanceAndBridgeFn = async ({
	group,
	selectedNetworks,
	addNewAction,
	generateAllowanceAndBridge,
}: GenerateAllowanceAndBridgeProps) => {
	const actionUid = uuidv4()
	const newAction = {
		uid: actionUid,
		groupUid: group.uid,
		wallet: group?.wallets[0] || '0x',
		type: 'ALLOWANCE_AND_BRIDGE',
		status: 'QUEUED',
		layerOneBridge: {
			txHash: null,
			srcChainId: null,
		},
		action: () =>
			generateAllowanceAndBridge({
				actionUid,
				wallet: group.wallets[0],
				selectedNetworks,
			}),
	}

	addNewAction(newAction)

	return newAction
}

export const useActionsCoordinator = () => {
	const loggerFn = useActionHistory((state) => state.addHistory)
	const addNewAction = useActionHistory((state) => state.addNewAction)
	const updateWorkspaceStatus = useActionHistory(
		(state) => state.updateWorkspaceStatus,
	)

	// TODO: Add support for multiple wallet support
	const { generateAllowanceAndBridge } = usePerformAllowanceAndBridge({
		loggerFn,
	})
	const { executeNextAction } = usePerformActions()

	const coordinateActions = async ({
		iteration,
		group,
		selectedNetworks,
	}: CoordinateActionsProps) => {
		loggerFn({
			timestamp: new Date(),
			wallet: group?.wallets[0] || '0x',
			status: TxStatusType.STARTING,
			message: `Starting workspace ${group.name} with ${iteration} transactions.`,
		})

		for (let i = 0; i < iteration; i++) {
			const nextAction = await generateAllowanceAndBridgeFn({
				group,
				selectedNetworks,
				addNewAction,
				generateAllowanceAndBridge,
			})

			try {
				await executeNextAction(nextAction)
			} catch (error: any) {
				console.error(error)
				loggerFn({
					timestamp: new Date(),
					wallet: group?.wallets[0] || '0x',
					status: TxStatusType.ERROR,
					message: error.message,
				})
				break
			}
		}

		loggerFn({
			timestamp: new Date(),
			wallet: group?.wallets[0] || '0x',
			status: TxStatusType.END,
			message: `Workspace finished.`,
		})
		updateWorkspaceStatus(group.uid, WorkspaceStatusType.FINISHED)
	}

	return {
		coordinateActions,
	}
}
