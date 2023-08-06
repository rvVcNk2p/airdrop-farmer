import { discordLink } from '@modules/shared/constants'

import './chooseYour.css'

const ChooseYour = () => {
	return (
		<section className="relative z-10 px-4 md:px-8 py-12 lg:py-28" id="pricing">
			<div className="mx-auto">
				<div className="w-full flex flex-col items-center">
					<div className="max-w-6xl flex flex-col items-center w-full text-center mb-8 lg:mb-16">
						<p className="presale">PRESALE</p>
						<h1 className="font-semibold text-3xl md:text-5xl text-white text-center mb-4 md:mb-8">
							Pricing{' '}
							{/* <span className="text-transparent bg-clip-text fancyText">
								Farmer
							</span> */}
						</h1>
						<p className="max-w-[770px] text-xl md:text-2xl text-main-airdrop">
							Eager to boost your profits and save time? Pick between our
							monthly subscription and one-time package to start experiencing
							automated airdrop farming.
						</p>
					</div>
					<div className="flex flex-col xl:flex-row items-center gap-8 l:gap-0">
						<div className="plan bg-[#181622] relative rounded-tr-xl l:rounded-tr-none rounded-br-xl l:rounded-br-none rounded-tl-xl rounded-bl-xl">
							<div className="heyLiniGradient rounded-tr-xl l:rounded-tr-none rounded-br-xl l:rounded-br-none rounded-tl-xl rounded-bl-xl"></div>
							<div className="heyLiniGrain rounded-tr-xl l:rounded-tr-none rounded-br-xl l:rounded-br-none rounded-tl-xl rounded-bl-xl"></div>
							<div className="text-left text-white text-[28px] relative z-50">
								Monthly{' '}
							</div>
							<p className="mb-8 text-left text-main-airdrop relative z-50">
								Best option for farming upcoming airdrops.
							</p>
							<span className="flex gap-[8px] mb-8 text-main-airdrop relative z-50">
								<strong className="text-white text-[48px] opacity-80 font-semibold">
									Ξ0.075
								</strong>{' '}
								ETH / month
							</span>
							<hr />
							<div className="text-left mt-4 text-main-airdrop relative z-50">
								<span>What’s included</span>
								<ul className="flex flex-col mt-4 gap-4 min-h-[328px]">
									<li className="flex items-center gap-[12px]">
										<i className="text-[24px] items-start">
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
										Up to 3 wallets
										<div></div>
									</li>
									<li className="flex items-center gap-[12px]">
										<i className="text-[24px] items-start">
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
										Automated Airdrop Farming for LayerZero
									</li>
									<li className="flex items-center gap-[12px]">
										<i className="text-[24px] items-start">
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
										Anti-Sybil Protection
									</li>
									<li className="flex items-center gap-[12px]">
										<i className="text-[24px] items-start">
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
										Private Airdrop Farmers Community
									</li>
									{/* <li className="flex items-center gap-[12px]">
										<i className="text-[24px] items-start">
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
										Airdrops Farming Guide
									</li> */}
								</ul>
							</div>
							<div className=" relative z-50 md:whitespace-nowrap">
								<span className="text-white">25 spots left.</span>
								<span className="text-main-airdrop ml-2">
									0/25 claimed. Next price: Ξ0.15 ETH
								</span>
							</div>
							<a
								href={`${discordLink}`}
								className="flex items-center justify-center font-medium rounded-md whitespace-nowrap duration-200 focus:outline-none focus:shadow-outline bg-transparent border border-[#33323e] text-white hover:bg-[#211f2d] text-base py-[7px] px-2.5 relative z-50 h-[46px] !text-lg py-2 px-4 tracking-tight active:scale-95 Button_btn__oCnKT"
							>
								<button
									aria-expanded="false"
									aria-haspopup="dialog"
									type="button"
								>
									Claim Your Spot
								</button>
							</a>
						</div>
						<div className="relative">
							<div className="absolute inset-[-100px] top-[-5%] left-[0] right-[0] mx-auto z-[-1]">
								<div className="apple-anime-container">
									<div className="apple-anime-inside">
										<div className="apple-anime-first"></div>
										<div className="apple-anime-second"></div>
										<div className="apple-anime-third"></div>
									</div>
								</div>
							</div>
							<div className="plan planHighlighted bg-[#181622] relative">
								<div className="heyLiniGradient rounded-xl"></div>
								<div className="heyLiniGrain rounded-xl"></div>
								<div className="text-left text-white text-[28px] relative z-50">
									<span className="oneTime">Lifetime</span>
								</div>
								<p className="mb-8 text-left text-main-airdrop relative z-50">
									Designed for dedicated airdrop farmers.
								</p>
								<span className="flex gap-[8px] mb-8 text-main-airdrop relative z-50">
									<strong className="text-white text-[48px] font-semibold">
										Ξ0.3
									</strong>{' '}
									ETH / one time
								</span>
								<hr />
								<div className="text-left mt-4 text-main-airdrop relative z-50">
									<span>What’s included</span>
									<ul className="flex flex-col mt-4 gap-4 min-h-[328px]">
										<li className="flex items-center gap-[12px]">
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
											<div>
												Up to <span className="text-main-color">10</span>{' '}
												wallets
											</div>
											<div> </div>
										</li>
										<li className="flex items-center gap-[12px]">
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
											Automated Airdrop Farming for LayerZero, future airdrops
											like zkSync, StarkNet, Linea and others.
										</li>
										<li className="flex items-center gap-[12px]">
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
											Anti-Sybil Protection
										</li>

										<li className="flex items-center gap-[12px]">
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
											Private Airdrop Farmers Community
										</li>
										<li className="flex items-center gap-[12px]">
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
											Airdrops Farming Guide
										</li>
										<li className="flex items-center gap-[12px]">
											<i>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon !w-6 !h-5"
												>
													<path
														fill="#76cb9f"
														d="M5.75 10C10 10 10 5.75 10 5.75S10 10 14.25 10C10 10 10 14.25 10 14.25S10 10 5.75 10ZM4 1.75S4 4 1.75 4C4 4 4 6.25 4 6.25S4 4 6.25 4C4 4 4 1.75 4 1.75Z"
													></path>
													<path
														stroke="#76cb9f"
														strokeLinecap="round" // stroke-linecap
														strokeLinejoin="round" // stroke-linejoin
														strokeWidth="1.5" // stroke-width
														d="M5.75 10C10 10 10 5.75 10 5.75S10 10 14.25 10C10 10 10 14.25 10 14.25S10 10 5.75 10ZM4 1.75S4 4 1.75 4C4 4 4 6.25 4 6.25S4 4 6.25 4C4 4 4 1.75 4 1.75Z"
													></path>
												</svg>
											</i>
											More Coming Soon
										</li>
									</ul>
								</div>
								<div className=" relative z-50 md:whitespace-nowrap">
									<span className="text-white">25 spots left.</span>
									<span className="text-main-airdrop ml-2">
										0/25 claimed. Next price: Ξ0.6 ETH
									</span>
								</div>
								<a
									href={`${discordLink}`}
									className="flex items-center justify-center font-medium rounded-md whitespace-nowrap duration-200 focus:outline-none focus:shadow-outline bg-transparent border border-[#33323e] text-white hover:bg-[#211f2d] text-base py-[7px] px-2.5 relative z-50 h-[46px] !text-lg py-2 px-4 tracking-tight active:scale-95 Button_btn__oCnKT"
								>
									<button
										aria-expanded="false"
										aria-haspopup="dialog"
										type="button"
									>
										Claim Your Spot
									</button>
								</a>
							</div>
						</div>
						{/* <div className="plan bg-[#181622] relative rounded-tl-xl l:rounded-tl-none rounded-bl-xl l:rounded-bl-none rounded-tr-xl rounded-br-xl">
							<div className="heyLiniGradient rounded-tl-xl l:rounded-tl-none rounded-bl-xl l:rounded-bl-none rounded-tr-xl rounded-br-xl"></div>
							<div className="heyLiniGrain rounded-tl-xl l:rounded-tl-none rounded-bl-xl l:rounded-br-none rounded-tr-xl rounded-br-xl"></div>
							<div className="text-left text-white text-[32px] relative z-50">
								Premium
							</div>
							<p className="mb-8 text-left text-main-airdrop relative z-50">
								Made for professional airdrop farmers.
							</p>
							<span className="flex gap-[8px] mb-8 text-main-airdrop relative z-50">
								<strong className="text-white text-[48px] font-semibold">
									Ξ3.8
								</strong>{' '}
								/ one time
							</span>
							<hr />
							<div className="text-left mt-4 text-main-airdrop relative z-50">
								<span>What’s included</span>
								<ul className="flex flex-col mt-4 gap-4 min-h-[328px]">
									<li className="flex items-center gap-[12px]">
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
										<div>
											Everything in{' '}
											<span className="text-main-color">Lifetime</span>
										</div>
									</li>
									<li className="flex items-center gap-[12px]">
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
										<div>
											Up to <span className="text-main-color">1000</span>{' '}
											wallets
										</div>
									</li>
									<li className="flex items-center gap-[12px]">
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
										Personal Guidance From The Team
									</li>
									<li className="flex items-center gap-[12px]">
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
										<span className="flex items-center gap-1">
											Custom Bot Configuration
											<br />
											Adjusted to Your Strategy{' '}
											<div className="relative -top-2.5">
												<svg
													stroke="currentColor"
													fill="currentColor"
													strokeWidth="0" // stroke-width
													viewBox="0 0 1024 1024"
													height="1em"
													width="1em"
													xmlns="http://www.w3.org/2000/svg"
													className="w-4 h-4 fill-main-airdrop"
												>
													<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
													<path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
												</svg>
											</div>
										</span>
									</li>
									<li className="flex items-center gap-[12px]">
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
										Priority Support &amp; Personal
										<br />
										Private Chat With The Team
									</li>
									<li className="flex items-center gap-[12px]">
										<i>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 16 16"
												className="icon !w-6 !h-5"
											>
												<path
													fill="#76cb9f"
													d="M5.75 10C10 10 10 5.75 10 5.75S10 10 14.25 10C10 10 10 14.25 10 14.25S10 10 5.75 10ZM4 1.75S4 4 1.75 4C4 4 4 6.25 4 6.25S4 4 6.25 4C4 4 4 1.75 4 1.75Z"
												></path>
												<path
													stroke="#76cb9f"
													strokeLinecap="round" // stroke-linecap
													strokeLinejoin="round" // stroke-linejoin
													strokeWidth="1.5" // stroke-width
													d="M5.75 10C10 10 10 5.75 10 5.75S10 10 14.25 10C10 10 10 14.25 10 14.25S10 10 5.75 10ZM4 1.75S4 4 1.75 4C4 4 4 6.25 4 6.25S4 4 6.25 4C4 4 4 1.75 4 1.75Z"
												></path>
											</svg>
										</i>
										More Coming Soon
									</li>
								</ul>
							</div>
							<button
								aria-expanded="false"
								aria-haspopup="dialog"
								className="flex items-center justify-center font-medium rounded-md whitespace-nowrap duration-200 focus:outline-none focus:shadow-outline bg-transparent border border-[#33323e] text-white hover:bg-[#211f2d] text-base py-[7px] px-2.5 relative z-50 h-[46px] !text-lg py-2 px-4 tracking-tight active:scale-95 border border-[#33323e] cursor-pointer duration-200 hover:opacity-80 Button_btn__oCnKT"
								type="button"
							>
								Claim Your Spot
							</button>
						</div> */}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ChooseYour
