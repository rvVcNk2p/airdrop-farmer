'use client'

import {
	dfhDiscordLink,
	discordLink,
	twitterLink,
} from '@/modules/shared/constants'
import { usePathname } from 'next/navigation'

const Footer = () => {
	const pathName = usePathname()
	return (
		<div className="relative z-[10] border-t-[0.5px] border-[#33323e] bg-[#13121d] px-4 py-4 text-white md:px-8 md:py-8">
			<div className="mx-auto max-w-6xl">
				<div>
					<div className="grid w-full grid-cols-2 flex-col items-start justify-between lg:flex-row">
						<div className="mb-4 flex w-full flex-col md:mb-0 md:flex-row md:items-center">
							<a
								href={discordLink}
								target="_blank"
								rel="noreferrer"
								className="text-main-airdrop mb-4 mr-4 hover:text-white md:mb-0 md:mr-8"
							>
								Contact us
							</a>
							<a
								href="/terms"
								target="_blank"
								rel="noreferrer"
								className="text-main-airdrop hover:text-white"
							>
								Terms of use &amp; Privacy policy
							</a>
						</div>
						<div className="flex w-full items-center justify-start md:justify-end">
							<a
								href={
									pathName.includes('/defi-hungary')
										? dfhDiscordLink
										: discordLink
								}
								rel="noreferrer"
								target="_blank"
							>
								<svg
									stroke="currentColor"
									fill="currentColor"
									viewBox="0 0 640 512"
									height="32"
									width="32"
									xmlns="http://www.w3.org/2000/svg"
									className="mr-4 h-5 w-5 fill-white"
								>
									<path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
								</svg>
							</a>
							{/* <a href={twitterLink} rel="noreferrer" target="_blank">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 321.666 321.666"
									className="h-5 w-5 fill-white"
								>
									<path d="M320.518 70.438a3.5 3.5 0 0 0-4.287-.325c-5.903 3.916-13.86 5.904-20.473 6.914 7.907-6.45 17.13-16.588 17.069-29.652a3.5 3.5 0 0 0-5.563-2.812c-11.985 8.746-29.164 13.34-35.454 14.807-4.448-7.33-19.746-28.824-46.187-28.824-1.479 0-2.988.07-4.485.207-32.859 3.022-48.781 22.237-56.351 37.825-4.786 9.855-6.888 19.397-7.809 25.699-5.211-4.542-14.3-11.454-27.829-18.371-20.668-10.569-56.166-23.167-107.902-23.167a339.22 339.22 0 0 0-15.358.354c-1.174.054-2.243.693-2.846 1.702s-.659 2.254-.148 3.313C13.937 81.04 37.69 94.51 53.153 101.18c-8.484 2.248-17.549 6.634-20.388 13.544-1.441 3.508-1.811 9.021 4.608 15.364 9.424 9.312 20.503 14.97 30.265 18.405-7.648 1.361-13.755 3.697-15.735 7.584-.753 1.48-1.612 4.518 1.1 8.246 13.001 17.878 44.162 24.83 57.98 25.964-1.753 4.165-5.404 10.928-12.455 17.626-15.066 14.309-38.822 21.873-68.7 21.874-8.128 0-16.842-.55-25.912-1.636-1.498-.177-2.944.622-3.585 1.99a3.5 3.5 0 0 0 .764 4.028C40.484 271.42 85.2 291.113 130.41 291.12h.023c49.772 0 98.504-24.472 130.357-65.463 28.367-36.505 39.233-80.199 30.06-120.383 6.128-2.623 19.655-10.379 30.406-30.602a3.5 3.5 0 0 0-.738-4.234z"></path>
								</svg>
							</a> */}
						</div>
					</div>
					<p className="text-main-airdrop mt-10 text-[0.7rem]">
						*The information and materials presented on the website, as well as
						in the tool utilization guide, do not serve as financial advice or
						recommendations. The associated Discord server, accessible via the
						link{' '}
						<a
							href={
								pathName.includes('/defi-hungary')
									? dfhDiscordLink
									: discordLink
							}
							className="text-white"
						>
							{pathName.includes('/defi-hungary')
								? dfhDiscordLink
								: discordLink}
						</a>
						, is solely established for user support, and the content therein
						should not be interpreted as financial advice. By opting to utilize
						Copilot Bot, you accept full responsibility for your financial
						decisions and acknowledge that the receipt of rewards through
						potential airdrops is not guaranteed.
					</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
