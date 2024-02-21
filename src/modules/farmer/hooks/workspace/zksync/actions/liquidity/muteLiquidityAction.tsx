import {
	type TxHistoryRecordType,
	type ZkSyncMainnetActionsType,
} from '@modules/farmer/types'
import { Address } from 'viem'

type muteLiquidityActionProps = {
	walletPrivateKey: Address
	actions: ZkSyncMainnetActionsType
	loggerFn: ({}: TxHistoryRecordType) => void
}

export const muteLiquidityAction = async ({
	walletPrivateKey,
	actions,
	loggerFn,
}: muteLiquidityActionProps) => {
	// Biggest balance is $64.23 USDC on ZKSYNC
	// Plan to do liquidity activity on MUTE $2.12 USDC
	// Will add liquidity on MUTE $2.12 USDC
	// Will spend on gas up to $1.36
	// Create tx 1233 to add liquidity on MUTE
	// Tx 1233 was signed.
	// Sent liquidity tx 1233 to ZKSYNC chain. Wiew on Scan.
	// Add liquidity tx 1233 confirmed. View on Scan.
	// Sleep 27 seconds.
	console.log('== Actions ==', actions)
}
