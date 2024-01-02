import { createWalletClientFactory } from './createWalletClientFactory'

type GetEstimatedTransactionFeeProps = {
	client: ReturnType<typeof createWalletClientFactory>
	rawConfigObj: any
}

const increaseBigIntBy10Percent = (bigNumber: bigint) =>
	(bigNumber * BigInt(11)) / BigInt(10) // 10% increase

const getFeeHistory = async ({
	client,
}: {
	client: ReturnType<typeof createWalletClientFactory>
}) => {
	// @ts-ignore
	const result = await client.getFeeHistory({
		blockCount: 1,
		rewardPercentiles: [50],
	})

	return result?.reward?.flat()[0] ?? BigInt(0)
}

export const getEstimatedTransactionFee = async ({
	client,
	rawConfigObj,
}: GetEstimatedTransactionFeeProps) => {
	// ERROR: FeeLibrary: not enough balance => wrong PoolId
	// @ts-ignore
	const estimatedGas = await client.estimateContractGas(rawConfigObj)
	// @ts-ignore
	const baseGasPrice = await client.getGasPrice()
	const tip = await getFeeHistory({ client })

	return {
		gas: estimatedGas,
		maxFeePerGas: baseGasPrice,
		maxPriorityFeePerGas: tip,
	}
}
