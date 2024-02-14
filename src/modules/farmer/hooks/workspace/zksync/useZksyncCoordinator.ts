import { useUserWallets } from '@modules/farmer/stores/useUserWallets'
import { v4 as uuidv4 } from 'uuid'
import { fetchPlanByLoggedInUser } from '@modules/shared/fetchers/planFetcher'
import {
	TxStatusType,
	type TxHistoryRecordType,
	type TypedUserStrategyTypeWithUid,
	ZkSyncMainnetType,
} from '@modules/farmer/types'
import { usePerformActions } from '@modules/farmer/hooks/workspace/usePerformActions'
import { usePerformAllowanceAndBridge } from '@modules/farmer/hooks/workspace/layer-zero/actions/usePerformAllowanceAndBridge'
import { useActionHistory } from '@modules/farmer/stores'
import { privateKeyToAccount } from 'viem/accounts'

type GenerateAllowanceAndBridgeProps = {
	strategyUid: string
	wallet: `0x${string}`
	selectedNetworks: string[]
	addNewAction: ({}: any) => void
	generateAllowanceAndBridge: ({}: any) => void
	loggerFn: ({}: TxHistoryRecordType) => void
}

const zksyncBridgeCoordinatorFn = async ({}) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('== zksyncBridgeCoordinatorFn')
			resolve({})
		}, 1000)
	})
}
const zksyncActionsCoordinatorFn = async ({}) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('== zksyncActionsCoordinatorFn')
			resolve({})
		}, 1000)
	})
}

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

		await zksyncBridgeCoordinatorFn({})
		// await executeNextAction(bridgeAction, 10) // usedQuota)

		for (let i = 0; i < txGoal; i++) {
			// const nextAction =
			await zksyncActionsCoordinatorFn({
				// strategyUid: strategy.uid,
				// wallet: walletPrivateKey,
				// addNewAction,
				// generateAllowanceAndBridge,
				// loggerFn: (args) => loggerFn({ strategyUid: strategy.uid, ...args }),
			})
			try {
				const plans = await fetchPlanByLoggedInUser()
				const quota = (plans && plans[0].quota) ?? 10
				const usedQuota = (plans && plans[0].used_quota) ?? 0
				// TODO: Handle if user is a paid user
				if (usedQuota >= quota) {
					throw new Error('Quota reached. Please upgrade your plan.')
				}
				// await executeNextAction(nextAction, 10) // usedQuota)
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
	}

	return { coordinateZksyncBot }
}
