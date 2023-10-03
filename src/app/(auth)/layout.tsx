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
		data: { user },
	} = await supabase.auth.getUser()

	if (user) {
		redirect('/farmer')
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="bg-[#13121d] flex-1 flex flex-col justify-center">
				{children}
			</main>
			<Footer />
		</div>
	)
}
