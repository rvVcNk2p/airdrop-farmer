'use client'

import { Input } from '@/modules/shared/components/ui/input'
import { useIsMounted } from '@/modules/shared/hooks'
import { useUserGroups } from '@modules/farmer/stores'
import { Button } from '@modules/shared/components/ui/button'
import { useState } from 'react'

const FarmerPage = () => {
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
		<div className="flex min-h-screen flex-col items-center justify-between p-24">
			[FARMER] Hello from the other side
			{useIsMounted() ? (
				<>
					<div>
						<ul>
							{userGroups.map((group) => (
								<li key={group.uid}>
									{group.name} - {group.uid}
									{group.wallets.map((wallet) => (
										<p key={wallet + Math.random()}>{wallet}</p>
									))}
								</li>
							))}
						</ul>
					</div>
				</>
			) : (
				'Loading...'
			)}
			<div>
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
			</div>
		</div>
	)
}

export default FarmerPage
