// 2. Step
import { getDestinationToken } from '@modules/farmer/helpers/poolId'
import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { ChainIds } from '@modules/shared/constants'
import { Address } from 'viem'

import type { BlancesResponseWithSelectedToken } from './useChooseInitialToken'

type PlanningToBridgeProps = {
	loggerFn: ({}: TxHistoryRecordType) => void
}

type PlanningToBridgeFnProps = {
	selectedNetworks: string[]
	chainWithHighestBalanceToken: BlancesResponseWithSelectedToken
	wallet: Address
}

type MessageGeneratorProps = {
	bridegName: string
	source: {
		network: string
		token: string
	}
	destination: {
		network: string
		token: string
	}
}

const generateMessage = ({
	bridegName,
	source,
	destination,
}: MessageGeneratorProps): string =>
	`<p>Planning to bridge with ${bridegName} from <span className="text-yellow-500">${source.network}</span> <span className="text-purple-500">${source.token}</span> to <span className="text-yellow-500">${destination.network}</span> <span className="text-purple-500">${destination.token}</span>.</p>`

export const usePlanningToBridge = ({ loggerFn }: PlanningToBridgeProps) => {
	const planningToBridgeFn = ({
		selectedNetworks,
		chainWithHighestBalanceToken,
		wallet,
	}: PlanningToBridgeFnProps) => {
		const networksWithoutHighestBalance = selectedNetworks.filter(
			(network) => network !== chainWithHighestBalanceToken.network,
		)

		const destinationNetwork =
			networksWithoutHighestBalance[
				Math.floor(Math.random() * networksWithoutHighestBalance.length)
			]

		const destination = {
			network: destinationNetwork,
			token: getDestinationToken(ChainIds[destinationNetwork]),
			chainId: ChainIds[destinationNetwork],
		}

		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: generateMessage({
				bridegName: 'STARGATE', // TODO: Make it dynamic
				source: {
					network: chainWithHighestBalanceToken.network,
					token: chainWithHighestBalanceToken.selected.token,
				},
				destination,
			}),
		})

		return {
			destination,
		}
	}

	return {
		planningToBridgeFn,
	}
}
