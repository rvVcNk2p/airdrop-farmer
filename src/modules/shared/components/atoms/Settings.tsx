'use client'

import { useGetPlan } from '@/modules/shared/hooks/useGetPlan'
import { useHandleSubscription } from '@modules/shared/hooks/useHandleSubscription'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

const Settings = ({ managerPrivatekey }: { managerPrivatekey: any }) => {
	const { wallet, selectedPlan, used_quota, quota } = useGetPlan()
	const [isSubscriptionActive, setIsSubscriptionActive] = useState(false)

	const { getIsSubscriptionActive } = useHandleSubscription({
		managerPrivatekey,
	})

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
				Quota: {isSubscriptionActive ? 'Unlimited' : `${used_quota} / ${quota}`}
			</p>
		</div>
	)
}

export default Settings
