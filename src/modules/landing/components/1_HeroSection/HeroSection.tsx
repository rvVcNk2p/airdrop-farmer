const HeroSection = () => {
	const inlineStyle = {
		display: 'inline-block',
		transform: 'translateY(-0.0110131px)',
		opacity: 0.998899,
		WebkitTextFillColor: 'initial',
	}

	return (
		<section className="px-4 md:px-8 py-16 lg:pb-36 lg:pt-64 lg:min-h-screen lg:-mt-[72px]">
			<div className="max-w-6xl mx-auto z-10">
				<div className="flex flex-col items-center justify-center gap-4 lg:gap-16">
					<div className="flex flex-col items-center w-full mt-6 md:mt-8 lg:mt-0 relative z-10">
						<h1 className="font-semibold text-4xl md:text-6xl md:leading-tight text-center mb-6 animate-reveal-title text-white header relative">
							Automate Your
							<span className="block">
								<span
									style={inlineStyle}
									// data="LayerZero,ZkSync,StarkNet"
									// effect="topDown"
									className="text-main-color w-[175px] md:w-[271px] mr-6 text-valid"
								>
									LayerZero
								</span>
								Airdrop Farming
							</span>
						</h1>
						<div className="text-xl md:text-2xl text-center text-main-airdrop mb-8 animate-reveal-description max-w-2xl">
							Maximize your airdrop profits with a simple solution: save
							valuable time by automating Metamask popups and stay safeguarded
							from Sybil risks.
						</div>
					</div>
					<div className="relative mt-8">
						<div className="absolute inset-[-100px] top-[-5%] left-[0] right-[0] mx-auto z-0">
							<div className="apple-anime-container">
								<div className="apple-anime-inside">
									<div className="apple-anime-first"></div>
									<div className="apple-anime-second"></div>
									<div className="apple-anime-third"></div>
								</div>
							</div>
						</div>
						<div className="relative">
							<div className="absolute h-px bg-gradient-to-r from-sky-300/0 via-[rgb(118,203,159,0.6)] to-sky-300/0 -top-px left-20 right-11"></div>
							<iframe
								className="max-w-[1120px] w-screen h-auto px-4 aspect-video"
								src="https://www.youtube.com/embed/O0Ho8dj3ApE"
								title="Airdrop Copilot - LayerZero Farming Bot"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							></iframe>
							<div className="absolute h-px bg-gradient-to-r from-sky-300/0 via-[rgb(118,203,159,0.6)] to-sky-300/0 -bottom-px left-11 right-20"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
