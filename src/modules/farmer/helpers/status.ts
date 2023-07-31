import { WorkspaceStatusType } from '@modules/farmer/stores/useActionHistory'

export const statusColor = (workspaceStatus: WorkspaceStatusType) => {
	switch (workspaceStatus) {
		case WorkspaceStatusType.RUNNING:
			return 'bg-valid animate-pulse'
		case WorkspaceStatusType.IDLE:
			return 'bg-gray-500'
		case WorkspaceStatusType.FINISHED:
			return 'bg-green-900'
		case WorkspaceStatusType.FAILED:
			return 'bg-destructive'
		default:
			return 'bg-gray-500'
	}
}
