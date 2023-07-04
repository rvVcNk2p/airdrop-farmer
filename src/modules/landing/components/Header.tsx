import { discordLink, twitterLink } from '@/modules/shared/constants'
import Image from 'next/image'

const Header = () => {
	return (
		<div className="fixed top-0 left-0 z-20 w-full px-4 md:px-8">
			<div className="header-mask"></div>
			<header className="relative flex justify-between items-center w-full max-w-6xl h-14 mx-auto py-0">
				<div className="h-auto relative mr-4">
					<div className="relative">
						<Image
							src="/images/logo.png"
							alt="Airdrop Hunter logo"
							width={100}
							height={100}
							className="min-w-[100px] w-[100px] cursor-pointer"
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
					<a
						href={discordLink}
						target="_blank"
						rel="noreferrer"
						className="text-main-airdrop hover:opacity-80 text-white mr-2"
					>
						Join Discord
					</a>
				</div>
			</header>
		</div>
	)
}

export default Header
