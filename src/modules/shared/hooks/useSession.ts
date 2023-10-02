'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabase = createClientComponentClient()

export function useSession() {
	const [isLoading, setIsLoading] = useState(true)
	const [userSession, setUserSession] = useState<Session | null>(null)

	useEffect(() => {
		const getInitialSession = async () => {
			try {
				const {
					data: { session },
					error,
				} = await supabase.auth.getSession()

				if (error) {
					console.error('Error fetching session:', error)
				} else {
					setUserSession(session)
				}

				setIsLoading(false)
			} catch (error) {
				console.error('Error fetching session:', error)
				setIsLoading(false)
			}
		}

		getInitialSession()

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUserSession(session || null)
		})

		return () => {
			subscription?.unsubscribe()
		}
	}, [])

	return {
		isLoading,
		userSession,
	}
}
