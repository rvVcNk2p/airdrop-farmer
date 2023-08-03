import Image from 'next/image'

const GotYouCovered = () => {
	return (
		<section
			className="relative z-10 px-4 md:px-8 py-12 lg:py-28"
			id="token-modal-with-purchase"
		>
			<div className="max-w-5xl mx-auto">
				<div className="flex flex-col items-center w-full text-center mb-8 lg:mb-16">
					<h1 className="font-semibold text-3xl md:text-5xl text-white text-center mb-6 ">
						<span className="mr-4">We&apos;ve Got</span>
						<span className="text-transparent bg-clip-text fancyText">
							You Covered
						</span>
					</h1>
					<div className="text-xl md:text-2xl text-center text-main-airdrop animate-reveal-description max-w-[700px]">
						At Copilot, we understand the importance of safety and security when
						it comes to your crypto assets. That&apos;s why we&apos;ve taken
						every measure to create a truly safe and reliable airdrop farming
						autopilot.
					</div>
				</div>
				<div className="w-full flex flex-col items-center heyLiniAfter">
					<div className="flex flex-col items-center gap-8 lg:gap-16">
						<div className="relative flex-col md:flex-row flex gap-8 lg:gap-16">
							<div className="relative overflow-hidden w-full border border-[#33323e] bg-[#13121d] rounded-xl p-10">
								<div className="heyLiniGrain rounded-xl"></div>
								<div className="heyLiniGradient"></div>
								<div className="relative z-10">
									<p className="text-8xl font-bold text-transparent bg-clip-text fancyText mb-6 leading-none -mt-8">
										∞
									</p>
									<p className="text-3xl font-medium text-white mb-8">
										1-Click Auto Refill
									</p>
									<p className="text-lg text-main-airdrop">
										We took care of everything. All you need to do is to top up
										your wallet once and we will refill it with native tokens on
										all chains you farm. Saving days of manual work.
									</p>
								</div>
							</div>
							<div className="relative overflow-hidden w-full bg-[#13121d] border border-[#33323e] rounded-xl p-10">
								<div className="heyLiniGradient rounded-xl"></div>
								<div className="heyLiniGrain rounded-xl"></div>
								<div className="relative z-10">
									<div className="overflow-hidden drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] mb-[33px]">
										<Image
											src="/images/gyc_b_randomization.png"
											width={1000}
											height={1000}
											className="w-3/4 rounded-xl"
											alt="Randomization of actions for airdrop farming"
										/>
									</div>
									<p className="text-3xl font-medium text-white mb-8">
										<span className="text-transparent bg-clip-text fancyText">
											No Risk
										</span>
										<span className="block xs:inline-block">
											to Become a Sybil
										</span>
									</p>
									<p className="text-lg text-main-airdrop">
										System completely randomizes actions taken by your wallets
										to eliminate any potential identification them as Sybil.
										Each wallet have different timings, orders, and sums,
										creating a diverse and unpredictable strategy that prevents
										identification.
									</p>
								</div>
							</div>
						</div>
						<div className="relative flex flex-col md:flex-row items-center rounded-xl px-10 md:px-32 py-12 liniGradient gap-10 md:gap-20">
							<div className="overflow-hidden drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] w-full md:w-3/5">
								<Image
									src="/images/gyc_c_private-keys.png"
									width={1000}
									height={1000}
									alt="Private Keys Stay Private"
									className="w-full rounded-xl"
								/>
							</div>
							<div className="w-full md:w-2/5 text-center md:text-left">
								<p className="text-3xl font-medium text-white mb-8">
									Your Private Keys
									<span className="block xs:inline-block">Stay Private</span>
								</p>
								<p
									className="text-lg"
									style={{ color: 'hsla(0, 0%, 100%, 0.8)' }}
								>
									All keys are stored encrypted in your browser and only you
									have access to them. We store nothing on our end.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default GotYouCovered
