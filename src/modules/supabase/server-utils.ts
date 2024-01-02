'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const createServerClient = cache(() => {
	cookies().getAll()
	return createServerComponentClient<Database>({
		cookies,
	})
})
