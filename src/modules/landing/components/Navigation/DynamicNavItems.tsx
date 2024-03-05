'use client'

import Settings from '@modules/shared/components/atoms/Settings'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { dfhDiscordLink, discordLink } from '@/modules/shared/constants'

const DynamicNavItems = ({ managerPrivatekey }: { managerPrivatekey: any }) => {
	const pathName = usePathname()

	const publicPaths = ['/signin', '/signup', '/', '/defi-hungary']

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
			<>
				{publicPaths.includes(pathName) && (
					<Link
						href="/farmer"
						className="text-main-airdrop mr-6 text-white hover:opacity-80"
					>
						Airdrop Farmer
					</Link>
				)}
				{pathName.includes('/defi-hungary') && (
					<>
						<Link
							href={dfhDiscordLink}
							target="_blank"
							rel="noreferrer"
							className="text-main-airdrop mr-4 text-white hover:opacity-80"
						>
							DFH Discord
						</Link>
					</>
				)}
				<>
					{!pathName.includes('/defi-hungary') && (
						<Link
							href={discordLink}
							target="_blank"
							rel="noreferrer"
							className="text-main-airdrop mr-4 text-white hover:opacity-80"
						>
							Airdrop Copilot Discord
						</Link>
					)}
				</>
			</>
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
