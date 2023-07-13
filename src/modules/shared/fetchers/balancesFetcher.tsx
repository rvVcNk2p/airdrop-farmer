import { tokenAddresses } from '@modules/shared/constants'
import { fetchBalance } from '@wagmi/core'
import { Address, formatUnits } from 'viem'

type BalancesResult = {
	[token: string]: string
}

export const balancesFetcher = async (
	address: Address | string,
	chainId: number,
	tokens: string[],
): Promise<BalancesResult[]> => {
	return await Promise.all(
		tokens.map(async (token) => {
			// If tokenAddress is undefined, then the fetchBalance() will fetch the balance of Native Token
			const tokenAddress: `0x${string}` | undefined =
				tokenAddresses[chainId][token]

			const balance = await fetchBalance({
				address,
				token: tokenAddress,
				chainId,
			})

			return {
				[token]: Number(formatUnits(balance.value, balance.decimals)).toFixed(
					4,
				),
			}
		}),
	)
}
