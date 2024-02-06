import { Address } from 'viem'

export interface UserGroupType {
	uid: string
	name: string
	description: string | null
	strategyUid: string | undefined
	wallets: Address[]
}

export type RawUserGroupType = Pick<
	UserGroupType,
	'name' | 'strategyUid' | 'wallets'
>

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
