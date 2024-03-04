const HeroSection = () => {
	return (
		<section className="px-4 py-16 md:px-8 lg:-mt-[72px] lg:min-h-screen lg:pb-36 lg:pt-64">
			<div className="z-10 mx-auto max-w-6xl">
				<div className="flex flex-col items-center justify-center gap-4 lg:gap-16">
					<div className="relative z-10 mt-6 flex w-full flex-col items-center md:mt-8 lg:mt-0">
						<h1 className="animate-reveal-title header relative mb-6 text-center text-4xl font-semibold text-white md:text-6xl md:leading-tight">
							Automatizáld a
							<span className="block">
								<span className="animate-words text-main-color mr-6 w-[175px] text-valid md:w-[271px]"></span>
								Airdrop Farmolást
							</span>
						</h1>

						<div className="text-main-airdrop animate-reveal-description mb-8 max-w-2xl text-center text-xl md:text-2xl">
							Maximalizáld az airdropból származó profitod egy egyszerű
							megoldással: Spórolj értékes időt a Kriptotárcák használatának
							kényelmes automatizálásával úgy, hogy az Airdropokra jogsult
							tárcákat ellenörző Algoritmus se tudjon kiszűrni.
						</div>
					</div>
					<div className="relative mt-8">
						<div className="absolute inset-[-100px] left-[0] right-[0] top-[-5%] z-0 mx-auto">
							<div className="apple-anime-container">
								<div className="apple-anime-inside">
									<div className="apple-anime-first"></div>
									<div className="apple-anime-second"></div>
									<div className="apple-anime-third"></div>
								</div>
							</div>
						</div>
						<div className="relative">
							<div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-[rgb(118,203,159,0.6)] to-sky-300/0"></div>
							<iframe
								className="aspect-video h-auto w-screen max-w-[1120px] px-4"
								src="https://www.youtube.com/embed/O0Ho8dj3ApE"
								title="Airdrop Copilot - LayerZero Farming Bot"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							></iframe>
							<div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-sky-300/0 via-[rgb(118,203,159,0.6)] to-sky-300/0"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
