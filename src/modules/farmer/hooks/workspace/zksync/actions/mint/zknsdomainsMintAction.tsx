import {
	type TxHistoryRecordType,
	type ZkSyncMainnetActionsType,
} from '@modules/farmer/types'
import { Address } from 'viem'

type zknsdomainsMintActionProps = {
	walletPrivateKey: Address
	actions: ZkSyncMainnetActionsType
	loggerFn: ({}: TxHistoryRecordType) => void
}

export const zknsdomainsMintAction = async ({
	walletPrivateKey,
	actions,
	loggerFn,
}: zknsdomainsMintActionProps) => {
	// Biggest balance is $64.23 USDC on ZKSYNC
	// Plan to do mint activity on ZKNS DOMAINS $5.12 ETH (0.0027105 ETH)
	// Will mint domain on ZKNS DOMAINS $5.12 ETH (0.0027105 ETH)
	// Will spend on gas up to $1.22
	// Create tx 1233 to mint domain on ZKNS DOMAINS
	// Tx 1233 was signed.
	// Sent mint tx 1233 to ZKSYNC chain. Wiew on Scan.
	// Mint domain tx 1233 confirmed. View on Scan.
	// Sleep 27 seconds.
	console.log('== Actions ==', actions)
}
