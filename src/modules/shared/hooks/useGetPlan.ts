'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { capitalize } from '@utils/string'
import { useEffect, useState } from 'react'

// import type { Plan } from '@supabase/supabase-js'

export const useGetPlan = () => {
	const supabase = createClientComponentClient()
	const [plan, setPlan] = useState<any>()

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

	const tier = (plan && plan.length > 0 && capitalize(plan[0].tier)) ?? 'Free'
	const quota = (plan && plan.length > 0 && plan[0].quota) ?? 10

	return { tier, quota }
}
