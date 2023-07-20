import { Address } from 'viem'

export enum ActionStatusType {
	'QUEUED' = 'QUEUED',
	'RUNNING' = 'RUNNING',
	'FINISHED' = 'FINISHED',
	'FAILED' = 'FAILED',
}

export enum TxStatusType {
	INFO = 'INFO',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

export type TxHistoryRecordType = {
	timestamp: Date
	wallet: Address
	status: TxStatusType
	message: string
}

export type ActionsType = {
	uid: string
	type: 'ALLOWANCE_AND_BRIDGE'
	status: 'QUEUED' | 'RUNNING' | 'FINISHED' | 'FAILED'
	action: () => void
}
