import {
	LayerZeroBridges,
	LayerZeroNetworks,
	SignTransactionType,
} from '@modules/farmer/types/userStrategy'
import {
	FormFieldCheckboxWrapper,
	FormFieldInputWrapper,
	FormFieldSelectWrapper,
	FormMultipleWalletSelect,
} from '@modules/shared/components/Form'
import {
	AlertDialogDescription,
	AlertDialogTitle,
} from '@modules/shared/components/ui/alert-dialog'
import { Form } from '@modules/shared/components/ui/form'
import { ScrollArea } from '@modules/shared/components/ui/scroll-area'
import { enumToArrayObject } from '@modules/shared/utils'
import { TimeIntervalsSection } from '../_shared/TimeIntervalsSection'

interface NewStrategyStepOneProps {
	form: any
}

const choosableNetworks = enumToArrayObject(LayerZeroNetworks, [
	'APTOS',
	'METIS',
	'AVALANCHE',
])
const choosableBridges = enumToArrayObject(LayerZeroBridges, [
	'STARGATE',
	'WOOFI',
])
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
	return (
		<>
			<AlertDialogTitle className="mb-6">Create Straregy</AlertDialogTitle>
			<AlertDialogDescription asChild={true}>
				<ScrollArea className="h-[400px] w-full">
					<Form {...form}>
						<div className="flex flex-col gap-6 px-2">
							<FormFieldInputWrapper
								label="Strategy name:"
								name="firstStepFileds.name"
								form={form}
							/>
							<FormFieldInputWrapper
								label="Tsx number per wallet:"
								name="firstStepFileds.txsGoal"
								type="number"
								form={form}
							/>
							<TimeIntervalsSection form={form} />
							<FormFieldCheckboxWrapper
								name="firstStepFileds.networks"
								label="Choose networks:"
								form={form}
								options={choosableNetworks}
							/>
							<FormFieldCheckboxWrapper
								name="firstStepFileds.bridges"
								label="Choose bridges:"
								form={form}
								options={choosableBridges}
							/>
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
