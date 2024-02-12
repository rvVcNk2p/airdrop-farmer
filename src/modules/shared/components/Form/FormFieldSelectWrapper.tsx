import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@modules/shared/components/ui/form'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

type FormSelectOptions = {
	id: string
	label: string
}[]

export const FormFieldSelectWrapper = ({
	name,
	label,
	options,
	form,
	disabled,
	placeholder,
	description,
}: {
	name: string
	label: string
	options: FormSelectOptions
	form: any
	disabled?: boolean
	placeholder?: string
	description?: string
}) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<div className="mb-2">
						<FormLabel className="text-sm">{label}</FormLabel>
						{description && <FormDescription>{description}</FormDescription>}
					</div>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger disabled={disabled}>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map((option) => (
								<SelectItem key={option.id} value={option.id}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
