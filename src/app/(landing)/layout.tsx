import Footer from '@modules/landing/components/Footer'
import Header from '@modules/landing/components/Header'

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
