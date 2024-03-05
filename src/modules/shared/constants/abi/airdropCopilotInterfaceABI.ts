export const airdropCopilotInterfaceABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_owner',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_manager',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'userAddress',
				type: 'address',
			},
			{
				internalType: 'uint8',
				name: 'discountPercentage',
				type: 'uint8',
			},
		],
		name: 'addDiscount',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: 'userPrice',
				type: 'uint64',
			},
			{
				internalType: 'uint8',
				name: 'discount',
				type: 'uint8',
			},
		],
		name: 'calculateDiscount',
		outputs: [
			{
				internalType: 'uint64',
				name: '',
				type: 'uint64',
			},
		],
		stateMutability: 'pure',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newManager',
				type: 'address',
			},
		],
		name: 'changeManager',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'discounts',
		outputs: [
			{
				internalType: 'uint8',
				name: '',
				type: 'uint8',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'gatherDeposit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'userAddress',
				type: 'address',
			},
		],
		name: 'isSubscriptionActive',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'manager',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_address',
				type: 'address',
			},
			{
				internalType: 'enum Subscription.TIER_TYPE',
				name: '_tierType',
				type: 'uint8',
			},
			{
				internalType: 'uint32',
				name: '_validity',
				type: 'uint32',
			},
		],
		name: 'setSubscription',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'enum Subscription.TIER_TYPE',
				name: 'tierType',
				type: 'uint8',
			},
			{
				internalType: 'uint32',
				name: 'additionalDuration',
				type: 'uint32',
			},
		],
		name: 'setTierAdditionalDuration',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'enum Subscription.TIER_TYPE',
				name: 'tierType',
				type: 'uint8',
			},
			{
				internalType: 'uint64',
				name: 'newBasePriceWei',
				type: 'uint64',
			},
		],
		name: 'setTierPriceWei',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'enum Subscription.TIER_TYPE',
				name: '_tierType',
				type: 'uint8',
			},
		],
		name: 'subscribe',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'subscriptions',
		outputs: [
			{
				internalType: 'enum Subscription.TIER_TYPE',
				name: 'tierType',
				type: 'uint8',
			},
			{
				internalType: 'uint32',
				name: 'validity',
				type: 'uint32',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'enum Subscription.TIER_TYPE',
				name: '',
				type: 'uint8',
			},
		],
		name: 'tiers',
		outputs: [
			{
				internalType: 'uint64',
				name: 'priceWei',
				type: 'uint64',
			},
			{
				internalType: 'uint32',
				name: 'additionalDuration',
				type: 'uint32',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
] as const
