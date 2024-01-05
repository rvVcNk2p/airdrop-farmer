import Image from 'next/image'

const SellingPoints = () => {
	return (
		<>
			<section
				className="relative z-10 px-4 md:px-8 py-12 lg:py-28"
				id="metamask-signing"
			>
				<div className="max-w-5xl mx-auto">
					<div className="flex flex-col lg:flex-row-reverse items-center lg:gap-16 w-full ">
						<div className="relative flex flex-col items-center lg:items-start">
							<h1 className="font-semibold text-3xl md:text-5xl text-white text-center lg:text-left mb-6 ">
								Metamask Signing
								<span className="text-transparent bg-clip-text fancyText"></span>
							</h1>
							<p className="text-xl md:text-2xl text-center lg:text-left text-main-airdrop mb-8 lg:mb-0 animate-reveal-description max-w-[750px]">
								An exclusive opportunity for those who are used to securing
								themselves twice. You can farm without providing your private
								keys, sign everything with metamask.
							</p>
						</div>
						<div className="relative overflow-hidden w-full">
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
				className="relative z-10 px-4 md:px-8 py-12 lg:py-28"
				id="wallets-stats"
			>
				<div className="max-w-5xl mx-auto">
					<div className="flex flex-col lg:flex-row items-center lg:gap-16 w-full ">
						<div className="relative flex flex-col items-center lg:items-start">
							<h1 className="font-semibold text-3xl md:text-5xl text-white text-center lg:text-left mb-6 ">
								Auto Expense Tracking
								<span className="text-transparent bg-clip-text fancyText"></span>
							</h1>
							<p className="text-xl md:text-2xl text-center lg:text-left text-main-airdrop mb-8 lg:mb-0 animate-reveal-description max-w-[750px]">
								You no longer need to keep track of all your transactions in
								Excel &amp; Sheets and calculate your fees manually. We&apos;ll
								do everything automatically for each wallet. You&apos;ll have a
								real automated control room for your farm.
							</p>
						</div>
						<div className="relative overflow-hidden w-full">
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
				className="relative z-10 px-4 md:px-8 py-12 lg:py-28"
				id="metamask-signing"
			>
				<div className="max-w-5xl mx-auto">
					<div className="flex flex-col lg:flex-row-reverse items-center lg:gap-16 w-full ">
						<div className="relative flex flex-col items-center lg:items-start">
							<h1 className="font-semibold text-3xl md:text-5xl text-white text-center lg:text-left mb-6 ">
								Consolidation &amp; Withdrawal
								<span className="text-transparent bg-clip-text fancyText"></span>
							</h1>
							<p className="text-xl md:text-2xl text-center lg:text-left text-main-airdrop mb-8 lg:mb-0 animate-reveal-description max-w-[750px]">
								After your goal achieved, money could automatically consolidated
								on chosen chain &amp; token and withdrawn to your CEX wallet. No
								more spending hours managing your funds.
							</p>
						</div>
						<div className="relative overflow-hidden w-full">
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
