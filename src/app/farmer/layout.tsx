'use server'

import { Footer, Header } from '@modules/landing/components'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import '../globals.css'

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const supabase = createServerComponentClient({ cookies })

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/login')
	}

	return (
		<>
			<Header />
			<main className="bg-[#13121d]">{children}</main>
			<Footer />
		</>
	)
}
