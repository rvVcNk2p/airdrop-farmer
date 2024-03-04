import Image from 'next/image'

import './features.css'

const Features = () => {
	return (
		<section
			className="relative z-10 px-4 py-12 md:px-8 lg:py-28"
			id="what-airdrop-copilot-can-do"
		>
			<div className="max-w-8xl mx-auto">
				<div className="flex w-full flex-col flex-wrap items-center justify-center lg:gap-16 ">
					<div className="relative flex flex-col items-center">
						<h1 className="mb-6 text-center text-3xl font-semibold text-white md:text-5xl ">
							<span className="fancyText bg-clip-text text-transparent">
								Mindig
							</span>{' '}
							<span className="block md:inline-block">
								az aktuális airdropok
							</span>
						</h1>
						<p className="text-main-airdrop mb-8 text-center text-xl md:text-2xl lg:mb-0">
							Ahogyan a különböző Airdropok lehetősége, úgy a Mi általunk
							fejlesztett műveletek és hátózatok száma is folyamatosan bővül.
						</p>
					</div>
					<div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
						<div className="plan relative w-full !max-w-full overflow-hidden rounded-xl border border-[#33323e] bg-[#13121d] p-10 lg:!max-w-[500px]">
							<div className="heyLiniGradient rounded-xl"></div>
							<div className="heyLiniGrain rounded-xl"></div>
							<div className="relative z-10">
								<div className="mb-[27px] flex items-center gap-4">
									<Image
										src="/images/f_l0-logo.png"
										height={50}
										width={50}
										className="h-auto w-6"
										alt="Layerzero logo"
									/>
									<p className="text-3xl font-medium text-white">LayerZero</p>
								</div>
								<hr />
								<div className="text-main-airdrop relative z-50 mt-8 text-left">
									<ul className="mt-4 flex flex-col gap-4">
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											Érd el az airdrop farmerek legjobb 3%-át minden egyes
											tárcáddal.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											7+ lánc, beleértve az Ethereumot, BSC-t, Polygont,
											Avalanchet, Arbitrumot, Optimismt, Fantomot.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											2+ híd, beleértve a Stargate-et és a Woofi-t.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											Védelem a Sybil támadások ellen egy generatív
											véletlenszerűségi algoritmus segítségével.
										</li>
										{/* <li className="flex items-center gap-[12px] lg:text-lg">
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
										</li> */}
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											Tranzakciók aláírása privát kulcsokkal
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											5+ testreszabható paraméter, beleértve a
											&quot;szundi&quot; időközöket, a maximális költést
											tranzakciónként, az útvonalakat és egyebeket.
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="plan relative w-full !max-w-full overflow-hidden rounded-xl border border-[#33323e] bg-[#13121d] p-10 lg:!max-w-[500px]">
							<div className="heyLiniGradient rounded-xl"></div>
							<div className="heyLiniGrain rounded-xl"></div>
							<div className="relative z-10 h-full">
								<div className="mb-8 flex items-center gap-4">
									<Image
										src="/images/f_zksync-logo.png"
										height={50}
										width={50}
										className="h-auto w-10"
										alt="Zksync logo"
									/>
									<p className="text-3xl font-medium text-white">ZkSync</p>
								</div>
								<hr />
								<div className="text-main-airdrop relative z-50 mt-8 text-left">
									<ul className="mt-4 flex flex-col gap-4">
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											Érd el az airdrop farmerek legjobb 3%-át minden egyes
											tárcáddal.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											5+ tranzakció típus, beleértve a swapokat, mintelést,
											liquidity biztosítást, kölcsönzést és wrappelést.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											10+ különböző projekt a zkSync-en.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											2+ híd a zkSync-hez, beleértve a hivatalos hidat és a
											Orbitert.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											Védelem a Sybil támadások ellen egy generatív
											véletlenszerűségi algoritmus segítségével.
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											Tranzakciók aláírása privát kulcsokkal
										</li>
										<li className="flex items-center gap-[12px] lg:text-lg">
											<i className="text-main-color items-start text-[24px]">
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
											20+ testreszabható paraméter, beleértve a
											&quot;szundi&quot; időközöket, a maximális költést
											tranzakciónként, az útvonalakat és egyebeket.
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="plan relative w-full !max-w-full overflow-hidden rounded-xl border border-[#33323e] bg-[#13121d] p-10 lg:!max-w-[500px]">
							<div className="heyLiniGradient rounded-xl"></div>
							<div className="heyLiniGrain rounded-xl"></div>
							<div className="relative z-10 h-full">
								<div className="mb-[27px] flex items-center gap-4">
									{/* <Image
										src="/images/f_starknet-logo.png"
										height={50}
										width={50}
										className="h-auto w-11"
										alt="Starknet logo"
									/> */}
									<p className="text-3xl font-medium text-white">
										Base, Scroll, Linea, stb.
									</p>
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
								<div className="text-main-airdrop flex h-full min-h-[200px] flex-col items-center justify-center text-xl">
									Hamarosan
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
