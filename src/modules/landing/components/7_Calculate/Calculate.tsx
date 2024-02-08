const Calculate = () => {
	return (
		<section
			className="relative z-10 px-4 py-12 md:px-8 lg:py-28"
			id="lets-calculate"
		>
			<div className="mx-auto">
				<div className="flex w-full flex-col items-center">
					<div className="mb-8 flex w-full max-w-6xl flex-col items-center text-center lg:mb-16">
						<h1 className="mb-4 text-center text-3xl font-semibold text-white md:mb-8 md:text-5xl">
							Let&apos;s Do The Math
						</h1>
						<p className="text-main-airdrop max-w-[800px] text-xl md:text-2xl">
							What would be your earnings using Airdrop Farmer on the Arbitrum
							Airdrop? Typically, each recipient of Arbitrum received an average
							of $2,300+.
							<sup className="relative -top-3 text-xs">
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
					<div className="relative mx-auto w-full max-w-5xl rounded-xl border border-[#33323e] px-6 py-16 md:px-12 md:py-20">
						<div className="heyLiniGradient rounded-xl"></div>
						<div className="heyLiniGrain rounded-xl"></div>
						<div className="relative z-10">
							<div className="grid gap-8 gap-y-16 sm:grid-cols-3">
								<div className="flex flex-col items-center opacity-95">
									<p className="text-main-airdrop">Manually</p>
									<p className="text-3xl text-white sm:text-2xl lg:text-3xl ">
										1 account
									</p>
									<div className="text-main-airdrop grid grid-cols-2">
										<p className="mt-6 text-xl sm:text-base">Transactions:</p>
										<p className="mt-6 text-right text-xl sm:text-base">100</p>
										<p className="text-xl sm:text-base">Volume:</p>
										<p className="text-right text-xl sm:text-base">$10,000</p>
										<p className="text-xl sm:text-base">Time spent:</p>
										<p className="text-stats-red/[85%] text-right text-xl sm:text-base">
											10 hours
										</p>
									</div>
									<p className="text-main-airdrop mt-8 text-3xl sm:mt-10 sm:text-2xl lg:text-3xl">
										Profit $2,342
									</p>
								</div>
								<div className="flex flex-col items-center">
									<p className="text-main-color ">Airdrop Farmer</p>
									<p className="text-3xl text-white sm:text-2xl lg:text-3xl">
										10 accounts
									</p>
									<div className="text-main-airdrop grid grid-cols-2">
										<p className="mt-6 text-xl sm:text-base">Transactions:</p>
										<p className="mt-6 text-right text-xl sm:text-base">100</p>
										<p className="text-xl sm:text-base">Volume:</p>
										<p className="text-right text-xl sm:text-base">$10,000</p>
										<p className="text-xl sm:text-base">Time spent:</p>
										<p className="text-main-color text-right text-xl sm:text-base">
											3 minutes
										</p>
									</div>
									<p className="mt-10 text-3xl text-white sm:text-2xl lg:text-3xl">
										Profit
										<span className="text-main-color font-medium">
											{' '}
											$23,420
										</span>
									</p>
								</div>
								<div className="flex flex-col items-center">
									<p className="text-main-color">Airdrop Farmer</p>
									<p className="text-3xl text-white sm:text-2xl lg:text-3xl">
										100 accounts
									</p>
									<div className="text-main-airdrop grid grid-cols-2">
										<p className="mt-6 text-xl sm:text-base">Transactions:</p>
										<p className="mt-6 text-right text-xl sm:text-base">100</p>
										<p className="text-xl sm:text-base">Volume:</p>
										<p className="text-right text-xl sm:text-base">$10,000</p>
										<p className="text-xl sm:text-base">Time spent:</p>
										<p className="text-main-color text-right text-xl sm:text-base">
											30 minutes
										</p>
									</div>
									<p className="mt-10 text-3xl text-white sm:text-2xl lg:text-3xl">
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
