import { UserStrategyType } from './userStrategy'

export type HeaderStateType = {
	transactions: number
	volume: number
}

export type WorkspaceHeaderProps = {
	title: string
	workspaceUid: string | undefined
	strategy: UserStrategyType | undefined
	wallets: number | undefined
	isLoading: boolean
	startWorkspace: () => void
}
