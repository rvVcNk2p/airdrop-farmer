'use client'

import Settings from '@modules/shared/components/atoms/Settings'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DynamicNavItems = ({ managerPrivatekey }: { managerPrivatekey: any }) => {
	const pathName = usePathname()

	const publicPaths = ['/signin', '/signup', '/']

	const WorkspaceItems = () => {
		return (
			<>
				{pathName.indexOf('/workspace') !== -1 && (
					<Settings managerPrivatekey={managerPrivatekey} />
				)}
			</>
		)
	}

	const PublicItems = () => {
		return (
			publicPaths.includes(pathName) && (
				<>
					<Link
						href="/farmer"
						className="text-main-airdrop mr-6 text-white hover:opacity-80"
					>
						Airdrop Farmer
					</Link>
				</>
			)
		)
	}

	return (
		<>
			<PublicItems />
			<WorkspaceItems />
		</>
	)
}

export default DynamicNavItems
