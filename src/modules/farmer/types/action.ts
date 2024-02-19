import { Address } from 'viem'

export enum ActionStatusType {
	QUEUED = 'QUEUED',
	RUNNING = 'RUNNING',
	FINISHED = 'FINISHED',
	FAILED = 'FAILED',
}

export enum TxStatusType {
	STARTING = 'STARTING',
	INFO = 'INFO',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
	END = 'END',
}

export enum ExecutionActionType {
	BRIDGE = 'BRIDGE',
	ACTION = 'ACTION',
}

export interface TxHistoryRecordType {
	timestamp: Date
	wallet?: Address
	status: TxStatusType
	message: string
}

// Layer Zero types
export enum LayerZeroActionType {
	ALLOWANCE_AND_BRIDGE = 'ALLOWANCE_AND_BRIDGE',
}

export interface ActionsType {
	uid: string
	type: LayerZeroActionType.ALLOWANCE_AND_BRIDGE
	status: ActionStatusType
	action: () => void
}
