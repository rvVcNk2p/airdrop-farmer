'use client'

import { WorkspacePage } from '@modules/farmer/components/WorkspacePage'

export default function Home({
	managerPrivatekey,
}: {
	managerPrivatekey: any
}) {
	return <WorkspacePage managerPrivatekey={managerPrivatekey} />
}
