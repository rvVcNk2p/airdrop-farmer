import { randomIntFromInterval, sleep } from '@modules/shared/utils'
import { Address } from 'viem'

import { useChooseInitialToken } from '../allowance/useChooseInitialToken'
import { useCreateAllowanceTxForApproval } from '../allowance/useCreateAllowanceTxForApproval'
import { usePlanningToBridge } from '../allowance/usePlanningToBridge'
import { useSendAllowanceToBlockchain } from '../allowance/useSendAllowanceToBlockchain'
import { useCreateBridgeTxForApproval } from '../bridge/useCreateBridgeTxForApproval'
import { TxHistoryRecordType, TxStatusType } from '../useActivityHistory'

type PerformAllowanceProps = {
	selectedNetworks: string[]
	wallet: Address
	loggerFn: ({}: TxHistoryRecordType) => void
}

export const usePerformAllowanceAndBridge = ({
	selectedNetworks,
	wallet,
	loggerFn,
}: PerformAllowanceProps) => {
	// Allowance
	const { chooseInitialTokenFn } = useChooseInitialToken({ loggerFn })
	const { planningToBridgeFn } = usePlanningToBridge({ loggerFn })
	const { createAllowanceTxForApprovalFn } = useCreateAllowanceTxForApproval({
		loggerFn,
	})
	const { sendAllowanceToBlockchainFn } = useSendAllowanceToBlockchain({
		loggerFn,
	})
	// Bridge
	const { createBridgeTxForApprovalFn } = useCreateBridgeTxForApproval({
		loggerFn,
	})

	const generateAllowanceAndBridge = async () => {
		try {
			const allowanceSteps = [
				'Choose USDT on BSC with $85.03 as initial token', // DONE
				'Planning to bridge with STARGATE from BSC USDT to AVALANCHE USDT.', // DONE
				'Created tx 118 to approve spending $85.03 USDT on BSC.', // DONE
				'Tx 118 was signed.', // DONE
				'Sent allowance tx 118 to blockchain. Scan: https://bscscan.com/tx/{HASH}', // DONE
				'Allowance tx 118 confirmed. Scan: https://bscscan.com/tx/{HASH}', // DONE - SUCCESS
				'Sleeping 74 seconds.', // DONE
			]

			// Allowance creation - Step 1
			const chooseInitialTokenHistory = await chooseInitialTokenFn({
				selectedNetworks,
				wallet,
			})

			const { chainWithHighestBalanceToken } = chooseInitialTokenHistory

			// Allowance creation - Step 2
			const { destination } = await planningToBridgeFn({
				selectedNetworks,
				chainWithHighestBalanceToken,
				wallet,
			})

			// Allowance creation - Step 3
			const { client, configObj, nextNonce } =
				await createAllowanceTxForApprovalFn({
					wallet,
					chainWithHighestBalanceToken,
				})

			// Allowance creation - Step 4
			// await sendAllowanceToBlockchainFn({
			// 	wallet,
			// 	client,
			// 	configObj,
			// 	nextNonce,
			// })

			// const sleepingTime = randomIntFromInterval()

			// loggerFn({
			// 	timestamp: new Date(),
			// 	wallet,
			// 	status: TxStatusType.INFO,
			// 	message: `Sleeping ${sleepingTime} second.`,
			// })
			// await sleep(sleepingTime)

			const bridgeSteps = [
				'Choose USDT on BSC with $85.03 as initial token', // DONE
				'Planning to bridge with STARGATE from BSC USDT to AVALANCHE USDT.', // DONE

				'Created bridge tx 121 to sign: Bridge STARGATE from BSC USDT to AVALANCHE USDT 85.03 USDT.', // DONE
				'Need: $1.08 = Max fee 0.000278547 BNB ($0.65) + Layer Zero fee 0.001856803504922539 BNB ($0.43).' +
					'User has: 0.019681691995708755 BNB ($4.56). Base Fee: 0.00278547 BNB ($0.65).',

				'Tx 121 was signed.',
				'Sent bridge tx 121 to blockchain. Scan: https://bscscan.com/tx/{HASH}',
				'Bridge tx 121 confirmed. Scan: https://bscscan.com/tx/{HASH}', // SUCCESS
				'Bridge successfully from BSC to AVALANCHE. Tx is: 121. Scan: https://bscscan.com/tx/{HASH}', // SUCCESS ',
				'Sleeping 116 seconds.',
			]

			// Bridge creation - Step 1
			await chooseInitialTokenFn({
				selectedNetworks,
				wallet,
			})

			// Bridge creation - Step 2
			await planningToBridgeFn({
				selectedNetworks,
				chainWithHighestBalanceToken,
				wallet,
			})

			// Bridge creation - Step 3
			await createBridgeTxForApprovalFn({
				wallet,
				client,
				chainWithHighestBalanceToken,
				destination,
			})
		} catch (error) {
			console.error(error)
		}
	}

	return {
		generateAllowanceAndBridge,
	}
}
