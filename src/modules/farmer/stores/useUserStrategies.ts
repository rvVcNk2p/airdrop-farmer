import type {
	AirdropTypes,
	RawUserStrategyType,
	UserStrategyType,
} from '@modules/farmer/types'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { SecureLocalStorage } from './helpers'
import { useActionHistory } from './useActionHistory'

interface UserStrategies {
	userStrategies: UserStrategyType[]

	getStrategy: (uid: string) => UserStrategyType | undefined
	getStrategiesByType: (type: AirdropTypes) => UserStrategyType[]

	createNewStrategy: (rawStrategy: RawUserStrategyType) => void
	deleteStrategy: (uid: string) => void
	updateStrategy: (updatedStrategy: UserStrategyType) => void
	removeWalletFromStrategies: (walletUid: string) => void
}

export const useUserStrategies = create<UserStrategies>()(
	devtools(
		persist(
			(set, get) => ({
				userStrategies: [],

				getStrategy: (uid: string) => {
					return get().userStrategies.find((strategy) => strategy.uid === uid)
				},

				getStrategiesByType: (type: AirdropTypes) => {
					return get().userStrategies.filter(
						(strategy) => strategy.airdropType === type,
					)
				},

				createNewStrategy: (rawStrategy: RawUserStrategyType) => {
					const uid = uuidv4()

					set((state) => ({
						...state,
						userStrategies: [
							...get().userStrategies,
							{
								...rawStrategy,
								uid,
							},
						],
					}))
				},

				deleteStrategy: (uid: string) => {
					useActionHistory.getState().resetHistory()
					useActionHistory.getState().resetEveryWorkspace()

					set((state) => ({
						...state,
						userStrategies: get().userStrategies.filter(
							(strategy) => strategy.uid !== uid,
						),
					}))
				},

				updateStrategy: (updatedStrategy: UserStrategyType) => {
					set((state) => ({
						...state,
						userStrategies: get().userStrategies.map((strategy) => {
							if (strategy.uid === updatedStrategy.uid) {
								return updatedStrategy
							}

							return strategy
						}),
					}))
				},

				removeWalletFromStrategies: (walletUid: string) => {
					set((state) => ({
						...state,
						userStrategies: get().userStrategies.map((strategy) => {
							return {
								...strategy,
								wallets: strategy.wallets.filter(
									(wallet) => wallet.value !== walletUid,
								),
							}
						}),
					}))
				},
			}),
			{
				name: 'user-strategies',
				storage: createJSONStorage(() => SecureLocalStorage),
			},
		),
	),
)
