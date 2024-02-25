'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DynamicNavItems = () => {
	const pathName = usePathname()

	const publicPaths = ['/signin', '/signup', '/']

	return (
		publicPaths.includes(pathName) && (
			<Link
				href="/farmer"
				className="text-main-airdrop mr-6 text-white hover:opacity-80"
			>
				Airdrop Farmer
			</Link>
		)
	)
}

export default DynamicNavItems
