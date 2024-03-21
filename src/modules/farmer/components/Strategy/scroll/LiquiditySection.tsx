import {
	FormDoubleFieldInputWrapper,
	FormFieldInputWrapper,
} from '@modules/shared/components/Form'

export const ScrollLiquiditySection = ({ form }: { form: any }) => {
	return (
		<div>
			<h1 className="text-lg">Liquidity</h1>

			<div className="mt-2 flex flex-col gap-4">
				<FormFieldInputWrapper
					label="Max fee per liquidity:"
					name="firstStepFileds.mainnet.actions.liquidity.maxGasFee"
					form={form}
					iconLabel="$"
				/>
				<FormFieldInputWrapper
					label="Max liquidity times:"
					name="firstStepFileds.mainnet.actions.liquidity.maxTimes"
					form={form}
				/>
				<FormDoubleFieldInputWrapper
					label="Min-Max of the biggest balance to liquidity:"
					name1="firstStepFileds.mainnet.actions.liquidity.minMaxUsdcInPercentage.min"
					name2="firstStepFileds.mainnet.actions.liquidity.minMaxUsdcInPercentage.max"
					type="number"
					iconLabel="%"
					form={form}
				/>
				<FormDoubleFieldInputWrapper
					label="Time interval to remove liquidity after it has been provided:"
					name1="firstStepFileds.mainnet.actions.liquidity.timeIntervalToremoveAfterProvided.from"
					name2="firstStepFileds.mainnet.actions.liquidity.timeIntervalToremoveAfterProvided.to"
					type="number"
					iconLabel="Sec"
					form={form}
				/>
				<FormFieldInputWrapper
					label="Liquidity slippage:"
					name="firstStepFileds.mainnet.actions.liquidity.slippage"
					form={form}
					iconLabel="%"
				/>
			</div>
		</div>
	)
}
