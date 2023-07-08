import { Checkbox } from '@/modules/shared/components/ui/checkbox'
import {
	LayerZeroBridges,
	LayerZeroNetworks,
} from '@modules/farmer/types/userStrategy'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@modules/shared/components/ui/form'
import { Input } from '@modules/shared/components/ui/input'
import { enumToArrayObject } from '@modules/shared/utils'

interface NewStrategyStepOneProps {
	// TODO: Define type
	form: any
}

const FormFieldWrapper = ({
	name,
	label,
	form,
	children,
	description,
}: {
	name: string
	label: string
	form: any
	children: (slotProps: { field: any }) => React.ReactNode
	description?: string
}) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<div className="mb-4">
						<FormLabel className="text-base">{label}</FormLabel>
						{description && <FormDescription>{description}</FormDescription>}
					</div>
					<FormControl>{children({ field })}</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

type FormCheckboxItems = {
	id: string
	value: string
	invalid: boolean | undefined
}[]

const FormFieldCheckboxWrapper = ({
	name,
	label,
	items,
	form,
	description,
}: {
	name: string
	label: string
	items: FormCheckboxItems
	form: any
	description?: string
}) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={() => (
				<FormItem>
					<div className="mb-4">
						<FormLabel className="text-base">{label}</FormLabel>
						{description && <FormDescription>{description}</FormDescription>}
					</div>
					<div className=" grid grid-cols-3 gap-4">
						{items.map((item) => (
							<FormField
								key={item.id}
								control={form.control}
								name={name}
								render={({ field }) => {
									return (
										<FormItem
											key={item.id}
											className="flex flex-row items-start space-x-3 space-y-0"
										>
											<FormControl>
												<Checkbox
													disabled={item.invalid}
													checked={field.value?.includes(item.id)}
													onCheckedChange={(checked) => {
														return checked
															? field.onChange([...field.value, item.id])
															: field.onChange(
																	field.value?.filter(
																		(value: any) => value !== item.id,
																	),
															  )
													}}
												/>
											</FormControl>
											<FormLabel className="font-normal">
												{item.value}
											</FormLabel>
										</FormItem>
									)
								}}
							/>
						))}
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
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
				<div className="flex flex-col gap-4">
					<FormFieldWrapper
						label="Strategy name:"
						name="firstStepFileds.name"
						form={form}
					>
						{({ field }) => (
							<Input
								placeholder="zkSync Farming - 1"
								{...field}
								// ADD ERROR CLASS
							/>
						)}
					</FormFieldWrapper>

					<FormFieldWrapper
						label="Tsx number per wallet:"
						name="firstStepFileds.txsNumberPerWallet"
						form={form}
					>
						{({ field }) => <Input type="number" {...field} />}
					</FormFieldWrapper>

					<FormFieldWrapper
						label={`Max gas per txs in ${2} chains:`}
						name="firstStepFileds.maxGasPerTxs"
						form={form}
					>
						{({ field }) => <Input type="number" {...field} />}
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
