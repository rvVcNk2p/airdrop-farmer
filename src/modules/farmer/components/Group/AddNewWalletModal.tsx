'use client'

import { isValidPrivateKey } from '@/modules/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserWallets } from '@modules/farmer/stores'
import { FormFieldWrapper } from '@modules/shared/components/Form'
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
import { Form } from '@modules/shared/components/ui/form'
import { Input } from '@modules/shared/components/ui/input'
import { ScrollArea } from '@modules/shared/components/ui/scroll-area'
import { toast } from '@modules/shared/hooks/useToast'
import { Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Address } from 'viem'
import * as z from 'zod'

const AddNewWallet = ({ addNewWallet }: { addNewWallet: () => void }) => {
	return (
		<div className="w-full flex justify-end">
			<Button
				variant="outline"
				className="flex sm:w-fit"
				onClick={addNewWallet}
			>
				<Plus className="mr-2" />
				Add new wallet
			</Button>
		</div>
	)
}

export const AddNewWalletModal = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const addNewWallet = useUserWallets((state) => state.addNewWallet)
	const isPrivateKeyUnique = useUserWallets((state) => state.isPrivateKeyUnique)

	const cancel = () => {
		form.reset()
		setIsOpen(false)
	}

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
					return isPrivateKeyUnique(appendableWallet)
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
			name: '',
			description: '',
			privateKey: '',
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		addNewWallet({
			name: values.name,
			privateKey: ('0x' + values.privateKey) as Address,
			description: values.description,
		})
		toast({
			title: '✅ New wallet created!',
			description: values.name,
			duration: 5000,
		})
		cancel()
	}

	return (
		<AlertDialog open={isOpen}>
			<AlertDialogTrigger asChild={true} onClick={() => setIsOpen(true)}>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="mb-6">Add new wallet</AlertDialogTitle>
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
					<AlertDialogCancel onClick={cancel}>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild={true}>
						<AddNewWallet addNewWallet={form.handleSubmit(onSubmit)} />
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
