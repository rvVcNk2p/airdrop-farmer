import { usePerformAllowanceAndBridge } from '@modules/farmer/hooks/workspace/actions/usePerformAllowanceAndBridge'
import { useActionHistory } from '@modules/farmer/stores'
import { WorkspaceStatusType } from '@modules/farmer/stores/useActionHistory'
import { TxStatusType } from '@modules/farmer/types'
import type {
	TxHistoryRecordType,
	UserStrategyType,
} from '@modules/farmer/types'
import { fetchPlanByLoggedInUser } from '@modules/shared/fetchers/planFetcher'
import { v4 as uuidv4 } from 'uuid'
import { privateKeyToAccount } from 'viem/accounts'

import { useUserWallets } from '@modules/farmer/stores/useUserWallets'

import { usePerformActions } from './usePerformActions'

type CoordinateActionsProps = {
	iteration: number
	strategy: UserStrategyType
	selectedNetworks: string[]
}

type GenerateAllowanceAndBridgeProps = {
	strategyUid: string
	wallet: `0x${string}`
	selectedNetworks: string[]
	addNewAction: ({}: any) => void
	generateAllowanceAndBridge: ({}: any) => void
	loggerFn: ({}: TxHistoryRecordType) => void
}

const generateAllowanceAndBridgeFn = async ({
	strategyUid,
	wallet,
	selectedNetworks,
	addNewAction,
	generateAllowanceAndBridge,
	loggerFn,
}: GenerateAllowanceAndBridgeProps) => {
	const actionUid = uuidv4()
	const newAction = {
		uid: actionUid,
		strategyUid,
		wallet,
		type: 'ALLOWANCE_AND_BRIDGE',
		status: 'QUEUED',
		layerOneBridge: {
			txHash: null,
			srcChainId: null,
		},
		action: () =>
			generateAllowanceAndBridge({
				actionUid,
				wallet,
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

	const { generateAllowanceAndBridge } = usePerformAllowanceAndBridge()
	const { executeNextAction } = usePerformActions()

	const getWalletByUid = useUserWallets((state) => state.getWalletByUid)

	const coordinateActions = async ({
		iteration,
		strategy,
		selectedNetworks,
	}: CoordinateActionsProps) => {
		// TODO: Add support for multiple wallet support
		const walletPrivateKey = getWalletByUid(strategy.wallets[0].value)
			?.privateKey as `0x${string}`
		const wallet = privateKeyToAccount(walletPrivateKey).address

		loggerFn({
			strategyUid: strategy.uid,
			timestamp: new Date(),
			wallet,
			status: TxStatusType.STARTING,
			message: `Starting workspace ${strategy.name} with ${iteration} transactions.`,
		})

		for (let i = 0; i < iteration; i++) {
			const nextAction = await generateAllowanceAndBridgeFn({
				strategyUid: strategy.uid,
				wallet: walletPrivateKey,
				selectedNetworks,
				addNewAction,
				generateAllowanceAndBridge,
				loggerFn: (args) => loggerFn({ strategyUid: strategy.uid, ...args }),
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
					strategyUid: strategy.uid,
					timestamp: new Date(),
					wallet,
					status: TxStatusType.ERROR,
					message: error.message,
				})
				break
			}
		}

		loggerFn({
			strategyUid: strategy.uid,
			timestamp: new Date(),
			wallet,
			status: TxStatusType.END,
			message: `Workspace finished.`,
		})
		updateWorkspaceStatus(strategy.uid, WorkspaceStatusType.FINISHED)
	}

	return {
		coordinateActions,
	}
}
