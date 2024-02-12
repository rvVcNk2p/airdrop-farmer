import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@modules/shared/components/ui/form'
import { Label } from '@/modules/shared/components/ui/label'
import { Switch } from '@/modules/shared/components/ui/switch'
import { v4 as uuidv4 } from 'uuid'

export const FormFieldSwitchWrapper = ({
	name,
	label,
	form,
	disabled,
}: {
	name: string
	label: string
	form: any
	disabled?: boolean
}) => {
	const error = form.getFieldState(name)?.error
	const uuid = uuidv4()

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<div className="rounded-md bg-slate-900 p-2">
							<div className="flex items-center justify-between text-sm">
								<Label htmlFor={uuid}>{label}</Label>
								<Switch
									id={uuid}
									className={error && '!border-invalid'}
									disabled={disabled}
									{...field}
								/>
							</div>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
