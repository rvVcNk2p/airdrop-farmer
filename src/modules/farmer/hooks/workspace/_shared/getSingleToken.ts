import { ChainIds, chainAvailableTokens } from '@modules/shared/constants'
import { balancesFetcher } from '@modules/shared/fetchers'
import { Address } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

type ChooseInitialTokenFnProps = {
	selectedNetwork: string
	wallet: Address
	externalChainAvailableTokens?: string[]
}

type BalancesResult = {
	[token: string]: string
}

type BlancesResponse = {
	network: string
	chainId: number
	balances: BalancesResult[]
}

export const getSingleToken = async ({
	selectedNetwork,
	wallet,
	externalChainAvailableTokens,
}: ChooseInitialTokenFnProps) => {
	const balanceResult = await new Promise(async (resolve, reject) => {
		try {
			resolve({
				network: selectedNetwork,
				chainId: ChainIds[selectedNetwork],
				balances: await balancesFetcher(
					privateKeyToAccount(wallet).address,
					ChainIds[selectedNetwork],
					externalChainAvailableTokens ??
						chainAvailableTokens[ChainIds[selectedNetwork]],
				),
			})
		} catch (error) {
			reject(error)
		}
	})

	const { balances } = balanceResult as BlancesResponse

	const tokenSymbol = Object.keys(balances[0])[0]
	const tokenAmount = Number(balances[0][tokenSymbol])

	return {
		tokenSymbol,
		tokenAmount,
	}
}
