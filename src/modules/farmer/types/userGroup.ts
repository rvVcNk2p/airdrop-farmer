export interface UserGroupType {
	uid: string
	name: string
	description: string | null
	strategyUid: string | null
	wallets: string[]
}

export type RawUserGroupType = Pick<
	UserGroupType,
	'name' | 'strategyUid' | 'wallets'
>
