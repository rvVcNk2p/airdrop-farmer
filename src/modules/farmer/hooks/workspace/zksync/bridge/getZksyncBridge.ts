import { type Address } from 'viem'
import {
	TxStatusType,
	type TxHistoryRecordType,
	type ZkSyncMainnetBridgeType,
} from '@modules/farmer/types'

import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { randomSleepAndLog } from '@modules/farmer/helpers/sleep'

import {
	useChooseInitialToken,
	getEstimatedTransactionFee,
	getNextNonce,
} from '@modules/farmer/hooks/workspace/_shared'
import {
	getTradingPairs,
	setOrbiterTargetNetwork,
	createAndSendTxBridgeHandler,
} from '@modules/farmer/hooks/workspace/zksync/bridge/orbiter'

type BridgeFnProps = {
	walletPrivateKey: Address
	bridge: ZkSyncMainnetBridgeType
	loggerFn: ({}: TxHistoryRecordType) => void
}

const ORBITER_BRIDGE_ADDRESS =
	'0xe4edb277e41dc89ab076a1f049f4a3efa700bce8' as Address

export const getZksyncBridge = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { chooseInitialTokenFn } = useChooseInitialToken()
	const { createAndSendBridgeTx } = createAndSendTxBridgeHandler()

	const orbiterZksyncBridgeFn = async ({
		walletPrivateKey,
		bridge,
		loggerFn,
	}: BridgeFnProps) => {
		try {
			// STEP 1. Choose the chain with the highest balance of ETH
			const { chainWithHighestBalanceToken, ethPrice } =
				await chooseInitialTokenFn({
					wallet: walletPrivateKey,
					selectedNetworks: ['ETHEREUM', 'ARBITRUM', 'OPTIMISM'],
					externalChainAvailableTokens: ['ETH'],
					loggerFn,
				})

			// STEP 2. Get trading pairs
			const { amountToBridge, amountToBridgeInUsd, tradingFee } =
				await getTradingPairs({
					balanceResponse: chainWithHighestBalanceToken,
					ethPrice,
					bridge,
					loggerFn,
				})

			const { configuredBridgeAmountInWei } = await setOrbiterTargetNetwork(
				amountToBridge,
				tradingFee,
			)

			const client = createWalletClientFactory(
				walletPrivateKey,
				chainWithHighestBalanceToken.chainId,
			)

			const configObj = {
				to: ORBITER_BRIDGE_ADDRESS,
				value: BigInt(configuredBridgeAmountInWei),
			}

			// STEP 3. | Get estimated send transaction fee
			const { gasPriceInEth } = await getEstimatedTransactionFee({
				client,
				configObj,
				ethPrice,
				maxGasPerTransaction: bridge.maxGasPerBridging,
			})

			loggerFn({
				message: `Will spend on gas up to $${gasPriceInEth}`,
			})

			// STEP 4. | Create and send tx
			const { nextNonce } = await getNextNonce(client)

			const {
				selected: { token },
				network,
				chainId,
			} = chainWithHighestBalanceToken

			await createAndSendBridgeTx({
				client,
				configObj,
				nonce: nextNonce,
				amountToBridgeInUsd,
				token,
				network,
				chainId,
				loggerFn,
			})

			await randomSleepAndLog({ wallet: walletPrivateKey, loggerFn })

			return Number(amountToBridgeInUsd)
		} catch (error: any) {
			loggerFn({
				status: TxStatusType.ERROR,
				message: error.message,
			})
			throw new Error(error)
		}
	}

	return {
		orbiterZksyncBridgeFn,
	}
}
