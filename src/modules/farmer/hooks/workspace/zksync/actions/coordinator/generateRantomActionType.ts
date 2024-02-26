import { type Address } from 'viem'
import {
	ZksyncActionProviders,
	ZksyncLendingActionProviders,
	ZksyncLiquidityActionProviders,
	ZksyncSwapActionProviders,
} from '@modules/farmer/types'

import { randomWholeNumber } from '@/modules/shared/utils'
import { getSingleToken } from '@modules/farmer/hooks/workspace/_shared'

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
	| 'alreadyExecutedActions'
	| 'liquidityMaxTimes'
	| 'lendingMaxTimes'
	| 'liquidityProviders'
	| 'lendingProviders'
> & {
	availableActionTypes: ZksyncActionProviders[]
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
			(actionType) => actionType !== ZksyncActionProviders.LIQUIDITY,
		)
	}

	if (
		actionsByType.lending >= Number(lendingMaxTimes) ||
		lendingProviders.length === 0
	) {
		availableActionTypes = availableActionTypes.filter(
			(actionType) => actionType !== ZksyncActionProviders.LENDING,
		)
	}

	return availableActionTypes
}

type GenerateRandomActionTypeProps = {
	walletPrivateKey: Address
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

const isZeroUSDC = async ({
	walletPrivateKey,
}: {
	walletPrivateKey: Address
}) => {
	const { tokenAmount } = await getSingleToken({
		wallet: walletPrivateKey,
		selectedNetwork: 'ZKSYNC',
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
		? ZksyncActionProviders.SWAP
		: filteredAvailableActionTypes[
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
