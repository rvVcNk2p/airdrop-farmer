'use server'

import SidebarLayout from '@modules/shared/components/layouts/SidebarLayout'
import { createServerClient } from '@modules/supabase/server-utils'
import { redirect } from 'next/navigation'
import WagmiWrapper from '@modules/shared/components/wrappers/WagmiWrapper'

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
			<WagmiWrapper>
				<main className="bg-background">
					<SidebarLayout>{children}</SidebarLayout>
				</main>
			</WagmiWrapper>
		</>
	)
}
