import { capitalize, enumToArrayObject } from '@modules/shared/utils'
import { FormFieldCheckboxWrapper } from '@modules/shared/components/Form'
import {
	ScrollActionProviders,
	ScrollLendingActionProviders,
	ScrollLiquidityActionProviders,
	ScrollSwapActionProviders,
} from '@modules/farmer/types'
import { Checkbox } from '@modules/shared/components/ui/checkbox'
import { useEffect, useState } from 'react'
import { Label } from '@modules/shared/components/ui/label'
import { Button } from '@/modules/shared/components/ui/button'
import { v4 as uuidv4 } from 'uuid'

const scrollActionProviders = enumToArrayObject(ScrollActionProviders)
const scrollSwapProviders = enumToArrayObject(ScrollSwapActionProviders, [
	ScrollSwapActionProviders.SYNCSWAP_SWAP,
	ScrollSwapActionProviders.IZUMI_SWAP,
	ScrollSwapActionProviders.NATIVE_SWAP,
	ScrollSwapActionProviders.OPEN_OCEAN_SWAP,
	ScrollSwapActionProviders.SKYDROME_SWAP,
])
const scrollLiquidityProviders = enumToArrayObject(
	ScrollLiquidityActionProviders,
	[ScrollLiquidityActionProviders.SYNCSWAP_LIQUIDITY],
)
const scrollLendingProviders = enumToArrayObject(
	ScrollLendingActionProviders,
	[],
)
// const scrollMintProviders = enumToArrayObject(ScrollMintActionProviders)

const ActionOptionMap = {
	[ScrollActionProviders.SWAP]: scrollSwapProviders,
	[ScrollActionProviders.LIQUIDITY]: scrollLiquidityProviders,
	[ScrollActionProviders.LENDING]: scrollLendingProviders,
	// [ScrollActionProviders.MINT]: scrollMintProviders,
}

const ActionProvider = ({
	action,
	form,
	providerOptions,
}: {
	action: ScrollActionProviders
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
				valueFormatter={(value: string) => {
					const subStr = value.split('_')
					subStr.splice(-1)
					return subStr.join('_')
				}}
			/>
		</>
	)
}

export const ScrollActivitySelectSection = ({ form }: { form: any }) => {
	const [activeActions, setActiveActions] = useState<ScrollActionProviders[]>(
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
			activeActions.push(ScrollActionProviders.SWAP)
		if (liquidity.providers.length > 0)
			activeActions.push(ScrollActionProviders.LIQUIDITY)
		if (lending.providers.length > 0)
			activeActions.push(ScrollActionProviders.LENDING)
		// if (mint.providers.length > 0)
		// 	activeActions.push(ScrollActionProviders.MINT)

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
			ScrollActionProviders.SWAP,
			ScrollActionProviders.LIQUIDITY,
			ScrollActionProviders.LENDING,
			// ScrollActionProviders.MINT,
		])
		setValue(
			`firstStepFileds.mainnet.actions.${ScrollActionProviders.SWAP.toLocaleLowerCase()}.providers`,
			scrollSwapProviders
				.filter((provider) => !provider.invalid)
				.map((provider) => provider.id),
		)
		setValue(
			`firstStepFileds.mainnet.actions.${ScrollActionProviders.LIQUIDITY.toLocaleLowerCase()}.providers`,
			scrollLiquidityProviders
				.filter((provider) => !provider.invalid)
				.map((provider) => provider.id),
		)
		setValue(
			`firstStepFileds.mainnet.actions.${ScrollActionProviders.LENDING.toLocaleLowerCase()}.providers`,
			scrollLendingProviders
				.filter((provider) => !provider.invalid)
				.map((provider) => provider.id),
		)

		// After the form is updated, we need to trigger the form
		form.trigger()

		// setValue(
		// 	`firstStepFileds.mainnet.actions.${ScrollActionProviders.MINT.toLocaleLowerCase()}.providers`,
		// 	scrollMintProviders.map((provider) => provider.value),
		// )
	}

	const isActionProviderActive = (action: ScrollActionProviders) =>
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
				{scrollActionProviders.map((provider) => (
					<div key={provider.id} className="flex items-center gap-2">
						<Checkbox
							id={provider.id}
							checked={isActionProviderActive(
								provider.id as ScrollActionProviders,
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
