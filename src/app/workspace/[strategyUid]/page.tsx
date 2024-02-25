'use server'

import WorkspacePage from './Workspace'

const WorkspaceSSRPage = async () => {
	const managerPrivatekey = process.env.MANAGER_PRIVATE_KEY

	return (
		<>
			<WorkspacePage managerPrivatekey={managerPrivatekey} />
		</>
	)
}

export default WorkspaceSSRPage
