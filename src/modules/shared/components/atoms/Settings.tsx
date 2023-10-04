'use client'

import { useGetPlan } from '@/modules/shared/hooks/useGetPlan'

const Settings = () => {
	const { tier, quota, usedQuota } = useGetPlan()

	return (
		<div className="mr-6">
			<p>Tier: {tier}</p>
			<p>
				Quota: {usedQuota} / {quota}
			</p>
		</div>
	)
}

export default Settings
