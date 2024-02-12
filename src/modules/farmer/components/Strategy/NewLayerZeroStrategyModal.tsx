// TODO: Create a main HandlerModal for all strategies
import { zodResolver } from '@hookform/resolvers/zod'
import { NewStrategyStepOne } from '@/modules/farmer/components/Strategy/layer-zero/NewStrategyStepOne'
import { NewStrategyStepThree } from '@/modules/farmer/components/Strategy/layer-zero/NewStrategyStepThree'
import { useUserStrategies } from '@modules/farmer/stores'
import {
	AirdropTypes,
	LayerZeroBridges,
	LayerZeroNetworks,
	SignTransactionType,
} from '@modules/farmer/types'
import type { LayerZeroMainnetType } from '@modules/farmer/types'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger,
} from '@modules/shared/components/ui/alert-dialog'
import { Button } from '@modules/shared/components/ui/button'
import { toast } from '@modules/shared/hooks/useToast'
import { Plus } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
		<div className="flex w-full justify-end gap-2">
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
		txsGoal: z.coerce.number().min(1),
		// maxGasPerTxs: z.coerce.number().min(1),
		airdropType: z.union([
			z.literal(AirdropTypes.LAYER_ZERO),
			z.literal(AirdropTypes.STARK_NET),
			z.literal(AirdropTypes.ZK_SYNC),
			z.literal(AirdropTypes.BASE),
			z.literal(AirdropTypes.SCROLL),
			z.literal(AirdropTypes.LINEA),
		]),
		signTransactionType: z.union([
			z.literal(SignTransactionType.MANUAL),
			z.literal(SignTransactionType.PRIVATE_KEY),
		]),
		bridges: z
			.array(z.enum([LayerZeroBridges.STARGATE, LayerZeroBridges.WOOFI]))
			.refine((value) => value.some((item) => item), {
				message: 'You have to select at least one item.',
			}),
		networks: z
			.array(
				z.enum([
					LayerZeroNetworks.APTOS,
					LayerZeroNetworks.ARBITRUM,
					LayerZeroNetworks.AVALANCHE,
					LayerZeroNetworks.BSC,
					LayerZeroNetworks.ETHEREUM,
					LayerZeroNetworks.FANTOM,
					LayerZeroNetworks.METIS,
					LayerZeroNetworks.OPTIMISM,
					LayerZeroNetworks.POLYGON,
				]),
			)
			.refine((value) => value.length >= 2, {
				message: 'You have to select at least two item.',
			}),
		wallets: z
			.array(
				z.object({
					label: z.string(), // wallet.name
					value: z.string(), // wallet.uid
				}),
			)
			.min(1, {
				message: 'You have to select at least one wallet.',
			}),
	}),
})

export const NewLayerZeroStrategyModal = ({
	children,
}: NewStrategyModalProps) => {
	const [activeStep, setActiveStep] = useState(1)
	const [isOpen, setIsOpen] = useState(false)

	const getSelectedStrategy = useUserStrategies(
		(state) => state.getSelectedStrategy,
	)
	const setSelectedStrategy = useUserStrategies(
		(state) => state.setSelectedStrategy,
	)

	const createNewStrategy = useUserStrategies(
		(state) => state.createNewStrategy,
	)
	const updateStrategy = useUserStrategies((state) => state.updateStrategy)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstStepFileds: {
				name: '',
				txsGoal: 1,
				airdropType: AirdropTypes.LAYER_ZERO,
				signTransactionType: SignTransactionType.PRIVATE_KEY,
				bridges: [LayerZeroBridges.STARGATE],
				networks: [],
				wallets: [],
			},
		},
	})

	const { setValue } = form

	const selectedStrategy = getSelectedStrategy()

	useEffect(() => {
		if (selectedStrategy) {
			const { txsGoal, mainnet } = selectedStrategy
			const { bridges, networks } = mainnet as LayerZeroMainnetType
			setValue('firstStepFileds.name', selectedStrategy.name)
			setValue('firstStepFileds.txsGoal', txsGoal)
			setValue('firstStepFileds.airdropType', selectedStrategy.airdropType)
			setValue(
				'firstStepFileds.signTransactionType',
				selectedStrategy.signTransactionType,
			)
			setValue('firstStepFileds.bridges', bridges)
			setValue('firstStepFileds.networks', networks)
			setValue('firstStepFileds.wallets', selectedStrategy.wallets)
		}
	}, [isOpen, selectedStrategy, setValue])

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		// ✅ This will be type-safe and validated.
		setActiveStep(activeStep + 1)
	}

	const handleAddNewStrategy = () => {
		const { firstStepFileds } = form.getValues()
		const {
			name,
			txsGoal,
			airdropType,
			signTransactionType,
			networks,
			bridges,
			wallets,
		} = firstStepFileds

		if (selectedStrategy) {
			updateStrategy({
				uid: selectedStrategy.uid,
				name,
				txsGoal,
				airdropType,
				mainnet: { networks, bridges },
				testnet: null,
				farmingTestnet: false,
				signTransactionType,
				wallets,
			})

			toast({
				title: '✅ Strategy updated!',
				description: name,
				duration: 5000,
			})
		} else {
			createNewStrategy({
				name,
				txsGoal,
				airdropType,
				mainnet: { networks, bridges },
				testnet: null,
				farmingTestnet: false,
				signTransactionType,
				wallets,
			})

			toast({
				title: '✅ New strategy created!',
				description: name,
				duration: 5000,
			})
		}

		closeModal()
	}

	const closeModal = () => {
		setIsOpen(false)
		setSelectedStrategy(undefined)
		form.reset()
		setActiveStep(1)
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild={false}>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div>LayerZero</div>
					{activeStep === 1 && <NewStrategyStepOne form={form} />}
					{activeStep === 2 && (
						<NewStrategyStepThree
							selectedNetworks={form.watch('firstStepFileds.networks')}
						/>
					)}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
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
									onClick={handleAddNewStrategy}
								>
									<Plus className="mr-2" />
									{selectedStrategy ? 'Update strategy' : 'Add new strategy'}
								</Button>
							</Stepper>
						</>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
