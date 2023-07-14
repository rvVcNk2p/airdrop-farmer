// 3. Step
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { stargateFinance } from '@modules/shared/constants'
import { tokenAddresses } from '@modules/shared/constants'
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { Address, parseUnits } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { erc20ABI } from 'wagmi'

import { BlancesResponseWithSelectedToken } from './useChooseInitialToken'

type CreateTxForApprovalProps = {
	chainWithHighestBalanceToken: BlancesResponseWithSelectedToken
	wallet: Address
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
	const createTxForApprovalFn = async ({
		chainWithHighestBalanceToken,
		wallet,
	}: CreateTxForApprovalProps) => {
		const { selected, network, chainId } = chainWithHighestBalanceToken
		const client = createWalletClientFactory(wallet, chainId)

		// NOTE: Always test youte request with prepareWriteContract before writeContract
		// https://wagmi.sh/core/actions/writeContract#prepared-usage

		// const hash = await client.writeContract({
		// 	address: tokenAddresses[chainId][selected.token],
		// 	abi: erc20ABI,
		// 	functionName: 'approve',
		// 	args: [
		// 		stargateFinance[chainWithHighestBalanceToken.chainId],
		// 		parseUnits(selected.amount + '', 6),
		// 	],
		// 	account: client.account,
		// })

		// console.log('=== Pending transaction hash::', hash)

		const createTxForApprovalHistory = generateMessage({
			nameOfToken: selected.token,
			network,
			amount: selected.amount,
			nonce: 118,
		})

		return {
			createTxForApprovalHistory,
		}
	}

	return {
		createTxForApprovalFn,
	}
}
