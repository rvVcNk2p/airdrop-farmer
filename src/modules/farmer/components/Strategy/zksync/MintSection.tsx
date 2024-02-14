import { FormFieldInputWrapper } from '@modules/shared/components/Form'

export const ZksyncMintSection = ({ form }: { form: any }) => {
	return (
		<div>
			<h1 className="text-lg">Mint</h1>

			<div className="mt-2 flex flex-col gap-4">
				<FormFieldInputWrapper
					label="Max fee per min:"
					name="firstStepFileds.mainnet.actions.mint.maxGasFee"
					form={form}
					iconLabel="$"
				/>
				<FormFieldInputWrapper
					label="Max mint times:"
					name="firstStepFileds.mainnet.actions.mint.maxTimes"
					form={form}
				/>
			</div>
		</div>
	)
}
