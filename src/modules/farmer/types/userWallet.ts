import { Address } from 'viem'

export interface WalletType {
	uid: string
	name: string
	privateKey: Address
	description: string | null
}
export type RawWalletType = Pick<
	WalletType,
	'name' | 'privateKey' | 'description'
>
