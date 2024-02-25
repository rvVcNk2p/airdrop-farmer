import { airdropCopilotInterfaceABI } from '@modules/shared/constants/abi/airdropCopilotInterfaceABI'
import { readContracts, writeContract } from '@wagmi/core'
import { config } from '@modules/shared/components/wrappers/WagmiWrapper'
import { createWalletClientFactory } from '@/modules/farmer/helpers/createWalletClientFactory'
import { Address } from 'viem'
import { arbitrum, sepolia } from 'viem/chains'
import { waitForTransactionReceipt } from 'viem/actions'

const SUBSRIPTION_CONTRACT_ADDRESS =
	'0x3A1463725200B9a31A758464B52FfcB2bAE39796' as const

const MANAGER_PRIVATE_KEY = process.env
	.NEXT_PUBLIC_MANAGER_PRIVATE_KEY as Address

export enum TierTypes {
	BASIC = 'BASIC', // 0
	PRO = 'PRO', // 1
	LIFETIME_BASIC = 'LIFETIME_BASIC', // 2
	LIFETIME_PRO = 'LIFETIME_PRO', // 3
	FREE = 'FREE', // 4
}
export enum TierIndexTypes {
	BASIC = 0, // 0
	PRO = 1, // 1
	LIFETIME_BASIC = 2, // 2
	LIFETIME_PRO = 3, // 3
	FREE = 4, // 4
}

const getTierStringByIndex = (index: number) => {
	switch (index) {
		case 0:
			return TierTypes.BASIC
		case 1:
			return TierTypes.PRO
		case 2:
			return TierTypes.LIFETIME_BASIC
		case 3:
			return TierTypes.LIFETIME_PRO
		default:
			return TierTypes.BASIC
	}
}

const tiersConfig = () => {
	return [0, 1, 2, 3].map((key) => ({
		abi: airdropCopilotInterfaceABI,
		address: SUBSRIPTION_CONTRACT_ADDRESS,
		functionName: 'tiers',
		args: [key],
	}))
}

const chainId =
	process.env.NEXT_PUBLIC_BASE_PATH === 'http://localhost:3000'
		? sepolia.id
		: arbitrum.id

const client = createWalletClientFactory(MANAGER_PRIVATE_KEY, chainId)

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
			const hash = await writeContract(config, {
				abi: airdropCopilotInterfaceABI,
				address: SUBSRIPTION_CONTRACT_ADDRESS,
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
					address: SUBSRIPTION_CONTRACT_ADDRESS,
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

	return {
		getOnChainSubscription,
		getTiers,
		updateDiscountPercentageOnChain,
		subscribe,
	}
}
