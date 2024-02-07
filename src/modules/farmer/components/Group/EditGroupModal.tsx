'use client'

import { useGetPlan } from '@/modules/shared/hooks/useGetPlan'
import { useUserGroups } from '@modules/farmer/stores'
import { useUserStrategies } from '@modules/farmer/stores'
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
import { Label } from '@modules/shared/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@modules/shared/components/ui/select'
import { toast } from '@modules/shared/hooks/useToast'
import { useUpdateDatabase } from '@modules/shared/hooks/useUpdateDatabase'
import { DownloadSimple, Plus, Trash } from '@phosphor-icons/react'
import { isValidPrivateKey, padWallet } from '@utils'
import { useEffect, useState } from 'react'
import { Address, privateKeyToAccount } from 'viem/accounts'

interface EditGroupModal {
	selectedGroup: string | null
	close: () => void
}

export const EditGroupModal = ({ selectedGroup, close }: EditGroupModal) => {
	const userStrategies = useUserStrategies((state) => state.userStrategies)
	const getGroupByUid = useUserGroups((state) => state.getGroupByUid)
	const updateGroup = useUserGroups((state) => state.updateGroup)

	const [groupDetails, setGroupDetails] = useState<UserGroupType>({
		uid: '',
		name: '',
		description: '',
		strategyUid: undefined,
		wallets: [],
	})
	const [newWallet, setNewWallet] = useState<string>('')

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

	const handleAddWallet = () => {
		// TODO: Be more specific with the error message
		const appendableWallet: Address = ('0x' + newWallet) as Address

		if (groupDetails.wallets.includes(appendableWallet)) return

		if (!isValidPrivateKey(appendableWallet)) {
			console.error('Invalid private key. Please try again.')
			setNewWallet('')
			return
		}

		setGroupDetails({
			...groupDetails,
			wallets: [...groupDetails.wallets, appendableWallet],
		})
		setNewWallet('')
	}

	const handleRemoveWallet = (wallet: Address) => {
		if (!groupDetails.wallets.includes(wallet)) return

		setGroupDetails({
			...groupDetails,
			wallets: groupDetails.wallets.filter((w) => w !== wallet),
		})
	}

	const { updateBindedWallet } = useUpdateDatabase()
	const { bindedWallet } = useGetPlan()

	const handleUpdateGroup = () => {
		updateGroup(groupDetails)
		toast({
			title: '🚀 Group updated!',
			description: groupDetails.name,
			duration: 5000,
		})

		const wallet =
			groupDetails.wallets[0] &&
			privateKeyToAccount(groupDetails.wallets[0]).address

		if (bindedWallet === null && wallet) {
			updateBindedWallet(wallet)
			toast({
				title: `✅ ${wallet} successfully binded to your account!`,
				description:
					'During the free plan, you can only use THIS wallet to farm. No other wallet will be accepted.',
				duration: 10000,
			})
		} else if (wallet !== bindedWallet && wallet) {
			toast({
				title: `⚠️ You already have a binded a wallet.`,
				description: `Please, use the following address: ${bindedWallet}. No other wallet will be accepted.`,
				duration: 5000,
			})
		}

		close()
	}

	const isOpen = selectedGroup !== null

	return (
		<AlertDialog open={isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="mb-6">Edit Group</AlertDialogTitle>
					<AlertDialogDescription asChild={true}>
						<div className="grid grid-cols-1 gap-6 pb-10">
							<div className="flex gap-4">
								<div className="flex w-full flex-col gap-2">
									<Label>Name:</Label>
									<Input
										name="name"
										value={groupDetails.name}
										placeholder="Start typing..."
										onChange={(e) => handleSetGroupDetails(e)}
									/>
								</div>

								<div className="flex w-full flex-col gap-2">
									<Label>Select strategy:</Label>

									<Select
										value={groupDetails.strategyUid}
										onValueChange={(value: string) => {
											setGroupDetails({
												...groupDetails,
												strategyUid: value,
											})
										}}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Strategy" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{userStrategies.map((strategy) => (
													<SelectItem key={strategy.uid} value={strategy.uid}>
														{strategy.name}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<Label>Private keys:</Label>
								{groupDetails.wallets.length
									? groupDetails.wallets.map((wallet, idx) => (
											<div
												key={wallet}
												className="flex items-center justify-between"
											>
												<div>
													{idx + 1}
													{'. '}
													{padWallet(
														privateKeyToAccount(wallet).address,
														privateKeyToAccount(wallet).address.length,
													)}
												</div>
												<Button
													variant="outline"
													className="flex w-full sm:w-fit"
													onClick={() => handleRemoveWallet(wallet)}
												>
													<Trash size={18} />
												</Button>
											</div>
										))
									: 'No Private Keys added yet'}
							</div>

							<div className="flex flex-col gap-2">
								<Label>Add private key:</Label>
								<div className="flex gap-4">
									<Input
										type="password"
										name="wallet"
										value={newWallet}
										autoComplete="off"
										disabled={groupDetails.wallets.length >= 1}
										onChange={(e) => setNewWallet(e.currentTarget.value)}
									/>
									<Button
										variant="outline"
										disabled={newWallet.length < 3}
										onClick={handleAddWallet}
									>
										<Plus weight="bold" size={10} className="mr-1" />
										Add
									</Button>
								</div>
							</div>

							{/* <div>{JSON.stringify(groupDetails, null, 2)}</div> */}
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={close}>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild={true}>
						<Button
							className="flex w-full sm:w-fit"
							onClick={handleUpdateGroup}
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
