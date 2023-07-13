// 2. Step
type PlanningToBridgeProps = {
	// TODO: add props
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
	const historyMessage = generateMessage({
		bridegName: 'STARGATE',
		source: {
			network: 'BSC',
			token: 'USDT',
		},
		destination: {
			network: 'AVALANCH',
			token: 'USDC',
		},
	})

	return {
		historyMessage,
	}
}
