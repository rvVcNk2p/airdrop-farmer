import { TxStatusType } from '@modules/farmer/types'
import {
	ActionStatusType,
	LayerZeroActionType,
} from '@modules/farmer/types/action'
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
	aggregatedBridgeValue: number
}

export type TxHistoryRecordType = {
	timestamp: Date
	wallet: Address | ''
	status: TxStatusType
	message: string
}

export type ExtendedTxHistoryRecordType = TxHistoryRecordType & {
	strategyUid: string
}

type ActionsType = {
	uid: string
	wallet: Address
	strategyUid: string
	type: LayerZeroActionType.ALLOWANCE_AND_BRIDGE
	status: ActionStatusType
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

	getAction: (actionUid: string, strategyUid: string) => ActionsType | undefined
	getAnyActionRunning: () => boolean

	addNewAction: (newAction: ActionsType) => void
	updateAction: (newAction: Partial<ActionsType>) => void

	addHistory: (newHistory: ExtendedTxHistoryRecordType) => void
	getHistoryByStrategyUid: (
		strategyUid: string,
	) => ExtendedTxHistoryRecordType[]
	resetHistoryByStrategyUid: (strategyUid: string) => void
	resetHistory: () => void

	initWorkspace: (strategyUid: string) => void
	getWorkspace: (strategyUid: string | undefined) => WorkspaceType | undefined
	updateWorkspaceStatus: (
		strategyUid: string,
		status: WorkspaceStatusType,
	) => void
	updateWorkspaceTransactions: (
		strategyUid: string,
		status: WorkspaceTransactionStatusType,
	) => void
	updateWorkspaceAggregatedValue: (strategyUid: string, value: number) => void
	updateWorkspaceAggregatedBridgeValue: (
		strategyUid: string,
		value: number,
	) => void
	resetWorkspace: (strategyUid: string) => void
	resetEveryWorkspace: () => void
}

export const useActionHistory = create<ActionHistory>()(
	devtools(
		persist(
			(set, get) => ({
				actions: [],
				history: [],
				workspaces: [],

				getAction: (actionUid: string, strategyUid: string) => {
					const { actions } = get()

					return actions.find(
						(action) =>
							action.uid === actionUid && action.strategyUid === strategyUid,
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
							action.uid === newAction.uid
								? { ...action, ...newAction }
								: action,
						),
					}))
				},

				addHistory: (newHistory: ExtendedTxHistoryRecordType) => {
					set((state) => ({
						history: [...state.history, newHistory],
					}))
				},

				getHistoryByStrategyUid: (strategyUid: string) => {
					const { history } = get()

					return history.filter(
						(historyItem) => historyItem.strategyUid === strategyUid,
					)
				},

				resetHistoryByStrategyUid: (strategyUid: string) => {
					set((state) => ({
						history: state.history.filter(
							(historyItem) => historyItem.strategyUid !== strategyUid,
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
						aggregatedBridgeValue: 0,
					}
					set((state) => ({
						workspaces: [...state.workspaces, newWorkspace],
					}))
				},

				getWorkspace: (strategyUid: string | undefined) => {
					if (!strategyUid) return

					const { workspaces } = get()

					return workspaces.find((workspace) => workspace.uid === strategyUid)
				},

				updateWorkspaceStatus: (
					strategyUid: string,
					status: WorkspaceStatusType,
				) => {
					set((state) => ({
						workspaces: state.workspaces.map((workspace) =>
							workspace.uid === strategyUid
								? { ...workspace, status }
								: workspace,
						),
					}))
				},

				updateWorkspaceTransactions: (
					strategyUid: string,
					status: WorkspaceTransactionStatusType,
				) => {
					set((state) => ({
						workspaces: state.workspaces.map((workspace) =>
							workspace.uid === strategyUid
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

				updateWorkspaceAggregatedValue: (
					strategyUid: string,
					value: number,
				) => {
					set((state) => ({
						workspaces: state.workspaces.map((workspace) =>
							workspace.uid === strategyUid
								? {
										...workspace,
										aggregatedValue: workspace.aggregatedValue + value,
									}
								: workspace,
						),
					}))
				},
				updateWorkspaceAggregatedBridgeValue: (
					strategyUid: string,
					value: number,
				) => {
					set((state) => ({
						workspaces: state.workspaces.map((workspace) =>
							workspace.uid === strategyUid
								? {
										...workspace,
										aggregatedBridgeValue:
											workspace.aggregatedBridgeValue + value,
									}
								: workspace,
						),
					}))
				},

				resetWorkspace: (strategyUid: string) => {
					set((state) => ({
						workspaces: state.workspaces.map((workspace) =>
							workspace.uid === strategyUid
								? {
										...workspace,
										status: WorkspaceStatusType.IDLE,
										transactions: {
											finished: 0,
											failed: 0,
										},
										aggregatedValue: 0,
										aggregatedBridgeValue: 0,
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

			{
				name: 'action-history',
				storage: createJSONStorage(() => SecureLocalStorage),
			},
		),
	),
)
