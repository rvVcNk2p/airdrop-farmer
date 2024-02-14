import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@modules/shared/components/ui/form'
import {
	RadioGroup,
	RadioGroupItem,
} from '@modules/shared/components/ui/radio-group'

export const FormFieldRadioGroupWrapper = ({
	name,
	label,
	form,
	options,
}: {
	name: string
	label: string
	form: any
	options: any
}) => {
	// const error = form.getFieldState(name)?.error

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<div className="mb-2">
						<FormLabel className="text-sm">{label}</FormLabel>
					</div>
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="flex justify-start space-x-4"
						>
							{options.map((option: any) => (
								<FormItem
									key={option.id}
									className="flex !w-auto items-center space-x-3 space-y-0"
								>
									<FormControl>
										<RadioGroupItem value={option.id} />
									</FormControl>
									<FormLabel className="font-normal">{option.value}</FormLabel>
								</FormItem>
							))}
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
