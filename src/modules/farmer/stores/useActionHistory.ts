import { TxStatusType } from '@modules/farmer/types'
import { ActionStatusType } from '@modules/farmer/types/action'
import { Address } from 'viem'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { SecureLocalStorage } from './helpers'

export enum WorkspaceStatusType {
	IDLE = 'IDLE',
	RUNNING = 'RUNNING',
	FINISHED = 'FINISHED',
	FAILED = 'FAILED',
}
export enum WorkspaceTransactionStatusType {
	FINISHED = 'finished',
	FAILED = 'failed',
}

export type WorkspaceType = {
	uid: string
	status: WorkspaceStatusType
	transactions: {
		finished: number
		failed: number
	}
	aggregatedValue: number
}

export type TxHistoryRecordType = {
	timestamp: Date
	wallet: Address
	status: TxStatusType
	message: string
}

export type ExtendedTxHistoryRecordType = TxHistoryRecordType & {
	groupUid: string
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
	history: ExtendedTxHistoryRecordType[]
	workspaces: WorkspaceType[]

	getAction: (actionUid: string, groupUid: string) => ActionsType | undefined
	getAnyActionRunning: () => boolean

	addNewAction: (newAction: ActionsType) => void
	updateAction: (newAction: Partial<ActionsType>) => void

	addHistory: (newHistory: ExtendedTxHistoryRecordType) => void
	getHistoryByGroupUid: (groupUid: string) => ExtendedTxHistoryRecordType[]
	resetHistoryByGroupUid: (groupUid: string) => void
	resetHistory: () => void

	initWorkspace: (strategyUid: string) => void
	getWorkspace: (groupUid: string | undefined) => WorkspaceType | undefined
	updateWorkspaceStatus: (groupUid: string, status: WorkspaceStatusType) => void
	updateWorkspaceTransactions: (
		groupUid: string,
		status: WorkspaceTransactionStatusType,
	) => void
	updateWorkspaceAggregatedValue: (groupUid: string, value: number) => void
	resetWorkspace: (groupUid: string) => void
	resetEveryWorkspace: () => void
}

export const useActionHistory = create<ActionHistory>()(
	devtools(
		// persist(
		(set, get) => ({
			actions: [],
			history: [],
			workspaces: [],

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

			addHistory: (newHistory: ExtendedTxHistoryRecordType) => {
				set((state) => ({
					history: [...state.history, newHistory],
				}))
			},

			getHistoryByGroupUid: (groupUid: string) => {
				const { history } = get()

				return history.filter(
					(historyItem) => historyItem.groupUid === groupUid,
				)
			},

			resetHistoryByGroupUid: (groupUid: string) => {
				set((state) => ({
					history: state.history.filter(
						(historyItem) => historyItem.groupUid !== groupUid,
					),
				}))
			},

			resetHistory: () => {
				set(() => ({
					history: [],
				}))
			},

			initWorkspace: (strategyUid: string) => {
				const isWorkspaceExists = get().workspaces.find(
					(workspace) => workspace.uid === strategyUid,
				)
				if (isWorkspaceExists) return

				const newWorkspace: WorkspaceType = {
					uid: strategyUid,
					status: WorkspaceStatusType.IDLE,
					transactions: {
						finished: 0,
						failed: 0,
					},
					aggregatedValue: 0,
				}
				set((state) => ({
					workspaces: [...state.workspaces, newWorkspace],
				}))
			},

			getWorkspace: (groupUid: string | undefined) => {
				if (!groupUid) return

				const { workspaces } = get()

				return workspaces.find((workspace) => workspace.uid === groupUid)
			},

			updateWorkspaceStatus: (
				groupUid: string,
				status: WorkspaceStatusType,
			) => {
				set((state) => ({
					workspaces: state.workspaces.map((workspace) =>
						workspace.uid === groupUid ? { ...workspace, status } : workspace,
					),
				}))
			},

			updateWorkspaceTransactions: (
				groupUid: string,
				status: WorkspaceTransactionStatusType,
			) => {
				set((state) => ({
					workspaces: state.workspaces.map((workspace) =>
						workspace.uid === groupUid
							? {
									...workspace,
									transactions: {
										...workspace.transactions,
										[status]: workspace.transactions[status] + 1,
									},
								}
							: workspace,
					),
				}))
			},

			updateWorkspaceAggregatedValue: (groupUid: string, value: number) => {
				set((state) => ({
					workspaces: state.workspaces.map((workspace) =>
						workspace.uid === groupUid
							? {
									...workspace,
									aggregatedValue: workspace.aggregatedValue + value,
								}
							: workspace,
					),
				}))
			},

			resetWorkspace: (groupUid: string) => {
				set((state) => ({
					workspaces: state.workspaces.map((workspace) =>
						workspace.uid === groupUid
							? {
									...workspace,
									status: WorkspaceStatusType.IDLE,
									transactions: {
										finished: 0,
										failed: 0,
									},
									aggregatedValue: 0,
								}
							: workspace,
					),
				}))
			},

			resetEveryWorkspace: () => {
				set((state) => ({
					workspaces: state.workspaces.map((workspace) => ({
						...workspace,
						status: WorkspaceStatusType.IDLE,
						transactions: {
							finished: 0,
							failed: 0,
						},
						aggregatedValue: 0,
					})),
				}))
			},
		}),
		//,
		// 	{
		// 		name: 'action-history',
		// 		storage: createJSONStorage(() => SecureLocalStorage),
		// 	},
		// ),
	),
)
