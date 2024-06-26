import { capitalize, enumToArrayObject } from '@modules/shared/utils'
import { FormFieldCheckboxWrapper } from '@modules/shared/components/Form'
import {
	ZksyncActionProviders,
	ZksyncLendingActionProviders,
	ZksyncLiquidityActionProviders,
	ZksyncSwapActionProviders,
	// ZksyncMintProviders,
} from '@modules/farmer/types'
import { Checkbox } from '@modules/shared/components/ui/checkbox'
import { useEffect, useState } from 'react'
import { Label } from '@modules/shared/components/ui/label'
import { Button } from '@/modules/shared/components/ui/button'
import { v4 as uuidv4 } from 'uuid'

const zksyncActionProviders = enumToArrayObject(ZksyncActionProviders)
const zksyncSwapProviders = enumToArrayObject(ZksyncSwapActionProviders, [
	ZksyncSwapActionProviders.SYNCSWAP_SWAP,
	ZksyncSwapActionProviders.SPACEFI_SWAP,
	ZksyncSwapActionProviders.VELOCORE_SWAP,
])
const zksyncLiquidityProviders = enumToArrayObject(
	ZksyncLiquidityActionProviders,
	[
		ZksyncLiquidityActionProviders.SPACEFI_LIQUIDITY,
		ZksyncLiquidityActionProviders.VELOCORE_LIQUIDITY,
		ZksyncLiquidityActionProviders.SYNCSWAP_LIQUIDITY,
	],
)
const zksyncLendingProviders = enumToArrayObject(ZksyncLendingActionProviders, [
	ZksyncLendingActionProviders.REACTORFUSION_LENDING,
])
// const zksyncMintProviders = enumToArrayObject(ZksyncMintActionProviders)

const ActionOptionMap = {
	[ZksyncActionProviders.SWAP]: zksyncSwapProviders,
	[ZksyncActionProviders.LIQUIDITY]: zksyncLiquidityProviders,
	[ZksyncActionProviders.LENDING]: zksyncLendingProviders,
	// [ZksyncActionProviders.MINT]: zksyncMintProviders,
}

const ActionProvider = ({
	action,
	form,
	providerOptions,
}: {
	action: ZksyncActionProviders
	form: any
	providerOptions: any
}) => {
	return (
		<>
			<h1 className="text-sm">{capitalize(action)}</h1>
			<FormFieldCheckboxWrapper
				name={`firstStepFileds.mainnet.actions.${action.toLocaleLowerCase()}.providers`}
				form={form}
				orientation="vertical"
				options={providerOptions}
				valueFormatter={(value: string) => value.split('_')[0]}
			/>
		</>
	)
}

export const ZksyncActivitySelectSection = ({ form }: { form: any }) => {
	const [activeActions, setActiveActions] = useState<ZksyncActionProviders[]>(
		[],
	)
	const { setValue } = form

	useEffect(() => {
		// Init of activeActions with the values from the form
		const {
			firstStepFileds: {
				mainnet: {
					actions: { swap, liquidity, lending }, // mint
				},
			},
		} = form.getValues()

		const activeActions = []
		if (swap.providers.length > 0)
			activeActions.push(ZksyncActionProviders.SWAP)
		if (liquidity.providers.length > 0)
			activeActions.push(ZksyncActionProviders.LIQUIDITY)
		if (lending.providers.length > 0)
			activeActions.push(ZksyncActionProviders.LENDING)
		// if (mint.providers.length > 0)
		// 	activeActions.push(ZksyncActionProviders.MINT)

		setActiveActions(activeActions)
	}, [])

	const handleSetActiveActions = (
		form: any,
		action: any,
		isChecked: boolean,
	) => {
		// TODO: Fix the position of the action in the array

		if (isChecked) {
			setActiveActions([...activeActions, action.id])
		} else {
			setActiveActions(activeActions.filter((a) => a !== action.id))
			setValue(
				`firstStepFileds.mainnet.actions.${action.id.toLocaleLowerCase()}.providers`,
				[],
			)
		}

		form.trigger()
	}

	const handleSelectAll = ({ form }: { form: any }) => {
		setActiveActions([
			ZksyncActionProviders.SWAP,
			ZksyncActionProviders.LIQUIDITY,
			ZksyncActionProviders.LENDING,
			// ZksyncActionProviders.MINT,
		])
		setValue(
			`firstStepFileds.mainnet.actions.${ZksyncActionProviders.SWAP.toLocaleLowerCase()}.providers`,
			zksyncSwapProviders
				.filter((provider) => !provider.invalid)
				.map((provider) => provider.id),
		)
		setValue(
			`firstStepFileds.mainnet.actions.${ZksyncActionProviders.LIQUIDITY.toLocaleLowerCase()}.providers`,
			zksyncLiquidityProviders
				.filter((provider) => !provider.invalid)
				.map((provider) => provider.id),
		)
		setValue(
			`firstStepFileds.mainnet.actions.${ZksyncActionProviders.LENDING.toLocaleLowerCase()}.providers`,
			zksyncLendingProviders
				.filter((provider) => !provider.invalid)
				.map((provider) => provider.id),
		)

		// After the form is updated, we need to trigger the form
		form.trigger()

		// setValue(
		// 	`firstStepFileds.mainnet.actions.${ZksyncActionProviders.MINT.toLocaleLowerCase()}.providers`,
		// 	zksyncMintProviders.map((provider) => provider.value),
		// )
	}

	const isActionProviderActive = (action: ZksyncActionProviders) =>
		activeActions.includes(action)

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-lg">Activities</h1>
				<Button variant="outline" onClick={() => handleSelectAll({ form })}>
					Select all
				</Button>
			</div>

			<div className="mt-4 grid grid-cols-3">
				{zksyncActionProviders.map((provider) => (
					<div key={provider.id} className="flex items-center gap-2">
						<Checkbox
							id={provider.id}
							checked={isActionProviderActive(
								provider.id as ZksyncActionProviders,
							)}
							value={provider.value}
							onCheckedChange={(isChecked: boolean) =>
								handleSetActiveActions(form, provider, isChecked)
							}
						/>
						<Label htmlFor={provider.id}>{provider.value}</Label>
					</div>
				))}
			</div>

			{activeActions.length > 0 && (
				<div className="grid grid-cols-3">
					{activeActions.map((action) => (
						<div className="mt-6 flex flex-col gap-1" key={uuidv4()}>
							<ActionProvider
								action={action}
								form={form}
								providerOptions={ActionOptionMap[action]}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
