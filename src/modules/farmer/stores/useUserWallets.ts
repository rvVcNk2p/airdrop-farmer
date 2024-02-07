import type { RawWalletType, WalletType } from '@modules/farmer/types'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

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

				deleteWallet: (uid: string) =>
					set((state) => ({
						...state,
						userWallets: get().userWallets.filter(
							(wallet) => wallet.uid !== uid,
						),
					})),

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
