// 3. Step
import { stargateFinance } from '@modules/farmer/constants/bridges'
import { LAYER_ZERO_ABI } from '@modules/farmer/constants/contracts/layerZeroRouter'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { ChainIds } from '@modules/shared/constants'
import { LayertZeroDestinationChains } from '@modules/shared/constants/chains'
import { Address, parseEther, parseUnits } from 'viem'

import { getEstimatedLayerOneFee } from '../../../helpers/getEstimatedLayerOneFee'
import { BlancesResponseWithSelectedToken } from '../allowance/useChooseInitialToken'
import { TxHistoryRecordType, TxStatusType } from '../useActivityHistory'

type CreateTxForApprovalProps = {
	loggerFn: ({}: TxHistoryRecordType) => void
}

type CreateTxForApprovalFnProps = {
	wallet: Address
	client: ReturnType<typeof createWalletClientFactory>
	chainWithHighestBalanceToken: BlancesResponseWithSelectedToken
	destination: { network: string; token: string }
}

export type MessageGeneratorProps = {
	selected: { token: string; amount: number }
	network: string
	destination: { network: string; token: string }
	nonce: number
	bridge: string
}

const generateMessage = ({
	selected,
	network,
	destination,
	nonce,
	bridge,
}: MessageGeneratorProps): string =>
	`<p>Created bridge tx ${nonce} to sign: Bridge ${bridge} from <span className="text-yellow-500">${network}</span> <span className="text-purple-500">${selected.token}</span> to <span className="text-yellow-500">${destination.network}</span> <span className="text-purple-500">${destination.token}</span> $${selected.amount} <span className="text-purple-500">${selected.token}</span>.`

// TODO: Need: $1.08 = Max fee 0.000278547 BNB ($0.65) + Layer Zero fee 0.001856803504922539 BNB ($0.43). User has: 0.019681691995708755 BNB ($4.56). Base Fee: 0.00278547 BNB ($0.65).

type FeeMessageGeneratorProps = {
	parsedLayerZeroFee: string
	parsedNativeToken: string
}

const generateFeeMessage = ({
	parsedLayerZeroFee,
	parsedNativeToken,
}: FeeMessageGeneratorProps): string => {
	return `Need: Layer Zero fee ${parsedLayerZeroFee} native token + gass fee. User has: ${parsedNativeToken} native token.`
}

const calculateMinAmountLD = (amount: number) => {
	return amount - amount * 0.002 // ≈ 0.2% lower than _amountLD
}

export const useCreateBridgeTxForApproval = ({
	loggerFn,
}: CreateTxForApprovalProps) => {
	const createBridgeTxForApprovalFn = async ({
		wallet,
		client,
		chainWithHighestBalanceToken,
		destination,
	}: CreateTxForApprovalFnProps) => {
		const { selected, network, chainId } = chainWithHighestBalanceToken

		const transactionCount = await client.getTransactionCount({
			address: client.account.address,
			blockTag: 'pending',
		})
		const nextBridgeNonce = transactionCount + 1

		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			// Created bridge tx 100 to sign: Bridge STARGATE from BSC USDT to AVALANCHE USDT 85.03 USDT.
			message: generateMessage({
				selected,
				network,
				destination,
				nonce: nextBridgeNonce,
				bridge: 'STARGATE', // TODO: Make it dynamic
			}),
		})

		const _dstChainId =
			LayertZeroDestinationChains[ChainIds[destination.network]].chainId
		const _to: Address = client.account.address

		const estimatedFees = await getEstimatedLayerOneFee({
			client,
			wallet,
			chainId,
			_dstChainId,
			_to,
		})

		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			message: generateFeeMessage({
				parsedLayerZeroFee: estimatedFees.parsedLayerZeroFee,
				parsedNativeToken: estimatedFees.parsedNativeToken,
			}),
		})

		// TODO: Calculate the estimated transaction fee
		// https://medium.com/linum-labs/a-technical-primer-on-using-encoded-function-calls-50e2b9939223

		loggerFn({
			timestamp: new Date(),
			wallet,
			status: TxStatusType.INFO,
			// Tx 100 was signed.
			message: `Tx ${nextBridgeNonce} was signed.`,
		})

		const gasPrice = await client.getGasPrice()

		const testAmount = 0.11 // TODO: selected.amount

		const args = {
			_dstChainId,
			_srcPoolId: 2,
			_dstPoolId: 2,
			_refundAddress: _to,
			_amountLD: parseUnits(testAmount + '', 6), // TODO: Decimals will be differen on BSC and Fantom
			_minAmountLD: parseUnits(calculateMinAmountLD(testAmount) + '', 6),
			_lzTxParams: {
				dstGasForCall: 0,
				dstNativeAmount: 0,
				dstNativeAddr: '0x0000000000000000000000000000000000000001',
			},
			_to,
			_payload: '0x',
		}

		const bridgeConfigObj: any = {
			chainId,
			address: stargateFinance[chainId],
			abi: LAYER_ZERO_ABI.abi,
			functionName: 'swap',
			args: [
				args._dstChainId,
				args._srcPoolId,
				args._dstPoolId,
				args._refundAddress,
				args._amountLD,
				args._minAmountLD,
				[
					args._lzTxParams.dstGasForCall,
					args._lzTxParams.dstNativeAmount,
					args._lzTxParams.dstNativeAddr,
				],
				args._to,
				args._payload,
			],
			account: client.account,
			gas: 550000,
			maxFeePerGas: gasPrice,
			maxPriorityFeePerGas: 30000000000, // 30 Gwei
			value: estimatedFees.feeWei,
		}

		return {
			bridgeConfigObj,
			nextBridgeNonce,
		}
	}

	return {
		createBridgeTxForApprovalFn,
	}
}
