'use client'

import { EditGroupModal } from '@modules/farmer/components/Group/EditGroupModal'
import { EmptyGroup } from '@modules/farmer/components/Group/EmptyGroup'
import { statusColor } from '@modules/farmer/helpers/status'
import { useActionHistory, useUserGroups } from '@modules/farmer/stores'
import { WorkspaceStatusType } from '@modules/farmer/stores/useActionHistory'
import type { UserGroupType } from '@modules/farmer/types'
import { CardTemplate } from '@modules/shared/components/templates/CardTemplate'
import { Button } from '@modules/shared/components/ui/button'
import { useIsMounted } from '@modules/shared/hooks'
import { toast } from '@modules/shared/hooks/useToast'
import { Pencil, Play, Trash } from '@phosphor-icons/react'
import { padWallet } from '@utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { privateKeyToAccount } from 'viem/accounts'

export const GroupSection = () => {
	const router = useRouter()

	const userGroups = useUserGroups((state) => state.userGroups)
	const deleteGroup = useUserGroups((state) => state.deleteGroup)

	const [selectedGroup, setSelectedGroup] = useState<null | string>(null)

	const handleDeleteGroup = (groupUid: string, groupName: string) => {
		// TODO: Add confirmation
		// RANDOM CHANGE
		deleteGroup(groupUid)
		toast({
			title: '❌ Group deleted!',
			description: groupName,
			duration: 5000,
		})
	}

	const isGroupAbleToRun = (group: UserGroupType) => {
		const { strategyUid, wallets } = group
		return strategyUid && wallets.length > 0
	}

	const workspaces = useActionHistory((state) => state.workspaces)

	const getWorkspaceByUid = (groupUid: string) =>
		workspaces.find((w) => w.uid === groupUid)?.status ||
		WorkspaceStatusType.IDLE

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
											<div className="flex gap-2 items-center">
												{group.name}{' '}
												<span
													className={`${statusColor(
														getWorkspaceByUid(group.uid),
													)} rounded-full h-3 w-3 block`}
												/>
											</div>
											{group.wallets.map((wallet) => (
												<p key={wallet + '-' + group.uid}>
													{padWallet(privateKeyToAccount(wallet).address)}
												</p>
											))}
										</div>
										<div className="flex justify-between gap-4 w-full">
											<Button
												variant="outline"
												className="flex w-full sm:w-fit"
												onClick={() => handleDeleteGroup(group.uid, group.name)}
											>
												<Trash size={18} />
											</Button>
											<Button
												variant="outline"
												className="flex w-full sm:w-fit"
												disabled={!isGroupAbleToRun(group)}
												onClick={() => router.push(`workspace/${group.uid}`)}
											>
												<Play size={18} />
											</Button>
											<Button
												variant="outline"
												className="flex w-full sm:w-fit"
												onClick={() => setSelectedGroup(group.uid)}
											>
												<Pencil size={16} />
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
