import { useActionHistory } from '@/modules/farmer/stores'
import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { randomIntFromInterval, sleep } from '@modules/shared/utils'
import { Address } from 'viem'

import { useChooseInitialToken } from '../allowance/useChooseInitialToken'
import { useCreateAllowanceTxForApproval } from '../allowance/useCreateAllowanceTxForApproval'
import { usePlanningToBridge } from '../allowance/usePlanningToBridge'
import { useSendAllowanceToBlockchain } from '../allowance/useSendAllowanceToBlockchain'
import { useCreateBridgeTxForApproval } from '../bridge/useCreateBridgeTxForApproval'
import { useSendBridgeTxToBlockchain } from '../bridge/useSendBridgeTxToBlockchain'
import { useWaitingForBridgeConfirmation } from '../bridge/useWaitingForBridgeConfirmation'

export type PerformAllowanceProps = {
	loggerFn: ({}: TxHistoryRecordType) => void
}

type RandomSleepAndLogProps = {
	wallet: Address
	loggerFn: ({}: TxHistoryRecordType) => void
}

const randomSleepAndLog = async ({
	wallet,
	loggerFn,
}: RandomSleepAndLogProps) => {
	const sleepingTime = randomIntFromInterval()
	loggerFn({
		timestamp: new Date(),
		wallet,
		status: TxStatusType.INFO,
		message: `Sleeping ${sleepingTime} second.`,
	})
	await sleep(sleepingTime)
}

export const usePerformAllowanceAndBridge = ({
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
	const { waitingForBridgeConfirmationFn } = useWaitingForBridgeConfirmation({
		loggerFn,
	})

	const updateAction = useActionHistory((state) => state.updateAction)

	type PerformAllowanceAndBridgeProps = {
		actionUid: string
		selectedNetworks: string[]
		wallet: Address
	}

	const generateAllowanceAndBridge = async ({
		actionUid,
		selectedNetworks,
		wallet,
	}: PerformAllowanceAndBridgeProps) => {
		try {
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
			const { client, configObj, nextNonce, value } =
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

			// await randomSleepAndLog({ wallet, loggerFn })

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

			// updateAction({
			// 	uid: actionUid,
			// 	layerOneBridge: {
			// 		txHash: receipt.transactionHash,
			// 		srcChainId: chainWithHighestBalanceToken.chainId,
			// 	},
			// })

			// // Bridge creation - Step 5
			// await waitingForBridgeConfirmationFn({
			// 	txHash: receipt.transactionHash,
			//  wallet,
			// })

			// await randomSleepAndLog({ wallet, loggerFn })

			return value
		} catch (error: any) {
			loggerFn({
				timestamp: new Date(),
				wallet,
				status: TxStatusType.ERROR,
				message: error.shortMessage,
			})
			throw new Error(error)
		}
	}

	return {
		generateAllowanceAndBridge,
	}
}
