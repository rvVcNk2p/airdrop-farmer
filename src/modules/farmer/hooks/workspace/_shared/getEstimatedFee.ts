import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { TxHistoryRecordType } from '@modules/farmer/types'
import { formatUnits } from 'viem'

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

	const gasPriceInUsd = (
		parseFloat(formatUnits(estimatedGas * baseGasPrice, 18)) * ethPrice
	).toFixed(2)

	if (parseFloat(gasPriceInUsd) > maxGasPerTransaction) {
		throw new Error('Gas price is too high! Please try again later.')
	}

	return {
		estimatedGas,
		baseGasPrice,
		gasPriceInUsd,
	}
}
