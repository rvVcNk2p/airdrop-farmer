import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { randomIntFromInterval, sleep } from '@modules/shared/utils'
import { Address } from 'viem'

import { useChooseInitialToken } from '../allowance/useChooseInitialToken'
import { useCreateAllowanceTxForApproval } from '../allowance/useCreateAllowanceTxForApproval'
import { usePlanningToBridge } from '../allowance/usePlanningToBridge'
import { useSendAllowanceToBlockchain } from '../allowance/useSendAllowanceToBlockchain'
import { useCreateBridgeTxForApproval } from '../bridge/useCreateBridgeTxForApproval'
import { useSendBridgeTxToBlockchain } from '../bridge/useSendBridgeTxToBlockchain'

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
	const { sendBridgeTxToBlockchainFn } = useSendBridgeTxToBlockchain({
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
			await sendAllowanceToBlockchainFn({
				wallet,
				client,
				configObj,
				nextNonce,
			})

			const sleepingTimeAfterAllovance = randomIntFromInterval()

			loggerFn({
				timestamp: new Date(),
				wallet,
				status: TxStatusType.INFO,
				message: `Sleeping ${sleepingTimeAfterAllovance} second.`,
			})
			await sleep(sleepingTimeAfterAllovance)

			const bridgeSteps = [
				'Choose USDT on BSC with $85.03 as initial token', // DONE
				'Planning to bridge with STARGATE from BSC USDT to AVALANCHE USDT.', // DONE

				'Created bridge tx 121 to sign: Bridge STARGATE from BSC USDT to AVALANCHE USDT 85.03 USDT.', // DONE
				'Need: $1.08 = Max fee 0.000278547 BNB ($0.65) + Layer Zero fee 0.001856803504922539 BNB ($0.43).' +
					'User has: 0.019681691995708755 BNB ($4.56). Base Fee: 0.00278547 BNB ($0.65).', // DONE - partial
				'Tx 121 was signed.', // DONE

				'Sent bridge tx 121 to blockchain. Scan: https://bscscan.com/tx/{HASH}', // DONE
				'Bridge tx 121 confirmed. Scan: https://bscscan.com/tx/{HASH}', // DONE
				'Bridge successfully from BSC to AVALANCHE. Tx is: 121. Scan: https://bscscan.com/tx/{HASH}', // IN PROGRESS
				'Sleeping 116 seconds.', // DONE
			]

			// Bridge creation - Step 1
			// await chooseInitialTokenFn({
			// 	selectedNetworks,
			// 	wallet,
			// })

			// // Bridge creation - Step 2
			// await planningToBridgeFn({
			// 	selectedNetworks,
			// 	chainWithHighestBalanceToken,
			// 	wallet,
			// })

			// // Bridge creation - Step 3
			// const { bridgeConfigObj, nextBridgeNonce } =
			// 	await createBridgeTxForApprovalFn({
			// 		wallet,
			// 		client,
			// 		chainWithHighestBalanceToken,
			// 		destination,
			// 	})

			// // Bridge creation - Step 4
			// const receipt = await sendBridgeTxToBlockchainFn({
			// 	wallet,
			// 	client,
			// 	bridgeConfigObj,
			// 	nextBridgeNonce,
			// })

			// const sleepingTimeAfterBridge = randomIntFromInterval()

			// loggerFn({
			// 	timestamp: new Date(),
			// 	wallet,
			// 	status: TxStatusType.INFO,
			// 	message: `Sleeping ${sleepingTimeAfterBridge} second.`,
			// })
			// await sleep(sleepingTimeAfterBridge)
			// loggerFn({
			// 	timestamp: new Date(),
			// 	wallet,
			// 	status: TxStatusType.INFO,
			// 	message: `Sequence completed.`,
			// })
		} catch (error) {
			console.error(error)
		}
	}

	return {
		generateAllowanceAndBridge,
	}
}
