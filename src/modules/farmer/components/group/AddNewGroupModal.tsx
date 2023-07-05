'use client'

import { Label } from '@/modules/shared/components/ui/label'
import { useUserGroups } from '@modules/farmer/stores'
import type { RawUserGroupType } from '@modules/farmer/types'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@modules/shared/components/ui/alert-dialog'
import { Button } from '@modules/shared/components/ui/button'
import { Input } from '@modules/shared/components/ui/input'
import { useToast } from '@modules/shared/hooks'
import { Plus } from '@phosphor-icons/react'
import { useState } from 'react'

interface AddNewAddressModalProps {
	children: React.ReactNode
}

const initialGroupDetails = {
	name: '',
	strategyUid: null,
	wallets: [],
}

export const AddNewGroupModal = ({ children }: AddNewAddressModalProps) => {
	const { toast } = useToast()

	const [groupDetails, setGroupDetails] = useState<RawUserGroupType>({
		...initialGroupDetails,
	})

	const handleSetGroupDetails = (event: React.FormEvent<HTMLInputElement>) => {
		setGroupDetails({
			...groupDetails,
			[event.currentTarget.name]: event.currentTarget.value,
		})
	}
	const resetGroupDetails = () => setGroupDetails(initialGroupDetails)

	const createNewGroup = useUserGroups((state) => state.createNewGroup)

	const handleCreateNewGroup = () => {
		createNewGroup(groupDetails)
		toast({
			title: '✅ New group created!',
			description: groupDetails.name,
			duration: 5000,
		})
		resetGroupDetails()
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild={true}>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="mb-6">Create New Group</AlertDialogTitle>
					<AlertDialogDescription asChild={true}>
						<div className="grid grid-cols-1 gap-2">
							<Label>Name</Label>
							<Input
								name="name"
								placeholder="Group - A"
								onChange={(e) => handleSetGroupDetails(e)}
							/>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={resetGroupDetails}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction asChild={true}>
						<Button
							variant="outline"
							className="flex w-full sm:w-fit"
							onClick={handleCreateNewGroup}
						>
							<Plus className="mr-2" />
							Add new group
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
