import { convert } from '@modules/shared/utils/bignumber'

const ZKSYNC_NETWORK_CODE = '9014'

export const setOrbiterTargetNetwork = async (
	amountToBridge: string | undefined,
	tradingFee: string,
): Promise<{ configuredBridgeAmountInWei: string }> => {
	const bridgeAmountInWei = convert(
		Number(amountToBridge) + Number(tradingFee) + '',
		'eth',
		'wei',
	)
	const configuredBridgeAmountInWei =
		bridgeAmountInWei.slice(0, -4) + ZKSYNC_NETWORK_CODE

	return {
		configuredBridgeAmountInWei,
	}
}
