'use client'

import { fetchPlanByLoggedInUser } from '@modules/shared/fetchers/planFetcher'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { TierTypes } from './useHandleSubscription'
import { Address } from 'viem'
import { useUserPlan } from '@modules/farmer/stores/useUserPlan'

export const useGetPlan = () => {
	const supabase = createClientComponentClient<Database>()
	const userPlan = useUserPlan((state) => state.plan)
	const setPlan = useUserPlan((state) => state.setPlan)

	const [isLoading, setIsLoading] = useState(false)

	const getIsAddressAlreadyUsed = async (wallet: Address | string) => {
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (user?.id) {
			const { data } = await supabase
				.from('plans')
				.select('*')
				.eq('wallet', wallet)
				.neq('user_id', user?.id)

			return Boolean(data?.length ?? 0 > 0)
		} else return false
	}

	useEffect(() => {
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
	}, [supabase, setPlan, setIsLoading])

	const updateCoupon = async (
		wallet: Address | string,
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
				.update({
					wallet,
					discountCode,
					discountType,
					discountValue,
					referredBy,
				})
				.eq('user_id', user?.id)
		}
	}

	const updatePlan = async (plan: TierTypes, wallet: Address | string) => {
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (user?.id) {
			await supabase
				.from('plans')
				.update({ selectedPlan: plan, wallet })
				.eq('user_id', user?.id)
		}
	}

	const isCouponAlreadyActivated = async (couponCode: string = '') => {
		const { data } = await supabase
			.from('plans')
			.select('*')
			.eq('discountCode', couponCode)

		const isCoupon = data?.length ?? 0 > 0

		return new Promise((resolve, reject) => {
			isCoupon ? reject({ message: 'Coupon already activated!' }) : resolve({})
		})
	}

	return {
		...userPlan,
		isLoading,

		updatePlan,
		updateCoupon,
		isCouponAlreadyActivated,
		getIsAddressAlreadyUsed,
	}
}
