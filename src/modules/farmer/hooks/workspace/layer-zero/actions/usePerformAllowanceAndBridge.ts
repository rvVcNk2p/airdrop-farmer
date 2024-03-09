import { useActionHistory } from '@/modules/farmer/stores'
import {
	TimeIntervalConfigType,
	TxHistoryRecordType,
	TxStatusType,
} from '@modules/farmer/types'
import { Address } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { useChooseInitialToken } from '@modules/farmer/hooks/workspace/_shared/useChooseInitialToken'
import { useCreateAllowanceTxForApproval } from '@modules/farmer/hooks/workspace/allowance/useCreateAllowanceTxForApproval'

import { useSendAllowanceToBlockchain } from '@modules/farmer/hooks/workspace/allowance/useSendAllowanceToBlockchain'
import {
	useCreateBridgeTxForApproval,
	useSendBridgeTxToBlockchain,
	useWaitingForBridgeConfirmation,
	usePlanningToBridge,
} from '@modules/farmer/hooks/workspace/layer-zero/bridge'
import { randomSleepAndLog } from '@/modules/farmer/helpers/sleep'

type PerformAllowanceAndBridgeProps = {
	actionUid: string
	selectedNetworks: string[]
	wallet: Address
	timeIntervals: TimeIntervalConfigType
	loggerFn: ({}: TxHistoryRecordType) => void
}

export const usePerformAllowanceAndBridge = () => {
	// Allowance
	const { chooseInitialTokenFn } = useChooseInitialToken()
	const { planningToBridgeFn } = usePlanningToBridge()
	const { createAllowanceTxForApprovalFn } = useCreateAllowanceTxForApproval()
	const { sendAllowanceToBlockchainFn } = useSendAllowanceToBlockchain()
	// Bridge
	const { createBridgeTxForApprovalFn } = useCreateBridgeTxForApproval()
	const { sendBridgeTxToBlockchainFn } = useSendBridgeTxToBlockchain()
	const { waitingForBridgeConfirmationFn } = useWaitingForBridgeConfirmation()

	const updateAction = useActionHistory((state) => state.updateAction)

	const generateAllowanceAndBridge = async ({
		actionUid,
		selectedNetworks,
		wallet,
		timeIntervals,
		loggerFn,
	}: PerformAllowanceAndBridgeProps) => {
		try {
			// Allowance creation - Step 1
			const chooseInitialTokenHistory = await chooseInitialTokenFn({
				selectedNetworks,
				wallet,
				loggerFn,
			})

			const { chainWithHighestBalanceToken } = chooseInitialTokenHistory

			// Allowance creation - Step 2
			const { destination } = await planningToBridgeFn({
				selectedNetworks,
				chainWithHighestBalanceToken,
				wallet,
				loggerFn,
			})

			console.log('== Allowance creation - Step 2 END')

			// Allowance creation - Step 3
			const { client, configObj, nextNonce, value } =
				await createAllowanceTxForApprovalFn({
					wallet,
					chainWithHighestBalanceToken,
					loggerFn,
				})

			console.log('== Allowance creation - Step 3')
			console.log('== client', client)
			console.log('== configObj', configObj)
			console.log('== nextNonce', nextNonce)
			console.log('== value', value)

			// Allowance creation - Step 4
			await sendAllowanceToBlockchainFn({
				wallet,
				client,
				configObj,
				nextNonce,
				loggerFn,
			})

			// await randomSleepAndLog({
			// 	wallet,
			// 	loggerFn,
			// 	min: timeIntervals.sleepIntervalAfterApproval.from,
			// 	max: timeIntervals.sleepIntervalAfterApproval.to,
			// })

			// // Bridge creation - Step 1
			// await chooseInitialTokenFn({
			// 	selectedNetworks,
			// 	wallet,
			// 	loggerFn,
			// })

			// // Bridge creation - Step 2
			// await planningToBridgeFn({
			// 	selectedNetworks,
			// 	chainWithHighestBalanceToken,
			// 	wallet,
			// 	loggerFn,
			// })

			// // Bridge creation - Step 3
			// const { bridgeConfigObj, nextBridgeNonce } =
			// 	await createBridgeTxForApprovalFn({
			// 		wallet,
			// 		client,
			// 		chainWithHighestBalanceToken,
			// 		destination,
			// 		loggerFn,
			// 	})

			// // Bridge creation - Step 4
			// const receipt = await sendBridgeTxToBlockchainFn({
			// 	wallet,
			// 	client,
			// 	bridgeConfigObj,
			// 	nextBridgeNonce,
			// 	loggerFn,
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
			// 	wallet,
			// 	loggerFn,
			// })

			// await randomSleepAndLog({
			// 	wallet,
			// 	loggerFn,
			// 	min: timeIntervals.timeIntervalAfterTransactions.from,
			// 	max: timeIntervals.timeIntervalAfterTransactions.to,
			// })

			return value
		} catch (error: any) {
			const message = error?.shortMessage ?? error.message
			loggerFn({
				timestamp: new Date(),
				wallet: privateKeyToAccount(wallet).address,
				status: TxStatusType.ERROR,
				message,
			})
			throw new Error(error)
		}
	}

	return {
		generateAllowanceAndBridge,
	}
}
