// 1. Step
import { convert } from '@/modules/shared/utils/bignumber'
import { getPriceFeed } from '@modules/farmer/helpers/getPriceFeed'
import { TxHistoryRecordType } from '@modules/farmer/types'
import { ChainIds, chainAvailableTokens } from '@modules/shared/constants'
import { balancesFetcher } from '@modules/shared/fetchers'
import { Address, formatUnits, parseUnits } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

type ChooseInitialTokenFnProps = {
	selectedNetworks: string[]
	wallet: Address
	loggerFn: ({}: TxHistoryRecordType) => void
	externalChainAvailableTokens?: string[]
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
		amountInUsd: number
	}
}

const findChainWithHighestBalanceToken = (
	arr: BlancesResponse[],
	ethPrice: number,
): BlancesResponseWithSelectedToken | null => {
	const result = arr.reduce(
		(acc, curr) => {
			for (const singleBalance of curr.balances) {
				for (const [token, balance] of Object.entries(singleBalance)) {
					let floatBalance = parseFloat(balance + '')
					let amountInUsd = floatBalance
					if (
						token === 'NATIVE_TOKEN' ||
						token === 'ETH' ||
						token === 'WETH' ||
						token === 'vMLP'
					) {
						amountInUsd *= ethPrice
					}

					let adjustedAmountInUsd = amountInUsd.toFixed(4)
					// TODO: vMLP is not a token, it's a pool, so we should adjust the logic to handle this case
					if (token === 'vMLP') {
						adjustedAmountInUsd = parseFloat(
							formatUnits(
								parseUnits(convert(amountInUsd + '', 'eth', 'wei'), 8),
								18,
							),
						).toFixed(4)
					}
					if (amountInUsd > acc.maxBalance) {
						acc.maxBalance = amountInUsd
						// @ts-ignore
						acc.maxBalanceObject = {
							...curr,
							selected: {
								token,
								amount: floatBalance,
								amountInUsd: adjustedAmountInUsd,
							},
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
	`<p>Biggest <span className="text-purple-500">${nameOfToken}</span> balance in $${amount} on <span className="text-yellow-500">${network}</span></p>`

export const useChooseInitialToken = () => {
	const chooseInitialTokenFn = async ({
		selectedNetworks,
		wallet,
		loggerFn,
		externalChainAvailableTokens,
	}: ChooseInitialTokenFnProps) => {
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
						privateKeyToAccount(wallet).address,
						chainId,
						externalChainAvailableTokens ?? chainAvailableTokens[chainId],
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

		let ethPrice = 1

		if (
			balancesResult[0].balances.some((result) =>
				Object.keys(result).includes('ETH'),
			)
		) {
			ethPrice = await getPriceFeed({
				privateKey: wallet,
				pairSymbol: 'ETH-USD',
			})
		}

		// Populate the chainWithHighestBalanceToken with the highest balance token
		// TODO: vMLP is not a token, it's a pool, so we should adjust the logic to handle this case
		const chainWithHighestBalanceToken = findChainWithHighestBalanceToken(
			balancesResult,
			ethPrice,
		)

		// TODO: Check if chain has enough balance to pay for the gas fee

		if (chainWithHighestBalanceToken === null) {
			throw new Error(
				'Please top up your USDC, USDT and/or ETH balances in the target networks.',
			)
		}

		const {
			selected: { token, amountInUsd },
			network,
		} = chainWithHighestBalanceToken

		loggerFn({
			message: generateMessage({
				nameOfToken: token,
				network,
				amount: amountInUsd,
			}),
		})

		return {
			chainWithHighestBalanceToken,
			ethPrice,
		}
	}

	return {
		chooseInitialTokenFn,
	}
}
