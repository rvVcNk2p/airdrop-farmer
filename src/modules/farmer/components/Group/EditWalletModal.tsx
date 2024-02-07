'use client'

import { useUserWallets } from '@modules/farmer/stores'
import type { WalletType } from '@modules/farmer/types'
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
import { Input } from '@modules/shared/components/ui/input'

import { toast } from '@modules/shared/hooks/useToast'
import { isValidPrivateKey } from '@utils'
import { Address } from 'viem/accounts'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormFieldWrapper } from '@modules/shared/components/Form'

import { Form } from '@modules/shared/components/ui/form'
import { ScrollArea } from '@modules/shared/components/ui/scroll-area'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/modules/shared/components/ui/button'
import { PlusIcon } from '@heroicons/react/24/outline'

interface EditWalletModal {
	selectedWallet: WalletType | null
	close: () => void
}

const UpdateWallet = ({ updateWallet }: { updateWallet: () => void }) => {
	return (
		<div className="flex w-full justify-end">
			<Button
				variant="outline"
				className="flex sm:w-fit"
				onClick={updateWallet}
			>
				<PlusIcon
					className="mr-2 h-6 w-6 shrink-0 stroke-2"
					aria-hidden="true"
				/>
				Update wallet
			</Button>
		</div>
	)
}

export const EditWalletModal = ({ selectedWallet, close }: EditWalletModal) => {
	const updateWallet = useUserWallets((state) => state.updateWallet)

	const isPrivateKeyUnique = useUserWallets((state) => state.isPrivateKeyUnique)
	const getWalletByUid = useUserWallets((state) => state.getWalletByUid)

	const formSchema = z.object({
		name: z.string().min(3, {
			message: 'Field must be at least 3 characters.',
		}),
		privateKey: z
			.string()
			.min(64, {
				message: 'Field must be exactly 64 characters.',
			})
			.max(64, {
				message: 'Field must be exactly 64 characters.',
			})
			.refine(
				(value) => {
					const appendableWallet: Address = ('0x' + value) as Address
					return isValidPrivateKey(appendableWallet)
				},
				{
					message: 'Field must be a valid private key.',
				},
			)
			.refine(
				(value) => {
					const appendableWallet: Address = ('0x' + value) as Address
					const wallet = getWalletByUid(selectedWallet?.uid ?? '')
					if (wallet?.privateKey === appendableWallet) return true
					else return isPrivateKeyUnique(appendableWallet)
				},
				{
					message: 'Wallet with this private key already exists.',
				},
			),
		description: z.string(),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: selectedWallet?.name,
			description: selectedWallet?.description ?? '',
			privateKey: selectedWallet?.privateKey.slice(2),
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		updateWallet({
			uid: selectedWallet?.uid ?? '',
			name: values.name,
			privateKey: ('0x' + values.privateKey) as Address,
			description: values.description,
		})
		toast({
			title: '✅ Wallet updated!',
			description: values.name,
			duration: 5000,
		})
		cancel()
	}

	const cancel = () => {
		form.reset()
		close()
	}

	const isOpen = selectedWallet !== null

	return (
		<AlertDialog open={isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="mb-6">Update wallet</AlertDialogTitle>
					<AlertDialogDescription asChild={true}>
						<ScrollArea className="h-[400px] w-full">
							<Form {...form}>
								<div className="flex flex-col gap-6 px-2">
									<FormFieldWrapper
										label="Wallet name:"
										name="name"
										form={form}
									>
										{({ field, error }) => (
											<Input
												placeholder="Start typing..."
												autoComplete="off"
												className={error && '!border-invalid'}
												{...field}
											/>
										)}
									</FormFieldWrapper>
									<FormFieldWrapper
										label="Private Key:"
										name="privateKey"
										form={form}
									>
										{({ field, error }) => (
											<Input
												placeholder="Start typing..."
												type="password"
												autoComplete="off"
												className={error && '!border-invalid'}
												{...field}
											/>
										)}
									</FormFieldWrapper>
									<FormFieldWrapper
										label="Description:"
										name="description"
										form={form}
									>
										{({ field, error }) => (
											<Input
												placeholder="Start typing..."
												autoComplete="off"
												className={error && '!border-invalid'}
												{...field}
											/>
										)}
									</FormFieldWrapper>
								</div>
							</Form>
						</ScrollArea>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="mt-6">
					<AlertDialogCancel onClick={close}>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild={true}>
						<UpdateWallet updateWallet={form.handleSubmit(onSubmit)} />
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
