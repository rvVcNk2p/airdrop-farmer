import type {
	RawUserGroupType,
	UserGroupType,
	UserStrategyType,
} from '@modules/farmer/types'
import secureLocalStorage from 'react-secure-storage'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import {
	StateStorage,
	createJSONStorage,
	devtools,
	persist,
} from 'zustand/middleware'

interface UserStrategies {
	userStrategies: UserStrategyType[]

	getStrategy: (uid: string) => UserStrategyType | undefined

	createNewStrategy: (rawStrategy: UserStrategyType) => void
	deleteStrategy: (uid: string) => void
	updateStrategy: (updatedGroup: UserStrategyType) => void
}

// https://www.npmjs.com/package/react-secure-storage
const SecureLocalStorage: StateStorage = {
	getItem: async (name: string): Promise<string | null> => {
		// console.log(name, 'has been retrieved')
		return (await secureLocalStorage.getItem(name)?.toString()) || null
	},
	setItem: async (name: string, value: string): Promise<void> => {
		// console.log(name, 'with value', value, 'has been saved')
		await secureLocalStorage.setItem(name, value)
	},
	removeItem: async (name: string): Promise<void> => {
		// console.log(name, 'has been deleted')
		await secureLocalStorage.removeItem(name)
	},
}

export const useUserStrategies = create<UserStrategies>()(
	devtools(
		persist(
			(set, get) => ({
				userStrategies: [],

				getStrategy: (uid: string) => {
					return get().userStrategies.find((strategy) => strategy.uid === uid)
				},

				createNewStrategy: (rawStrategy: UserStrategyType) => {
					const uid = uuidv4()

					set((state) => ({
						...state,
						userStrategies: [
							...get().userStrategies,
							{
								uid,
								...rawStrategy,
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
				name: 'user-groups',
				storage: createJSONStorage(() => SecureLocalStorage),
			},
		),
	),
)
