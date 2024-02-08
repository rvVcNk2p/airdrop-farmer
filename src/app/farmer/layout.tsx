'use server'

import { Footer, Header } from '@modules/landing/components'
import SidebarLayout from '@modules/shared/components/layouts/SidebarLayout'
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
			<SidebarLayout>{children}</SidebarLayout>
		</>
	)
}
