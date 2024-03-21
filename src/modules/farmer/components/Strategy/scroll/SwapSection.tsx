import {
	FormFieldInputWrapper,
	FormDoubleFieldInputWrapper,
} from '@modules/shared/components/Form'

export const ScrollSwapSection = ({ form }: { form: any }) => {
	return (
		<div>
			<h1 className="text-lg">Swaps</h1>
			<div className="mt-2 flex flex-col gap-4">
				<FormFieldInputWrapper
					label="Max fee per swap:"
					name="firstStepFileds.mainnet.actions.swap.maxGasFee"
					form={form}
					iconLabel="$"
				/>
				<FormDoubleFieldInputWrapper
					label="Min-Max of the biggest balance to swap:"
					name1="firstStepFileds.mainnet.actions.swap.minMaxUsdcInPercentage.min"
					name2="firstStepFileds.mainnet.actions.swap.minMaxUsdcInPercentage.max"
					type="number"
					iconLabel="%"
					form={form}
				/>
				<FormFieldInputWrapper
					label="Swap slippage:"
					name="firstStepFileds.mainnet.actions.swap.slippage"
					form={form}
					iconLabel="%"
				/>
			</div>
		</div>
	)
}
