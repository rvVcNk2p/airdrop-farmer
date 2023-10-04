'use server'

import { Footer, Header } from '@/modules/landing/components'
import WagmiWrapper from '@modules/shared/components/wrappers/WagmiWrapper'

import '../globals.css'

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header />
			<WagmiWrapper>{children}</WagmiWrapper>
			<Footer />
		</>
	)
}
