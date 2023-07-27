import type { RawUserGroupType, UserGroupType } from '@modules/farmer/types'
import { v4 as uuidv4 } from 'uuid'
import { Address } from 'viem'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { SecureLocalStorage } from './helpers'

interface UserGroups {
	userGroups: UserGroupType[]

	getGroupByUid: (uid: string) => UserGroupType | undefined

	createNewGroup: (rawGroup: RawUserGroupType) => void
	deleteGroup: (uid: string) => void
	updateGroup: (updatedGroup: UserGroupType) => void
	removeStrategyFromGroups: (strategyUid: string) => void

	addWalletToGroup: (groupUid: string, wallet: Address) => void
	removeWalletFromGroup: (groupUid: string, wallet: Address) => void
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

				addWalletToGroup: (groupUid: string, wallet: Address) =>
					set((state) => ({
						...state,
						userGroups: get().userGroups.map((group) =>
							group.uid === groupUid
								? { ...group, wallets: [...group.wallets, wallet] }
								: group,
						),
					})),

				removeWalletFromGroup: (groupUid: string, wallet: Address) =>
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

				removeStrategyFromGroups: (strategyUid: string) =>
					set((state) => ({
						...state,
						userGroups: get().userGroups.map((group) =>
							group.strategyUid === strategyUid
								? { ...group, strategyUid: undefined }
								: group,
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
