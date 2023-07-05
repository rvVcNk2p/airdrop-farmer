'use client'

import { GroupSection } from './group/GroupSection'

export const FarmerPage = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="mb-10">[FARMER] Hello from the other side</div>
			<GroupSection />
		</div>
	)
}
