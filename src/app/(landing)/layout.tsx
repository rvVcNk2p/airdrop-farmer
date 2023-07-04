import { Footer, Header } from '@/modules/landing/components'

import '../globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<Header />
				<main className="bg-[#13121d] text-white">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
