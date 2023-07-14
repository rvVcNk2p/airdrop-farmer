// 2. Step
import type { BlancesResponseWithSelectedToken } from './useChooseInitialToken'

type PlanningToBridgeProps = {
	selectedNetworks: string[]
	chainWithHighestBalanceToken: BlancesResponseWithSelectedToken
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

export const usePlanningToBridge = () => {
	const planningToBridge = ({
		selectedNetworks,
		chainWithHighestBalanceToken,
	}: PlanningToBridgeProps) => {
		console.log('== STEP 2 == planningToBridge')
		const networksWithoutHighestBalance = selectedNetworks.filter(
			(network) => network !== chainWithHighestBalanceToken.network,
		)

		const destinationNetwork =
			networksWithoutHighestBalance[
				Math.floor(Math.random() * networksWithoutHighestBalance.length)
			]

		const destination = {
			network: destinationNetwork,
			token: 'USDT',
		}

		const planningToBridgeHistory = generateMessage({
			bridegName: 'STARGATE', // TODO: Make it dynamic
			source: {
				network: chainWithHighestBalanceToken.network,
				token: chainWithHighestBalanceToken.selected.token,
			},
			destination,
		})

		return {
			planningToBridgeHistory,
			destination,
		}
	}

	return {
		planningToBridge,
	}
}
