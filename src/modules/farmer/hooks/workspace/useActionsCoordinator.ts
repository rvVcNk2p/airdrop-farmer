import { useActionHistory } from '@modules/farmer/stores'
import { WorkspaceStatusType } from '@modules/farmer/stores/useActionHistory'
import { AirdropTypes, TxStatusType } from '@modules/farmer/types'
import type {
	LayerZeroMainnetType,
	TypedUserStrategyTypeWithUid,
	UserStrategyType,
} from '@modules/farmer/types'

import { useLayerZeroCoordinator } from '@modules/farmer/hooks/workspace/layer-zero/useLayerZeroCoordinator'

type CoordinateActionsProps = {
	strategy: UserStrategyType
}

export const useActionsCoordinator = () => {
	const loggerFn = useActionHistory((state) => state.addHistory)
	const updateWorkspaceStatus = useActionHistory(
		(state) => state.updateWorkspaceStatus,
	)
	const { coordinateLayerZeroBot } = useLayerZeroCoordinator()

	const coordinateActions = async ({ strategy }: CoordinateActionsProps) => {
		loggerFn({
			strategyUid: strategy.uid,
			timestamp: new Date(),
			wallet: '',
			status: TxStatusType.STARTING,
			message: `Workspace ${strategy.name} Started.`,
		})

		// TODO: Add support for multiple wallet support
		if (strategy.airdropType === AirdropTypes.LAYER_ZERO) {
			await Promise.all(
				strategy.wallets.map((wallet) =>
					coordinateLayerZeroBot({
						strategy:
							strategy as TypedUserStrategyTypeWithUid<LayerZeroMainnetType>,
						walletUid: wallet.value,
					}),
				),
			)
		} else if (strategy.airdropType === AirdropTypes.ZK_SYNC) {
			console.log('== ZkSyncMainnetType')
		}
		// TODO: Add support for other airdrop types

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
