import { LAYER_ZERO_ABI } from '@modules/farmer/constants/contracts/layerZeroRouter'
import { Address, formatUnits } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { stargateFinance } from '../constants/bridges'
import { createWalletClientFactory } from './createWalletClientFactory'

const TYPE_SWAP_REMOTE = 1

type GetEstimatedLayerOneFeeProps = {
	client: ReturnType<typeof createWalletClientFactory>
	wallet: Address
	chainId: number
	_dstChainId: number
	_to: string
}

export const getEstimatedLayerOneFee = async ({
	client,
	wallet,
	chainId,
	_dstChainId,
	_to,
}: GetEstimatedLayerOneFeeProps) => {
	const address = privateKeyToAccount(wallet).address
	const nativeTokenInWei = await client.getBalance({
		address,
		// @ts-ignore
		token: undefined,
		chainId,
	})

	// Calculate the LayerZero fee
	// https://stargateprotocol.gitbook.io/stargate/developers/cross-chain-swap-fee
	const args = {
		_dstChainId,
		_functionType: TYPE_SWAP_REMOTE,
		_toAddress: _to,
		_payload: '0x',
		_lzTxParams: {
			dstGasForCall: 0,
			dstNativeAmount: 0,
			dstNativeAddr: '0x0000000000000000000000000000000000000001',
		},
	}
	const quoteData = await client.readContract({
		address: stargateFinance[chainId],
		abi: LAYER_ZERO_ABI.abi,
		functionName: 'quoteLayerZeroFee',
		args: [
			args._dstChainId,
			args._functionType,
			args._toAddress,
			args._payload,
			[
				args._lzTxParams.dstGasForCall,
				args._lzTxParams.dstNativeAmount,
				args._lzTxParams.dstNativeAddr,
			],
		],
	})

	// @ts-ignore
	const feeWei = await quoteData[0]

	return {
		nativeTokenInWei,
		parsedNativeToken: formatUnits(nativeTokenInWei, 18),
		feeWei,
		parsedLayerZeroFee: formatUnits(feeWei, 18),
	}
}
