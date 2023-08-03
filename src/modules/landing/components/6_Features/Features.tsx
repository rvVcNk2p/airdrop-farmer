import Image from 'next/image'

import './features.css'

const Features = () => {
	return (
		<section
			className="relative z-10 px-4 md:px-8 py-12 lg:py-28"
			id="what-airdrop-farmer-can-do? "
		>
			<div className="max-w-8xl mx-auto">
				<div className="flex flex-col items-center justify-center flex-wrap lg:gap-16 w-full ">
					<div className="relative flex flex-col items-center">
						<h1 className="font-semibold text-3xl md:text-5xl text-white text-center mb-6 ">
							<span className="text-transparent bg-clip-text fancyText">
								Features
							</span>{' '}
							<span className="block md:inline-block">We Can Disclose</span>
						</h1>
						<p className="text-xl md:text-2xl text-center text-main-airdrop mb-8 lg:mb-0">
							This is only the beginning. The true potential is kept away from
							public view. <br /> Constantly expanding!
						</p>
					</div>
					<div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
						<div className="plan relative overflow-hidden w-full bg-[#13121d] border border-[#33323e] rounded-xl p-10 !max-w-full lg:!max-w-[500px]">
							<div className="heyLiniGradient rounded-xl"></div>
							<div className="heyLiniGrain rounded-xl"></div>
							<div className="relative z-10">
								<div className="flex items-center gap-4 mb-[27px]">
									<Image
										src="/images/f_l0-logo.png"
										height={50}
										width={50}
										className="w-6 h-auto"
										alt="Layerzero logo"
									/>
									<p className="text-3xl font-medium text-white">LayerZero</p>
								</div>
								<hr />
								<div className="text-left mt-8 text-main-airdrop relative z-50">
									<ul className="flex flex-col mt-4 gap-4">
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											Achieve Top 3% of airdrop farmers for each wallet.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											7+ chains including Ethereum, BSC, Polygon, Avalanche,
											Arbitrum, Optimism, Fantom.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											2+ bridges including Stargate and Woofi.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											Protection against Sybil attacks by utilizing a generative
											randomness algorithm.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											Anti-Sybil protection using generative randomness
											algorithm.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											Sign transactions with Private keys
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											5+ customizable parameters including &quot;sleeping&quot;
											intervals, max spend per tx, routes and others.
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="plan relative overflow-hidden w-full bg-[#13121d] border border-[#33323e] rounded-xl p-10 !max-w-full lg:!max-w-[500px]">
							<div className="heyLiniGradient rounded-xl"></div>
							<div className="heyLiniGrain rounded-xl"></div>
							<div className="relative z-10 h-full">
								<div className="flex items-center gap-4 mb-8">
									<Image
										src="/images/f_zksync-logo.png"
										height={50}
										width={50}
										className="w-10 h-auto"
										alt="Layerzero logo"
									/>
									<p className="text-3xl font-medium text-white">ZkSync</p>
								</div>
								<hr />
								{/* <div className="text-left mt-8 text-main-airdrop relative z-50">
									<ul className="flex flex-col mt-4 gap-4">
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											Achieve Top 1% of airdrop farmers for each wallet.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											5+ activities including swaps, minting, providing
											liquidity, lending and wrapping.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											15+ different projects on zkSync.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											2+ bridges to zkSync including Official Bridge and
											Orbiter.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											Anti-Sybil protection using generative randomness
											algorithm with considering zkSync “one node” problem.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											Sign transactions with Private keys or Metamask.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											30+ customizable parameters including &quot;sleeping&quot;
											intervals, max spend per tx, routes and others.
										</li>
									</ul>
								</div> */}
								<div className="text-main-airdrop flex flex-col min-h-[200px] h-full justify-center items-center text-xl">
									Coming soon
								</div>
							</div>
						</div>
						<div className="plan relative overflow-hidden w-full bg-[#13121d] border border-[#33323e] rounded-xl p-10 !max-w-full lg:!max-w-[500px]">
							<div className="heyLiniGradient rounded-xl"></div>
							<div className="heyLiniGrain rounded-xl"></div>
							<div className="relative z-10 h-full">
								<div className="flex items-center gap-4 mb-[27px]">
									<Image
										src="/images/f_starknet-logo.png"
										height={50}
										width={50}
										className="w-11 h-auto"
										alt="Layerzero logo"
									/>
									<p className="text-3xl font-medium text-white">Starknet</p>
								</div>
								<hr />
								{/* <div className="text-left mt-8 text-main-airdrop relative z-50">
									<ul className="flex flex-col mt-4 gap-4">
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											Achieve Top 1% of airdrop farmers for each wallet.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											5+ activities including swaps, minting, providing
											liquidity, lending and wrapping.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											5+ different projects on StarkNet.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											3+ bridges to StarkNet including Official Bridge, Orbiter
											and LayerSwap.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											Anti-Sybil protection using generative randomness
											algorithm with considering zkSync “one node” problem.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											Sign transactions with Private keys.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-[24px] items-start text-main-color">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
													></path>
												</svg>
											</i>
											30+ customizable parameters including &quot;sleeping&quot;
											intervals, max spend per tx, routes and others.
										</li>
									</ul>
								</div> */}
								<div className="text-main-airdrop flex flex-col min-h-[200px] h-full justify-center items-center text-xl">
									Coming soon
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Features
