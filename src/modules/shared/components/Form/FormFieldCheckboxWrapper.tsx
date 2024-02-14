import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@modules/shared/components/ui/form'

import { Checkbox } from '../ui/checkbox'
import { v4 as uuidv4 } from 'uuid'

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
	orientation = 'horizontal',
}: {
	name: string
	options: FormCheckboxOptions
	form: any
	label?: string
	orientation?: 'horizontal' | 'vertical'
}) => {
	const orientationClass =
		orientation === 'horizontal'
			? 'grid grid-cols-3 gap-4'
			: 'flex flex-col gap-4'

	return (
		<FormField
			control={form.control}
			name={name}
			render={() => (
				<FormItem>
					<div className="mb-2">
						{label && <FormLabel className="text-sm">{label}</FormLabel>}
					</div>
					<div className={orientationClass}>
						{options.map((item) => (
							<FormField
								key={uuidv4()}
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
