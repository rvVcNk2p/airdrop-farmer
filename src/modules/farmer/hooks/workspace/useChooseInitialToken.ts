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
	`<p>Choose <span className="text-purple-500">${nameOfToken}</span> on <span className="text-yellow-500">${network}</span> with $${amount} as initial token</p>`

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
