import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'

export const getNextNonce = async (
	client: ReturnType<typeof createWalletClientFactory>,
) => {
	const transactionCount = await client.getTransactionCount({
		address: client.account.address,
		blockTag: 'pending',
	})
	const nextNonce = transactionCount + 1

	return { nextNonce, transactionCount }
}
