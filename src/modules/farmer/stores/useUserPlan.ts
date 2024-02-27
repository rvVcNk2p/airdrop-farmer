import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { SecureLocalStorage } from './helpers'
import { TierTypes } from '@modules/shared/hooks/useHandleSubscription'

interface useUserPlan {
	plan: Plan

	setPlan: (plan: Plan) => void
}

export const useUserPlan = create<useUserPlan>()(
	devtools(
		persist(
			(set, get) => ({
				plan: {
					selectedPlan: TierTypes.FREE,
					quota: 10,
					used_quota: 0,
					wallet: null,
					discountCode: null,
					discountType: null,
					discountValue: null,
					referredBy: null,
					created_at: '',
					id: 0,
					updated_at: null,
					user_id: null,
				},

				setPlan: (plan: Plan) => {
					set((state) => ({
						...state,
						plan,
					}))
				},
			}),
			{
				name: 'user-plan',
				storage: createJSONStorage(() => SecureLocalStorage),
			},
		),
	),
)
