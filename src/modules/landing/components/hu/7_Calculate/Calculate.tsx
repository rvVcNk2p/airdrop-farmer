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
							Lássuk a számokat
						</h1>
						<p className="text-main-airdrop max-w-[800px] text-xl md:text-2xl">
							Számoljuk ki, hogy mennyi lett volna a bevételünk az Airdrop
							Farmer használatával az Arbitrum Airdropban ha minden Airdropra
							jogosult tárca átlagosan 2300 dollár felett kapott Airdropot.
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
									<p className="text-main-airdrop">Manuálisan</p>
									<p className="text-3xl text-white sm:text-2xl lg:text-3xl ">
										1 fiók
									</p>
									<div className="text-main-airdrop grid grid-cols-2">
										<p className="mt-6 text-xl sm:text-base">Tranzakciók:</p>
										<p className="mt-6 text-right text-xl sm:text-base">100</p>
										<p className="text-xl sm:text-base">Forgalom:</p>
										<p className="text-right text-xl sm:text-base">
											10,000 dollár
										</p>
										<p className="text-xl sm:text-base">Eltöltött idő:</p>
										<p className="text-stats-red/[85%] text-right text-xl sm:text-base">
											10 óra
										</p>
									</div>
									<p className="text-main-airdrop mt-8 text-3xl sm:mt-10 sm:text-2xl lg:text-3xl">
										Profit 2,342 dollár
									</p>
								</div>
								<div className="flex flex-col items-center">
									<p className="text-main-color ">Airdrop Farmer</p>
									<p className="text-3xl text-white sm:text-2xl lg:text-3xl">
										10 fiók
									</p>
									<div className="text-main-airdrop grid grid-cols-2">
										<p className="mt-6 text-xl sm:text-base">Tranzakciók:</p>
										<p className="mt-6 text-right text-xl sm:text-base">100</p>
										<p className="text-xl sm:text-base">Forgalom:</p>
										<p className="text-right text-xl sm:text-base">
											10,000 dollár
										</p>
										<p className="text-xl sm:text-base">Eltöltött idő:</p>
										<p className="text-main-color text-right text-xl sm:text-base">
											3 perc
										</p>
									</div>
									<p className="mt-10 text-3xl text-white sm:text-2xl lg:text-3xl">
										Profit
										<span className="text-main-color font-medium">
											{' '}
											23,420 dollár
										</span>
									</p>
								</div>
								<div className="flex flex-col items-center">
									<p className="text-main-color">Airdrop Farmer</p>
									<p className="text-3xl text-white sm:text-2xl lg:text-3xl">
										100 fiók
									</p>
									<div className="text-main-airdrop grid grid-cols-2">
										<p className="mt-6 text-xl sm:text-base">Tranzakciók:</p>
										<p className="mt-6 text-right text-xl sm:text-base">100</p>
										<p className="text-xl sm:text-base">Forgalom:</p>
										<p className="text-right text-xl sm:text-base">
											10,000 dollár
										</p>
										<p className="text-xl sm:text-base">Eltöltött idő:</p>
										<p className="text-main-color text-right text-xl sm:text-base">
											30 perc
										</p>
									</div>
									<p className="mt-10 text-3xl text-white sm:text-2xl lg:text-3xl">
										Profit
										<span className="text-main-color font-semibold">
											{' '}
											234,000 dollár
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
