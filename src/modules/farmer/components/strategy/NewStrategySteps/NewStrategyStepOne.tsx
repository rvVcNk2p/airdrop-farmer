import {
	AirdropTypes,
	LayerZeroBridges,
	LayerZeroNetworks,
} from '@modules/farmer/types/userStrategy'
import {
	FormFieldCheckboxWrapper,
	FormFieldSelectWrapper,
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
])
const choosableBridges = enumToArrayObject(LayerZeroBridges, ['STARGATE'])

const airdropOptions = [
	{
		id: AirdropTypes.LAYER_ZERO,
		label: 'Layer Zero',
	},
	{
		id: AirdropTypes.ZK_SYNC,
		label: 'zkSync',
	},
	{
		id: AirdropTypes.STARK_NET,
		label: 'Stark Net',
	},
]

export const NewStrategyStepOne = ({ form }: NewStrategyStepOneProps) => {
	const selectedNetworks = form.watch('firstStepFileds.networks').length

	return (
		<div>
			<Form {...form}>
				<div className="flex flex-col gap-6 px-2">
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

					<FormFieldSelectWrapper
						label="Strategy type:"
						name="firstStepFileds.airdropType"
						form={form}
						options={airdropOptions}
						disabled
					/>

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

					<FormFieldWrapper
						label={`Max gas per txs in ${JSON.stringify(
							selectedNetworks,
						)} chains $:`}
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

					{/* signTransactionType */}

					{/*TODO: Random actions, Farming testnets */}
				</div>
			</Form>
		</div>
	)
}
