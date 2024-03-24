import { type Address } from 'viem'
import {
	ScrollActionProviders,
	type TypedUserStrategyTypeWithUid,
	type ScrollMainnetType,
} from '@modules/farmer/types'

import { scrollActionCreatorFactory } from '@modules/farmer/hooks/workspace/scroll/factory'
import { generateRandomActionType } from '@modules/farmer/hooks/workspace/scroll/actions/coordinator/generateRantomActionType'

type scrollActionCoordinatorProps = {
	strategy: TypedUserStrategyTypeWithUid<ScrollMainnetType>
	walletPrivateKey: Address
	addNewAction: ({}: any) => void
	loggerFn: ({}: any) => void // Wallet and strategyUid already binded
}

export const scrollActionCoordinator = ({
	strategy,
	walletPrivateKey,
	addNewAction,
	loggerFn,
}: scrollActionCoordinatorProps) => {
	const {
		uid,
		timeIntervals,
		mainnet: { actions },
	} = strategy

	const alreadyExecutedActions: any = []
	const availableActionTypes = [
		ScrollActionProviders.SWAP,
		ScrollActionProviders.LIQUIDITY,
		ScrollActionProviders.LENDING,
	]

	const nextActionGenerator = async () => {
		const {
			swap: { providers: swapProviders },
			liquidity: { providers: liquidityProviders, maxTimes: liquidityMaxTimes },
			lending: { providers: lendingProviders, maxTimes: lendingMaxTimes },
		} = strategy.mainnet.actions

		const { nextActionType, nextProviderType } = await generateRandomActionType(
			{
				walletPrivateKey,
				alreadyExecutedActions,
				availableActionTypes,
				swapProviders,
				liquidityProviders,
				liquidityMaxTimes,
				lendingProviders,
				lendingMaxTimes,
			},
		)

		const nextAction = scrollActionCreatorFactory({
			strategyUid: uid,
			walletPrivateKey,
			actionType: nextActionType,
			providerType: nextProviderType,
			actions,
			timeIntervals,
			addNewAction,
			loggerFn: (args) => loggerFn({ ...args }),
		})

		alreadyExecutedActions.push(nextProviderType)

		return { nextAction }
	}

	return {
		nextActionGenerator,
	}
}
