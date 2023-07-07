import { Checkbox } from '@/modules/shared/components/ui/checkbox'
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
					<FormLabel>{label}</FormLabel>
					<FormControl>{children({ field })}</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

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
						{({ field }) => <Input placeholder="shadcn" {...field} />}
					</FormFieldWrapper>
					<FormFieldWrapper
						label="Tsx Number Per Wallet:"
						name="firstStepFileds.txsNumberPerWallet"
						form={form}
					>
						{({ field }) => <Input type="number" {...field} />}
					</FormFieldWrapper>
				</div>
			</Form>
		</div>
	)
}
