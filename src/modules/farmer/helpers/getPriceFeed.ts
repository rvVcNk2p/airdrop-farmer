import { Address, formatUnits } from 'viem'
import { aggregatorV3InterfaceABI } from '@/modules/farmer/constants/abi/aggregatorV3InterfaceABI'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { mainnet } from 'viem/chains'

// https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1&search=ETH%2FUsd
enum PairAddresses {
	'ETH-USD' = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // 8 decimals
	'USDC-USD' = '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6', // 8 decimals
	'USDC-ETH' = '0x986b5E1e1755e3C2440e960477f25201B0a8bbD4', // 18 decimals
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

	// TODO: Sometimes priceFeed is empty... investigate why and fix it
	console.log('PriceFeed:', priceFeed)

	// @ts-ignore
	const [, price, , ,] = priceFeed[0].result
	const decimals = priceFeed[1].result as number

	// console.log(` Price of [${pairSymbol}]: `, formatUnits(price, decimals))

	return parseFloat(formatUnits(price, decimals))
}
