'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { useSession } from './useSession'

export const useUpdateDatabase = () => {
	const supabase = createClientComponentClient<Database>()
	const { userSession } = useSession()

	const updateBindedWallet = async (wallet: string) => {
		try {
			await supabase
				.from('plans')
				.update({ wallet })
				.eq('user_id', userSession?.user.id ?? '')
		} catch (error) {
			console.error('Error fetching session:', error)
		}
	}
	const incrementUsedQuota = (used_quota: number) => {
		return new Promise(async (resolve, reject) => {
			try {
				await supabase
					.from('plans')
					.update({ used_quota: used_quota + 1 })
					.eq('user_id', userSession?.user.id ?? '')

				resolve('OK')
			} catch (error) {
				console.error('Error fetching session:', error)
				return reject(new Error('Failed to update used quota.'))
			}
		})
	}

	return { updateBindedWallet, incrementUsedQuota }
}
