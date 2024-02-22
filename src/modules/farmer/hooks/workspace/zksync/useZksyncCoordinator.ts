import { type Address, privateKeyToAccount } from 'viem/accounts'
import { v4 as uuidv4 } from 'uuid'

import {
	ActionStatusType,
	ExecutionActionType,
	TxStatusType,
	ZksyncBridges,
	ZksyncSwapActionProviders,
	ZksyncLiquidityActionProviders,
	ZksyncMintActionProviders,
	ZksyncLandingActionProviders,
	type TxHistoryRecordType,
	type TypedUserStrategyTypeWithUid,
	type ZkSyncMainnetType,
	type ZkSyncMainnetBridgeType,
	type ZkSyncMainnetActionsType,
	type TimeIntervalConfigType,
} from '@modules/farmer/types'

import { fetchPlanByLoggedInUser } from '@modules/shared/fetchers/planFetcher'
import { useUserWallets } from '@modules/farmer/stores/useUserWallets'
import { usePerformActions } from '@modules/farmer/hooks/workspace/usePerformActions'
import { useActionHistory } from '@modules/farmer/stores'
import { getZksyncBridge } from '@modules/farmer/hooks/workspace/zksync/bridge/getZksyncBridge'
import {
	syncswapSwapAction,
	muteSwapAction,
} from '@modules/farmer/hooks/workspace/zksync/actions/swap'

interface ActionCreatorFactoryProps {
	strategyUid: string
	walletPrivateKey: Address
	actionType: string // TODO: Add enum
	timeIntervals: TimeIntervalConfigType
	addNewAction: ({}: any) => void
	loggerFn: ({}: TxHistoryRecordType) => void
	bridge?: ZkSyncMainnetBridgeType
	actions?: ZkSyncMainnetActionsType
}

const zksyncActionCreatorFactory = ({
	strategyUid,
	walletPrivateKey,
	actionType,
	timeIntervals,
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
			switch (actionType) {
				case ZksyncSwapActionProviders.SYNCSWAP_SWAP:
					return syncswapSwapAction({
						walletPrivateKey,
						actions,
						timeIntervals,
						loggerFn,
					})
				case ZksyncSwapActionProviders.MUTE_SWAP:
					return muteSwapAction({
						walletPrivateKey,
						actions,
						timeIntervals,
						loggerFn,
					})
				case ZksyncSwapActionProviders.ONE_INCH_SWAP:
					return
				case ZksyncSwapActionProviders.SPACEFI_SWAP:
					return
				case ZksyncSwapActionProviders.VELOCORE_SWAP:
					return

				case ZksyncLandingActionProviders.ERALEND_LENDING:
					return
				case ZksyncLandingActionProviders.REACTORFUSION_LENDING:
					return

				case ZksyncLiquidityActionProviders.MUTE_LIQUIDITY:
					return
				case ZksyncLiquidityActionProviders.SPACEFI_LIQUIDITY:
					return
				case ZksyncLiquidityActionProviders.SYNCSWAP_LIQUIDITY:
					return
				case ZksyncLiquidityActionProviders.VELOCORE_LIQUIDITY:
					return

				case ZksyncMintActionProviders.ZKNS_DOMAINS_MINT:
					return
				// Add more cases - Action types
			}
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
		const { txsGoal, timeIntervals } = strategy

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
					timeIntervals,
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

			for (let i = 0; i < txsGoal; i++) {
				// TODO: Handle random action type
				const actionType = ZksyncSwapActionProviders.SYNCSWAP_SWAP

				const nextAction = await zksyncActionCreatorFactory({
					strategyUid: strategy.uid,
					walletPrivateKey,
					actionType,
					actions,
					timeIntervals,
					addNewAction,
					loggerFn: (args) =>
						loggerFn({ strategyUid: strategy.uid, ...args, wallet }), // IMPOVEMENT: Wallet binded to loggerFn
				})
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
