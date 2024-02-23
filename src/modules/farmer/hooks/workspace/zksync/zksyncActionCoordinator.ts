import {
	TypedUserStrategyTypeWithUid,
	ZkSyncMainnetType,
	ZksyncLendingActionProviders,
} from '@modules/farmer/types'

import { zksyncActionCreatorFactory } from '@modules/farmer/hooks/workspace/zksync/factory/zksyncActionCreatorFactory'
import { Address } from 'viem'

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

	const nextActionGenerator = () => {
		const actionType = ZksyncLendingActionProviders.ERALEND_LENDING
		// TODO: Handle random action type
		// ZksyncLiquidityActionProviders.MUTE_LIQUIDITY
		// ZksyncSwapActionProviders.SYNCSWAP_SWAP

		const nextAction = zksyncActionCreatorFactory({
			strategyUid: uid,
			walletPrivateKey,
			actionType,
			actions,
			timeIntervals,
			addNewAction,
			loggerFn: (args) => loggerFn({ ...args }),
		})

		return { nextAction }
	}

	return {
		nextActionGenerator,
	}
}
