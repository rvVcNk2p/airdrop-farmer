import { zodResolver } from '@hookform/resolvers/zod'
import { NewStrategyStepOne } from '@modules/farmer/components/Strategy/zksync'
import { useUserStrategies } from '@modules/farmer/stores'
import {
	AirdropTypes,
	SignTransactionType,
	ZksyncBridges,
	ZkSyncMainnetType,
	TypedUserStrategyType,
	ZksyncSwapActionProviders,
	ZksyncLendingActionProviders,
	ZksyncLiquidityActionProviders,
	// ZksyncMintActionProviders,
} from '@modules/farmer/types'
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
import { toast } from '@modules/shared/hooks/useToast'
import { Plus } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
	fromToErrorObject,
	fromToValidator,
	minMaxErrorObject,
	minMaxValidator,
} from '@modules/shared/utils/validators'
import { Label } from '@modules/shared/components/ui/label'
import { ScrollArea } from '@/modules/shared/components/ui/scroll-area'

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
		airdropType: z.literal(AirdropTypes.ZK_SYNC),
		signTransactionType: z.union([
			z.literal(SignTransactionType.MANUAL),
			z.literal(SignTransactionType.PRIVATE_KEY),
		]),
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
		timeIntervals: z.object({
			timeIntervalAfterTransactions: z
				.object({
					from: z.coerce.number().min(1),
					to: z.coerce.number().min(1),
				})
				.refine(fromToValidator, fromToErrorObject),
			sleepIntervalAfterApproval: z
				.object({
					from: z.coerce.number().min(1),
					to: z.coerce.number().min(1),
				})
				.refine(fromToValidator, fromToErrorObject),
		}),
		mainnet: z.object({
			bridge: z.object({
				isSkip: z.boolean(),
				type: z.enum([ZksyncBridges.ZKSYNC, ZksyncBridges.ORBITER], {
					required_error: 'You need to select a bridge type.',
				}),
				maxGasPerBridging: z.coerce.number().min(1),
				bridgeFullbalance: z.boolean(),
				usdcToBridgeInPercentage: z
					.object({
						min: z.coerce.number().min(1).max(100),
						max: z.coerce.number().min(1).max(100),
					})
					.refine(minMaxValidator, minMaxErrorObject),
				ethToBridgeInPercentage: z
					.object({
						min: z.coerce.number().min(1).max(100),
						max: z.coerce.number().min(1).max(100),
					})
					.refine(minMaxValidator, minMaxErrorObject),
			}),
			actions: z.object({
				swap: z.object({
					providers: z.array(
						z.enum([
							ZksyncSwapActionProviders.MUTE_SWAP,
							ZksyncSwapActionProviders.SPACEFI_SWAP,
							ZksyncSwapActionProviders.SYNCSWAP_SWAP,
							ZksyncSwapActionProviders.VELOCORE_SWAP,
						]),
					),
					maxGasFee: z.coerce.number().min(1),
					slippage: z.coerce.number().min(0.5),
					minMaxUsdcInPercentage: z
						.object({
							min: z.coerce.number().min(1).max(100),
							max: z.coerce.number().min(1).max(100),
						})
						.refine(minMaxValidator, minMaxErrorObject),
				}),
				lending: z.object({
					providers: z.array(
						z.enum([
							ZksyncLendingActionProviders.ERALEND_LENDING,
							ZksyncLendingActionProviders.REACTORFUSION_LENDING,
						]),
					),
					maxGasFee: z.coerce.number().min(1),
					maxTimes: z.coerce.number().min(1),
					minMaxUsdcInPercentage: z
						.object({
							min: z.coerce.number().min(1).max(100),
							max: z.coerce.number().min(1).max(100),
						})
						.refine(minMaxValidator, minMaxErrorObject),
					timeIntervalToremoveAfterProvided: z
						.object({
							from: z.coerce.number().min(1),
							to: z.coerce.number().min(1),
						})
						.refine(fromToValidator, fromToErrorObject),
				}),
				liquidity: z.object({
					providers: z.array(
						z.enum([
							ZksyncLiquidityActionProviders.MUTE_LIQUIDITY,
							ZksyncLiquidityActionProviders.SPACEFI_LIQUIDITY,
							ZksyncLiquidityActionProviders.SYNCSWAP_LIQUIDITY,
							ZksyncLiquidityActionProviders.VELOCORE_LIQUIDITY,
						]),
					),
					maxGasFee: z.coerce.number().min(1),
					maxTimes: z.coerce.number().min(1),
					minMaxUsdcInPercentage: z
						.object({
							min: z.coerce.number().min(1).max(100),
							max: z.coerce.number().min(1).max(100),
						})
						.refine(minMaxValidator, minMaxErrorObject),
					slippage: z.coerce.number().min(0.5),
					timeIntervalToremoveAfterProvided: z
						.object({
							from: z.coerce.number().min(1),
							to: z.coerce.number().min(1),
						})
						.refine(fromToValidator, fromToErrorObject),
				}),
				// mint: z.object({
				// 	providers: z.array(z.enum([ZksyncMintProviders.ZKNS_DOMAINS])),
				// 	maxGasFee: z.coerce.number().min(1),
				// 	maxTimes: z.coerce.number().min(1),
				// }),
				wrapping: z.object({}),
			}),
		}),
	}),
})

