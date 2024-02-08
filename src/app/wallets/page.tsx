'use client'

import { WalletType } from '@/modules/farmer/types'
import { padWallet } from '@/modules/shared/utils'
import { EmptyWallet } from '@modules/farmer/components/Wallet/EmptyWallet'
import { useUserWallets } from '@modules/farmer/stores'
import { CardTemplate } from '@modules/shared/components/templates/CardTemplate'
import { Button } from '@modules/shared/components/ui/button'
import { useIsMounted } from '@modules/shared/hooks'
import { Pencil, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { privateKeyToAccount } from 'viem/accounts'
import { EditWalletModal } from '@modules/farmer/components/Wallet/EditWalletModal'

const WalletsPage = () => {
	const userWallets = useUserWallets((state) => state.userWallets)
	const deleteWallet = useUserWallets((state) => state.deleteWallet)
	const getWalletByUid = useUserWallets((state) => state.getWalletByUid)

	const [selectedWallet, setSelectedWallet] = useState<null | WalletType>(null)

	const handleDelete = (uid: string) => {
		// TODO: Check if the wallet is being used in any strategy
		deleteWallet(uid)
	}

	return (
		<div className="mt-12">
			<CardTemplate title="Wallets">
				<div>
					{useIsMounted() ? (
						<>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
								{userWallets.map((wallet) => (
									<CardTemplate
										key={wallet.uid}
										rootClasses="min-h-[200px]"
										contentClasses="flex flex-col justify-between items-between h-full"
									>
										<div className="cursor-pointer">
											<div className="flex items-center gap-2">
												{wallet.name}
											</div>
										</div>

										<div className="cursor-pointer">
											<p key={wallet.uid}>
												{padWallet(
													privateKeyToAccount(wallet.privateKey ?? '0x')
														.address,
												)}
											</p>
										</div>
										<div className="cursor-pointer">
											<div className="flex items-center gap-2">
												{wallet.description || 'No description'}
											</div>
										</div>
										<div className="flex w-full justify-between gap-4">
											<Button
												variant="outline"
												className="flex w-full sm:w-fit"
												onClick={() => handleDelete(wallet.uid)}
											>
												<Trash size={18} />
											</Button>

											<Button
												variant="outline"
												className="flex w-full sm:w-fit"
												onClick={() =>
													setSelectedWallet(getWalletByUid(wallet.uid))
												}
											>
												<Pencil size={16} />
											</Button>
										</div>
									</CardTemplate>
								))}

								<EmptyWallet classes="min-h-[200px]" />
							</div>
						</>
					) : (
						'Loading...'
					)}
				</div>
			</CardTemplate>

			{selectedWallet && (
				<EditWalletModal
					selectedWallet={selectedWallet}
					close={() => setSelectedWallet(null)}
				/>
			)}
		</div>
	)
}

export default WalletsPage
