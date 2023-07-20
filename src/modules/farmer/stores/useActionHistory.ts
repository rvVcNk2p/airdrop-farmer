import type { PerformAllowanceProps } from '@modules/farmer/hooks/workspace/actions/usePerformAllowanceAndBridge'
import { ActionStatusType } from '@modules/farmer/types/action'
import { Address } from 'viem'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

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

type ActionsType = {
	uid: string
	wallet: Address
	groupUid: string
	type: 'ALLOWANCE_AND_BRIDGE'
	status: 'QUEUED' | 'RUNNING' | 'FINISHED' | 'FAILED'
	layerOneBridge: {
		txHash: string | null
		srcChainId: number | null
	}

	action: () => Promise<void>
}

interface ActionHistory {
	actions: ActionsType[]
	history: TxHistoryRecordType[]

	getAction: (actionUid: string, groupUid: string) => ActionsType | undefined

	getAnyActionRunning: () => boolean
	addNewAction: (newAction: ActionsType) => void
	updateAction: (newAction: Partial<ActionsType>) => void
	addHistory: (newHistory: TxHistoryRecordType) => void
}

export const useActionHistory = create<ActionHistory>()(
	devtools(
		// persist(
		(set, get) => ({
			actions: [],
			history: [],

			getAction: (actionUid: string, groupUid: string) => {
				const { actions } = get()

				return actions.find(
					(action) => action.uid === actionUid && action.groupUid === groupUid,
				)
			},

			getAnyActionRunning: () => {
				const { actions } = get()

				return actions.some(
					(action) => action.status === ActionStatusType.RUNNING,
				)
			},

			addNewAction: (newAction: ActionsType) => {
				set((state) => ({
					actions: [...state.actions, newAction],
				}))
			},

			updateAction: (newAction: Partial<ActionsType>) => {
				set((state) => ({
					actions: state.actions.map((action) =>
						action.uid === newAction.uid ? { ...action, ...newAction } : action,
					),
				}))
			},

			addHistory: (newHistory: TxHistoryRecordType) => {
				set((state) => ({
					history: [...state.history, newHistory],
				}))
			},
		}),
		// 	{
		// 		name: 'action-history',
		// 		storage: createJSONStorage(() => localStorage),
		// 	},
		// ),
	),
)
