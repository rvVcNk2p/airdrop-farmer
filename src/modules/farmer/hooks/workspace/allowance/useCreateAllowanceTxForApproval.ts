// 3. Step
import { stargateFinance } from '@modules/farmer/constants/bridges'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { tokenAddresses } from '@modules/shared/constants'
import { Address, parseUnits } from 'viem'
import { erc20ABI } from 'wagmi'

import { BlancesResponseWithSelectedToken } from './useChooseInitialToken'

type CreateTxForApprovalProps = {
	loggerFn: ({}: TxHistoryRecordType) => void
}

type CreateTxForApprovalFnProps = {
	wallet: Address
	chainWithHighestBalanceToken: BlancesResponseWithSelectedToken
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

export const useCreateAllowanceTxForApproval = ({
	loggerFn,
}: CreateTxForApprovalProps) => {
	const createAllowanceTxForApprovalFn = async ({
		chainWithHighestBalanceToken,
		wallet,
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

		const gasPrice = await client.getGasPrice()

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
			gas: 100000,
			maxFeePerGas: gasPrice,
			maxPriorityFeePerGas: 80000000000, // TODO: Calculate it, don't hardcode it.
		}

		return {
			client,
			configObj,
			nextNonce,
		}
	}

	return {
		createAllowanceTxForApprovalFn,
	}
}
