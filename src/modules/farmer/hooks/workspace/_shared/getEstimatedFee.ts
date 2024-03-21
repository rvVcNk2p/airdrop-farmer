import { ChainIds } from '@/modules/shared/constants'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { formatUnits } from 'viem'
import { getScrollL1Fee } from './getScrollL1Fee'

type GetEstimatedTransactionFeeProps = {
	client: ReturnType<typeof createWalletClientFactory>
	configObj: any
	ethPrice: number
	maxGasPerTransaction: number
}

export const getEstimatedTransactionFee = async ({
	client,
	configObj,
	ethPrice,
	maxGasPerTransaction,
}: GetEstimatedTransactionFeeProps) => {
	const estimatedGas = await client.estimateGas(configObj)
	const baseGasPrice = await client.getGasPrice()

	const gasPriceInEth = (
		parseFloat(formatUnits(estimatedGas * baseGasPrice, 18)) * ethPrice
	).toFixed(2)

	if (parseFloat(gasPriceInEth) > maxGasPerTransaction) {
		throw new Error('Gas price is too high! Please try again later.')
	}

	return {
		estimatedGas,
		baseGasPrice,
		gasPriceInEth,
	}
}

export const getEstimatedContractTransactionFee = async ({
	client,
	configObj,
	ethPrice,
	maxGasPerTransaction,
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

	if (parseFloat(gasPriceInUsd) > maxGasPerTransaction) {
		throw new Error(
			`Gas price is too high, yet it's $${gasPriceInUsd}! Please try again later or raise the gas limit.`,
		)
	}

	return {
		estimatedGas,
		baseGasPrice,
		gasPriceInUsd,
	}
}
