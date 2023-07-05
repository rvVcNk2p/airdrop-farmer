'use client'

import { Label } from '@/modules/shared/components/ui/label'
import { useUserGroups } from '@modules/farmer/stores'
import type { UserGroupType } from '@modules/farmer/types'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@modules/shared/components/ui/alert-dialog'
import { Button } from '@modules/shared/components/ui/button'
import { Input } from '@modules/shared/components/ui/input'
import { useToast } from '@modules/shared/hooks'
import { DownloadSimple, Trash } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

interface EditGroupModal {
	selectedGroup: string | null
	close: () => void
}

export const EditGroupModal = ({ selectedGroup, close }: EditGroupModal) => {
	const { toast } = useToast()
	const getGroupByUid = useUserGroups((state) => state.getGroupByUid)
	const addWalletToGroup = useUserGroups((state) => state.addWalletToGroup)
	const deleteGroup = useUserGroups((state) => state.deleteGroup)
	const removeWalletFromGroup = useUserGroups(
		(state) => state.removeWalletFromGroup,
	)

	const [groupDetails, setGroupDetails] = useState<UserGroupType>({
		uid: '',
		name: '',
		description: '',
		strategyUid: null,
		wallets: [],
	})

	useEffect(() => {
		if (selectedGroup === null) return
		const group = getGroupByUid(selectedGroup)

		if (group === undefined) return
		setGroupDetails(group)
	}, [selectedGroup, getGroupByUid])

	const handleSetGroupDetails = (event: React.FormEvent<HTMLInputElement>) => {
		setGroupDetails({
			...groupDetails,
			[event.currentTarget.name]: event.currentTarget.value,
		})
	}

	const handleCreateNewGroup = () => {
		createNewGroup(groupDetails)
		toast({
			title: '✅ New group created!',
			description: groupDetails.name,
			duration: 5000,
		})
		resetGroupDetails()
	}

	const handleDeleteGroup = () => {
		// TODO: Add confirmation
		deleteGroup(groupDetails.uid)
		toast({
			title: '❌ Group deleted!',
			description: groupDetails.name,
			duration: 5000,
		})
		close()
	}

	const isOpen = selectedGroup !== null

	return (
		<AlertDialog open={isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="mb-6">Edit Group</AlertDialogTitle>
					<AlertDialogDescription asChild={true}>
						<div className="grid grid-cols-1 gap-2">
							<Label>Name</Label>
							<Input
								name="name"
								placeholder="Group - A"
								onChange={(e) => handleSetGroupDetails(e)}
							/>
							<div>{JSON.stringify(groupDetails, null, 2)}</div>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={close}>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild={true}>
						<Button
							className="flex w-full sm:w-fit"
							disabled={false}
							onClick={handleCreateNewGroup}
						>
							<DownloadSimple className="mr-2" />
							Save
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
