import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@modules/shared/components/ui/form'

export const FormMultipleSelectWrapper = ({
	name,
	label,
	form,
	children,
	description,
}: {
	name: string
	label: string
	form: any
	children: (slotProps: { field: any; error: any }) => React.ReactNode
	description?: string
}) => {
	const error = form.getFieldState(name)?.error

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
					<FormControl>{children({ field, error })}</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
