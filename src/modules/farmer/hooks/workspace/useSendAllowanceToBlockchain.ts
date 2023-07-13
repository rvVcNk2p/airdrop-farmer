// 4. Step
import { LayerZeroNetworks } from '@/modules/farmer/types/userStrategy'

type SendAllowanceToBlockchainProps = {
	// TODO: add props
}

const getScanLink = (network: string, txHash: string) => {
	switch (network) {
		case LayerZeroNetworks.BSC:
			return `https://bscscan.com/tx/${txHash}`
		case LayerZeroNetworks.AVALANCE:
			return `https://snowtrace.io/tx/${txHash}`
	}
}

type MessageGeneratorProps = {
	nonce: number
	source: {
		network: string
	}
	txHash: string
}

// 'Sent allowance tx 118 to blockchain. Scan: https://bscscan.com/tx/{HASH}',
const generateMessage = ({
	nonce,
	source,
	txHash,
}: MessageGeneratorProps): string =>
	`Sent allowance tx ${nonce} to blockchain. Scan: ${getScanLink(
		source.network,
		txHash,
	)}.`

export const useSendAllowanceToBlockchain = () => {
	const historyMessage = generateMessage({
		nonce: 118,
		source: {
			network: 'Binance',
		},
		txHash:
			'0x4f456d53f7178eb9af502c16f51ded4eb7248ed2914cfef8bbe62ac02bf5a130',
	})

	return {
		historyMessage,
	}
}
