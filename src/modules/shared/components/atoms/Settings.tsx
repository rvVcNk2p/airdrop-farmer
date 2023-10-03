'use client'

import { useGetPlan } from '@/modules/shared/hooks/useGetPlan'

const Settings = () => {
	const { tier, quota } = useGetPlan()

	return (
		<div className="mr-6">
			<p>Tier: {tier}</p>
			<p>Quota: {quota}</p>
		</div>
	)
}

export default Settings
