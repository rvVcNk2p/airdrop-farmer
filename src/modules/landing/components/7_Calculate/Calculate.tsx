const Calculate = () => {
	return (
		<section
			className="relative z-10 px-4 md:px-8 py-12 lg:py-28"
			id="lets-calculate"
		>
			<div className="mx-auto">
				<div className="w-full flex flex-col items-center">
					<div className="max-w-6xl flex flex-col items-center w-full text-center mb-8 lg:mb-16">
						<h1 className="font-semibold text-3xl md:text-5xl text-white text-center mb-4 md:mb-8">
							Let&apos;s Do The Math
						</h1>
						<p className="max-w-[800px] text-xl md:text-2xl text-main-airdrop">
							What would be your earnings using Airdrop Farmer on the Arbitrum
							Airdrop? Typically, each recipient of Arbitrum received an average
							of $2,300+.
							<sup className="text-xs relative -top-3">
								<a
									href="https://www.forbes.com/sites/leeorshimron/2023/03/30/arbitrums-token-airdrop-sends-network-adoption-soaring/"
									target="_blank"
									rel="noreferrer"
								>
									[1]
								</a>
							</sup>
						</p>
					</div>
					<div className="relative max-w-5xl mx-auto w-full px-6 md:px-12 py-16 md:py-20 border border-[#33323e] rounded-xl">
						<div className="heyLiniGradient rounded-xl"></div>
						<div className="heyLiniGrain rounded-xl"></div>
						<div className="relative z-10">
							<div className="grid sm:grid-cols-3 gap-8 gap-y-16">
								<div className="flex flex-col items-center opacity-95">
									<p className="text-main-airdrop">Manually</p>
									<p className="text-3xl sm:text-2xl lg:text-3xl text-white ">
										1 account
									</p>
									<div className="grid grid-cols-2 text-main-airdrop">
										<p className="text-xl sm:text-base mt-6">Transactions:</p>
										<p className="text-xl sm:text-base mt-6 text-right">100</p>
										<p className="text-xl sm:text-base">Volume:</p>
										<p className="text-xl sm:text-base text-right">$10,000</p>
										<p className="text-xl sm:text-base">Time spent:</p>
										<p className="text-xl sm:text-base text-right text-stats-red/[85%]">
											10 hours
										</p>
									</div>
									<p className="text-3xl sm:text-2xl lg:text-3xl text-main-airdrop mt-8 sm:mt-10">
										Profit $2,342
									</p>
								</div>
								<div className="flex flex-col items-center">
									<p className="text-main-color ">Airdrop Farmer</p>
									<p className="text-3xl sm:text-2xl lg:text-3xl text-white">
										10 accounts
									</p>
									<div className="grid grid-cols-2 text-main-airdrop">
										<p className="text-xl sm:text-base mt-6">Transactions:</p>
										<p className="text-xl sm:text-base mt-6 text-right">100</p>
										<p className="text-xl sm:text-base">Volume:</p>
										<p className="text-xl sm:text-base text-right">$10,000</p>
										<p className="text-xl sm:text-base">Time spent:</p>
										<p className="text-xl sm:text-base text-right text-main-color">
											3 minutes
										</p>
									</div>
									<p className="text-3xl sm:text-2xl lg:text-3xl mt-10 text-white">
										Profit
										<span className="text-main-color font-medium">
											{' '}
											$23,420
										</span>
									</p>
								</div>
								<div className="flex flex-col items-center">
									<p className="text-main-color">Airdrop Farmer</p>
									<p className="text-3xl sm:text-2xl lg:text-3xl text-white">
										100 accounts
									</p>
									<div className="grid grid-cols-2 text-main-airdrop">
										<p className="text-xl sm:text-base mt-6">Transactions:</p>
										<p className="text-xl sm:text-base mt-6 text-right">100</p>
										<p className="text-xl sm:text-base">Volume:</p>
										<p className="text-xl sm:text-base text-right">$10,000</p>
										<p className="text-xl sm:text-base">Time spent:</p>
										<p className="text-xl sm:text-base text-right text-main-color">
											30 minutes
										</p>
									</div>
									<p className="text-3xl sm:text-2xl lg:text-3xl mt-10 text-white">
										Profit
										<span className="text-main-color font-semibold">
											{' '}
											$234,000
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Calculate
