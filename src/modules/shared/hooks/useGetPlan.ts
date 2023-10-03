'use client'

import type { Database } from '@/supabase.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { capitalize } from '@utils/string'
import { useEffect, useState } from 'react'

export const useGetPlan = () => {
	const supabase = createClientComponentClient<Database>()
	const [plans, setPlan] = useState<Plan[] | null>()

	const fetchPlanByLoggedInUser = async () => {
		try {
			const { data } = await supabase.from('plan').select()
			setPlan(data)
		} catch (error) {
			console.error('Error fetching session:', error)
		}
	}

	useEffect(() => {
		fetchPlanByLoggedInUser()

		const channel = supabase
			.channel('Plan of the logged User')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'plan',
				},
				() => fetchPlanByLoggedInUser(),
			)
			.subscribe()

		return () => {
			channel.unsubscribe()
		}
	}, [])

	const tier =
		(plans && plans.length > 0 && capitalize(plans[0].tier)) ?? 'Free'
	const quota = (plans && plans.length > 0 && plans[0].quota) ?? 10

	return { tier, quota }
}
