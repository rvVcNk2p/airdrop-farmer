import Image from 'next/image'

export default function Home() {
	return (
		<>
			<section className="relative z-10 px-4 md:px-8 py-12 lg:py-28">
				<div className="max-w-6xl mx-auto">
					<div className="w-full flex flex-col items-center heyLiniAfter">
						<div className="flex flex-col items-center w-full text-center mb-8 lg:mb-16">
							<h1 className="max-w-[800px] font-semibold text-3xl md:text-5xl text-white text-center mb-4 md:mb-8">
								<span className="mr-4">We&apos;ve Got</span>
								<span className="text-transparent bg-clip-text fancyText">
									You Covered
								</span>
							</h1>
							<p className="max-w-[800px] text-xl md:text-2xl text-main-airdrop text-center">
								Anti-Sybil protection provided by generative randomness
								algorithm
							</p>
						</div>
						<div className="w-full relative">
							<div className="flex flex-col w-full min-[h-auto] rounded-xl overflow-hidden bg-[#181622] heyLini p-[1px] min-h-[initial]">
								<div className="relative overflow-hidden w-full bg-[#13121d] border border-[#33323e] rounded-xl p-10">
									<div className="heyLiniGradient rounded-xl"></div>
									<div className="heyLiniGrain rounded-xl"></div>
									<div className="relative z-10 mb-16">
										<h2 className="text-3xl font-medium text-white mb-8">
											<span className="text-transparent bg-clip-text fancyText">
												1. Airdrop Farming:
											</span>
											<span>What&apos;s the Buzz All About?</span>
										</h2>
										<p className="text-lg text-main-airdrop">
											In the ever-evolving realm of digital assets, airdrop
											farming has become a buzzword. But what exactly is it, and
											why is it gaining so much attention? Airdrop farming is a
											strategy where individuals aim to maximize their gains by
											participating in various token airdrops. These airdrops
											often reward participants with free tokens for specific
											actions or holding certain assets. However, the rise of
											airdrop farming has also led to concerns about fair
											distribution and the emergence of potential exploits, such
											as Sybil attacks.
										</p>
									</div>

									<div className="relative z-10 mb-16">
										<h2 className="text-3xl font-medium text-white mb-8">
											<span className="text-transparent bg-clip-text fancyText">
												2. Ensuring Secure
											</span>
											<span> Participation with Randomized Strategies</span>
										</h2>
										<p className="text-lg text-main-airdrop">
											As you venture into the world of airdrop farming, your
											security is our top priority. We&apos;ve implemented a
											robust Anti-Sybil protection mechanism that revolves
											around generative randomness algorithms. Here&apos;s how
											we safeguard your airdrop farming experience:
											<h3 className="text-2xl font-medium text-white m-4 ml-0">
												Diversified and Unpredictable Strategies
											</h3>
											<p>
												To counter the risk of Sybil attacks, our platform
												employs a system that completely randomizes the actions
												taken by your wallets. Each wallet operates
												independently, introducing variations in timings,
												orders, and sums. This diversification creates a
												strategic unpredictability that safeguards against any
												attempts to exploit patterns.
											</p>
											<h3 className="text-2xl font-medium text-white m-4 ml-0">
												Airdrop Farming Best Practices
											</h3>
											<p>
												Participating in airdrop farming doesn&apos;t have to be
												a complex task. We provide comprehensive guides and
												settings to assist you in making informed decisions.
												These resources empower you to adopt best practices,
												ensuring that your engagement in airdrops is secure and
												in compliance with the rules set by various projects.
											</p>
											<h3 className="text-2xl font-medium text-white m-4 ml-0">
												Customizable Strategies with Ease
											</h3>
											<p>
												Our platform is designed for individuals who may not be
												web3 developers. We simplify the process of securing
												your airdrop farming activities by offering
												user-friendly guides and customizable settings. You can
												easily set different timings, orders, and sums for each
												wallet, tailoring your strategy without delving into
												complex technicalities.
											</p>
										</p>
									</div>

									<div className="relative z-10">
										<h2 className="text-3xl font-medium text-white mb-8">
											<span className="text-transparent bg-clip-text fancyText">
												3. Seamless
											</span>
											<span> Airdrop Farming Experience Made Easy</span>
										</h2>
										<p className="text-lg text-main-airdrop">
											Participating in airdrop farming should be an exciting and
											rewarding experience, not a source of worry. Here&apos;s
											why our platform makes airdrop farming a seamless and
											secure journey for you:
											<h3 className="text-2xl font-medium text-white m-4 ml-0">
												User-Friendly Interface
											</h3>
											<p>
												Navigating our platform is a breeze with our
												user-friendly interface. Whether you&apos;re a seasoned
												crypto enthusiast or new to the space, you can
												effortlessly explore settings and customize your
												strategies without any technical barriers.
											</p>
											<h3 className="text-2xl font-medium text-white m-4 ml-0">
												Step-by-Step Tutorials
											</h3>
											<p>
												Concerned about making mistakes or overlooking crucial
												details? Our step-by-step tutorials guide you through
												the process of securing your airdrop farming strategies.
												Follow along at your own pace, ensuring a secure and
												stress-free experience.
											</p>
											<h3 className="text-2xl font-medium text-white m-4 ml-0">
												Support at Your Fingertips
											</h3>
											<p>
												If you ever find yourself in need of assistance, our
												dedicated support team is ready to help. We understand
												that airdrop farming is a dynamic landscape, and
												we&aposre committed to providing timely and effective
												support to enhance your overall experience.
											</p>
											<p>
												In conclusion, our platform empowers you to engage in
												airdrop farming confidently. Embrace the potential
												rewards of token airdrops while enjoying the peace of
												mind that comes with cutting-edge security measures and
												user-friendly features. A secure airdrop farming journey
												awaits you!
											</p>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
