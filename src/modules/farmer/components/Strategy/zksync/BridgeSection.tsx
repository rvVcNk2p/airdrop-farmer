import { enumToArrayObject } from '@modules/shared/utils'
import {
	FormDoubleFieldInputWrapper,
	FormFieldInputWrapper,
	FormFieldRadioGroupWrapper,
	FormFieldSwitchWrapper,
} from '@modules/shared/components/Form'
import { ZksyncBridges } from '@modules/farmer/types'

const zksyncBridges = enumToArrayObject(ZksyncBridges)

export const ZksyncBridgeSection = ({ form }: { form: any }) => {
	const {
		firstStepFileds: {
			mainnet: {
				bridge: { isSkip },
			},
		},
	} = form.getValues()

	return (
		<div>
			<div className="mt-2 flex flex-col gap-4">
				<FormFieldSwitchWrapper
					label="Skip Bridge"
					name="firstStepFileds.mainnet.bridge.isSkip"
					form={form}
				/>
				{!isSkip && (
					<>
						<FormFieldRadioGroupWrapper
							label="Bridge"
							name="firstStepFileds.mainnet.bridge.type"
							form={form}
							disabled
							options={zksyncBridges}
						/>
						<FormFieldSwitchWrapper
							label="Bridge full balance"
							name="firstStepFileds.mainnet.bridge.bridgeFullbalance"
							form={form}
							disabled
						/>
						{/* <FormDoubleFieldInputWrapper
								label="Min-Max USDC to bridge of biggest balance to bridge:"
								name1="firstStepFileds.mainnet.bridge.usdcToBridgeInPercentage.min"
								name2="firstStepFileds.mainnet.bridge.usdcToBridgeInPercentage.max"
								type="number"
								iconLabel="%"
								form={form}
							/> */}
						<FormDoubleFieldInputWrapper
							label="Min-Max ETH to bridge of biggest balance to bridge:"
							name1="firstStepFileds.mainnet.bridge.ethToBridgeInPercentage.min"
							name2="firstStepFileds.mainnet.bridge.ethToBridgeInPercentage.max"
							type="number"
							iconLabel="%"
							form={form}
						/>
						<FormFieldInputWrapper
							label="Max fee per bridge to zkSync:"
							name="firstStepFileds.mainnet.bridge.maxGasPerBridging"
							iconLabel="$"
							form={form}
						/>
					</>
				)}
			</div>
		</div>
	)
}
