import { SignTransactionType } from '@modules/farmer/types/userStrategy'
import {
	FormFieldSelectWrapper,
	FormMultipleWalletSelect,
	FormFieldInputWrapper,
} from '@modules/shared/components/Form'
import {
	AlertDialogDescription,
	AlertDialogTitle,
} from '@modules/shared/components/ui/alert-dialog'
import { Form } from '@modules/shared/components/ui/form'
import { ScrollArea } from '@modules/shared/components/ui/scroll-area'
import {} from '@modules/farmer/components/Strategy/zksync'
import {
	ScrollLendingSection,
	ScrollLiquiditySection,
	ScrollBridgeSection,
	ScrollActivitySelectSection,
	ScrollSwapSection,
} from '@modules/farmer/components/Strategy/scroll'
import { TimeIntervalsSection } from '@modules/farmer/components/Strategy/_shared/TimeIntervalsSection'

interface NewStrategyStepOneProps {
	form: any
}

const signTransactionOptions = [
	{
		id: SignTransactionType.PRIVATE_KEY,
		label: 'Private key',
	},
	{
		id: SignTransactionType.MANUAL,
		label: 'Manual',
	},
]

export const NewStrategyStepOne = ({ form }: NewStrategyStepOneProps) => {
	const {
		firstStepFileds: {
			mainnet: {
				actions: {
					swap: { providers: swapProviders },
					liquidity: { providers: liquidityProviders },
					lending: { providers: lendingProviders },
				},
			},
		},
	} = form.getValues()

	const hasSwapProviders = swapProviders.length > 0
	const hasLiquidityProviders = liquidityProviders.length > 0
	const hasLendingProviders = lendingProviders.length > 0

	return (
		<>
			<AlertDialogTitle className="mb-6">Create Strategy</AlertDialogTitle>
			<AlertDialogDescription asChild={true}>
				<ScrollArea className="h-[400px] w-full">
					<Form {...form}>
						<div className="flex flex-col gap-4 pr-2">
							<FormFieldInputWrapper
								label="Strategy name:"
								name="firstStepFileds.name"
								form={form}
							/>
							<FormFieldInputWrapper
								label="Tsx number per wallet:"
								name="firstStepFileds.txsGoal"
								type="number"
								placeholder="0"
								min={0}
								form={form}
							/>
							<hr className="my-2" />
							<ScrollBridgeSection form={form} />
							<hr className="my-2" />
							<ScrollActivitySelectSection form={form} />
							<hr className="my-2" />
							<TimeIntervalsSection form={form} />
							<hr className="my-2" />
							{hasSwapProviders && (
								<>
									<ScrollSwapSection form={form} />
									<hr className="my-2" />
								</>
							)}
							{hasLiquidityProviders && (
								<>
									<ScrollLiquiditySection form={form} />
									<hr className="my-2" />
								</>
							)}
							{hasLendingProviders && (
								<>
									<ScrollLendingSection form={form} />
									<hr className="my-2" />
								</>
							)}
							{/*
							 	<ZksyncMintSection form={form} /> 
								<hr className="my-2" /> 
							*/}
							<FormMultipleWalletSelect
								name="firstStepFileds.wallets"
								form={form}
							/>
							<FormFieldSelectWrapper
								label="Sign transacition type:"
								name="firstStepFileds.signTransactionType"
								form={form}
								options={signTransactionOptions}
								disabled
							/>
						</div>
					</Form>
				</ScrollArea>
			</AlertDialogDescription>
		</>
	)
}
