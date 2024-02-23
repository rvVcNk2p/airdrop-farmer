import { type Address } from 'viem/accounts'
import { v4 as uuidv4 } from 'uuid'

import {
	ActionStatusType,
	ZksyncSwapActionProviders,
	ZksyncLiquidityActionProviders,
	ZksyncLendingActionProviders,
	type TxHistoryRecordType,
	type ZkSyncMainnetActionsType,
	type TimeIntervalConfigType,
} from '@modules/farmer/types'

import {
	muteSwapAction,
	syncswapSwapAction,
} from '@modules/farmer/hooks/workspace/zksync/actions/swap'
import { eralendLendingAction } from '@modules/farmer/hooks/workspace/zksync/actions/lending'
import { muteLiquidityAction } from '@modules/farmer/hooks/workspace/zksync/actions/liquidity'

interface ActionCreatorFactoryProps {
	strategyUid: string
	walletPrivateKey: Address
	actionType: string // TODO: Add enum
	timeIntervals: TimeIntervalConfigType
	addNewAction: ({}: any) => void
	loggerFn: ({}: TxHistoryRecordType) => void
	actions: ZkSyncMainnetActionsType
}

export const zksyncActionCreatorFactory = ({
	strategyUid,
	walletPrivateKey,
	actionType,
	timeIntervals,
	addNewAction,
	loggerFn,
	actions,
}: ActionCreatorFactoryProps) => {
	const selectedActionByType = () => {
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
			case ZksyncSwapActionProviders.SPACEFI_SWAP:
				return
			case ZksyncSwapActionProviders.VELOCORE_SWAP:
				return

			case ZksyncLendingActionProviders.ERALEND_LENDING:
				return eralendLendingAction({
					walletPrivateKey,
					actions,
					timeIntervals,
					loggerFn,
				})
			case ZksyncLendingActionProviders.REACTORFUSION_LENDING:
				return

			case ZksyncLiquidityActionProviders.MUTE_LIQUIDITY:
				return muteLiquidityAction({
					walletPrivateKey,
					actions,
					timeIntervals,
					loggerFn,
				})
			case ZksyncLiquidityActionProviders.SPACEFI_LIQUIDITY:
				return
			case ZksyncLiquidityActionProviders.SYNCSWAP_LIQUIDITY:
				return
			case ZksyncLiquidityActionProviders.VELOCORE_LIQUIDITY:
				return

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
