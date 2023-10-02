import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	// https://supabase.com/docs/guides/auth/auth-helpers/nextjs?language=ts#managing-sign-in-with-code-exchange
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get('code')

	if (code) {
		const supabase = createRouteHandlerClient({ cookies })
		await supabase.auth.exchangeCodeForSession(code)
	}

	return NextResponse.redirect(requestUrl.origin)
}
