// 1. Step
import { ChainIds, chainAvailableTokens } from '@modules/shared/constants'
import { balancesFetcher } from '@modules/shared/fetchers'

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

	const chooseInitialToken = async () => {
		const activechainIds = selectedNetworks.map((network) => ChainIds[network])

		await Promise.all(
			await activechainIds.map(async (chainId) => {
				console.log('== CHAIN ID ==', chainId)

				const balances = await balancesFetcher(
					wallet,
					chainId,
					chainAvailableTokens[chainId],
				)

				console.log(`== BALANCES == ${chainId}`, balances)
			}),
		)

		return historyMessage
	}

	// Choose USDC on BSC with $86.47 as initial token
	// Tasks:
	// 1. Minden hálózaton meg kell nézni, hogy van-e elég tokenünk: USDC és USDT és native tokenek
	// 2. Ha van, akkor a legnagyobb összeget kell kiválasztani
	// 3. Ha nincs legalalább 5

	return {
		chooseInitialToken,
	}
}
