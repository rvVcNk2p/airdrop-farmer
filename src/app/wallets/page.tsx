'use client'

import { padWallet } from '@/modules/shared/utils'
import { EmptyWallet } from '@modules/farmer/components/Group/EmptyWallet'
import { useUserWallets } from '@modules/farmer/stores'
import { CardTemplate } from '@modules/shared/components/templates/CardTemplate'
import { Button } from '@modules/shared/components/ui/button'
import { useIsMounted } from '@modules/shared/hooks'
import { Pencil, Trash } from '@phosphor-icons/react'
import { privateKeyToAccount } from 'viem/accounts'

const WalletsPage = () => {
	const userWallets = useUserWallets((state) => state.userWallets)
	const deleteWallet = useUserWallets((state) => state.deleteWallet)

	const handleDelete = (uid: string) => {
		// TODO: Check if the wallet is being used in any group
		deleteWallet(uid)
	}

	return (
		<div className="mt-12">
			<CardTemplate title="Wallets">
				<div>
					{useIsMounted() ? (
						<>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
								{userWallets.map((wallet) => (
									<CardTemplate
										key={wallet.uid}
										rootClasses="min-h-[200px]"
										contentClasses="flex flex-col justify-between items-between h-full"
									>
										<div className="cursor-pointer">
											<div className="flex gap-2 items-center">
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
											<div className="flex gap-2 items-center">
												{wallet.description || 'No description'}
											</div>
										</div>
										<div className="flex justify-between gap-4 w-full">
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
		</div>
	)
}

export default WalletsPage
