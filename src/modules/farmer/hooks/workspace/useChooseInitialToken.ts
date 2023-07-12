// 1. Step
export type ChooseInitialTokenMessageProps = {
	selectedNetworks: string[]
	wallet: string
}

export type messageGeneratorProps = {
	nameOfToken: string
	network: string
	amount: string | number
}

const generateMessage = ({
	nameOfToken,
	network,
	amount,
}: messageGeneratorProps): string =>
	`You have chosen ${nameOfToken} on ${network} with $${amount} amount`

export const useChooseInitialToken = ({
	selectedNetworks,
	wallet,
}: ChooseInitialTokenMessageProps) => {
	const response = null

	const historyMessage = generateMessage({
		nameOfToken: 'USDC',
		network: 'BSC',
		amount: '86.47',
	})

	return {
		response,

		historyMessage,
	}
}
