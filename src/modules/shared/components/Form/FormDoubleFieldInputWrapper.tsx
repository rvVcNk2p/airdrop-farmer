import { FormFieldInputWrapper } from '@/modules/shared/components/Form'
import { FormLabel } from '../ui/form'

export const FormDoubleFieldInputWrapper = ({
	name1,
	name2,
	label,
	form,
	iconLabel,
	type,
}: {
	name1: string
	name2: string
	label: string
	form: any
	iconLabel?: string
	type?: string
}) => {
	return (
		<div>
			<div>
				<FormLabel className="text-sm">{label}</FormLabel>
			</div>
			<div className="mt-2 flex items-center justify-between">
				<FormFieldInputWrapper
					name={name1}
					type={type}
					form={form}
					iconLabel={iconLabel}
				/>
				<p className="px-4">-</p>
				<FormFieldInputWrapper name={name2} type={type} form={form} />
			</div>
		</div>
	)
}
