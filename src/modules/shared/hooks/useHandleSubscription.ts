import { airdropCopilotInterfaceABI } from '@modules/shared/constants/abi/airdropCopilotInterfaceABI'
import { readContracts, writeContract } from '@wagmi/core'
import { config } from '@modules/shared/components/wrappers/WagmiWrapper'
import { createWalletClientFactory } from '@/modules/farmer/helpers/createWalletClientFactory'
import { Address } from 'viem'
import { arbitrum, sepolia } from 'viem/chains'

const SUBSRIPTION_CONTRACT_ADDRESS =
	'0xF7384c229E4Ac1000c9ec36B45A62a9c7A9AB75F' as const

const MANAGER_PRIVATE_KEY = process.env
	.NEXT_PUBLIC_MANAGER_PRIVATE_KEY as Address

export enum TierTypes {
	BASIC = 'BASIC', // 0
	PRO = 'PRO', // 1
	LIFETIME_BASIC = 'LIFETIME_BASIC', // 2
	LIFETIME_PRO = 'LIFETIME_PRO', // 3
}
export enum TierIndexTypes {
	BASIC = 0, // 0
	PRO = 1, // 1
	LIFETIME_BASIC = 2, // 2
	LIFETIME_PRO = 3, // 3
}

const tiersConfig = () => {
	return [0, 1, 2, 3].map((key) => ({
		abi: airdropCopilotInterfaceABI,
		address: SUBSRIPTION_CONTRACT_ADDRESS,
		functionName: 'tiers',
		args: [key],
	}))
}

export const useHandleSubscription = () => {
	const getTiers = async () => {
		const result = await readContracts(config, {
			contracts: tiersConfig(),
		})

		const tiers = [
			{
				type: TierTypes.BASIC,
				// @ts-ignore
				price: result[0].result[0],
			},
			{
				type: TierTypes.PRO,
				// @ts-ignore
				price: result[1].result[0],
			},
			{
				type: TierTypes.LIFETIME_BASIC,
				// @ts-ignore
				price: result[2].result[0],
			},
			{
				type: TierTypes.LIFETIME_PRO,
				// @ts-ignore
				price: result[3].result[0],
			},
		]

		return tiers
	}

	const updateDiscountPercentageOnChain = async (
		userAddress: Address,
		discountPercentage: number,
	) => {
		const chainId =
			process.env.NEXT_PUBLIC_BASE_PATH === 'http://localhost:3000'
				? sepolia.id
				: arbitrum.id

		const client = createWalletClientFactory(MANAGER_PRIVATE_KEY, chainId)

		const result = await client.writeContract({
			abi: airdropCopilotInterfaceABI,
			address: SUBSRIPTION_CONTRACT_ADDRESS,
			functionName: 'addDiscount',
			args: [userAddress, discountPercentage],
		})

		return result
	}

	const subscribe = async (tierType: TierTypes, tierPrice: bigint) => {
		try {
			await writeContract(config, {
				abi: airdropCopilotInterfaceABI,
				address: SUBSRIPTION_CONTRACT_ADDRESS,
				functionName: 'subscribe',
				value: tierPrice,
				args: [TierIndexTypes[tierType]],
			})
		} catch (e) {
			console.log(e)
		}
	}

	return {
		getTiers,
		updateDiscountPercentageOnChain,
		subscribe,
	}
}
