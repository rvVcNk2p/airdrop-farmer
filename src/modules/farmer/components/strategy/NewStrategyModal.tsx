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
import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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

export interface NewStrategyFileds {
	firstStepFileds: {
		name: string
		airdropType: AirdropType
		txsNumberPerWallet: number | null
		networks: string[]
		bridges: string[]
		maxGasPerTxs: number | null
		randomActions: boolean
		signTransactionType: SignTransactionType
	}
}

export const NewStrategyModal = ({ children }: NewStrategyModalProps) => {
	const [activeStep, setActiveStep] = useState(1)

	const {
		register,
		// handleSubmit,
		watch,
		trigger,
		reset,
		formState: { errors },
	} = useForm<NewStrategyFileds>()
	// https://react-hook-form.com/docs/useform#mode

	// const onSubmit: SubmitHandler<NewStrategyFileds> = (data) => console.log(data)

	console.log(watch('firstStepFileds.txsNumberPerWallet'))

	const handleReset = () => {
		setActiveStep(1)
		reset()
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild={true}>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="mb-6">Create Straregy</AlertDialogTitle>
					<AlertDialogDescription asChild={true}>
						<ScrollArea className="h-[200px] w-full">
							{/* <form onSubmit={handleSubmit(onSubmit)}> */}
							{activeStep === 1 && (
								<NewStrategyStepOne
									register={register}
									trigger={trigger}
									errors={errors}
								/>
							)}
							{activeStep === 2 && <NewStrategyStepTwo />}
							{activeStep === 3 && <NewStrategyStepThree />}
							{/* </form> */}
						</ScrollArea>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleReset}>Cancel</AlertDialogCancel>
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
