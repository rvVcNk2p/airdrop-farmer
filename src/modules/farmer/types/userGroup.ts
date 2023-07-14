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
