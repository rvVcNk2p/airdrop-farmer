'use client'

import { useSession } from '@modules/shared/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

const DynamicNavItems = () => {
	const router = useRouter()
	const pathName = usePathname()
	const { userSession } = useSession()

	const handleSignOut = async () => {
		await fetch('/auth/signout', {
			method: 'POST',
		})
		router.refresh()
	}

	const userEmail = useMemo(() => userSession?.user.email || '', [userSession])

	return pathName === '/' ? (
		<Link
			href="/farmer"
			className="text-main-airdrop hover:opacity-80 text-white mr-6"
		>
			Airdrop Farmer
		</Link>
	) : (
		<>
			{userEmail && (
				<a
					rel="noreferrer"
					onClick={handleSignOut}
					className="text-main-airdrop hover:opacity-80 text-white mr-6 cursor-pointer"
				>
					Logout
				</a>
			)}
		</>
	)
}

export default DynamicNavItems
