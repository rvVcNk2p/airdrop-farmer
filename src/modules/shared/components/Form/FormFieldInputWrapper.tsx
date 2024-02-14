import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@modules/shared/components/ui/form'
import { Input } from '@/modules/shared/components/ui/input'

export const FormFieldInputWrapper = ({
	name,
	label,
	form,
	type,
	min,
	placeholder,
	iconLabel,
}: {
	name: string
	form: any
	label?: string
	type?: string
	min?: number
	placeholder?: string
	iconLabel?: string
}) => {
	const error = form.getFieldState(name)?.error

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && (
						<div className="mb-2">
							<FormLabel className="text-sm">{label}</FormLabel>
						</div>
					)}
					<FormControl>
						<div className="flex">
							{iconLabel && (
								<div className="flex items-center rounded-bl-md rounded-tl-md border border-r-0 bg-slate-900">
									<span className="m-2">{iconLabel}</span>
								</div>
							)}
							<Input
								type={type || 'string'}
								placeholder={placeholder || 'Start typing...'}
								autoComplete="off"
								min={min}
								className={`${error && '!border-invalid'} ${iconLabel && 'rounded-bl-none rounded-tl-none'}`}
								{...field}
							/>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
