import { useActionHistory } from '@/modules/farmer/stores'
import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { randomIntFromInterval, sleep } from '@modules/shared/utils'
import { Address } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { useChooseInitialToken } from '../allowance/useChooseInitialToken'
import { useCreateAllowanceTxForApproval } from '../allowance/useCreateAllowanceTxForApproval'
import { usePlanningToBridge } from '../allowance/usePlanningToBridge'
import { useSendAllowanceToBlockchain } from '../allowance/useSendAllowanceToBlockchain'
import { useCreateBridgeTxForApproval } from '../bridge/useCreateBridgeTxForApproval'
import { useSendBridgeTxToBlockchain } from '../bridge/useSendBridgeTxToBlockchain'
import { useWaitingForBridgeConfirmation } from '../bridge/useWaitingForBridgeConfirmation'

type PerformAllowanceAndBridgeProps = {
	actionUid: string
	selectedNetworks: string[]
	wallet: Address
	loggerFn: ({}: TxHistoryRecordType) => void
}

type RandomSleepAndLogProps = {
	wallet: Address
	loggerFn: ({}: TxHistoryRecordType) => void
	min?: number
	max?: number
}

const randomSleepAndLog = async ({
	wallet,
	loggerFn,
	min = 5,
	max = 30,
}: RandomSleepAndLogProps) => {
	const sleepingTime = randomIntFromInterval(min, max)
	loggerFn({
		timestamp: new Date(),
		wallet: privateKeyToAccount(wallet).address,
		status: TxStatusType.INFO,
		message: `Sleeping ${sleepingTime} second.`,
	})
	await sleep(sleepingTime)
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

			// Allowance creation - Step 3
			const { client, configObj, nextNonce, value } =
				await createAllowanceTxForApprovalFn({
					wallet,
					chainWithHighestBalanceToken,
					loggerFn,
				})

			// Allowance creation - Step 4
			await sendAllowanceToBlockchainFn({
				wallet,
				client,
				configObj,
				nextNonce,
				loggerFn,
			})

			await randomSleepAndLog({ wallet, loggerFn, max: 15 })

			// Bridge creation - Step 1
			await chooseInitialTokenFn({
				selectedNetworks,
				wallet,
				loggerFn,
			})

			// Bridge creation - Step 2
			await planningToBridgeFn({
				selectedNetworks,
				chainWithHighestBalanceToken,
				wallet,
				loggerFn,
			})

			// Bridge creation - Step 3
			const { bridgeConfigObj, nextBridgeNonce } =
				await createBridgeTxForApprovalFn({
					wallet,
					client,
					chainWithHighestBalanceToken,
					destination,
					loggerFn,
				})

			// Bridge creation - Step 4
			const receipt = await sendBridgeTxToBlockchainFn({
				wallet,
				client,
				bridgeConfigObj,
				nextBridgeNonce,
				loggerFn,
			})

			updateAction({
				uid: actionUid,
				layerOneBridge: {
					txHash: receipt.transactionHash,
					srcChainId: chainWithHighestBalanceToken.chainId,
				},
			})

			// Bridge creation - Step 5
			await waitingForBridgeConfirmationFn({
				txHash: receipt.transactionHash,
				wallet,
				loggerFn,
			})

			await randomSleepAndLog({ wallet, loggerFn })

			return value
		} catch (error: any) {
			console.error(error)
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
