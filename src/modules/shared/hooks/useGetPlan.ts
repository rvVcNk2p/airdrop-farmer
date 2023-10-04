'use client'

import { fetchPlanByLoggedInUser } from '@modules/shared/fetchers/planFetcher'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export const useGetPlan = () => {
	const supabase = createClientComponentClient<Database>()
	const [plans, setPlan] = useState<Plan[] | null>()

	const fetchPlan = async () => {
		try {
			const data = await fetchPlanByLoggedInUser()
			setPlan(data)
		} catch (error) {
			console.error('Error fetching session:', error)
		}
	}

	useEffect(() => {
		fetchPlan()

		const channel = supabase
			.channel('Plan of the logged User')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'plans',
				},
				() => fetchPlan(),
			)
			.subscribe()

		return () => {
			channel.unsubscribe()
		}
	}, [])

	const tier = (plans && plans[0].tier) ?? 'Free'
	const quota = (plans && plans[0].quota) ?? 10
	const usedQuota = (plans && plans[0].used_quota) ?? 0
	const bindedWallet = (plans && plans[0].wallet) ?? null

	return { tier, quota, usedQuota, bindedWallet, plans }
}
