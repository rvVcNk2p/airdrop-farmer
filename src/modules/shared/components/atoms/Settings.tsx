'use client'

import { useGetPlan } from '@/modules/shared/hooks/useGetPlan'
import { useHandleSubscription } from '@modules/shared/hooks/useHandleSubscription'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

const Settings = ({ managerPrivatekey }: { managerPrivatekey: any }) => {
	const [isSubscriptionActive, setIsSubscriptionActive] = useState(false)

	const { getIsSubscriptionActive } = useHandleSubscription({
		managerPrivatekey,
	})

	const { selectedPlan, quota, usedQuota, wallet } = useGetPlan()

	useEffect(() => {
		const fetchSubscriptionStatus = async () => {
			if (wallet) {
				const result = await getIsSubscriptionActive({
					userAddress: wallet as Address,
				})
				setIsSubscriptionActive(result)
			}
		}

		fetchSubscriptionStatus()
	}, [wallet, getIsSubscriptionActive])

	return (
		<div className="mr-6">
			<p>Tier: {selectedPlan}</p>
			<p>
				Quota: {isSubscriptionActive ? 'Unlimited' : `${usedQuota} / ${quota}`}
			</p>
		</div>
	)
}

export default Settings
