import { randomWholeNumber } from '@/modules/shared/utils'
import {
	ZksyncActionProviders,
	ZksyncLendingActionProviders,
	ZksyncLiquidityActionProviders,
	ZksyncSwapActionProviders,
} from '@modules/farmer/types'

const countActionsByType = (
	alreadyExecutedActions:
		| ZksyncLendingActionProviders[]
		| ZksyncLiquidityActionProviders[]
		| ZksyncSwapActionProviders[],
) => {
	const actionsByType = {
		swap: 0,
		liquidity: 0,
		lending: 0,
	}

	alreadyExecutedActions.forEach((actionType) => {
		if (Object.values(ZksyncSwapActionProviders).includes(actionType as any)) {
			actionsByType.swap++
		} else if (
			Object.values(ZksyncLiquidityActionProviders).includes(actionType as any)
		) {
			actionsByType.liquidity++
		} else if (
			Object.values(ZksyncLendingActionProviders).includes(actionType as any)
		) {
			actionsByType.lending++
		}
	})

	return actionsByType
}

type RemoveActionsIfMaxReachedProps = Pick<
	GenerateRandomActionTypeProps,
	'alreadyExecutedActions' | 'liquidityMaxTimes' | 'lendingMaxTimes'
> & {
	availableActionTypes: ZksyncActionProviders[]
}

const removeActionsIfMaxReached = ({
	alreadyExecutedActions,
	liquidityMaxTimes,
	lendingMaxTimes,
	availableActionTypes,
}: RemoveActionsIfMaxReachedProps) => {
	const actionsByType = countActionsByType(alreadyExecutedActions)

	console.log(actionsByType)

	if (actionsByType.liquidity >= Number(liquidityMaxTimes)) {
		availableActionTypes = availableActionTypes.filter(
			(actionType) => actionType !== ZksyncActionProviders.LIQUIDITY,
		)
	}

	if (actionsByType.lending >= Number(lendingMaxTimes)) {
		availableActionTypes = availableActionTypes.filter(
			(actionType) => actionType !== ZksyncActionProviders.LENDING,
		)
	}

	return availableActionTypes
}

type GenerateRandomActionTypeProps = {
	alreadyExecutedActions:
		| ZksyncSwapActionProviders[]
		| ZksyncLiquidityActionProviders[]
		| ZksyncLendingActionProviders[]
	availableActionTypes: ZksyncActionProviders[]
	swapProviders: ZksyncSwapActionProviders[]
	liquidityProviders: ZksyncLiquidityActionProviders[]
	liquidityMaxTimes: number
	lendingProviders: ZksyncLendingActionProviders[]
	lendingMaxTimes: number
}

export const generateRandomActionType = ({
	alreadyExecutedActions,
	availableActionTypes,
	swapProviders,
	liquidityProviders,
	liquidityMaxTimes,
	lendingProviders,
	lendingMaxTimes,
}: GenerateRandomActionTypeProps) => {
	// Generate random action type, but remove the action type if the max times reached
	const filteredAvailableActionTypes = removeActionsIfMaxReached({
		alreadyExecutedActions,
		liquidityMaxTimes,
		lendingMaxTimes,
		availableActionTypes,
	})

	//TODO: If USDC is 0 in the wallet, then SWAP 25-50% of the available ETH to USDC

	const nextActionType =
		filteredAvailableActionTypes[
			randomWholeNumber(0, filteredAvailableActionTypes.length - 1)
		]

	const selectNextProviderType = () => {
		switch (nextActionType) {
			case ZksyncActionProviders.SWAP:
				return swapProviders[randomWholeNumber(0, swapProviders.length - 1)]
			case ZksyncActionProviders.LIQUIDITY:
				return liquidityProviders[
					randomWholeNumber(0, liquidityProviders.length - 1)
				]
			case ZksyncActionProviders.LENDING:
				return lendingProviders[
					randomWholeNumber(0, lendingProviders.length - 1)
				]
		}
	}

	const nextProviderType = selectNextProviderType()

	return {
		nextActionType,
		nextProviderType,
	}
}
