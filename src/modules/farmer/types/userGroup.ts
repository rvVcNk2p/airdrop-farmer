export interface UserGroupType {
	uid: string
	name: string
	description: string | null
	strategyUid: string | undefined
	wallets: string[]
}

export type RawUserGroupType = Pick<
	UserGroupType,
	'name' | 'strategyUid' | 'wallets'
>
