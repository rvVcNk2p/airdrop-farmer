'use client'

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
import { Label } from '@modules/shared/components/ui/label'
import { toast } from '@modules/shared/hooks/useToast'
import { Plus } from '@phosphor-icons/react'
import { useState } from 'react'

interface AddNewAddressModalProps {
	children: React.ReactNode
}

const initialGroupDetails = {
	name: '',
	strategyUid: undefined,
	wallets: [],
}

const AddGroup = ({ addNewGroup }: { addNewGroup: () => void }) => {
	return (
		<div className="w-full flex justify-end">
			<Button variant="outline" className="flex sm:w-fit" onClick={addNewGroup}>
				<Plus className="mr-2" />
				Add new group
			</Button>
		</div>
	)
}

export const AddNewGroupModal = ({ children }: AddNewAddressModalProps) => {
	const [isOpen, setIsOpen] = useState(false)
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
		if (groupDetails.name.length === 0) return
		createNewGroup(groupDetails)
		toast({
			title: '✅ New group created!',
			description: groupDetails.name,
			duration: 5000,
		})
		resetGroupDetails()
		setIsOpen(false)
	}

	const cancel = () => {
		resetGroupDetails()
		setIsOpen(false)
	}

	return (
		<AlertDialog open={isOpen}>
			<AlertDialogTrigger asChild={true} onClick={() => setIsOpen(true)}>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="mb-6">Create Group</AlertDialogTitle>
					<AlertDialogDescription asChild={true}>
						<div className="grid grid-cols-1 gap-2">
							<Label>Name</Label>
							<Input
								name="name"
								placeholder="Start typing..."
								onChange={(e) => handleSetGroupDetails(e)}
							/>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="mt-6">
					<AlertDialogCancel onClick={cancel}>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild={true}>
						<AddGroup addNewGroup={handleCreateNewGroup} />
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
