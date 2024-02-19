import { Address, formatUnits } from 'viem'
import { aggregatorV3InterfaceABI } from '@/modules/farmer/constants/abi/aggregatorV3InterfaceABI'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { mainnet } from 'viem/chains'

// https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1&search=ETH%2FUsd
enum PairAddresses {
	'ETH-USD' = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
}

export const getPriceFeed = async ({
	privateKey,
	pairSymbol,
}: {
	privateKey: Address
	pairSymbol: string
}) => {
	const client = createWalletClientFactory(privateKey, mainnet.id)
	const priceFeed = await client.multicall({
		contracts: [
			{
				// @ts-ignore
				address: PairAddresses[pairSymbol],
				abi: aggregatorV3InterfaceABI,
				functionName: 'latestRoundData',
			},
			{
				// @ts-ignore
				address: PairAddresses[pairSymbol],
				abi: aggregatorV3InterfaceABI,
				functionName: 'decimals',
			},
		],
	})

	// @ts-ignore
	const [, price, , ,] = priceFeed[0].result
	const decimals = priceFeed[1].result as number

	// console.log(` Price of [${pairSymbol}]: `, formatUnits(price, decimals))

	return parseFloat(formatUnits(price, decimals))
}
