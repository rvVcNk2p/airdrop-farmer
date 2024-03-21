import { type Address } from 'viem'
import {
	ScrollActionProviders,
	ScrollLendingActionProviders,
	ScrollLiquidityActionProviders,
	ScrollSwapActionProviders,
} from '@modules/farmer/types'

import { randomWholeNumber } from '@/modules/shared/utils'
import { getSingleToken } from '@modules/farmer/hooks/workspace/_shared'

const countActionsByType = (
	alreadyExecutedActions:
		| ScrollLendingActionProviders[]
		| ScrollLiquidityActionProviders[]
		| ScrollSwapActionProviders[],
) => {
	const actionsByType = {
		swap: 0,
		liquidity: 0,
		lending: 0,
	}

	alreadyExecutedActions.forEach((actionType) => {
		if (Object.values(ScrollSwapActionProviders).includes(actionType as any)) {
			actionsByType.swap++
		} else if (
			Object.values(ScrollLiquidityActionProviders).includes(actionType as any)
		) {
			actionsByType.liquidity++
		} else if (
			Object.values(ScrollLendingActionProviders).includes(actionType as any)
		) {
			actionsByType.lending++
		}
	})

	return actionsByType
}

type RemoveActionsIfMaxReachedProps = Pick<
	GenerateRandomActionTypeProps,
	| 'alreadyExecutedActions'
	| 'liquidityMaxTimes'
	| 'lendingMaxTimes'
	| 'liquidityProviders'
	| 'lendingProviders'
> & {
	availableActionTypes: ScrollActionProviders[]
}

const removeActionsIfMaxReached = ({
	alreadyExecutedActions,
	liquidityProviders,
	liquidityMaxTimes,
	lendingProviders,
	lendingMaxTimes,
	availableActionTypes,
}: RemoveActionsIfMaxReachedProps) => {
	const actionsByType = countActionsByType(alreadyExecutedActions)

	if (
		actionsByType.liquidity >= Number(liquidityMaxTimes) ||
		liquidityProviders.length === 0
	) {
		availableActionTypes = availableActionTypes.filter(
			(actionType) => actionType !== ScrollActionProviders.LIQUIDITY,
		)
	}

	if (
		actionsByType.lending >= Number(lendingMaxTimes) ||
		lendingProviders.length === 0
	) {
		availableActionTypes = availableActionTypes.filter(
			(actionType) => actionType !== ScrollActionProviders.LENDING,
		)
	}

	return availableActionTypes
}

type GenerateRandomActionTypeProps = {
	walletPrivateKey: Address
	alreadyExecutedActions:
		| ScrollSwapActionProviders[]
		| ScrollLiquidityActionProviders[]
		| ScrollLendingActionProviders[]
	availableActionTypes: ScrollActionProviders[]
	swapProviders: ScrollSwapActionProviders[]
	liquidityProviders: ScrollLiquidityActionProviders[]
	liquidityMaxTimes: number
	lendingProviders: ScrollLendingActionProviders[]
	lendingMaxTimes: number
}

const isZeroUSDC = async ({
	walletPrivateKey,
}: {
	walletPrivateKey: Address
}) => {
	const { tokenAmount } = await getSingleToken({
		wallet: walletPrivateKey,
		selectedNetwork: 'SCROLL',
		externalChainAvailableTokens: ['USDC'],
	})

	return tokenAmount === 0
}

export const generateRandomActionType = async ({
	walletPrivateKey,
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
		liquidityProviders,
		liquidityMaxTimes,
		lendingProviders,
		lendingMaxTimes,
		availableActionTypes,
	})

	// If USDC is 0 in the wallet, then SWAP ETH to USDC
	const isZeroUsdc = await isZeroUSDC({ walletPrivateKey })

	const nextActionType = isZeroUsdc
		? ScrollActionProviders.SWAP
		: filteredAvailableActionTypes[
				randomWholeNumber(0, filteredAvailableActionTypes.length - 1)
			]

	const selectNextProviderType = () => {
		switch (nextActionType) {
			case ScrollActionProviders.SWAP:
				return isZeroUsdc
					? ScrollSwapActionProviders.SPACEFI_SWAP
					: swapProviders[randomWholeNumber(0, swapProviders.length - 1)]
			case ScrollActionProviders.LIQUIDITY:
				return liquidityProviders[
					randomWholeNumber(0, liquidityProviders.length - 1)
				]
			case ScrollActionProviders.LENDING:
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
