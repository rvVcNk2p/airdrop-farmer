import Image from 'next/image'

const SellingPoints = () => {
	return (
		<>
			<section
				className="relative z-10 px-4 py-12 md:px-8 lg:py-28"
				id="metamask-signing"
			>
				<div className="mx-auto max-w-5xl">
					<div className="flex w-full flex-col items-center lg:flex-row-reverse lg:gap-16 ">
						<div className="relative flex flex-col items-center lg:items-start">
							<h1 className="mb-6 text-center text-3xl font-semibold text-white md:text-5xl lg:text-left ">
								Metamask Signing
								<span className="fancyText bg-clip-text text-transparent"></span>
							</h1>
							<p className="text-main-airdrop animate-reveal-description mb-8 max-w-[750px] text-center text-xl md:text-2xl lg:mb-0 lg:text-left">
								An exclusive opportunity for those who are used to securing
								themselves twice. You can farm without providing your private
								keys, sign everything with metamask.
							</p>
						</div>
						<div className="relative w-full overflow-hidden">
							<div className="heyLiniGrain rounded-xl"></div>
							<div className="heyLiniGradient"></div>
							<Image
								src="/images/sp_a_metamask-signing.png"
								width={800}
								height={600}
								alt="Metamask Signing"
								className="w-full rounded-xl"
							/>
						</div>
					</div>
				</div>
			</section>
			<section
				className="relative z-10 px-4 py-12 md:px-8 lg:py-28"
				id="wallets-stats"
			>
				<div className="mx-auto max-w-5xl">
					<div className="flex w-full flex-col items-center lg:flex-row lg:gap-16 ">
						<div className="relative flex flex-col items-center lg:items-start">
							<h1 className="mb-6 text-center text-3xl font-semibold text-white md:text-5xl lg:text-left ">
								Auto Expense Tracking
								<span className="fancyText bg-clip-text text-transparent"></span>
							</h1>
							<p className="text-main-airdrop animate-reveal-description mb-8 max-w-[750px] text-center text-xl md:text-2xl lg:mb-0 lg:text-left">
								You no longer need to keep track of all your transactions in
								Excel &amp; Sheets and calculate your fees manually. We&apos;ll
								do everything automatically for each wallet. You&apos;ll have a
								real automated control room for your farm.
							</p>
						</div>
						<div className="relative w-full overflow-hidden">
							<div className="heyLiniGrain rounded-xl"></div>
							<div className="heyLiniGradient"></div>
							<Image
								src="/images/sp_b_airdrop-wallets-stats.png"
								width={800}
								height={600}
								alt="Private Keys Stay Private"
								className="w-full rounded-xl"
							/>
						</div>
					</div>
				</div>
			</section>
			<section
				className="relative z-10 px-4 py-12 md:px-8 lg:py-28"
				id="metamask-signing"
			>
				<div className="mx-auto max-w-5xl">
					<div className="flex w-full flex-col items-center lg:flex-row-reverse lg:gap-16 ">
						<div className="relative flex flex-col items-center lg:items-start">
							<h1 className="mb-6 text-center text-3xl font-semibold text-white md:text-5xl lg:text-left ">
								Consolidation &amp; Withdrawal
								<span className="fancyText bg-clip-text text-transparent"></span>
							</h1>
							<p className="text-main-airdrop animate-reveal-description mb-8 max-w-[750px] text-center text-xl md:text-2xl lg:mb-0 lg:text-left">
								After your goal achieved, money could automatically consolidated
								on chosen chain &amp; token and withdrawn to your CEX wallet. No
								more spending hours managing your funds.
							</p>
						</div>
						<div className="relative w-full overflow-hidden">
							<div className="heyLiniGrain rounded-xl"></div>
							<div className="heyLiniGradient"></div>
							<Image
								src="/images/sp_c_consolidation-withdrawal.png"
								width={800}
								height={600}
								alt="Consolidation Withdrawal"
								className="w-full rounded-xl"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default SellingPoints
