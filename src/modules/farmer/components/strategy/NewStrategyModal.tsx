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

import { AirdropTypes, SignTransactionType } from '../../types/userStrategy'
import { NewStrategyStepOne } from './NewStrategySteps/NewStrategyStepOne'
import { NewStrategyStepThree } from './NewStrategySteps/NewStrategyStepThree'

interface NewStrategyModalProps {
	children: React.ReactNode
}

interface StepperProps {
	activeStep: number
	minStep: number
	maxSteps: number
	children: React.ReactNode
	updateActiveStep: (nextStep: number) => void
	nextValidate: () => void
}

const Stepper = ({
	activeStep,
	minStep,
	maxSteps,
	children,
	updateActiveStep,
	nextValidate,
}: StepperProps) => {
	const setBack = () => {
		const nextStep = activeStep - 1 <= 0 ? minStep : activeStep - 1
		updateActiveStep(nextStep)
	}
	const setNext = async () => {
		nextValidate()
		// const nextStep = activeStep + 1 >= maxSteps ? maxSteps : activeStep + 1
		// updateActiveStep(nextStep)
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
			z.literal(AirdropTypes.LAYER_ZERO),
			z.literal(AirdropTypes.STARK_NET),
			z.literal(AirdropTypes.ZK_SYNC),
		]),
		signTransactionType: z.union([
			z.literal(SignTransactionType.MANUAL),
			z.literal(SignTransactionType.PRIVATE_KEY),
		]),
		bridges: z.array(z.string()).refine((value) => value.some((item) => item), {
			message: 'You have to select at least one item.',
		}),
		networks: z
			.array(z.string())
			.refine((value) => value.some((item) => item), {
				message: 'You have to select at least one item.',
			}),
		// randomActions: z.boolean(),
		// farmingTestnets: z.boolean(),
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
				airdropType: AirdropTypes.LAYER_ZERO,
				signTransactionType: SignTransactionType.PRIVATE_KEY,
				bridges: ['STARGATE'],
				networks: [],
				// randomActions: false,
				// farmingTestnets: false,
			},
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		// ✅ This will be type-safe and validated.
		setActiveStep(activeStep + 1)
		console.log('====', values)
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild={true}>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					{activeStep === 1 && <NewStrategyStepOne form={form} />}
					{activeStep === 2 && (
						<NewStrategyStepThree
							selectedNetworks={form.watch('firstStepFileds.networks')}
						/>
					)}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => form.reset()}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction asChild={true}>
						<>
							<Stepper
								activeStep={activeStep}
								updateActiveStep={setActiveStep}
								nextValidate={form.handleSubmit(onSubmit)}
								minStep={1}
								maxSteps={2}
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
						</>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
