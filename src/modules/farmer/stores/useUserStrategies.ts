import type {
	RawUserStrategyType,
	UserStrategyType,
} from '@modules/farmer/types'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { SecureLocalStorage } from './helpers'

interface UserStrategies {
	userStrategies: UserStrategyType[]

	getStrategy: (uid: string) => UserStrategyType | undefined

	createNewStrategy: (rawStrategy: RawUserStrategyType) => void
	deleteStrategy: (uid: string) => void
	updateStrategy: (updatedGroup: UserStrategyType) => void
}

export const useUserStrategies = create<UserStrategies>()(
	devtools(
		persist(
			(set, get) => ({
				userStrategies: [],

				getStrategy: (uid: string) => {
					return get().userStrategies.find((strategy) => strategy.uid === uid)
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
			}),
			{
				name: 'user-strategies',
				storage: createJSONStorage(() => SecureLocalStorage),
			},
		),
	),
)
