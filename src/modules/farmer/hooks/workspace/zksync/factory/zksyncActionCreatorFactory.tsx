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
	ZksyncActionProviders,
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
	actionType: ZksyncActionProviders
	providerType:
		| ZksyncSwapActionProviders
		| ZksyncLendingActionProviders
		| ZksyncLiquidityActionProviders
	timeIntervals: TimeIntervalConfigType
	addNewAction: ({}: any) => void
	loggerFn: ({}: TxHistoryRecordType) => void
	actions: ZkSyncMainnetActionsType
}

export const zksyncActionCreatorFactory = ({
	strategyUid,
	walletPrivateKey,
	actionType,
	providerType,
	timeIntervals,
	addNewAction,
	loggerFn,
	actions,
}: ActionCreatorFactoryProps) => {
	const selectedActionByType = () => {
		if (actionType === ZksyncActionProviders.SWAP) {
			switch (providerType) {
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
			}
		} else if (actionType === ZksyncActionProviders.LENDING) {
			switch (providerType) {
				case ZksyncLendingActionProviders.ERALEND_LENDING:
					return eralendLendingAction({
						walletPrivateKey,
						actions,
						timeIntervals,
						loggerFn,
					})
				case ZksyncLendingActionProviders.REACTORFUSION_LENDING:
					return
			}
		} else if (actionType === ZksyncActionProviders.LIQUIDITY) {
			switch (providerType) {
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
