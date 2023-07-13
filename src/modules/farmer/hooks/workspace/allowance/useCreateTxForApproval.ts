// 3. Step
type CreateTxForApproval = {
	// TODO: add props
}

export type MessageGeneratorProps = {
	nameOfToken: string
	network: string
	amount: string | number
	nonce: number
}

// 'Created tx 118 to approve spending $85.03 USDT on BSC.'
const generateMessage = ({
	nameOfToken,
	network,
	amount,
	nonce,
}: MessageGeneratorProps): string =>
	`<p>Created tx ${nonce} to approve spending $${amount} <span className="text-purple-500">${nameOfToken}</span> on <span className="text-yellow-500">${network}</span>.</p>`

export const useCreateTxForApproval = () => {
	const historyMessage = generateMessage({
		nameOfToken: 'USDC',
		network: 'BSC',
		amount: '86.47',
		nonce: 118,
	})

	return {
		historyMessage,
	}
}
