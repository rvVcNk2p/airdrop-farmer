'use client'

import { fetchPlanByLoggedInUser } from '@modules/shared/fetchers/planFetcher'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { TierTypes } from './useHandleSubscription'
import { Address } from 'viem'

export const useGetPlan = () => {
	const supabase = createClientComponentClient<Database>()
	const [plan, setPlan] = useState<Plan | null>()
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
			.subscribe((status, err) => {
				if (err) console.error('SUBSCRIPTION ERROR:', err)
				else console.log('SUBSCRIPTION STATUS CHANGED:', status)
			})

		return () => {
			channel.unsubscribe()
		}
	}, [supabase])

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

	let _selectedPlan: string | null = 'Free'
	let _quota: number | null = 10
	let _usedQuota: number | null = 0
	let _wallet: string | null = null

	let _discountCode: string | null = null
	let _discountType: string | null = null
	let _discountValue: string | null = null
	let _referredBy: string | null = null

	if (plan) {
		const {
			selectedPlan,
			quota,
			used_quota,
			wallet,
			discountCode,
			discountType,
			discountValue,
			referredBy,
		} = plan
		_selectedPlan = selectedPlan
		_quota = quota
		_usedQuota = used_quota
		_wallet = wallet
		_discountCode = discountCode
		_discountType = discountType
		_discountValue = discountValue
		_referredBy = referredBy
	}

	return {
		selectedPlan: _selectedPlan,
		quota: _quota,
		usedQuota: _usedQuota,
		wallet: _wallet,
		discountCode: _discountCode,
		discountType: _discountType,
		discountValue: _discountValue,
		referredBy: _referredBy,
		plan,

		isLoading,

		updatePlan,
		updateCoupon,
		isCouponAlreadyActivated,
		getIsAddressAlreadyUsed,
	}
}
