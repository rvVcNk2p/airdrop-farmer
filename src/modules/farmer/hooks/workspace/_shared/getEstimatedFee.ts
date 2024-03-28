import { ChainIds } from '@/modules/shared/constants'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { formatUnits } from 'viem'
import { getScrollL1Fee } from './getScrollL1Fee'
// import { multiplyBigIntWithFloat } from '@/modules/shared/utils/bignumber'

type GetEstimatedTransactionFeeProps = {
	client: ReturnType<typeof createWalletClientFactory>
	configObj: any
	ethPrice: number
	maxGasPerTransaction: number
	multiplier?: number
}

export const getEstimatedTransactionFee = async ({
	client,
	configObj,
	ethPrice,
	maxGasPerTransaction,
	multiplier = 1,
}: GetEstimatedTransactionFeeProps) => {
	const estimatedGas = await client.estimateGas(configObj)
	const baseGasPrice = await client.getGasPrice()

	const gasPriceInEth = (
		parseFloat(formatUnits(estimatedGas * baseGasPrice, 18)) * ethPrice
	).toFixed(2)

	const parsedGasPriceInEth = parseFloat(gasPriceInEth) * multiplier

	if (parsedGasPriceInEth > maxGasPerTransaction) {
		throw new Error(
			`Gas price is too high, yet it's $${parsedGasPriceInEth}! Please try again later or raise the gas limit.`,
		)
	}

	return {
		estimatedGas, // multiplyBigIntWithFloat(estimatedGas, multiplier),
		baseGasPrice,
		gasPriceInEth,
		parsedGasPriceInEth,
	}
}

export const getEstimatedContractTransactionFee = async ({
	client,
	configObj,
	ethPrice,
	maxGasPerTransaction,
	multiplier = 1,
}: GetEstimatedTransactionFeeProps) => {
	const estimatedGas = await client.estimateContractGas(configObj)
	const baseGasPrice = await client.getGasPrice()

	let estimatedL1Fee = BigInt(0)
	if (client.chain.id === ChainIds.SCROLL) {
		// https://viem.sh/op-stack/actions/estimateTotalFee
		const { l1GasFee } = await getScrollL1Fee({ client, configObj })
		estimatedL1Fee = l1GasFee
	}

	// It is the sum of estimateL1Fee (L1 Gas) and estimateGas * getGasPrice (L2 Gas * L2 Gas Price).
	const gasPriceInUsd = (
		parseFloat(formatUnits(estimatedL1Fee + estimatedGas * baseGasPrice, 18)) *
		ethPrice
	).toFixed(2)

	const parsedGasPriceInUsd = parseFloat(gasPriceInUsd) * multiplier

	if (parsedGasPriceInUsd > maxGasPerTransaction) {
		throw new Error(
			`Gas price is too high, yet it's $${parsedGasPriceInUsd}! Please try again later or raise the gas limit.`,
		)
	}

	return {
		estimatedGas, // multiplyBigIntWithFloat(estimatedGas, multiplier),
		baseGasPrice,
		gasPriceInUsd,
		parsedGasPriceInUsd,
	}
}
