import { privateKeyToAccount } from 'viem/accounts'

import {
	ExecutionActionType,
	TxStatusType,
	type TypedUserStrategyTypeWithUid,
	type ZkSyncMainnetType,
} from '@modules/farmer/types'

import { fetchPlanByLoggedInUser } from '@modules/shared/fetchers/planFetcher'
import { useUserWallets } from '@modules/farmer/stores/useUserWallets'
import { usePerformActions } from '@modules/farmer/hooks/workspace/usePerformActions'
import { useActionHistory } from '@modules/farmer/stores'
import { zksyncActionCoordinator } from '@modules/farmer/hooks/workspace/zksync/actions/coordinator/zksyncActionCoordinator'
import { zksyncBridgeCreatorFactory } from '@modules/farmer/hooks/workspace/zksync/factory/zksyncBridgeCreatorFactory'

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
		const { txsGoal, timeIntervals, uid } = strategy
		const walletPrivateKey = getWalletByUid(walletUid)
			?.privateKey as `0x${string}`
		const wallet = privateKeyToAccount(walletPrivateKey).address

		try {
			const { bridge } = strategy.mainnet

			if (!bridge.isSkip) {
				const plans = await fetchPlanByLoggedInUser()
				const usedQuota = (plans && plans[0].used_quota) ?? 0

				const bridgeAction = await zksyncBridgeCreatorFactory({
					strategyUid: uid,
					walletPrivateKey,
					actionType: bridge.type,
					timeIntervals,
					bridge,
					addNewAction,
					loggerFn: (args) => loggerFn({ ...args, strategyUid: uid, wallet }), // Wallet and strategyUid already binded
				})

				await executeNextAction(
					bridgeAction,
					usedQuota,
					ExecutionActionType.BRIDGE,
				)
			}

			loggerFn({
				strategyUid: strategy.uid,
				wallet,
				message: `Metamask overestimates the tx fees by 50-90%. Unused gas (tx fee) automatically gets refunded after successful transaction.`,
			})

			const { nextActionGenerator } = zksyncActionCoordinator({
				strategy,
				walletPrivateKey,
				addNewAction,
				loggerFn: (args) => loggerFn({ ...args, strategyUid: uid, wallet }), // Wallet and strategyUid binded to loggerFn
			})

			for (let i = 0; i < txsGoal; i++) {
				const { nextAction } = nextActionGenerator()

				try {
					// TODO: Handle if user is a paid user
					const plans = await fetchPlanByLoggedInUser()
					const quota = (plans && plans[0].quota) ?? 10
					const usedQuota = (plans && plans[0].used_quota) ?? 0
					if (usedQuota >= quota) {
						throw new Error('Quota reached. Please upgrade your plan.')
					}
					await executeNextAction(
						nextAction,
						usedQuota,
						ExecutionActionType.ACTION,
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

	return { coordinateZksyncBot }
}
