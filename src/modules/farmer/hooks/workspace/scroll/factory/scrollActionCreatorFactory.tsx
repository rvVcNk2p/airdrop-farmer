import { type Address } from 'viem/accounts'
import { v4 as uuidv4 } from 'uuid'

import {
	ActionStatusType,
	ScrollSwapActionProviders,
	ScrollLiquidityActionProviders,
	ScrollLendingActionProviders,
	type TxHistoryRecordType,
	type ScrollMainnetActionsType,
	type TimeIntervalConfigType,
	ScrollActionProviders,
} from '@modules/farmer/types'

import { spacefiSwapAction } from '@modules/farmer/hooks/workspace/scroll/actions/swap'
import { spacefiLiquidityAction } from '@modules/farmer/hooks/workspace/scroll/actions/liquidity'
import { layerBankLendingAction } from '@modules/farmer/hooks/workspace/scroll/actions/lending'

interface ActionCreatorFactoryProps {
	strategyUid: string
	walletPrivateKey: Address
	actionType: ScrollActionProviders
	providerType:
		| ScrollSwapActionProviders
		| ScrollLendingActionProviders
		| ScrollLiquidityActionProviders
	timeIntervals: TimeIntervalConfigType
	addNewAction: ({}: any) => void
	loggerFn: ({}: TxHistoryRecordType) => void
	actions: ScrollMainnetActionsType
}

export const scrollActionCreatorFactory = ({
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
		if (actionType === ScrollActionProviders.SWAP) {
			switch (providerType) {
				case ScrollSwapActionProviders.SPACEFI_SWAP:
					return spacefiSwapAction({
						walletPrivateKey,
						actions,
						timeIntervals,
						loggerFn,
					})
				case ScrollSwapActionProviders.SYNCSWAP_SWAP:
					return
				case ScrollSwapActionProviders.IZUMI_SWAP:
					return
				case ScrollSwapActionProviders.NATIVE_SWAP:
					return
				case ScrollSwapActionProviders.OPEN_OCEAN_SWAP:
					return
				case ScrollSwapActionProviders.SKYDROME_SWAP:
					return
			}
		} else if (actionType === ScrollActionProviders.LENDING) {
			switch (providerType) {
				case ScrollLendingActionProviders.LAYER_BANK_LENDING:
					return layerBankLendingAction({
						walletPrivateKey,
						actions,
						timeIntervals,
						loggerFn,
					})
			}
		} else if (actionType === ScrollActionProviders.LIQUIDITY) {
			switch (providerType) {
				case ScrollLiquidityActionProviders.SPACEFI_LIQUIDITY:
					return spacefiLiquidityAction({
						walletPrivateKey,
						actions,
						timeIntervals,
						loggerFn,
					})
				case ScrollLiquidityActionProviders.SYNCSWAP_LIQUIDITY:
					return
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
