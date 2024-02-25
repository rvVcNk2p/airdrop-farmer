import { useActionHistory } from '@modules/farmer/stores'
import { WorkspaceStatusType } from '@modules/farmer/stores/useActionHistory'
import { AirdropTypes, TxStatusType } from '@modules/farmer/types'
import type {
	LayerZeroMainnetType,
	TypedUserStrategyTypeWithUid,
	UserStrategyType,
	ZkSyncMainnetType,
} from '@modules/farmer/types'

import { useLayerZeroCoordinator } from '@modules/farmer/hooks/workspace/layer-zero/useLayerZeroCoordinator'
import { useZksyncCoordinator } from '@modules/farmer/hooks/workspace/zksync/useZksyncCoordinator'
import { useHandleSubscription } from '@modules/shared/hooks'

type CoordinateActionsProps = {
	strategy: UserStrategyType
	hasValidSubscription: boolean
}

export const useActionsCoordinator = () => {
	const loggerFn = useActionHistory((state) => state.addHistory)
	const updateWorkspaceStatus = useActionHistory(
		(state) => state.updateWorkspaceStatus,
	)
	const { coordinateLayerZeroBot } = useLayerZeroCoordinator()
	const { coordinateZksyncBot } = useZksyncCoordinator()
	const { getIsSubscriptionActive } = useHandleSubscription()

	const coordinateActions = async ({
		strategy,
		hasValidSubscription,
	}: CoordinateActionsProps) => {
		loggerFn({
			strategyUid: strategy.uid,
			timestamp: new Date(),
			wallet: '',
			status: TxStatusType.STARTING,
			message: `Workspace ${strategy.name} Started.`,
		})

		if (strategy.airdropType === AirdropTypes.LAYER_ZERO) {
			await Promise.all(
				strategy.wallets.map((wallet) =>
					coordinateLayerZeroBot({
						strategy:
							strategy as TypedUserStrategyTypeWithUid<LayerZeroMainnetType>,
						walletUid: wallet.value,
						hasValidSubscription,
					}),
				),
			)
		} else if (strategy.airdropType === AirdropTypes.ZK_SYNC) {
			await Promise.all(
				strategy.wallets.map((wallet) =>
					coordinateZksyncBot({
						strategy:
							strategy as TypedUserStrategyTypeWithUid<ZkSyncMainnetType>,
						walletUid: wallet.value,
						hasValidSubscription,
					}),
				),
			)
		}

		loggerFn({
			strategyUid: strategy.uid,
			timestamp: new Date(),
			wallet: '',
			status: TxStatusType.END,
			message: `Workspace finished.`,
		})
		updateWorkspaceStatus(strategy.uid, WorkspaceStatusType.FINISHED)
	}

	return {
		coordinateActions,
	}
}
