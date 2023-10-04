import { usePerformAllowanceAndBridge } from '@modules/farmer/hooks/workspace/actions/usePerformAllowanceAndBridge'
import { useActionHistory } from '@modules/farmer/stores'
import { WorkspaceStatusType } from '@modules/farmer/stores/useActionHistory'
import { TxStatusType } from '@modules/farmer/types'
import type { TxHistoryRecordType, UserGroupType } from '@modules/farmer/types'
import { fetchPlanByLoggedInUser } from '@modules/shared/fetchers/planFetcher'
import { v4 as uuidv4 } from 'uuid'
import { privateKeyToAccount } from 'viem/accounts'

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
	loggerFn: ({}: TxHistoryRecordType) => void
}

const generateAllowanceAndBridgeFn = async ({
	group,
	selectedNetworks,
	addNewAction,
	generateAllowanceAndBridge,
	loggerFn,
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
				loggerFn,
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
	const { generateAllowanceAndBridge } = usePerformAllowanceAndBridge()
	const { executeNextAction } = usePerformActions()

	const coordinateActions = async ({
		iteration,
		group,
		selectedNetworks,
	}: CoordinateActionsProps) => {
		loggerFn({
			groupUid: group.uid,
			timestamp: new Date(),
			wallet: privateKeyToAccount(group?.wallets[0]).address,
			status: TxStatusType.STARTING,
			message: `Starting workspace ${group.name} with ${iteration} transactions.`,
		})

		for (let i = 0; i < iteration; i++) {
			const nextAction = await generateAllowanceAndBridgeFn({
				group,
				selectedNetworks,
				addNewAction,
				generateAllowanceAndBridge,
				loggerFn: (args) => loggerFn({ groupUid: group.uid, ...args }),
			})

			try {
				const plans = await fetchPlanByLoggedInUser()
				const quota = (plans && plans[0].quota) ?? 10
				const usedQuota = (plans && plans[0].used_quota) ?? 0

				if (usedQuota >= quota) {
					throw new Error('Quota reached. Please upgrade your plan.')
				}
				await executeNextAction(nextAction, usedQuota)
			} catch (error: any) {
				console.error(error)
				loggerFn({
					groupUid: group.uid,
					timestamp: new Date(),
					wallet: privateKeyToAccount(group?.wallets[0]).address,
					status: TxStatusType.ERROR,
					message: error.message,
				})
				break
			}
		}

		loggerFn({
			groupUid: group.uid,
			timestamp: new Date(),
			wallet: privateKeyToAccount(group?.wallets[0]).address,
			status: TxStatusType.END,
			message: `Workspace finished.`,
		})
		updateWorkspaceStatus(group.uid, WorkspaceStatusType.FINISHED)
	}

	return {
		coordinateActions,
	}
}
