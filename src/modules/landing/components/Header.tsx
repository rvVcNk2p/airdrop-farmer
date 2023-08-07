'use client'

import { discordLink } from '@/modules/shared/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
	return (
		<div className="fixed top-0 left-0 z-20 w-full px-4 md:px-8">
			<div className="header-mask"></div>
			<header className="relative flex justify-between items-center w-full max-w-6xl h-14 mx-auto py-0">
				<div className="h-auto relative mr-4">
					<div className="relative">
						<Image
							src="/logo.svg"
							alt="Airdrop Hunter logo"
							width={200}
							height={200}
							className="cursor-pointer"
						/>
					</div>
				</div>
				<div className="flex items-center whitespace-nowrap">
					{/* <a
						href="/layer-zero-rank-check"
						target="_blank"
						rel="noreferrer"
						className="text-main-airdrop hover:text-white mr-4"
					>
						Check LayerZero Rank
					</a> */}
					{usePathname() === '/' ? (
						<Link
							href="/farmer"
							className="text-main-airdrop hover:opacity-80 text-white mr-6"
						>
							Airdrop Farmer
						</Link>
					) : null}
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
