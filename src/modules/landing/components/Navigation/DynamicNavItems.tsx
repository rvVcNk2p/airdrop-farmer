'use client'

import type { Database } from '@/supabase.types'
import Settings from '@modules/shared/components/atoms/Settings'
import { useSession } from '@modules/shared/hooks'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

const DynamicNavItems = () => {
	const supabase = createClientComponentClient<Database>()
	const router = useRouter()
	const pathName = usePathname()
	const { userSession } = useSession()

	const handleSignOut = async () => {
		await supabase.auth.signOut()
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
				<>
					<Settings />
					<a
						rel="noreferrer"
						onClick={handleSignOut}
						className="text-main-airdrop hover:opacity-80 text-white mr-6 cursor-pointer"
					>
						Logout
					</a>
				</>
			)}
		</>
	)
}

export default DynamicNavItems
