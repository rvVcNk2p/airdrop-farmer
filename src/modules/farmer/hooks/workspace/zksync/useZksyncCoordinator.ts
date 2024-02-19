import { useUserWallets } from '@modules/farmer/stores/useUserWallets'
import { fetchPlanByLoggedInUser } from '@modules/shared/fetchers/planFetcher'
import {
	ActionStatusType,
	ExecutionActionType,
	TxStatusType,
	ZksyncBridges,
	type TxHistoryRecordType,
	type TypedUserStrategyTypeWithUid,
	type ZkSyncMainnetType,
	type ZkSyncMainnetBridgeType,
	type ZkSyncMainnetActionsType,
} from '@modules/farmer/types'
import { usePerformActions } from '@modules/farmer/hooks/workspace/usePerformActions'
import { useActionHistory } from '@modules/farmer/stores'
import { type Address, privateKeyToAccount } from 'viem/accounts'
import { v4 as uuidv4 } from 'uuid'
import { getZksyncBridge } from '@modules/farmer/hooks/workspace/zksync/bridge/getZksyncBridge'

interface ActionCreatorFactoryProps {
	strategyUid: string
	walletPrivateKey: Address
	actionType: string // TODO: Add enum
	addNewAction: ({}: any) => void
	loggerFn: ({}: TxHistoryRecordType) => void
	bridge?: ZkSyncMainnetBridgeType
	actions?: ZkSyncMainnetActionsType
}

const zksyncActionCreatorFactory = ({
	strategyUid,
	walletPrivateKey,
	actionType,
	addNewAction,
	loggerFn,
	bridge,
	actions,
}: ActionCreatorFactoryProps) => {
	const { orbiterZksyncBridgeFn } = getZksyncBridge()
	const selectedActionByType = () => {
		if (bridge) {
			switch (actionType) {
				case ZksyncBridges.ORBITER:
					return orbiterZksyncBridgeFn({
						walletPrivateKey,
						bridge,
						loggerFn,
					})
				// Add more cases - ZksyncBridges types
			}
		} else if (actions) {
			// Add more cases - Action types
		}
	}

	const actionUid = uuidv4()
	const newAction = {
		uid: actionUid,
		strategyUid,
		wallet: walletPrivateKey,
		type: actionType,
		status: ActionStatusType.QUEUED,
		action: () => selectedActionByType(),
	}

	addNewAction(newAction)

	return newAction
}

// const zksyncActionsCoordinatorFn = async ({}) => {
// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			console.log('== zksyncActionsCoordinatorFn')
// 			resolve({})
// 		}, 1000)
// 	})
// }

export const useZksyncCoordinator = () => {
	const { executeNextAction } = usePerformActions()
	const loggerFn = useActionHistory((state) => state.addHistory)
	const addNewAction = useActionHistory((state) => state.addNewAction)
	const getWalletByUid = useUserWallets((state) => state.getWalletByUid)

	const coordinateZksyncBot = async ({
		walletUid,
		strategy,
	}: {
		walletUid: string
		strategy: TypedUserStrategyTypeWithUid<ZkSyncMainnetType>
	}) => {
		const txGoal = strategy.txsGoal
		const walletPrivateKey = getWalletByUid(walletUid)
			?.privateKey as `0x${string}`
		const wallet = privateKeyToAccount(walletPrivateKey).address

		const { bridge, actions } = strategy.mainnet
		try {
			if (!bridge.isSkip) {
				const plans = await fetchPlanByLoggedInUser()
				const usedQuota = (plans && plans[0].used_quota) ?? 0

				const bridgeAction = await zksyncActionCreatorFactory({
					strategyUid: strategy.uid,
					walletPrivateKey,
					actionType: bridge.type,
					bridge,
					addNewAction,
					loggerFn: (args) =>
						loggerFn({ strategyUid: strategy.uid, ...args, wallet }), // IMPOVEMENT: Wallet binded to loggerFn
				})

				await executeNextAction(
					bridgeAction,
					usedQuota,
					ExecutionActionType.BRIDGE,
				)
			}

			// for (let i = 0; i < txGoal; i++) {
			// 	// const nextAction =
			// 	await zksyncActionsCoordinatorFn({
			// 		// strategyUid: strategy.uid,
			// 		// wallet: walletPrivateKey,
			// 		// addNewAction,
			// 		// generateAllowanceAndBridge,
			// 		// loggerFn: (args) => loggerFn({ strategyUid: strategy.uid, ...args }),
			// 	})
			// 	try {
			// 		// TODO: Handle if user is a paid user
			// 		const plans = await fetchPlanByLoggedInUser()
			// 		const quota = (plans && plans[0].quota) ?? 10
			// 		const usedQuota = (plans && plans[0].used_quota) ?? 0
			// 		if (usedQuota >= quota) {
			// 			throw new Error('Quota reached. Please upgrade your plan.')
			// 		}
			// 		// await executeNextAction(nextAction, 10) // usedQuota)
			// 	} catch (error: any) {
			// 		console.error(error)
			// 		loggerFn({
			// 			strategyUid: strategy.uid,
			// 			timestamp: new Date(),
			// 			wallet,
			// 			status: TxStatusType.ERROR,
			// 			message: error.message,
			// 		})
			// 		break
			// 	}
			// }
		} catch (error: any) {
			const message = error?.shortMessage ?? error.message
			loggerFn({
				strategyUid: strategy.uid,
				status: TxStatusType.ERROR,
				wallet,
				message,
			})
		}
	}

	return { coordinateZksyncBot }
}
