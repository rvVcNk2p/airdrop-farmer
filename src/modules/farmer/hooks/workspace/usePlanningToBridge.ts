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
	`Planning to bridge with ${bridegName} from ${source.network} ${source.token} to ${destination.network} ${destination.token}.`

export const usePlanningToBridge = () => {
	const historyMessage = generateMessage({
		bridegName: 'USDC',
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
