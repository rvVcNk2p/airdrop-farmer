'use server'

import { discordLink } from '@/modules/shared/constants'
import Image from 'next/image'
import Link from 'next/link'
import DynamicNavItems from './DynamicNavItems'

const Header = () => {
	const managerPrivatekey = process.env.MANAGER_PRIVATE_KEY

	return (
		<div className="fixed left-0 top-0 z-20 w-full px-4 md:px-8">
			<div className="header-mask"></div>
			<header className="relative mx-auto flex h-14 w-full max-w-6xl items-center justify-between py-0">
				<div className="relative mr-4 h-auto">
					<div className="relative">
						{/* <Link href="/">
							<Image
								src="/logo.svg"
								alt="Airdrop Hunter logo"
								width={150}
								height={100}
								className="cursor-pointer"
								priority
							/>
						</Link> */}
					</div>
				</div>
				<div className="flex items-center whitespace-nowrap">
					<DynamicNavItems managerPrivatekey={managerPrivatekey} />

					<Link
						href={discordLink}
						target="_blank"
						rel="noreferrer"
						className="text-main-airdrop text-white hover:opacity-80"
					>
						Join Discord
					</Link>
				</div>
			</header>
		</div>
	)
}

export default Header
