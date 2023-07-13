// 1. Step
export type ChooseInitialTokenMessageProps = {
	selectedNetworks: string[]
	wallet: string
}

export type MessageGeneratorProps = {
	nameOfToken: string
	network: string
	amount: string | number
}

const generateMessage = ({
	nameOfToken,
	network,
	amount,
}: MessageGeneratorProps): string =>
	`Choose ${nameOfToken} on ${network} with $${amount} as initial token`

export const useChooseInitialToken = ({
	selectedNetworks,
	wallet,
}: ChooseInitialTokenMessageProps) => {
	const historyMessage = generateMessage({
		nameOfToken: 'USDC',
		network: 'BSC',
		amount: '86.47',
	})

	return {
		historyMessage,
	}
}
