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

	if (session) {
		redirect('/farmer')
	}

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex flex-1 flex-col justify-center bg-[#13121d]">
				{children}
			</main>
			<Footer />
		</div>
	)
}
