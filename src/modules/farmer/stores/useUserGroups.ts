import secureLocalStorage from 'react-secure-storage'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import {
	StateStorage,
	createJSONStorage,
	devtools,
	persist,
} from 'zustand/middleware'

interface UserStrategy {
	uid: string
	name: string
	config: Record<string, unknown>
}

interface UserGroup {
	uid: string
	name: string
	description: string | null
	strategyUid: string | null
	wallets: string[]
}

export interface UseUserGroups {
	userStrategies: UserStrategy[]
	userGroups: UserGroup[]

	createNewGroup: (name: string) => void
	deleteNewGroup: (uid: string) => void
	addWalletToGroup: (groupUid: string, wallet: string) => void
	removeWalletFromGroup: (groupUid: string, wallet: string) => void
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

export const useUserGroups = create<UseUserGroups>()(
	devtools(
		persist(
			(set, get) => ({
				userStrategies: [],
				userGroups: [],

				createNewGroup: (name: string, description?: string) => {
					const uid = uuidv4()

					set((state) => ({
						...state,
						userGroups: [
							...get().userGroups,
							{
								name,
								uid,
								description: description || null,
								strategyUid: null,
								wallets: [],
							},
						],
					}))
				},
				deleteNewGroup: (uid: string) =>
					set((state) => ({
						...state,
						userGroups: get().userGroups.filter((group) => group.uid !== uid),
					})),

				addWalletToGroup: (groupUid: string, wallet: string) =>
					set((state) => ({
						...state,
						userGroups: get().userGroups.map((group) =>
							group.uid === groupUid
								? { ...group, wallets: [...group.wallets, wallet] }
								: group,
						),
					})),

				removeWalletFromGroup: (groupUid: string, wallet: string) =>
					set((state) => ({
						...state,
						userGroups: get().userGroups.map((group) =>
							group.uid === groupUid
								? {
										...group,
										wallets: group.wallets.filter(
											(groupWallet) => groupWallet !== wallet,
										),
								  }
								: group,
						),
					})),
			}),
			{
				name: 'user-groups',
				storage: createJSONStorage(() => SecureLocalStorage),
			},
		),
	),
)
