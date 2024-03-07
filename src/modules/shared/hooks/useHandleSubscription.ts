import { airdropCopilotInterfaceABI } from '@modules/shared/constants/abi/airdropCopilotInterfaceABI'
import { readContracts, writeContract } from '@wagmi/core'
import { config } from '@modules/shared/components/wrappers/WagmiWrapper'
import { createWalletClientFactory } from '@/modules/farmer/helpers/createWalletClientFactory'
import { Address } from 'viem'
import { arbitrum, sepolia } from 'viem/chains'
import { waitForTransactionReceipt } from 'viem/actions'

const AIRDROP_COPILOT_SUBSCRIPTION_CONTRACT_ADDRESS = process.env
	.NEXT_PUBLIC_SUBSCRIPTION_CONTRACT_ADDRESS as Address

export enum TierTypes {
	BASIC = 'BASIC', // 0
	PRO = 'PRO', // 1
	YEARLY_PRO = 'YEARLY_PRO', // 2
	LIFETIME_PREMIUM = 'LIFETIME_PREMIUM', // 3
	FREE = 'FREE', // 4
}
export enum TierIndexTypes {
	BASIC = 0, // 0
	PRO = 1, // 1
	YEARLY_PRO = 2, // 2
	LIFETIME_PREMIUM = 3, // 3
	FREE = 4, // 4
}

const getTierStringByIndex = (index: number) => {
	switch (index) {
		case 0:
			return TierTypes.BASIC
		case 1:
			return TierTypes.PRO
		case 2:
			return TierTypes.YEARLY_PRO
		case 3:
			return TierTypes.LIFETIME_PREMIUM
		default:
			return TierTypes.BASIC
	}
}

const tiersConfig = (chain: number) => {
	return [0, 1, 2, 3].map((key) => ({
		chain,
		abi: airdropCopilotInterfaceABI,
		address: AIRDROP_COPILOT_SUBSCRIPTION_CONTRACT_ADDRESS,
		functionName: 'tiers',
		args: [key],
	}))
}

export const useHandleSubscription = ({
	managerPrivatekey,
}: {
	managerPrivatekey: Address
}) => {
	const chainId =
		process.env.NEXT_PUBLIC_TARGET_NETWORK === 'SEPOLIA'
			? sepolia.id
			: arbitrum.id

	const client = createWalletClientFactory(managerPrivatekey, chainId)

	const getTiers = async () => {
		const result = await readContracts(config, {
			contracts: tiersConfig(chainId),
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
				type: TierTypes.YEARLY_PRO,
				// @ts-ignore
				price: result[2].result[0],
			},
			{
				type: TierTypes.LIFETIME_PREMIUM,
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
		const result = await client.writeContract({
			abi: airdropCopilotInterfaceABI,
			address: AIRDROP_COPILOT_SUBSCRIPTION_CONTRACT_ADDRESS,
			functionName: 'addDiscount',
			args: [userAddress, discountPercentage],
		})

		return result
	}

	const subscribe = async (tierType: TierTypes, tierPrice: bigint) => {
		try {
			const hash = await writeContract(config, {
				abi: airdropCopilotInterfaceABI,
				address: AIRDROP_COPILOT_SUBSCRIPTION_CONTRACT_ADDRESS,
				functionName: 'subscribe',
				value: tierPrice,
				args: [TierIndexTypes[tierType]],
			})

			await waitForTransactionReceipt(client, { hash })
		} catch (e: any) {
			throw new Error(e.message)
		}
	}

	const getOnChainSubscription = async (walletAddr: Address) => {
		const result = await readContracts(config, {
			contracts: [
				{
					abi: airdropCopilotInterfaceABI,
					address: AIRDROP_COPILOT_SUBSCRIPTION_CONTRACT_ADDRESS,
					functionName: 'subscriptions',
					args: [walletAddr],
				},
			],
		})

		const subscription = {
			tier: 'FREE' as TierTypes,
			expiry: null,
		} as {
			tier: TierTypes
			expiry: number | null
		}

		if (result && result[0] && result[0].result) {
			const [index, timestamp] = result[0].result as [number, number]
			if (timestamp !== 0) {
				subscription.tier = getTierStringByIndex(index)
				subscription.expiry = timestamp
			}
		}

		return subscription
	}

	const getIsSubscriptionActive = async ({
		userAddress,
	}: {
		userAddress: Address
	}) => {
		const result = await client.readContract({
			abi: airdropCopilotInterfaceABI,
			address: AIRDROP_COPILOT_SUBSCRIPTION_CONTRACT_ADDRESS,
			functionName: 'isSubscriptionActive',
			args: [userAddress],
		})

		if (result) return result
		else return false
	}

	const getDiscountAmount = async (userAddress: Address) => {
		const result = await readContracts(config, {
			contracts: [
				{
					abi: airdropCopilotInterfaceABI,
					address: AIRDROP_COPILOT_SUBSCRIPTION_CONTRACT_ADDRESS,
					functionName: 'discounts',
					args: [userAddress],
				},
			],
		})

		if (result && result[0] && result[0].result) return result[0].result
		else return 0
	}

	return {
		getOnChainSubscription,
		getTiers,
		updateDiscountPercentageOnChain,
		subscribe,
		getIsSubscriptionActive,
		getDiscountAmount,
	}
}
