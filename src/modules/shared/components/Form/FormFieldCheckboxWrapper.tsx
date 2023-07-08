import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@modules/shared/components/ui/form'

import { Checkbox } from '../ui/checkbox'

type FormCheckboxOptions = {
	id: string
	value: string
	invalid: boolean | undefined
}[]

export const FormFieldCheckboxWrapper = ({
	name,
	label,
	options,
	form,
	description,
}: {
	name: string
	label: string
	options: FormCheckboxOptions
	form: any
	description?: string
}) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={() => (
				<FormItem>
					<div className="mb-2">
						<FormLabel className="text-base">{label}</FormLabel>
						{description && <FormDescription>{description}</FormDescription>}
					</div>
					<div className=" grid grid-cols-3 gap-4">
						{options.map((item) => (
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
