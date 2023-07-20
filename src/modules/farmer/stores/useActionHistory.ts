import { v4 as uuidv4 } from 'uuid'
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
	type: 'ALLOWANCE_AND_BRIDGE'
	status: 'QUEUED' | 'RUNNING' | 'FINISHED' | 'FAILED'
	action: () => void
}

interface ActionHistory {
	actions: ActionsType[]
	history: TxHistoryRecordType[]

	addNewAction: (newAction: ActionsType) => void
	updateAction: (newAction: ActionsType) => void
	addHistory: (newHistory: TxHistoryRecordType) => void
}

export const useActionHistory = create<ActionHistory>()(
	devtools(
		// persist(
		(set, get) => ({
			actions: [],
			history: [],

			addNewAction: (newAction: ActionsType) => {
				set((state) => ({
					actions: [...state.actions, newAction],
				}))
			},

			updateAction: (newAction: ActionsType) => {
				set((state) => ({
					actions: state.actions.map((action) =>
						action.uid === newAction.uid ? newAction : action,
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
