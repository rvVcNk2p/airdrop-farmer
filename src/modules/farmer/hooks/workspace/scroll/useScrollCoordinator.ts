import { privateKeyToAccount } from 'viem/accounts'

import {
	ExecutionActionType,
	TxStatusType,
	type TypedUserStrategyTypeWithUid,
	type ScrollMainnetType,
} from '@modules/farmer/types'

import { fetchPlanByLoggedInUser } from '@modules/shared/fetchers/planFetcher'
import { useUserWallets } from '@modules/farmer/stores/useUserWallets'
import { usePerformActions } from '@modules/farmer/hooks/workspace/usePerformActions'
import { useActionHistory } from '@modules/farmer/stores'
import { scrollActionCoordinator } from '@modules/farmer/hooks/workspace/scroll/actions/coordinator/scrollActionCoordinator'
import { scrollBridgeCreatorFactory } from '@modules/farmer/hooks/workspace/scroll/factory/scrollBridgeCreatorFactory'
import { randomSleepAndLog } from '@/modules/farmer/helpers/sleep'

export const quotaCheckResult = async (hasValidSubscription: boolean) => {
	return new Promise(async (resolve, reject) => {
		if (!hasValidSubscription) {
			const plans = await fetchPlanByLoggedInUser()
			const quota = (plans && plans[0]?.quota) ?? 10
			const usedQuota = (plans && plans[0]?.used_quota) ?? 0

			resolve({ usedQuota, quota })
		} else resolve({ usedQuota: -1, quota: -1 })
	})
}

export const useScrollCoordinator = () => {
	const { executeNextAction } = usePerformActions()
	const loggerFn = useActionHistory((state) => state.addHistory)
	const addNewAction = useActionHistory((state) => state.addNewAction)
	const getWalletByUid = useUserWallets((state) => state.getWalletByUid)

	const coordinateScrollBot = async ({
		walletUid,
		strategy,
		hasValidSubscription,
	}: {
		walletUid: string
		strategy: TypedUserStrategyTypeWithUid<ScrollMainnetType>
		hasValidSubscription: boolean
	}) => {
		const { txsGoal, timeIntervals, uid } = strategy
		const walletPrivateKey = getWalletByUid(walletUid)
			?.privateKey as `0x${string}`
		const wallet = privateKeyToAccount(walletPrivateKey).address

		try {
			const { bridge } = strategy.mainnet

			// Random sleep and log added to simulate human behavior
			await randomSleepAndLog({
				wallet: walletPrivateKey,
				loggerFn: (args) => loggerFn({ ...args, strategyUid: uid, wallet }),
				min: 1,
				max: 5,
			})

			if (!bridge.isSkip) {
				const bridgeAction = await scrollBridgeCreatorFactory({
					strategyUid: uid,
					walletPrivateKey,
					actionType: bridge.type,
					timeIntervals,
					bridge,
					addNewAction,
					loggerFn: (args) => loggerFn({ ...args, strategyUid: uid, wallet }), // Wallet and strategyUid already binded
				})

				await executeNextAction(bridgeAction, ExecutionActionType.BRIDGE, -1)
			}

			loggerFn({
				strategyUid: strategy.uid,
				wallet,
				message: `Because Scroll is an L2 chain, the Gas fee is calculated from 'L1 Data Fee' + 'Execution Fee', so may be a bit higher than expected.`,
			})

			const { nextActionGenerator } = scrollActionCoordinator({
				strategy,
				walletPrivateKey,
				addNewAction,
				loggerFn: (args) => loggerFn({ ...args, strategyUid: uid, wallet }), // Wallet and strategyUid binded to loggerFn
			})

			for (let i = 0; i < txsGoal; i++) {
				const { nextAction } = await nextActionGenerator()
				const { usedQuota, quota } = (await quotaCheckResult(
					hasValidSubscription,
				)) as { usedQuota: number; quota: number }

				if (usedQuota !== -1 && quota !== -1 && usedQuota >= quota) {
					throw new Error('Quota reached. Please upgrade your plan.')
				}

				try {
					await executeNextAction(
						nextAction,
						ExecutionActionType.ACTION,
						usedQuota,
					)
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

	return { coordinateScrollBot }
}
