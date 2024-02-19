import {
	TxStatusType,
	type TxHistoryRecordType,
	type ZkSyncMainnetBridgeType,
} from '@modules/farmer/types'
import { type BlancesResponseWithSelectedToken } from '@modules/farmer/hooks/workspace/_shared/useChooseInitialToken'
import { randomWholeNumber } from '@modules/shared/utils/number'

const orbiterBaseUrl =
	'https://openapi.orbiter.finance/explore/v3/yj6toqvwh1177e1sexfy0u1pxx5j8o47'

const postParams = {
	id: 1,
	jsonrpc: '2.0',
	method: 'orbiter_getTradingPairs',
	params: [],
}

const ZKSYNC_ERA_CHAIN_ID = '324'

export const getTradingPairs = async ({
	balanceResponse,
	ethPrice,
	bridge,
	loggerFn,
}: {
	balanceResponse: BlancesResponseWithSelectedToken
	ethPrice: number
	bridge: ZkSyncMainnetBridgeType
	loggerFn: ({}: TxHistoryRecordType) => void
}) => {
	const result = await fetch(orbiterBaseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(postParams),
	}).then((res) => res.json())

	const {
		chainId,
		selected: { token, amount },
		network,
	} = balanceResponse
	const { ruleList, chainList } = result.result

	const requestedRulelist = ruleList.find(
		(rule: any) =>
			rule.fromChain.chainId === chainId + '' &&
			rule.fromChain.symbol === token &&
			rule.toChain.chainId === ZKSYNC_ERA_CHAIN_ID &&
			rule.toChain.symbol === token,
	)

	const { min, max } = bridge.ethToBridgeInPercentage
	const bridgePercentage = randomWholeNumber(min, max)

	const availableAmount = amount - requestedRulelist.tradingFee
	const amountToBridge = ((availableAmount * bridgePercentage) / 100).toFixed(4)

	const amountToBridgeInUsd = (ethPrice * parseFloat(amountToBridge)).toFixed(4)
	const tradingFeeInUsd = (ethPrice * requestedRulelist.tradingFee).toFixed(4)

	loggerFn({
		message: `Plan to bridge $${amountToBridgeInUsd} <span className="text-purple-500">${token}</span> from <span className="text-yellow-500">${network}</span> to <span className="text-yellow-500">ZKSYNC</span> with trading fee $${tradingFeeInUsd}`,
	})

	return {
		pairId: requestedRulelist.pairId,
		amountToBridge,
		amountToBridgeInUsd,
		tradingFee: requestedRulelist.tradingFee,
	}
}
