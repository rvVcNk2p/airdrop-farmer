import type { RawUserGroupType, UserGroupType } from '@modules/farmer/types'
import secureLocalStorage from 'react-secure-storage'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import {
	StateStorage,
	createJSONStorage,
	devtools,
	persist,
} from 'zustand/middleware'

interface UserGroups {
	userGroups: UserGroupType[]

	getGroupByUid: (uid: string) => UserGroupType | undefined

	createNewGroup: (rawGroup: RawUserGroupType) => void
	deleteGroup: (uid: string) => void
	updateGroup: (updatedGroup: UserGroupType) => void

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

export const useUserGroups = create<UserGroups>()(
	devtools(
		persist(
			(set, get) => ({
				userGroups: [],

				createNewGroup: (rawGroup: RawUserGroupType) => {
					const uid = uuidv4()

					set((state) => ({
						...state,
						userGroups: [
							...get().userGroups,
							{
								uid,
								description: null,
								...rawGroup,
							},
						],
					}))
				},
				deleteGroup: (uid: string) =>
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

				updateGroup: (updatedGroup: UserGroupType) =>
					set((state) => ({
						...state,
						userGroups: get().userGroups.map((group) =>
							group.uid === updatedGroup.uid ? updatedGroup : group,
						),
					})),

				getGroupByUid: (uid: string) =>
					get().userGroups.find((group) => group.uid === uid),
			}),
			{
				name: 'user-groups',
				storage: createJSONStorage(() => SecureLocalStorage),
			},
		),
	),
)
