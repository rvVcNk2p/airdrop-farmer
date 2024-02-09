'use client'

import { useGetPlan } from '@/modules/shared/hooks/useGetPlan'

const Settings = () => {
	const { selectedPlan, quota, usedQuota } = useGetPlan()

	return (
		<div className="mr-6">
			<p>Tier: {selectedPlan}</p>
			<p>
				Quota: {usedQuota} / {quota}
			</p>
		</div>
	)
}

export default Settings
