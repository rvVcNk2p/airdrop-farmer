import { usePerformAllowanceAndBridge } from '@modules/farmer/hooks/workspace/actions/usePerformAllowanceAndBridge'
import { useActionHistory } from '@modules/farmer/stores'
import { UserGroupType } from '@modules/farmer/types'
import { v4 as uuidv4 } from 'uuid'

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
	addNewAction({
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
	})
}

export const useActionsCoordinator = () => {
	// const workspaces = useActionHistory((state) => state.workspaces)
	const loggerFn = useActionHistory((state) => state.addHistory)
	const addNewAction = useActionHistory((state) => state.addNewAction)

	// TODO: Add support for multiple wallet support
	const { generateAllowanceAndBridge } = usePerformAllowanceAndBridge({
		loggerFn,
	})

	// TODO: Do not generate all actions at once, but one by one
	// TODO: Add strating note
	// TODO: Add finishing note
	// TODO: Turn uf the workspace when all actions are finished
	const coordinateActions = async ({
		iteration,
		group,
		selectedNetworks,
	}: CoordinateActionsProps) => {
		for (let i = 0; i < iteration; i++) {
			await generateAllowanceAndBridgeFn({
				group,
				selectedNetworks,
				addNewAction,
				generateAllowanceAndBridge,
			})
		}
	}

	return {
		coordinateActions,
	}
}
