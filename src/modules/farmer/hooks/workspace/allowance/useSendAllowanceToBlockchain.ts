// 4. Step
import { ChainIds } from '@modules/shared/constants'
import { shortenerAddress } from '@modules/shared/utils'
import { Address } from 'viem'

import { TxHistoryRecordType, TxStatusType } from '../useActivityHistory'
import { BlancesResponseWithSelectedToken } from './useChooseInitialToken'

type SendAllowanceToBlockchainProps = {
	loggerFn: ({}: TxHistoryRecordType) => void
}
type SendAllowanceToBlockchainFnProps = {
	wallet: Address
	client: any
	configObj: any
	chainWithHighestBalanceToken: BlancesResponseWithSelectedToken
}

const getScanLink = (chainId: number, txHash: string) => {
	switch (chainId) {
		case ChainIds.ARBITRUM:
			return `https://arbiscan.io//tx/${txHash}`
		case ChainIds.BSC:
			return `https://bscscan.com/tx/${txHash}`
		case ChainIds.POLYGON:
			return `https://polygonscan.com/tx/${txHash}`
	}
}

type MessageGeneratorProps = {
	nonce: number
	source: {
		chainId: number
	}
	txHash: string
}

// 'Sent allowance tx 118 to blockchain. Scan: https://bscscan.com/tx/{HASH}',
const generateMessage = ({
	nonce,
	source,
	txHash,
}: MessageGeneratorProps): string =>
	`Sent allowance tx ${nonce} to blockchain. Scan: <a href="${getScanLink(
		source.chainId,
		txHash,
	)}" target="_blank" className="text-blue-500">${getScanLink(
		source.chainId,
		shortenerAddress(txHash, 10, 10),
	)}</a>.`

export const useSendAllowanceToBlockchain = ({
	loggerFn,
}: SendAllowanceToBlockchainProps) => {
	const sendAllowanceToBlockchainFn = async ({
		wallet,
		client,
		configObj,
		chainWithHighestBalanceToken,
	}: SendAllowanceToBlockchainFnProps) => {
		// @ts-ignore
		const simulationResult = await client.simulateContract(configObj)

		if (simulationResult.result) {
			console.log('== Good to go')
		}

		// NOTE: Always test youte request with simulateContract before writeContract
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

		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: generateMessage({
				nonce: configObj.nonce,
				source: {
					chainId: chainWithHighestBalanceToken.chainId,
				},
				txHash:
					'0x4f456d53f7178eb9af502c16f51ded4eb7248ed2914cfef8bbe62ac02bf5a130', // hash
			}),
		})

		// console.log('=== Pending transaction hash::', hash)

		// loggerFn({
		// 	timestamp: new Date(),
		// 	wallet,
		// 	status: TxStatusType.SUCCESS,
		// 	message:
		// 		'<p>Allowance tx 118 confirmed. Scan: <a href="https://bscscan.com/tx/0x4f456d53f7178eb9af502c16f51ded4eb7248ed2914cfef8bbe62ac02bf5a130" className="text-blue-500"> https://bscscan.com/tx/0x4f456d53...c02bf5a130</a>.</p>',
		// })
	}

	return {
		sendAllowanceToBlockchainFn,
	}
}
