import { Footer } from '@/modules/landing/components'

import '../globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<main className="bg-[#13121d]">{children}</main>
			<Footer />
		</>
	)
}
