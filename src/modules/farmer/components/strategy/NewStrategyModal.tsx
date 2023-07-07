import { zodResolver } from '@hookform/resolvers/zod'
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
import { ScrollArea } from '@modules/shared/components/ui/scroll-area'
import { Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { AirdropType, SignTransactionType } from '../../types/userStrategy'
import { NewStrategyStepOne } from './NewStrategySteps/NewStrategyStepOne'
import { NewStrategyStepThree } from './NewStrategySteps/NewStrategyStepThree'
import { NewStrategyStepTwo } from './NewStrategySteps/NewStrategyStepTwo'

interface NewStrategyModalProps {
	children: React.ReactNode
}

interface StepperProps {
	activeStep: number
	minStep: number
	maxSteps: number
	children: React.ReactNode
	updateActiveStep: (nextStep: number) => void
}

const Stepper = ({
	activeStep,
	minStep,
	maxSteps,
	children,
	updateActiveStep,
}: StepperProps) => {
	const setBack = () => {
		const nextStep = activeStep - 1 <= 0 ? minStep : activeStep - 1
		updateActiveStep(nextStep)
	}
	const setNext = () => {
		const nextStep = activeStep + 1 >= maxSteps ? maxSteps : activeStep + 1
		updateActiveStep(nextStep)
	}
	return (
		<div className="flex gap-2 w-full justify-end">
			{minStep !== activeStep && (
				<Button variant="outline" onClick={setBack}>
					Back
				</Button>
			)}
			{maxSteps === activeStep ? (
				<>{children}</>
			) : (
				<Button variant="outline" onClick={setNext}>
					Next
				</Button>
			)}
		</div>
	)
}

const formSchema = z.object({
	firstStepFileds: z.object({
		name: z.string().min(3, {
			message: 'Field must be at least 3 characters.',
		}),
		txsNumberPerWallet: z.coerce.number().min(1),
		maxGasPerTxs: z.coerce.number().min(1),
		airdropType: z.union([
			z.literal(AirdropType.LAYER_ZERO),
			z.literal(AirdropType.STARK_NET),
			z.literal(AirdropType.ZK_SYNC),
		]),
		signTransactionType: z.union([
			z.literal(SignTransactionType.MANUAL),
			z.literal(SignTransactionType.PRIVATE_KEY),
		]),
		randomActions: z.boolean(),
		bridges: z.string().array().nonempty(),
		networks: z.string().array().nonempty(),
	}),
})

export const NewStrategyModal = ({ children }: NewStrategyModalProps) => {
	const [activeStep, setActiveStep] = useState(1)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstStepFileds: {
				name: '',
				txsNumberPerWallet: 0,
				maxGasPerTxs: 0,
				airdropType: AirdropType.LAYER_ZERO,
				signTransactionType: SignTransactionType.PRIVATE_KEY,
				randomActions: false,
				bridges: ['STARGATE'],
				networks: ['BSC'],
			},
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		// ✅ This will be type-safe and validated.
		console.log('====', values)
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild={true}>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="mb-6">Create Straregy</AlertDialogTitle>
					<AlertDialogDescription asChild={true}>
						<ScrollArea className="h-[400px] w-full">
							{activeStep === 1 && <NewStrategyStepOne form={form} />}
							{activeStep === 2 && <NewStrategyStepTwo />}
							{activeStep === 3 && <NewStrategyStepThree />}
							<Button type="submit" onClick={form.handleSubmit(onSubmit)}>
								Submit
							</Button>
						</ScrollArea>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => form.reset()}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction asChild={true}>
						<Stepper
							activeStep={activeStep}
							updateActiveStep={setActiveStep}
							minStep={1}
							maxSteps={3}
						>
							<Button
								variant="outline"
								className="flex sm:w-fit"
								onClick={() => {}}
							>
								<Plus className="mr-2" />
								Add new strategy
							</Button>
						</Stepper>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
