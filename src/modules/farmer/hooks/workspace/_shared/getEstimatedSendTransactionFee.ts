import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { Address, formatUnits } from 'viem'

type GetEstimatedTransactionFeeProps = {
	client: ReturnType<typeof createWalletClientFactory>
	to: Address
	value: string
	ethPrice: number
	maxGasPerBridging: number
	loggerFn: ({}: TxHistoryRecordType) => void
}

export const getEstimatedSendTransactionFee = async ({
	client,
	to,
	value,
	ethPrice,
	maxGasPerBridging,
	loggerFn,
}: GetEstimatedTransactionFeeProps) => {
	const estimatedGas = await client.estimateGas({
		to,
		value: BigInt(value),
	})
	const baseGasPrice = await client.getGasPrice()

	const gasPriceInEth = (
		parseFloat(formatUnits(estimatedGas * baseGasPrice, 18)) * ethPrice
	).toFixed(2)

	if (parseFloat(gasPriceInEth) > maxGasPerBridging) {
		throw new Error('Gas price is too high! Please try again later.')
	}

	loggerFn({
		timestamp: new Date(),
		status: TxStatusType.INFO,
		message: `Will spend on gas up to $${gasPriceInEth}`,
	})

	return {
		configObj: {
			to,
			value: BigInt(value),
		},
	}
}
