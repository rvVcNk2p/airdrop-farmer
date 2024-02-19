import { UserStrategyType } from './userStrategy'

export type HeaderStateType = {
	transactions: number
	volume: number
}

export type WorkspaceHeaderProps = {
	title: string | undefined
	workspaceUid: string | undefined
	strategy: UserStrategyType | undefined
	wallets: number | undefined
	isLoading: boolean
	startWorkspace: () => void
}
