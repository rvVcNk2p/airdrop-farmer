import { Toaster } from '@modules/shared/components/ui/toaster'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Airdrop Copilot',
	description:
		'Supercharge your airdrop earnings with Airdrop Copilot! Tired of tediously clicking through Metamask popups to claim your tokens? Look no further. Our cutting-edge solution not only saves you valuable time but also safeguards you against potential Sybil attacks, ensuring your airdrop experience is seamless and secure.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		// Permanent dark mode enabled https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
		<html lang="en" className="dark">
			<body className={inter.className} suppressHydrationWarning={true}>
				<>
					{children}
					<Toaster />
				</>
			</body>
		</html>
	)
}
