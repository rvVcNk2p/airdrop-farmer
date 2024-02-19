import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { Address, formatUnits } from 'viem'

type GetEstimatedTransactionFeeProps = {
	wallet: Address
	chainId: number
	to: Address
	value: string
	ethPrice: number
	loggerFn: ({}: TxHistoryRecordType) => void
}

export const getEstimatedSendTransactionFee = async ({
	wallet,
	chainId,
	to,
	value,
	ethPrice,
	loggerFn,
}: GetEstimatedTransactionFeeProps) => {
	try {
		const client = createWalletClientFactory(wallet, chainId)
		const estimatedGas = await client.estimateGas({
			to,
			value: BigInt(value),
		})
		const baseGasPrice = await client.getGasPrice()

		loggerFn({
			timestamp: new Date(),
			status: TxStatusType.SUCCESS,
			message: `Will spend on gas up to $${(
				parseFloat(formatUnits(estimatedGas * baseGasPrice, 18)) * ethPrice
			).toFixed(2)}`,
		})
	} catch (error: any) {
		loggerFn({
			timestamp: new Date(),
			status: TxStatusType.ERROR,
			message: `Error: ${error.message}`,
		})
	}
}
