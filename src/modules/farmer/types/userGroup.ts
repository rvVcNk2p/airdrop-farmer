export interface UserGroupType {
	uid: string
	name: string
	description: string | null
	strategyUid: string | null
	wallets: string[]
}

export interface UserStrategy {
	uid: string
	name: string
	config: Record<string, unknown>
}

export type RawUserGroupType = Pick<
	UserGroupType,
	'name' | 'strategyUid' | 'wallets'
>
