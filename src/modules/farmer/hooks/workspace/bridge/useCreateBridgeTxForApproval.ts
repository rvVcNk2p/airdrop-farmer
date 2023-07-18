// 3. Step
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { stargateFinance } from '@modules/shared/constants'
import { tokenAddresses } from '@modules/shared/constants'
import { Address, parseUnits } from 'viem'
import { erc20ABI } from 'wagmi'

import { BlancesResponseWithSelectedToken } from '../allowance/useChooseInitialToken'
import { TxHistoryRecordType, TxStatusType } from '../useActivityHistory'

type CreateTxForApprovalProps = {
	loggerFn: ({}: TxHistoryRecordType) => void
}

type CreateTxForApprovalFnProps = {
	wallet: Address
	client: ReturnType<typeof createWalletClientFactory>
	chainWithHighestBalanceToken: BlancesResponseWithSelectedToken
	destination: { network: string; token: string }
}

export type MessageGeneratorProps = {
	selected: { token: string; amount: number }
	network: string
	destination: { network: string; token: string }
	nonce: number
	bridge: string
}

const generateMessage = ({
	selected,
	network,
	destination,
	nonce,
	bridge,
}: MessageGeneratorProps): string =>
	`<p>Created bridge tx ${nonce} to sign: Bridge ${bridge} from <span className="text-yellow-500">${network}</span> <span className="text-purple-500">${selected.token}</span> to <span className="text-yellow-500">${destination.network}</span> <span className="text-purple-500">${destination.token}</span> $${selected.amount} <span className="text-purple-500">${selected.token}</span>.`

export const useCreateBridgeTxForApproval = ({
	loggerFn,
}: CreateTxForApprovalProps) => {
	const createBridgeTxForApprovalFn = async ({
		wallet,
		client,
		chainWithHighestBalanceToken,
		destination,
	}: CreateTxForApprovalFnProps) => {
		const { selected, network, chainId } = chainWithHighestBalanceToken

		const transactionCount = await client.getTransactionCount({
			address: client.account.address,
			blockTag: 'pending',
		})
		const nextNonce = transactionCount + 1

		// Created bridge tx 100 to sign: Bridge STARGATE from BSC USDT to AVALANCHE USDT 85.03 USDT..
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: generateMessage({
				selected,
				network,
				destination,
				nonce: nextNonce,
				bridge: 'STARGATE', // TODO: Make it dynamic
			}),
		})

		// TODO: Need: $1.08 = Max fee 0.000278547 BNB ($0.65) + Layer Zero fee 0.001856803504922539 BNB ($0.43). User has: 0.019681691995708755 BNB ($4.56). Base Fee: 0.00278547 BNB ($0.65).

		// Tx 100 was signed.
		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: `Tx ${nextNonce} was signed.`,
		})
	}

	return {
		createBridgeTxForApprovalFn,
	}
}
