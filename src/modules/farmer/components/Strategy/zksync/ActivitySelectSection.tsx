import { capitalize, enumToArrayObject } from '@modules/shared/utils'
import { FormFieldCheckboxWrapper } from '@modules/shared/components/Form'
import {
	ZksyncActionProviders,
	ZksyncLendingProviders,
	ZksyncLiquidityProviders,
	ZksyncMintProviders,
	ZksyncSwapProviders,
} from '@modules/farmer/types'
import { Checkbox } from '@modules/shared/components/ui/checkbox'
import { useEffect, useState } from 'react'
import { Label } from '@modules/shared/components/ui/label'
import { Button } from '@/modules/shared/components/ui/button'

const zksyncActionProviders = enumToArrayObject(ZksyncActionProviders)
const zksyncSwapProviders = enumToArrayObject(ZksyncSwapProviders)
const zksyncLiquidityProviders = enumToArrayObject(ZksyncLiquidityProviders)
const zksyncLendingProviders = enumToArrayObject(ZksyncLendingProviders)
const zksyncMintProviders = enumToArrayObject(ZksyncMintProviders)

const ActionOptionMap = {
	[ZksyncActionProviders.SWAP]: zksyncSwapProviders,
	[ZksyncActionProviders.LIQUIDITY]: zksyncLiquidityProviders,
	[ZksyncActionProviders.LENDING]: zksyncLendingProviders,
	[ZksyncActionProviders.MINT]: zksyncMintProviders,
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
		<div className="mt-6 flex flex-col gap-1">
			<h1 className="text-sm">{capitalize(action)}</h1>
			<FormFieldCheckboxWrapper
				name={`firstStepFileds.mainnet.actions.${action.toLocaleLowerCase()}.providers`}
				form={form}
				orientation="vertical"
				options={providerOptions}
			/>
		</div>
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
					actions: { swap, liquidity, lending, mint },
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
		if (mint.providers.length > 0)
			activeActions.push(ZksyncActionProviders.MINT)

		setActiveActions(activeActions)
	}, [])

	const handleSetActiveActions = (action: any, isChecked: boolean) => {
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
	}

	const handleSelectAll = () => {
		setActiveActions([
			ZksyncActionProviders.SWAP,
			ZksyncActionProviders.LIQUIDITY,
			ZksyncActionProviders.LENDING,
			ZksyncActionProviders.MINT,
		])
		setValue(
			`firstStepFileds.mainnet.actions.${ZksyncActionProviders.SWAP.toLocaleLowerCase()}.providers`,
			zksyncSwapProviders.map((provider) => provider.value),
		)
		setValue(
			`firstStepFileds.mainnet.actions.${ZksyncActionProviders.LIQUIDITY.toLocaleLowerCase()}.providers`,
			zksyncLiquidityProviders.map((provider) => provider.value),
		)
		setValue(
			`firstStepFileds.mainnet.actions.${ZksyncActionProviders.LENDING.toLocaleLowerCase()}.providers`,
			zksyncLendingProviders.map((provider) => provider.value),
		)
		setValue(
			`firstStepFileds.mainnet.actions.${ZksyncActionProviders.MINT.toLocaleLowerCase()}.providers`,
			zksyncMintProviders.map((provider) => provider.value),
		)
	}

	const isActionProviderActive = (action: ZksyncActionProviders) =>
		activeActions.includes(action)

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-lg">Activities</h1>
				<Button variant="outline" onClick={handleSelectAll}>
					Select all
				</Button>
			</div>

			<div className="mt-2 grid grid-cols-4">
				{zksyncActionProviders.map((provider) => (
					<div key={provider.id} className="flex items-center gap-2">
						<Checkbox
							id={provider.id}
							checked={isActionProviderActive(
								provider.id as ZksyncActionProviders,
							)}
							value={provider.value}
							onCheckedChange={(isChecked: boolean) =>
								handleSetActiveActions(provider, isChecked)
							}
						/>
						<Label htmlFor={provider.id}>{provider.value}</Label>
					</div>
				))}
			</div>

			{activeActions.length > 0 && (
				<div className="grid grid-cols-2">
					{activeActions.map((action) => (
						<>
							<ActionProvider
								action={action}
								form={form}
								providerOptions={ActionOptionMap[action]}
							/>
						</>
					))}
				</div>
			)}
		</div>
	)
}
