// 3. Step
import { stargateFinance } from '@modules/farmer/constants/bridges'
import { layertZeroDestinationChains } from '@modules/farmer/constants/chains'
import { LAYER_ZERO_ABI } from '@modules/farmer/constants/contracts/layerZeroRouter'
import { createWalletClientFactory } from '@modules/farmer/helpers/createWalletClientFactory'
import { getEstimatedLayerOneFee } from '@modules/farmer/helpers/getEstimatedLayerOneFee'
import { getEstimatedTransactionFee } from '@modules/farmer/helpers/getEstimatedTransactionFee'
import { getPoolIdByToken } from '@modules/farmer/helpers/poolId'
import { BlancesResponseWithSelectedToken } from '@modules/farmer/hooks/workspace/allowance/useChooseInitialToken'
import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { ChainIds } from '@modules/shared/constants'
import { Address, parseUnits } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

type CreateTxForApprovalProps = {
	loggerFn: ({}: TxHistoryRecordType) => void
}

type DestinationType = {
	network: string
	token: string
	chainId: number
}

type CreateTxForApprovalFnProps = {
	wallet: Address
	client: ReturnType<typeof createWalletClientFactory>
	chainWithHighestBalanceToken: BlancesResponseWithSelectedToken
	destination: DestinationType
}

export type MessageGeneratorProps = {
	selected: { token: string; amount: number }
	network: string
	destination: DestinationType
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
			wallet: privateKeyToAccount(wallet).address,
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
			layertZeroDestinationChains[ChainIds[destination.network]].chainId
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
			wallet: privateKeyToAccount(wallet).address,
			status: TxStatusType.INFO,
			message: generateFeeMessage({
				parsedLayerZeroFee: estimatedFees.parsedLayerZeroFee,
				parsedNativeToken: estimatedFees.parsedNativeToken,
			}),
		})

		loggerFn({
			timestamp: new Date(),
			wallet: privateKeyToAccount(wallet).address,
			status: TxStatusType.INFO,
			// Tx 100 was signed.
			message: `Tx ${nextBridgeNonce} was signed.`,
		})

		const amount = selected.amount
		const decimal = [ChainIds.BSC, ChainIds.METIS].includes(chainId) ? 18 : 6

		const args = {
			_dstChainId,
			_srcPoolId: getPoolIdByToken(chainId, selected.token),
			_dstPoolId: getPoolIdByToken(destination.chainId, destination.token),
			_refundAddress: _to,
			_amountLD: parseUnits(amount + '', decimal),
			_minAmountLD: parseUnits(calculateMinAmountLD(amount) + '', decimal),
			_lzTxParams: {
				dstGasForCall: 0,
				dstNativeAmount: 0,
				dstNativeAddr: '0x0000000000000000000000000000000000000001',
			},
			_to,
			_payload: '0x',
		}

		const rawBridgeConfigObj = {
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
			value: estimatedFees.feeWei,
		}

		const { gas, maxFeePerGas, maxPriorityFeePerGas } =
			await getEstimatedTransactionFee({
				client,
				rawConfigObj: rawBridgeConfigObj,
			})

		const bridgeConfigObj: any = {
			...rawBridgeConfigObj,
			gas,
			maxFeePerGas,
			maxPriorityFeePerGas,
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
