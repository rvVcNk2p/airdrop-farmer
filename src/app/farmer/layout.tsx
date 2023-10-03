'use server'

import { Footer, Header } from '@modules/landing/components'
import { createServerClient } from '@modules/supabase/server-utils'
import { redirect } from 'next/navigation'

import '../globals.css'

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const supabase = createServerClient()

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/signin')
	}

	return (
		<>
			<Header />
			<main className="bg-[#13121d]">{children}</main>
			<Footer />
		</>
	)
}
