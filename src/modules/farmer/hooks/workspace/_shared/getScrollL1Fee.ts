import { createWalletClientFactory } from '@/modules/farmer/helpers/createWalletClientFactory'
import { encodeFunctionData } from 'viem'
// https://docs.scroll.io/en/developers/transaction-fees-on-scroll/#estimating-the-l1-data-fee
const L1GasPriceOracle_ADDRESS = '0x5300000000000000000000000000000000000002'
// https://api.scrollscan.com/api?module=contract&action=getabi&address=0x5300000000000000000000000000000000000002&format=raw
const L1GasPriceOracle_ABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_owner',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'l1BaseFee',
				type: 'uint256',
			},
		],
		name: 'L1BaseFeeUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'overhead',
				type: 'uint256',
			},
		],
		name: 'OverheadUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_oldOwner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: '_newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'scalar',
				type: 'uint256',
			},
		],
		name: 'ScalarUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: '_oldWhitelist',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: '_newWhitelist',
				type: 'address',
			},
		],
		name: 'UpdateWhitelist',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'bytes',
				name: '_data',
				type: 'bytes',
			},
		],
		name: 'getL1Fee',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes',
				name: '_data',
				type: 'bytes',
			},
		],
		name: 'getL1GasUsed',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'l1BaseFee',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'overhead',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
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
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'scalar',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_l1BaseFee',
				type: 'uint256',
			},
		],
		name: 'setL1BaseFee',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_overhead',
				type: 'uint256',
			},
		],
		name: 'setOverhead',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_scalar',
				type: 'uint256',
			},
		],
		name: 'setScalar',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_newOwner',
				type: 'address',
			},
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_newWhitelist',
				type: 'address',
			},
		],
		name: 'updateWhitelist',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'whitelist',
		outputs: [
			{
				internalType: 'contract IWhitelist',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
] as const
const TX_DATA_ZERO_GAS = 4
const TX_DATA_NON_ZERO_GAS = 16
const PRECISION = 1e9

type GetL1FeeProps = {
	client: ReturnType<typeof createWalletClientFactory>
	configObj: any
}
export const getScrollL1Fee = async ({ client, configObj }: GetL1FeeProps) => {
	const data = encodeFunctionData({
		abi: configObj.abi,
		functionName: configObj.functionName,
		args: configObj.args,
	})

	const l1BaseFee = await client.readContract({
		abi: L1GasPriceOracle_ABI,
		address: L1GasPriceOracle_ADDRESS,
		functionName: 'l1BaseFee',
	})
	const overhead = await client.readContract({
		abi: L1GasPriceOracle_ABI,
		address: L1GasPriceOracle_ADDRESS,
		functionName: 'overhead',
	})
	const scalar = await client.readContract({
		abi: L1GasPriceOracle_ABI,
		address: L1GasPriceOracle_ADDRESS,
		functionName: 'scalar',
	})

	const zeros = data.split('').filter((c) => c === '0').length
	const nonzeros = data.length - zeros

	const l1Gas = zeros * TX_DATA_ZERO_GAS + (nonzeros + 4) * TX_DATA_NON_ZERO_GAS
	const l1GasFee =
		((BigInt(l1Gas) + BigInt(overhead)) * BigInt(l1BaseFee) * BigInt(scalar)) /
		BigInt(PRECISION)

	return { l1GasFee }
}
