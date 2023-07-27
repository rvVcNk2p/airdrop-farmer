import { poolsIds } from '@modules/farmer/constants/poolIds'

export const getPoolIdByToken = (chainId: number, token: string) => {
	// @ts-ignore
	const poolId = poolsIds[chainId][token]

	if (!poolId) {
		throw new Error(`Pool id for ${token} on ${chainId} not found`)
	}
	return poolId
}

export const getDestinationToken = (chainId: number) => {
	const usdtPoolId = poolsIds[chainId]?.USDT
	const usdcPoolId = poolsIds[chainId]?.USDC

	if (usdtPoolId) return 'USDT'
	if (usdcPoolId) return 'USDC'

	throw new Error(`Pool id for USDT or USDC on ${chainId} not found.`)
}
