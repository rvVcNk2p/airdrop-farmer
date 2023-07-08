import {
	LayerZeroBridges,
	LayerZeroNetworks,
} from '@modules/farmer/types/userStrategy'
import {
	FormFieldCheckboxWrapper,
	FormFieldWrapper,
} from '@modules/shared/components/Form'
import { Form } from '@modules/shared/components/ui/form'
import { Input } from '@modules/shared/components/ui/input'
import { enumToArrayObject } from '@modules/shared/utils'

interface NewStrategyStepOneProps {
	// TODO: Define type
	form: any
}

const choosableNetworks = enumToArrayObject(LayerZeroNetworks, [
	'APTOS',
	'METIS',
	'FANTOM',
	'ZKERA',
])
const choosableBridges = enumToArrayObject(LayerZeroBridges, ['STARGATE'])

export const NewStrategyStepOne = ({ form }: NewStrategyStepOneProps) => {
	return (
		<div>
			<Form {...form}>
				<div className="flex flex-col gap-4 px-2">
					<FormFieldWrapper
						label="Strategy name:"
						name="firstStepFileds.name"
						form={form}
					>
						{({ field, error }) => (
							<Input
								placeholder="zkSync Farming - 1"
								className={error && '!border-invalid'}
								{...field}
							/>
						)}
					</FormFieldWrapper>

					<FormFieldWrapper
						label="Tsx number per wallet:"
						name="firstStepFileds.txsNumberPerWallet"
						form={form}
					>
						{({ field, error }) => (
							<Input
								type="number"
								className={error && '!border-invalid'}
								{...field}
							/>
						)}
					</FormFieldWrapper>

					<FormFieldWrapper
						label={`Max gas per txs in ${2} chains:`}
						name="firstStepFileds.maxGasPerTxs"
						form={form}
					>
						{({ field, error }) => (
							<Input
								type="number"
								className={error && '!border-invalid'}
								{...field}
							/>
						)}
					</FormFieldWrapper>

					<FormFieldCheckboxWrapper
						name="firstStepFileds.networks"
						label="Choose networks:"
						form={form}
						items={choosableNetworks}
					/>

					<FormFieldCheckboxWrapper
						name="firstStepFileds.bridges"
						label="Choose bridges:"
						form={form}
						items={choosableBridges}
					/>

					{/* <FormFieldWrapper
						label={`Max gas per txs in ${2} chains:`}
						name="firstStepFileds.maxGasPerTxs"
						form={form}
					>
						<FormFieldWrapper></FormFieldWrapper>
						{({ field }) => (
							<Checkbox
								checked={field.value?.includes(item.id)}
								onCheckedChange={(checked) => {
									return checked
										? field.onChange([...field.value, item.id])
										: field.onChange(
												field.value?.filter((value) => value !== item.id),
										  )
								}}
							/>
						)}
					</FormFieldWrapper> */}
				</div>
			</Form>
		</div>
	)
}
