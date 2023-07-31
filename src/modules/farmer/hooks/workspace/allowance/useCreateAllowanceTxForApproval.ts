// 3. Step
import { stargateFinance } from '@modules/farmer/constants/bridges'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { getEstimatedTransactionFee } from '@modules/farmer/helpers/getEstimatedTransactionFee'
import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { ChainIds, tokenAddresses } from '@modules/shared/constants'
import { Address, parseUnits } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { erc20ABI } from 'wagmi'

import { BlancesResponseWithSelectedToken } from './useChooseInitialToken'

type CreateTxForApprovalFnProps = {
	wallet: Address
	chainWithHighestBalanceToken: BlancesResponseWithSelectedToken
	loggerFn: ({}: TxHistoryRecordType) => void
}

export type MessageGeneratorProps = {
	nameOfToken: string
	network: string
	amount: string | number
	nonce: number
}

const generateMessage = ({
	nameOfToken,
	network,
	amount,
	nonce,
}: MessageGeneratorProps): string =>
	`<p>Created tx ${nonce} to approve spending $${amount} <span className="text-purple-500">${nameOfToken}</span> on <span className="text-yellow-500">${network}</span>.</p>`

export const useCreateAllowanceTxForApproval = () => {
	const createAllowanceTxForApprovalFn = async ({
		chainWithHighestBalanceToken,
		wallet,
		loggerFn,
	}: CreateTxForApprovalFnProps) => {
		const { selected, network, chainId } = chainWithHighestBalanceToken

		const client = createWalletClientFactory(wallet, chainId)

		// TODO: Check if allowance is already set.

		const transactionCount = await client.getTransactionCount({
			address: client.account.address,
			blockTag: 'pending',
		})
		const nextNonce = transactionCount + 1

		// Created tx 118 to approve spending $85.03 USDT on BSC.
		loggerFn({
			timestamp: new Date(),
			wallet: privateKeyToAccount(wallet).address,
			status: TxStatusType.INFO,
			message: generateMessage({
				nameOfToken: selected.token,
				network,
				amount: selected.amount,
				nonce: nextNonce,
			}),
		})

		// Tx 118 was signed.
		loggerFn({
			timestamp: new Date(),
			wallet: privateKeyToAccount(wallet).address,
			status: TxStatusType.INFO,
			message: `Tx ${nextNonce} was signed.`,
		})

		const decimal = [ChainIds.BSC, ChainIds.METIS].includes(chainId) ? 18 : 6

		const rawConfigObj = {
			chainId,
			address: tokenAddresses[chainId][selected.token],
			abi: erc20ABI,
			functionName: 'approve',
			args: [
				stargateFinance[chainWithHighestBalanceToken.chainId],
				parseUnits(selected.amount + '', decimal),
			],
			account: client.account,
		}

		const { gas, maxFeePerGas, maxPriorityFeePerGas } =
			await getEstimatedTransactionFee({
				client,
				rawConfigObj,
			})

		// BSC do not supports EIP-1559 fees
		const configObj =
			chainId === ChainIds.BSC
				? rawConfigObj
				: {
						...rawConfigObj,
						gas,
						maxFeePerGas,
						maxPriorityFeePerGas,
				  }

		return {
			client,
			configObj,
			nextNonce,
			value: selected.amount,
		}
	}

	return {
		createAllowanceTxForApprovalFn,
	}
}
