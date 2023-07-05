import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Airdrop Farmer',
	description: 'Generated by create next app',
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
				{children}
			</body>
		</html>
	)
}
