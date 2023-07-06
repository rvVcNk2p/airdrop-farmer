import { Input } from '@modules/shared/components/ui/input'
import { Label } from '@modules/shared/components/ui/label'
import type {
	FieldErrors,
	UseFormRegister,
	UseFormTrigger,
} from 'react-hook-form'

import type { NewStrategyFileds } from '../NewStrategyModal'

interface NewStrategyStepOneProps {
	register: UseFormRegister<NewStrategyFileds>
	trigger: UseFormTrigger<NewStrategyFileds>
	errors: FieldErrors<NewStrategyFileds>
}

//  validate: {
//    matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v),
// 	}
const ErrorMessage = ({ errorType }: { errorType: string | undefined }) => {
	if (!errorType) return null
	let validationMessage = ''

	switch (errorType) {
		case 'required':
			validationMessage = `Field is required`
			break
		case 'minLength':
			validationMessage = `Minimum length is 3`
			break
		case 'onlyPositiveNumbers':
			validationMessage = `Must be a positive number, bigger than 0`
			break
		default:
			validationMessage = `Unknown validation error: ${errorType}`
			break
	}

	return (
		<p role="alert" className="text-invalid">
			{validationMessage}
		</p>
	)
}

export const NewStrategyStepOne = ({
	register,
	trigger,
	errors,
}: NewStrategyStepOneProps) => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2 w-full">
				<Label>Strategy name:</Label>
				<Input
					{...register('firstStepFileds.name', {
						required: true,
						minLength: 3,
					})}
					className={errors.firstStepFileds?.name ? '!border-invalid' : ''}
					onBlur={() => trigger(['firstStepFileds.name'])}
				/>
				<ErrorMessage errorType={errors.firstStepFileds?.name?.type} />
			</div>

			<div className="flex flex-col gap-2 w-full">
				<Label>Txs number per wallet:</Label>
				<Input
					type="number"
					{...register('firstStepFileds.txsNumberPerWallet', {
						required: true,
						validate: {
							onlyPositiveNumbers: (v) => v !== null && v > 0,
						},
					})}
					className={
						errors.firstStepFileds?.txsNumberPerWallet ? '!border-invalid' : ''
					}
					onBlur={() => trigger(['firstStepFileds.txsNumberPerWallet'])}
				/>
				<ErrorMessage
					errorType={errors.firstStepFileds?.txsNumberPerWallet?.type}
				/>
			</div>
		</div>
	)
}
