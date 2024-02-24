import { type Address } from 'viem/accounts'
import { v4 as uuidv4 } from 'uuid'

import {
	ActionStatusType,
	ZksyncBridges,
	type TxHistoryRecordType,
	type ZkSyncMainnetBridgeType,
	type TimeIntervalConfigType,
} from '@modules/farmer/types'
import { getZksyncBridge } from '@modules/farmer/hooks/workspace/zksync/bridge/getZksyncBridge'

interface BridgeCreatorFactoryProps {
	strategyUid: string
	walletPrivateKey: Address
	actionType: string // TODO: Add enum
	timeIntervals: TimeIntervalConfigType
	addNewAction: ({}: any) => void
	loggerFn: ({}: TxHistoryRecordType) => void
	bridge: ZkSyncMainnetBridgeType
}

export const zksyncBridgeCreatorFactory = ({
	strategyUid,
	walletPrivateKey,
	actionType,
	addNewAction,
	loggerFn,
	bridge,
}: BridgeCreatorFactoryProps) => {
	const { orbiterZksyncBridgeFn } = getZksyncBridge()
	const selectedActionByType = () => {
		switch (actionType) {
			case ZksyncBridges.ORBITER:
				return orbiterZksyncBridgeFn({
					walletPrivateKey,
					bridge,
					loggerFn,
				})
			// Add more cases - ZksyncBridges types
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
