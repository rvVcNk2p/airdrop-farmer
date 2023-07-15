// 3. Step
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { stargateFinance } from '@modules/shared/constants'
import { tokenAddresses } from '@modules/shared/constants'
import { Address, parseUnits } from 'viem'
import { erc20ABI } from 'wagmi'

import { TxHistoryRecordType, TxStatusType } from '../useActivityHistory'
import { BlancesResponseWithSelectedToken } from './useChooseInitialToken'

type CreateTxForApprovalProps = {
	loggerFn: ({}: TxHistoryRecordType) => void
}

type CreateTxForApprovalFnProps = {
	chainWithHighestBalanceToken: BlancesResponseWithSelectedToken
	wallet: Address
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

export const useCreateTxForApproval = ({
	loggerFn,
}: CreateTxForApprovalProps) => {
	const createTxForApprovalFn = async ({
		chainWithHighestBalanceToken,
		wallet,
	}: CreateTxForApprovalFnProps) => {
		const { selected, network, chainId } = chainWithHighestBalanceToken
		const client = createWalletClientFactory(wallet, chainId)

		// TODO: Check if allowance is already set.

		const transactionCount = await client.getTransactionCount({
			address: client.account.address,
			blockTag: 'latest', // pending
		})
		const nextNonce = transactionCount + 1

		// await getGasEstimation(client)
		const gasPrice = await client.getGasPrice()

		// Created tx 118 to approve spending $85.03 USDT on BSC.
		loggerFn({
			timestamp: new Date(),
			wallet,
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
			wallet,
			status: TxStatusType.INFO,
			message: `Tx ${nextNonce} was signed.`,
		})

		const configObj = {
			chainId,
			address: tokenAddresses[chainId][selected.token],
			abi: erc20ABI,
			functionName: 'approve',
			args: [
				stargateFinance[chainWithHighestBalanceToken.chainId],
				parseUnits(selected.amount + '', 6),
			],
			account: client.account,
			nonce: nextNonce,
			gas: 100000,
			maxFeePerGas: gasPrice + gasPrice,
			maxPriorityFeePerGas: 30000000000, // 30 gwei
		}

		return {
			client,
			configObj,
		}
	}

	return {
		createTxForApprovalFn,
	}
}
