import {
	TxHistoryRecordType,
	ZkSyncMainnetBridgeType,
} from '@modules/farmer/types'
import { Address } from 'viem'
import { useChooseInitialToken } from '@modules/farmer/hooks/workspace/_shared/useChooseInitialToken'
import { getPriceFeed } from '@modules/farmer/helpers/getPriceFeed'

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
		const { chainWithHighestBalanceToken } = await chooseInitialTokenFn({
			wallet: walletPrivateKey,
			selectedNetworks: ['ETHEREUM', 'ARBITRUM', 'OPTIMISM'],
			loggerFn,
			externalChainAvailableTokens: ['ETH'],
		})
		console.log(
			'== chainWithHighestBalanceToken: ',
			chainWithHighestBalanceToken,
		)

		// Biggest ETH balanace in $34.23 on ETHEREUM
		// Want to bridge up to 33.00 on ETHEREUM excluding fees.
		// Plan to bridge $29.02 ETH from ETHEREUM to ZKSYNC with trading fee $3.39
		// Will spend on gas up to $0.71
		// Created tx 21647 to bridge $29.02 of ETH from ETHEREUM to ZKSYNC
		// Tx 21647 was signed.
		// Sent bridge tx 21647 to ETHEREUM chain. View on Scan.
		// Bridge tx 21647 confirmed. View on Scan.

		// STEP 3. | Bridge the biggest ETH balance from biggest ETH balance chain to ZKSYNC
		// 9014

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
