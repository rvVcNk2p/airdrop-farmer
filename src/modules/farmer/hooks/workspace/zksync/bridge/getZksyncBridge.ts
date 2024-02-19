import {
	TxHistoryRecordType,
	ZkSyncMainnetBridgeType,
} from '@modules/farmer/types'
import { Address, parseUnits } from 'viem'
import {
	useChooseInitialToken,
	getEstimatedSendTransactionFee,
} from '@modules/farmer/hooks/workspace/_shared'

import { getTradingPairs } from '@modules/farmer/hooks/workspace/zksync/bridge/orbiter/1_getTradingPairs'
import { setOrbiterTargetNetwork } from './orbiter/setOrbiterTargetNetwork'

type BridgeFnProps = {
	actionUid: string
	walletPrivateKey: Address
	bridge: ZkSyncMainnetBridgeType
	loggerFn: ({}: TxHistoryRecordType) => void
}

export const getZksyncBridge = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { chooseInitialTokenFn } = useChooseInitialToken()

	const orbiterZksyncBridgeFn = async ({
		actionUid,
		walletPrivateKey,
		bridge,
		loggerFn,
	}: BridgeFnProps) => {
		// STEP 1. | Choose the chain with the highest balance of ETH
		const { chainWithHighestBalanceToken, ethPrice } =
			await chooseInitialTokenFn({
				wallet: walletPrivateKey,
				selectedNetworks: ['ETHEREUM', 'ARBITRUM', 'OPTIMISM'],
				externalChainAvailableTokens: ['ETH'],
				loggerFn,
			})

		// STEP 2. | Get trading pairs
		const { pairId, amountToBridge, tradingFee } = await getTradingPairs({
			balanceResponse: chainWithHighestBalanceToken,
			ethPrice,
			bridge,
			loggerFn,
		})

		const { configuredBridgeAmountInWei } = await setOrbiterTargetNetwork(
			amountToBridge,
			tradingFee,
		)

		// STEP 3. | Get estimated send transaction fee
		await getEstimatedSendTransactionFee({
			wallet: walletPrivateKey,
			chainId: chainWithHighestBalanceToken.chainId,
			to: '0xe4edb277e41dc89ab076a1f049f4a3efa700bce8',
			value: configuredBridgeAmountInWei,
			ethPrice,
			loggerFn,
		})
		// Created tx 21647 to bridge $29.02 of ETH from ETHEREUM to ZKSYNC
		// Tx 21647 was signed.
		// Sent bridge tx 21647 to ETHEREUM chain. View on Scan.
		// Bridge tx 21647 confirmed. View on Scan.

		console.log(
			'== chainWithHighestBalanceToken: ',
			chainWithHighestBalanceToken,
			amountToBridge,
			tradingFee,
		)

		return new Promise((resolve) => {
			setTimeout(() => {
				console.log('== zksync - orbiterZksyncBridgeFn', bridge)
				resolve(123)
			}, 1000)
		})
	}

	return {
		orbiterZksyncBridgeFn,
	}
}
