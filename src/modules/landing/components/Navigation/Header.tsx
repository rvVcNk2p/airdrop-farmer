'use server'

import { discordLink } from '@/modules/shared/constants'
import Image from 'next/image'
import Link from 'next/link'

import DynamicNavItems from './DynamicNavItems'

const Header = async () => {
	return (
		<div className="fixed top-0 left-0 z-20 w-full px-4 md:px-8">
			<div className="header-mask"></div>
			<header className="relative flex justify-between items-center w-full max-w-6xl h-14 mx-auto py-0">
				<div className="h-auto relative mr-4">
					<div className="relative">
						<Link href="/">
							<Image
								src="/logo.svg"
								alt="Airdrop Hunter logo"
								width={200}
								height={200}
								className="cursor-pointer"
								priority
							/>
						</Link>
					</div>
				</div>
				<div className="flex items-center whitespace-nowrap">
					<DynamicNavItems />
					<Link
						href={discordLink}
						target="_blank"
						rel="noreferrer"
						className="text-main-airdrop hover:opacity-80 text-white"
					>
						Join Discord
					</Link>
				</div>
			</header>
		</div>
	)
}

export default Header
