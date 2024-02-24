import { type Address } from 'viem'
import {
	ZksyncActionProviders,
	type TypedUserStrategyTypeWithUid,
	type ZkSyncMainnetType,
} from '@modules/farmer/types'

import { zksyncActionCreatorFactory } from '@modules/farmer/hooks/workspace/zksync/factory/zksyncActionCreatorFactory'
import { generateRandomActionType } from '@modules/farmer/hooks/workspace/zksync/actions/coordinator/generateRantomActionType'

type ZksyncActionCoordinatorProps = {
	strategy: TypedUserStrategyTypeWithUid<ZkSyncMainnetType>
	walletPrivateKey: Address
	addNewAction: ({}: any) => void
	loggerFn: ({}: any) => void // Wallet and strategyUid already binded
}

export const zksyncActionCoordinator = ({
	strategy,
	walletPrivateKey,
	addNewAction,
	loggerFn,
}: ZksyncActionCoordinatorProps) => {
	const {
		uid,
		timeIntervals,
		mainnet: { actions },
	} = strategy

	const alreadyExecutedActions: any = []
	const availableActionTypes = [
		ZksyncActionProviders.SWAP,
		ZksyncActionProviders.LIQUIDITY,
		ZksyncActionProviders.LENDING,
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

		const nextAction = zksyncActionCreatorFactory({
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
