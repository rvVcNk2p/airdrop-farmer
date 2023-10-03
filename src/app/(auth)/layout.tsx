import { Footer, Header } from '@modules/landing/components'

import '../globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
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
