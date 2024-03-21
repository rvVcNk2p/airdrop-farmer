import { type Address } from 'viem/accounts'
import { v4 as uuidv4 } from 'uuid'

import {
	ActionStatusType,
	ScrollBridges,
	type TxHistoryRecordType,
	type ScrollMainnetBridgeType,
	type TimeIntervalConfigType,
} from '@modules/farmer/types'
import { getScrollBridge } from '@modules/farmer/hooks/workspace/scroll/bridge/getScrollBridge'

interface BridgeCreatorFactoryProps {
	strategyUid: string
	walletPrivateKey: Address
	actionType: string // TODO: Add enum
	timeIntervals: TimeIntervalConfigType
	addNewAction: ({}: any) => void
	loggerFn: ({}: TxHistoryRecordType) => void
	bridge: ScrollMainnetBridgeType
}

export const scrollBridgeCreatorFactory = ({
	strategyUid,
	walletPrivateKey,
	actionType,
	addNewAction,
	loggerFn,
	bridge,
}: BridgeCreatorFactoryProps) => {
	const { orbiterScrollBridgeFn } = getScrollBridge()
	const selectedActionByType = () => {
		switch (actionType) {
			case ScrollBridges.ORBITER:
				return orbiterScrollBridgeFn({
					walletPrivateKey,
					bridge,
					loggerFn,
				})
			// Add more cases - Scroll types
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
