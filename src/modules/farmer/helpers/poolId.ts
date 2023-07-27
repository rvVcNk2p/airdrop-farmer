import { poolsIds } from '@modules/farmer/constants/poolIds'

export const getPoolIdByToken = (chainId: number, token: string) => {
	// @ts-ignore
	const poolId = poolsIds[chainId][token]

	if (!poolId) {
		throw new Error(`Pool id for ${token} on ${chainId} not found`)
	}
	return poolId
}

export const getDestinationPoolId = (chainId: number) => {
	const usdtPoolId = poolsIds[chainId]?.USDT
	const usdcPoolId = poolsIds[chainId]?.USDC

	if (usdtPoolId) return usdtPoolId
	if (usdcPoolId) return usdcPoolId
}
