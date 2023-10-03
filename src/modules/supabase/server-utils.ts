'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const createServerClient = cache(() => {
	const cookieStore = cookies()
	return createServerComponentClient<Database>({
		cookies: () => cookieStore,
	})
})
