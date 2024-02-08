import type { RawWalletType, WalletType } from '@modules/farmer/types'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { useUserStrategies } from '@modules/farmer/stores/useUserStrategies'

import { SecureLocalStorage } from './helpers'

interface useUserWallets {
	userWallets: WalletType[]

	getWalletByUid: (uid: string) => WalletType | null
	isPrivateKeyUnique: (privateKey: string) => boolean

	addNewWallet: (rawWallet: RawWalletType) => void
	deleteWallet: (uid: string) => void
	updateWallet: (updatedWallet: WalletType) => void
}

export const useUserWallets = create<useUserWallets>()(
	devtools(
		persist(
			(set, get) => ({
				userWallets: [],

				getWalletByUid: (uid: string) =>
					get().userWallets.find((wallet) => wallet.uid === uid) || null,

				isPrivateKeyUnique: (privateKey: string) =>
					!get().userWallets.some((wallet) => wallet.privateKey === privateKey),

				addNewWallet: (rawWallet: RawWalletType) => {
					const uid = uuidv4()

					set((state) => ({
						...state,
						userWallets: [
							...get().userWallets,
							{
								uid,
								...rawWallet,
							},
						],
					}))
				},

				deleteWallet: (uid: string) => {
					// TODO: Do not allow to delete wallet if it's used in an ACTIVE strategy
					set((state) => ({
						...state,
						userWallets: get().userWallets.filter(
							(wallet) => wallet.uid !== uid,
						),
					}))
					// Attention! The wallet will be removed from the strategies as well.
					useUserStrategies.getState().removeWalletFromStrategies(uid)
				},

				updateWallet: (updatedWallet: WalletType) =>
					set((state) => ({
						...state,
						userWallets: get().userWallets.map((wallet) =>
							wallet.uid === updatedWallet.uid ? updatedWallet : wallet,
						),
					})),
			}),
			{
				name: 'user-wallets',
				storage: createJSONStorage(() => SecureLocalStorage),
			},
		),
	),
)
