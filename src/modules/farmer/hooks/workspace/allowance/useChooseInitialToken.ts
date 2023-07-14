// 1. Step
import { ChainIds, chainAvailableTokens } from '@modules/shared/constants'
import { balancesFetcher } from '@modules/shared/fetchers'

type ChooseInitialTokenMessageProps = {
	selectedNetworks: string[]
	wallet: string
}

type MessageGeneratorProps = {
	nameOfToken: string
	network: string
	amount: string | number
}

type BalancesResult = {
	[token: string]: string
}

type BlancesResponse = {
	network: string
	chainId: number
	balances: BalancesResult[]
}

export type BlancesResponseWithSelectedToken = BlancesResponse & {
	selected: {
		token: string
		amount: number
	}
}

const findChainWithHighestBalanceToken = (
	arr: BlancesResponse[],
): BlancesResponseWithSelectedToken | null => {
	const result = arr.reduce(
		(acc, curr) => {
			for (const singleBalance of curr.balances) {
				for (const [token, balance] of Object.entries(singleBalance)) {
					if (token !== 'NATIVE_TOKEN') {
						const floatBalance = parseFloat(balance + '')
						if (floatBalance > acc.maxBalance) {
							acc.maxBalance = floatBalance
							// @ts-ignore
							acc.maxBalanceObject = {
								...curr,
								selected: { token, amount: floatBalance },
							}
						}
					}
				}
			}
			return acc
		},
		{ maxBalance: 0, maxBalanceObject: null },
	)

	if (result.maxBalance === 0) {
		return null
	}

	return result.maxBalanceObject
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
	const chooseInitialToken = async () => {
		const activechainIds = selectedNetworks.map((network) => ({
			network,
			chainId: ChainIds[network],
		}))

		// Fetch balances for each chain
		const balancesResult: BlancesResponse[] = await Promise.all(
			await activechainIds.map(async ({ network, chainId }) => {
				return {
					network,
					chainId,
					balances: await balancesFetcher(
						wallet,
						chainId,
						chainAvailableTokens[chainId],
					),
				}
			}),
		)
		const validBalancesResults = balancesResult.filter(
			(result) => !(result instanceof Error),
		)

		if (validBalancesResults.length !== balancesResult.length) {
			throw new Error('Something went wrong during balances fetching!')
		}

		// Populate the chainWithHighestBalanceToken with the highest balance token
		const chainWithHighestBalanceToken =
			findChainWithHighestBalanceToken(balancesResult)

		// TODO: Check if chain has enough balance to pay for the gas fee

		if (chainWithHighestBalanceToken === null) {
			throw new Error(
				'Please top up your USDT and/or USDT balances in the target networks.',
			)
		}

		const {
			selected: { token, amount },
			network,
		} = chainWithHighestBalanceToken

		const historyMessage = generateMessage({
			nameOfToken: token,
			network,
			amount,
		})

		return {
			chooseInitialTokenHistoryMessage: historyMessage,
			chainWithHighestBalanceToken,
		}
	}

	return {
		chooseInitialToken,
	}
}
