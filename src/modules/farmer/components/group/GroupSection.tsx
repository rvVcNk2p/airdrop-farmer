'use client'

import { useUserGroups } from '@modules/farmer/stores'
import { CardTemplate } from '@modules/shared/components/templates/CardTemplate'
import { Button } from '@modules/shared/components/ui/button'
import { useIsMounted, useToast } from '@modules/shared/hooks'
import { Pencil, Trash } from '@phosphor-icons/react'
import { useState } from 'react'

import { EditGroupModal } from './EditGroupModal'
import { EmptyGroup } from './EmptyGroup'

export const GroupSection = () => {
	const { toast } = useToast()
	const userGroups = useUserGroups((state) => state.userGroups)
	const deleteGroup = useUserGroups((state) => state.deleteGroup)

	const [selectedGroup, setSelectedGroup] = useState<null | string>(null)

	const handleDeleteGroup = (groupUid: string, groupName: string) => {
		// TODO: Add confirmation
		deleteGroup(groupUid)
		toast({
			title: '❌ Group deleted!',
			description: groupName,
			duration: 5000,
		})
	}

	return (
		<>
			<CardTemplate title="Groups">
				<div>
					{useIsMounted() ? (
						<>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
								{userGroups.map((group) => (
									<CardTemplate
										key={group.uid}
										rootClasses="min-h-[200px]"
										contentClasses="flex flex-col justify-between items-between h-full"
									>
										<div
											onClick={() => setSelectedGroup(group.uid)}
											className="cursor-pointer"
										>
											{group.name}
											{group.wallets.map((wallet) => (
												<p key={wallet + Math.random()}>{wallet}</p>
											))}
										</div>
										<div className="flex justify-between gap-4 w-full">
											<Button
												variant="destructive"
												className="flex w-full sm:w-fit"
												disabled={false}
												onClick={() => handleDeleteGroup(group.uid, group.name)}
											>
												<Trash className="mr-2" size={18} />
												Delete
											</Button>
											<Button
												className="flex w-full sm:w-fit"
												disabled={false}
												onClick={() => setSelectedGroup(group.uid)}
											>
												<Pencil className="mr-2" />
												Edit
											</Button>
										</div>
									</CardTemplate>
								))}

								<EmptyGroup classes="min-h-[200px]" />
							</div>
						</>
					) : (
						'Loading...'
					)}
				</div>
			</CardTemplate>

			<EditGroupModal
				selectedGroup={selectedGroup}
				close={() => setSelectedGroup(null)}
			/>
		</>
	)
}
