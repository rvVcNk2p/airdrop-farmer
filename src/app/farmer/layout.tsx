import { Footer, Header } from '@/modules/landing/components'

import '../globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header />
			<main className="bg-[#13121d]">{children}</main>
			<Footer />
		</>
	)
}
