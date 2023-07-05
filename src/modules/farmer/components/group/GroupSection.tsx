'use client'

import { Card } from '@/modules/shared/components/ui/card'
import { Input } from '@/modules/shared/components/ui/input'
import { useIsMounted } from '@/modules/shared/hooks'
import { useUserGroups } from '@modules/farmer/stores'
import { CardTemplate } from '@modules/shared/components/templates/CardTemplate'
import { Button } from '@modules/shared/components/ui/button'
import { useState } from 'react'

import { EmptyGroup } from './EmptyGroup'

export const GroupSection = () => {
	const userGroups = useUserGroups((state) => state.userGroups)
	const createNewGroup = useUserGroups((state) => state.createNewGroup)
	const addWalletToGroup = useUserGroups((state) => state.addWalletToGroup)

	const [groupName, setGroupName] = useState('')
	const [wallet, setWallet] = useState('')

	const hangleSetGroupName = () => {
		createNewGroup(groupName)
		setGroupName('')
	}
	const handleAddWalletToGroup = () => {
		addWalletToGroup(groupName, wallet)
		setWallet('')
	}

	return (
		<CardTemplate title="Groups">
			<div>
				{useIsMounted() ? (
					<>
						<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{userGroups.map((group) => (
								<CardTemplate key={group.uid} classes="min-h-[200px]">
									<div>
										{group.name} - {group.uid}
										{group.wallets.map((wallet) => (
											<p key={wallet + Math.random()}>{wallet}</p>
										))}
									</div>
								</CardTemplate>
							))}

							<EmptyGroup classes="min-h-[200px]" />
						</div>
					</>
				) : (
					'Loading...'
				)}
				{/* <div>
					<Input
						placeholder="Group Name"
						value={groupName}
						onChange={(e: React.FormEvent<HTMLInputElement>) =>
							setGroupName(e.currentTarget.value)
						}
					/>
					<Button className="w-full mt-4" onClick={hangleSetGroupName}>
						Add New Group
					</Button>
				</div>
				<div>
					<Input
						placeholder="Wallet"
						value={wallet}
						onChange={(e: React.FormEvent<HTMLInputElement>) =>
							setWallet(e.currentTarget.value)
						}
					/>
					<Button className="w-full mt-4" onClick={handleAddWalletToGroup}>
						Add Wallet
					</Button>
				</div> */}
			</div>
		</CardTemplate>
	)
}
