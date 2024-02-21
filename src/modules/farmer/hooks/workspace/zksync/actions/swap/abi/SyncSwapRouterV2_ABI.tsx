// 20240220180914
// https://api-era.zksync.network/api?module=contract&action=getabi&address=0x9b5def958d0f3b6955cbea4d5b7809b2fb26b059&format=raw
// https://era.zksync.network/address/0x9b5def958d0f3b6955cbea4d5b7809b2fb26b059#code

export const SyncSwapRouterABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_vault',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_wETH',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [],
		name: 'ApproveFailed',
		type: 'error',
	},
	{
		inputs: [],
		name: 'ETHTransferFailed',
		type: 'error',
	},
	{
		inputs: [],
		name: 'Expired',
		type: 'error',
	},
	{
		inputs: [],
		name: 'NotEnoughLiquidityMinted',
		type: 'error',
	},
	{
		inputs: [],
		name: 'TooLittleReceived',
		type: 'error',
	},
	{
		inputs: [],
		name: 'TransferFailed',
		type: 'error',
	},
	{
		inputs: [],
		name: 'TransferFromFailed',
		type: 'error',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'pool',
				type: 'address',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
					{
						internalType: 'bool',
						name: 'useVault',
						type: 'bool',
					},
				],
				internalType: 'struct SyncSwapRouterV2.TokenInput[]',
				name: 'inputs',
				type: 'tuple[]',
			},
			{
				internalType: 'bytes',
				name: 'data',
				type: 'bytes',
			},
			{
				internalType: 'uint256',
				name: 'minLiquidity',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'callback',
				type: 'address',
			},
			{
				internalType: 'bytes',
				name: 'callbackData',
				type: 'bytes',
			},
			{
				internalType: 'address',
				name: 'staking',
				type: 'address',
			},
		],
		name: 'addLiquidity',
		outputs: [
			{
				internalType: 'uint256',
				name: 'liquidity',
				type: 'uint256',
			},
		],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'pool',
				type: 'address',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
					{
						internalType: 'bool',
						name: 'useVault',
						type: 'bool',
					},
				],
				internalType: 'struct SyncSwapRouterV2.TokenInput[]',
				name: 'inputs',
				type: 'tuple[]',
			},
			{
				internalType: 'bytes',
				name: 'data',
				type: 'bytes',
			},
			{
				internalType: 'uint256',
				name: 'minLiquidity',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'callback',
				type: 'address',
			},
			{
				internalType: 'bytes',
				name: 'callbackData',
				type: 'bytes',
			},
			{
				internalType: 'address',
				name: 'staking',
				type: 'address',
			},
		],
		name: 'addLiquidity2',
		outputs: [
			{
				internalType: 'uint256',
				name: 'liquidity',
				type: 'uint256',
			},
		],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'pool',
				type: 'address',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
					{
						internalType: 'bool',
						name: 'useVault',
						type: 'bool',
					},
				],
				internalType: 'struct SyncSwapRouterV2.TokenInput[]',
				name: 'inputs',
				type: 'tuple[]',
			},
			{
				internalType: 'bytes',
				name: 'data',
				type: 'bytes',
			},
			{
				internalType: 'uint256',
				name: 'minLiquidity',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'callback',
				type: 'address',
			},
			{
				internalType: 'bytes',
				name: 'callbackData',
				type: 'bytes',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'approveAmount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'deadline',
						type: 'uint256',
					},
					{
						internalType: 'uint8',
						name: 'v',
						type: 'uint8',
					},
					{
						internalType: 'bytes32',
						name: 'r',
						type: 'bytes32',
					},
					{
						internalType: 'bytes32',
						name: 's',
						type: 'bytes32',
					},
				],
				internalType: 'struct IRouter.SplitPermitParams[]',
				name: 'permits',
				type: 'tuple[]',
			},
			{
				internalType: 'address',
				name: 'staking',
				type: 'address',
			},
		],
		name: 'addLiquidityWithPermit',
		outputs: [
			{
				internalType: 'uint256',
				name: 'liquidity',
				type: 'uint256',
			},
		],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'pool',
				type: 'address',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
					{
						internalType: 'bool',
						name: 'useVault',
						type: 'bool',
					},
				],
				internalType: 'struct SyncSwapRouterV2.TokenInput[]',
				name: 'inputs',
				type: 'tuple[]',
			},
			{
				internalType: 'bytes',
				name: 'data',
				type: 'bytes',
			},
			{
				internalType: 'uint256',
				name: 'minLiquidity',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'callback',
				type: 'address',
			},
			{
				internalType: 'bytes',
				name: 'callbackData',
				type: 'bytes',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'approveAmount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'deadline',
						type: 'uint256',
					},
					{
						internalType: 'uint8',
						name: 'v',
						type: 'uint8',
					},
					{
						internalType: 'bytes32',
						name: 'r',
						type: 'bytes32',
					},
					{
						internalType: 'bytes32',
						name: 's',
						type: 'bytes32',
					},
				],
				internalType: 'struct IRouter.SplitPermitParams[]',
				name: 'permits',
				type: 'tuple[]',
			},
			{
				internalType: 'address',
				name: 'staking',
				type: 'address',
			},
		],
		name: 'addLiquidityWithPermit2',
		outputs: [
			{
				internalType: 'uint256',
				name: 'liquidity',
				type: 'uint256',
			},
		],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'pool',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'liquidity',
				type: 'uint256',
			},
			{
				internalType: 'bytes',
				name: 'data',
				type: 'bytes',
			},
			{
				internalType: 'uint256[]',
				name: 'minAmounts',
				type: 'uint256[]',
			},
			{
				internalType: 'address',
				name: 'callback',
				type: 'address',
			},
			{
				internalType: 'bytes',
				name: 'callbackData',
				type: 'bytes',
			},
		],
		name: 'burnLiquidity',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
				],
				internalType: 'struct IPool.TokenAmount[]',
				name: 'amounts',
				type: 'tuple[]',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'pool',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'liquidity',
				type: 'uint256',
			},
			{
				internalType: 'bytes',
				name: 'data',
				type: 'bytes',
			},
			{
				internalType: 'uint256',
				name: 'minAmount',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'callback',
				type: 'address',
			},
			{
				internalType: 'bytes',
				name: 'callbackData',
				type: 'bytes',
			},
		],
		name: 'burnLiquiditySingle',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
				],
				internalType: 'struct IPool.TokenAmount',
				name: 'amountOut',
				type: 'tuple',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'pool',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'liquidity',
				type: 'uint256',
			},
			{
				internalType: 'bytes',
				name: 'data',
				type: 'bytes',
			},
			{
				internalType: 'uint256',
				name: 'minAmount',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'callback',
				type: 'address',
			},
			{
				internalType: 'bytes',
				name: 'callbackData',
				type: 'bytes',
			},
			{
				components: [
					{
						internalType: 'uint256',
						name: 'approveAmount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'deadline',
						type: 'uint256',
					},
					{
						internalType: 'bytes',
						name: 'signature',
						type: 'bytes',
					},
				],
				internalType: 'struct IRouter.ArrayPermitParams',
				name: 'permit',
				type: 'tuple',
			},
		],
		name: 'burnLiquiditySingleWithPermit',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
				],
				internalType: 'struct IPool.TokenAmount',
				name: 'amountOut',
				type: 'tuple',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'pool',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'liquidity',
				type: 'uint256',
			},
			{
				internalType: 'bytes',
				name: 'data',
				type: 'bytes',
			},
			{
				internalType: 'uint256[]',
				name: 'minAmounts',
				type: 'uint256[]',
			},
			{
				internalType: 'address',
				name: 'callback',
				type: 'address',
			},
			{
				internalType: 'bytes',
				name: 'callbackData',
				type: 'bytes',
			},
			{
				components: [
					{
						internalType: 'uint256',
						name: 'approveAmount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'deadline',
						type: 'uint256',
					},
					{
						internalType: 'bytes',
						name: 'signature',
						type: 'bytes',
					},
				],
				internalType: 'struct IRouter.ArrayPermitParams',
				name: 'permit',
				type: 'tuple',
			},
		],
		name: 'burnLiquidityWithPermit',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
				],
				internalType: 'struct IPool.TokenAmount[]',
				name: 'amounts',
				type: 'tuple[]',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_factory',
				type: 'address',
			},
			{
				internalType: 'bytes',
				name: 'data',
				type: 'bytes',
			},
		],
		name: 'createPool',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
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
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'enteredPools',
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
				name: 'account',
				type: 'address',
			},
		],
		name: 'enteredPoolsLength',
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
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'isPoolEntered',
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
		inputs: [
			{
				internalType: 'bytes[]',
				name: 'data',
				type: 'bytes[]',
			},
		],
		name: 'multicall',
		outputs: [
			{
				internalType: 'bytes[]',
				name: 'results',
				type: 'bytes[]',
			},
		],
		stateMutability: 'payable',
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
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'rescueERC20',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address payable',
				name: 'to',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'rescueETH',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'value',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
			{
				internalType: 'uint8',
				name: 'v',
				type: 'uint8',
			},
			{
				internalType: 'bytes32',
				name: 'r',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 's',
				type: 'bytes32',
			},
		],
		name: 'selfPermit',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'value',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
			{
				internalType: 'bytes',
				name: 'signature',
				type: 'bytes',
			},
		],
		name: 'selfPermit2',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'value',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
			{
				internalType: 'bytes',
				name: 'signature',
				type: 'bytes',
			},
		],
		name: 'selfPermit2IfNecessary',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'nonce',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'expiry',
				type: 'uint256',
			},
			{
				internalType: 'uint8',
				name: 'v',
				type: 'uint8',
			},
			{
				internalType: 'bytes32',
				name: 'r',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 's',
				type: 'bytes32',
			},
		],
		name: 'selfPermitAllowed',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'nonce',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'expiry',
				type: 'uint256',
			},
			{
				internalType: 'uint8',
				name: 'v',
				type: 'uint8',
			},
			{
				internalType: 'bytes32',
				name: 'r',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 's',
				type: 'bytes32',
			},
		],
		name: 'selfPermitAllowedIfNecessary',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'value',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
			{
				internalType: 'uint8',
				name: 'v',
				type: 'uint8',
			},
			{
				internalType: 'bytes32',
				name: 'r',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 's',
				type: 'bytes32',
			},
		],
		name: 'selfPermitIfNecessary',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'target',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
		],
		name: 'stake',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'target',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
		],
		name: 'stakeWithToken',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				components: [
					{
						components: [
							{
								internalType: 'address',
								name: 'pool',
								type: 'address',
							},
							{
								internalType: 'bytes',
								name: 'data',
								type: 'bytes',
							},
							{
								internalType: 'address',
								name: 'callback',
								type: 'address',
							},
							{
								internalType: 'bytes',
								name: 'callbackData',
								type: 'bytes',
							},
							{
								internalType: 'bool',
								name: 'useVault',
								type: 'bool',
							},
						],
						internalType: 'struct IRouter.SwapStep[]',
						name: 'steps',
						type: 'tuple[]',
					},
					{
						internalType: 'address',
						name: 'tokenIn',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amountIn',
						type: 'uint256',
					},
				],
				internalType: 'struct IRouter.SwapPath[]',
				name: 'paths',
				type: 'tuple[]',
			},
			{
				internalType: 'uint256',
				name: 'amountOutMin',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
		],
		name: 'swap',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
				],
				internalType: 'struct IPool.TokenAmount',
				name: 'amountOut',
				type: 'tuple',
			},
		],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				components: [
					{
						components: [
							{
								internalType: 'address',
								name: 'pool',
								type: 'address',
							},
							{
								internalType: 'bytes',
								name: 'data',
								type: 'bytes',
							},
							{
								internalType: 'address',
								name: 'callback',
								type: 'address',
							},
							{
								internalType: 'bytes',
								name: 'callbackData',
								type: 'bytes',
							},
							{
								internalType: 'bool',
								name: 'useVault',
								type: 'bool',
							},
						],
						internalType: 'struct IRouter.SwapStep[]',
						name: 'steps',
						type: 'tuple[]',
					},
					{
						internalType: 'address',
						name: 'tokenIn',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amountIn',
						type: 'uint256',
					},
				],
				internalType: 'struct IRouter.SwapPath[]',
				name: 'paths',
				type: 'tuple[]',
			},
			{
				internalType: 'uint256',
				name: 'amountOutMin',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'approveAmount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'deadline',
						type: 'uint256',
					},
					{
						internalType: 'uint8',
						name: 'v',
						type: 'uint8',
					},
					{
						internalType: 'bytes32',
						name: 'r',
						type: 'bytes32',
					},
					{
						internalType: 'bytes32',
						name: 's',
						type: 'bytes32',
					},
				],
				internalType: 'struct IRouter.SplitPermitParams',
				name: 'permit',
				type: 'tuple',
			},
		],
		name: 'swapWithPermit',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
				],
				internalType: 'struct IPool.TokenAmount',
				name: 'amountOut',
				type: 'tuple',
			},
		],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'vault',
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
		name: 'wETH',
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
] as const
