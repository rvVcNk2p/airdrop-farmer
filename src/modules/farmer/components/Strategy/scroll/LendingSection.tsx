import {
	FormDoubleFieldInputWrapper,
	FormFieldInputWrapper,
} from '@modules/shared/components/Form'

export const ScrollLendingSection = ({ form }: { form: any }) => {
	return (
		<div>
			<h1 className="text-lg">Lending</h1>

			<div className="mt-2 flex flex-col gap-4">
				<FormFieldInputWrapper
					label="Max fee per lending:"
					name="firstStepFileds.mainnet.actions.lending.maxGasFee"
					form={form}
					iconLabel="$"
				/>
				<FormFieldInputWrapper
					label="Max lending times:"
					name="firstStepFileds.mainnet.actions.lending.maxTimes"
					form={form}
				/>
				<FormDoubleFieldInputWrapper
					label="Min-Max of the biggest balance to lending:"
					name1="firstStepFileds.mainnet.actions.lending.minMaxUsdcInPercentage.min"
					name2="firstStepFileds.mainnet.actions.lending.minMaxUsdcInPercentage.max"
					type="number"
					iconLabel="%"
					form={form}
				/>
				<FormDoubleFieldInputWrapper
					label="Time interval to remove lending after it has been provided:"
					name1="firstStepFileds.mainnet.actions.lending.timeIntervalToremoveAfterProvided.from"
					name2="firstStepFileds.mainnet.actions.lending.timeIntervalToremoveAfterProvided.to"
					type="number"
					iconLabel="Sec"
					form={form}
				/>
			</div>
		</div>
	)
}
