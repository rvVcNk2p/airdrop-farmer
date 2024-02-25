'use client'

import { fetchPlanByLoggedInUser } from '@modules/shared/fetchers/planFetcher'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { TierTypes } from './useHandleSubscription'

export const useGetPlan = () => {
	const supabase = createClientComponentClient<Database>()
	const [plans, setPlan] = useState<Plan | null>()
	const [isLoading, setIsLoading] = useState(false)

	const fetchPlan = async () => {
		setIsLoading(true)
		try {
			const data = await fetchPlanByLoggedInUser()
			if (data && data?.length > 0) setPlan(data[0])
			setIsLoading(false)
		} catch (error) {
			console.error('Error fetching session:', error)
			setIsLoading(false)
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
	}, [supabase])

	const updateCoupon = async (
		discountCode: string,
		discountType: 'FIXED' | 'PERCENTAGE',
		discountValue: string,
		referredBy: string,
	) => {
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (user?.id) {
			await supabase
				.from('plans')
				.update({ discountCode, discountType, discountValue, referredBy })
				.eq('user_id', user?.id)
		}
	}

	const updatePlan = async (plan: TierTypes) => {
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (user?.id) {
			await supabase
				.from('plans')
				.update({ selectedPlan: plan })
				.eq('user_id', user?.id)
		}
	}

	const isCouponAlreadyActivated = async (couponCode: string) => {
		const { data } = await supabase
			.from('plans')
			.select('')
			.eq('discountCode', couponCode ?? '')

		const isCoupon = data?.length ?? 0 > 0

		return new Promise((resolve, reject) => {
			isCoupon ? reject({ message: 'Coupon already activated!' }) : resolve({})
		})
	}

	const selectedPlan = (plans && plans.selectedPlan) ?? 'Free'
	const quota = (plans && plans.quota) ?? 10
	const usedQuota = (plans && plans.used_quota) ?? 0
	const wallet = (plans && plans.wallet) ?? null

	const discountCode = (plans && plans.discountCode) ?? null
	const discountType = (plans && plans.discountType) ?? null
	const discountValue = (plans && plans.discountValue) ?? null
	const referredBy = (plans && plans.referredBy) ?? null

	return {
		selectedPlan,
		quota,
		usedQuota,
		wallet,
		discountCode,
		discountType,
		discountValue,
		referredBy,
		plans,

		isLoading,

		updatePlan,
		updateCoupon,
		isCouponAlreadyActivated,
	}
}