export const NewZksynStrategyModal = ({ children }: NewStrategyModalProps) => {
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
				airdropType: AirdropTypes.ZK_SYNC,
				signTransactionType: SignTransactionType.PRIVATE_KEY,
				wallets: [],
				mainnet: {
					bridge: {
						isSkip: false,
						type: ZksyncBridges.ORBITER,
						maxGasPerBridging: 1,
						bridgeFullbalance: false,
						usdcToBridgeInPercentage: {
							min: 75,
							max: 100,
						},
						ethToBridgeInPercentage: {
							min: 70,
							max: 95,
						},
					},
					actions: {
						swap: {
							providers: [],
							maxGasFee: 2,
							minMaxUsdcInPercentage: { min: 45, max: 50 },
							slippage: 0.5,
						},
						lending: {
							providers: [],
							maxGasFee: 2,
							maxTimes: 1,
							timeIntervalToremoveAfterProvided: {
								from: 14,
								to: 86,
							},
							minMaxUsdcInPercentage: {
								min: 70,
								max: 90,
							},
						},
						liquidity: {
							providers: [],
							maxGasFee: 2,
							maxTimes: 1,
							timeIntervalToremoveAfterProvided: {
								from: 15,
								to: 73,
							},
							minMaxUsdcInPercentage: {
								min: 30,
								max: 50,
							},
							slippage: 0.5,
						},
						// mint: {
						// 	providers: [],
						// 	maxGasFee: 1,
						// 	maxTimes: 0,
						// },
						wrapping: {},
					},
				},
				timeIntervals: {
					timeIntervalAfterTransactions: {
						from: 3,
						to: 17,
					},
					sleepIntervalAfterApproval: {
						from: 1,
						to: 9,
					},
				},
			},
		},
	})

	const { setValue } = form

	const selectedStrategy = getSelectedStrategy()

	useEffect(() => {
		if (selectedStrategy) {
			// Initialize form with selected strategy values
			const {
				txsGoal,
				mainnet,
				wallets,
				signTransactionType,
				timeIntervals,
				name,
			} = selectedStrategy
			const { bridge, actions } = mainnet as ZkSyncMainnetType
			setValue('firstStepFileds.name', name)
			setValue('firstStepFileds.txsGoal', txsGoal)
			setValue('firstStepFileds.signTransactionType', signTransactionType)
			setValue('firstStepFileds.mainnet.bridge', bridge)
			setValue('firstStepFileds.mainnet.actions', actions)
			setValue('firstStepFileds.wallets', wallets)
			setValue('firstStepFileds.timeIntervals', timeIntervals)
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
			timeIntervals,
			mainnet,
			wallets,
		} = firstStepFileds as unknown as TypedUserStrategyType<ZkSyncMainnetType>

		if (selectedStrategy) {
			updateStrategy({
				uid: selectedStrategy.uid,
				name,
				txsGoal,
				airdropType,
				signTransactionType,
				timeIntervals,
				mainnet,
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
				signTransactionType,
				timeIntervals,
				mainnet,
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
					{activeStep === 1 && (
						<>
							<NewStrategyStepOne form={form} />
						</>
					)}
					{activeStep === 2 && (
						<>
							<AlertDialogTitle className="mb-6 flex justify-center text-3xl">
								Important
							</AlertDialogTitle>
							<AlertDialogDescription asChild={true}>
								<ScrollArea className="h-[400px] w-full">
									<div>
										<div className="flex flex-col gap-4">
											<Label>
												Make sure you met all the criteria from the list below:
											</Label>
											<Label>
												1. You followed
												<a
													href="https://discord.gg/wJTeNp8Ect"
													target="_blank"
													className="text-valid"
												>
													{' '}
													security{' '}
												</a>
												rules to reduce the risk of becoming a Sybil
											</Label>
											<Label className="leading-[20px]">
												{`2. Make sure you have minimum $15 worh of ETH in your ${
													form.getValues().firstStepFileds.mainnet.bridge.isSkip
														? 'zkSync'
														: 'Ethereum, Arbitrum or Optimism'
												} wallet!`}
											</Label>
											<Label>
												{`${
													!form.getValues().firstStepFileds.mainnet.bridge
														.isSkip
														? '3. Orbiter bridge will cost approximately $5 worh of ETH.'
														: ''
												}`}
											</Label>
										</div>
									</div>
								</ScrollArea>
							</AlertDialogDescription>
						</>
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
