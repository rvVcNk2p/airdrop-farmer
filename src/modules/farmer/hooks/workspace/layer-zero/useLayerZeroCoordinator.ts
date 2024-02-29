import { useUserWallets } from '@modules/farmer/stores/useUserWallets'
import { v4 as uuidv4 } from 'uuid'
import { fetchPlanByLoggedInUser } from '@modules/shared/fetchers/planFetcher'
import {
	TxStatusType,
	type LayerZeroMainnetType,
	type TxHistoryRecordType,
	type TypedUserStrategyTypeWithUid,
	LayerZeroActionType,
	ExecutionActionType,
	TimeIntervalConfigType,
} from '@modules/farmer/types'
import { usePerformActions } from '@modules/farmer/hooks/workspace/usePerformActions'
import { usePerformAllowanceAndBridge } from '@modules/farmer/hooks/workspace/layer-zero/actions/usePerformAllowanceAndBridge'
import { useActionHistory } from '@modules/farmer/stores'
import { privateKeyToAccount } from 'viem/accounts'
import { quotaCheckResult } from '@modules/farmer/hooks/workspace/zksync/useZksyncCoordinator'
import { randomSleepAndLog } from '@/modules/farmer/helpers/sleep'

type GenerateAllowanceAndBridgeProps = {
	strategyUid: string
	wallet: `0x${string}`
	selectedNetworks: string[]
	timeIntervals: TimeIntervalConfigType
	addNewAction: ({}: any) => void
	generateAllowanceAndBridge: ({}: any) => void
	loggerFn: ({}: TxHistoryRecordType) => void
}

const generateAllowanceAndBridgeFn = async ({
	strategyUid,
	wallet,
	selectedNetworks,
	timeIntervals,
	addNewAction,
	generateAllowanceAndBridge,
	loggerFn,
}: GenerateAllowanceAndBridgeProps) => {
	const actionUid = uuidv4()
	const newAction = {
		uid: actionUid,
		strategyUid,
		wallet,
		type: LayerZeroActionType.ALLOWANCE_AND_BRIDGE,
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
				timeIntervals,
				loggerFn,
			}),
	}

	addNewAction(newAction)

	return newAction
}

export const useLayerZeroCoordinator = () => {
	const { executeNextAction } = usePerformActions()
	const loggerFn = useActionHistory((state) => state.addHistory)
	const addNewAction = useActionHistory((state) => state.addNewAction)
	const getWalletByUid = useUserWallets((state) => state.getWalletByUid)

	const { generateAllowanceAndBridge } = usePerformAllowanceAndBridge()

	const coordinateLayerZeroBot = async ({
		walletUid,
		strategy,
		hasValidSubscription,
	}: {
		walletUid: string
		strategy: TypedUserStrategyTypeWithUid<LayerZeroMainnetType>
		hasValidSubscription: boolean
	}) => {
		const txGoal = strategy.txsGoal
		const walletPrivateKey = getWalletByUid(walletUid)
			?.privateKey as `0x${string}`
		const selectedNetworks = (strategy.mainnet as LayerZeroMainnetType).networks
		const wallet = privateKeyToAccount(walletPrivateKey).address

		// Random sleep and log added to simulate human behavior
		await randomSleepAndLog({
			wallet: walletPrivateKey,
			loggerFn: (args) =>
				loggerFn({ ...args, strategyUid: strategy.uid, wallet }),
			min: 1,
			max: 5,
		})

		for (let i = 0; i < txGoal; i++) {
			const nextAction = await generateAllowanceAndBridgeFn({
				strategyUid: strategy.uid,
				wallet: walletPrivateKey,
				selectedNetworks,
				timeIntervals: strategy.timeIntervals,
				addNewAction,
				generateAllowanceAndBridge,
				loggerFn: (args) => loggerFn({ strategyUid: strategy.uid, ...args }),
			})
			try {
				const { usedQuota, quota } = (await quotaCheckResult(
					hasValidSubscription,
				)) as { usedQuota: number; quota: number }

				if (usedQuota !== -1 && quota !== -1 && usedQuota >= quota) {
					throw new Error('Quota reached. Please upgrade your plan.')
				}

				await executeNextAction(
					nextAction,
					ExecutionActionType.ACTION, // Could be ExecutionActionType.BRIDGE
					usedQuota,
				)
			} catch (error: any) {
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

	return { coordinateLayerZeroBot }
}
