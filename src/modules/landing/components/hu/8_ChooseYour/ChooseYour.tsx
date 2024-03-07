import { discordLink } from '@modules/shared/constants'

import './chooseYour.css'

const ChooseYour = () => {
	return (
		<section className="relative z-10 px-4 py-12 md:px-8 lg:py-28" id="pricing">
			<div className="mx-auto">
				<div className="flex w-full flex-col items-center">
					<div className="mb-8 flex w-full max-w-6xl flex-col items-center text-center lg:mb-16">
						{/* <p className="presale">BEVEZETŐ ÁR</p> */}
						<h1 className="mb-4 text-center text-3xl font-semibold text-white md:mb-8 md:text-5xl">
							Elérhető{' '}
							<span className="fancyText bg-clip-text text-transparent">
								csomagok
							</span>
						</h1>
						<p className="text-main-airdrop max-w-[770px] text-xl md:text-2xl">
							Válassz a havi előfizetéseink vagy az egyszeri csomagunk közül.
							Vágj bele az automatizált airdrop farmolásba.
						</p>
					</div>

					<div className="l:gap-0 flex flex-col items-center gap-8 xl:flex-row">
						<div className="plan l:rounded-tr-none l:rounded-br-none relative rounded-bl-xl rounded-br-xl rounded-tl-xl rounded-tr-xl bg-[#181622]">
							<div className="heyLiniGradient l:rounded-tr-none l:rounded-br-none rounded-bl-xl rounded-br-xl rounded-tl-xl rounded-tr-xl"></div>
							<div className="heyLiniGrain l:rounded-tr-none l:rounded-br-none rounded-bl-xl rounded-br-xl rounded-tl-xl rounded-tr-xl"></div>
							<div className="relative z-50 text-left text-[28px] text-white">
								BASIC{' '}
							</div>
							<p className="text-main-airdrop relative z-50 mb-8 text-left">
								Ideális, ha a közelgő airdropokat szeretnéd farmolni.
							</p>
							<span className="text-main-airdrop relative z-50 mb-8 flex gap-[8px]">
								<strong className="text-[48px] font-semibold text-white opacity-80">
									Ξ0.05
								</strong>{' '}
								/ hónap
							</span>
							<hr />
							<div className="text-main-airdrop relative z-50 mt-4 text-left">
								<span>Tartalmazza a következőket</span>
								<ul className="mt-4 flex min-h-[328px] flex-col gap-4">
									<li className="flex items-center gap-[12px]">
										<i className="items-start text-[24px]">
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
										Max. 10 tárca támogatása
										<div></div>
									</li>
									<li className="flex items-center gap-[12px]">
										<i className="items-start text-[24px]">
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
										Automatizált Airdrop Farmolás a LayerZero és zkSync-hez,
										jövőbeli airdropokhoz, mint a Base, Scroll, Linea és mások.
									</li>
									<li className="flex items-center gap-[12px]">
										<i className="items-start text-[24px]">
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
										Anti-Sybil védelem
									</li>
									<li className="flex items-center gap-[12px]">
										<i className="items-start text-[24px]">
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
										Privát Airdrop Farmer Közösség
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
								{/* <span className="text-white">14 hely maradt a 25-ből.</span> */}
								<span className="text-main-airdrop ml-2">
									Következő ár hamarosan: Ξ0.1
								</span>
							</div>
							<a
								href={`/signin`}
								className="focus:shadow-outline Button_btn__oCnKT relative z-50 flex h-[46px] items-center justify-center whitespace-nowrap rounded-md border border-[#33323e] bg-transparent px-2.5 px-4 py-2 py-[7px] !text-lg text-base font-medium tracking-tight text-white duration-200 hover:bg-[#211f2d] focus:outline-none active:scale-95"
							>
								<button
									aria-expanded="false"
									aria-haspopup="dialog"
									type="button"
								>
									Próbáld ki most
								</button>
							</a>
						</div>

						<div className="relative">
							<div className="absolute inset-[-100px] left-[0] right-[0] top-[-5%] z-[-1] mx-auto">
								<div className="apple-anime-container">
									<div className="apple-anime-inside">
										<div className="apple-anime-first"></div>
										<div className="apple-anime-second"></div>
										<div className="apple-anime-third"></div>
									</div>
								</div>
							</div>
							<div className="plan planHighlighted relative bg-[#181622]">
								<div className="heyLiniGradient rounded-xl"></div>
								<div className="heyLiniGrain rounded-xl"></div>
								<div className="relative z-50 text-left text-[28px] text-white">
									<span className="oneTime">PRO</span>
								</div>
								<p className="text-main-airdrop relative z-50 mb-8 text-left">
									Elhivatott airdrop farmereknek.
								</p>
								<span className="text-main-airdrop relative z-50 mb-8 flex gap-[8px]">
									<strong className="text-[48px] font-semibold text-white">
										Ξ0.25
									</strong>{' '}
									/ hónap
								</span>
								<hr />
								<div className="text-main-airdrop relative z-50 mt-4 text-left">
									<span>Tartalmazza a következőket</span>
									<ul className="mt-4 flex min-h-[328px] flex-col gap-4">
										<li className="flex items-center gap-[12px]">
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
											<div>
												Akár <span className="text-main-color">100</span>{' '}
												tárcáig
											</div>
											<div> </div>
										</li>
										<li className="flex items-center gap-[12px]">
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
											Automatizált Airdrop Farmolás a LayerZero és zkSync-hez,
											jövőbeli airdropokhoz, mint a Base, Scroll, Linea és
											mások.
										</li>
										<li className="flex items-center gap-[12px]">
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
											Anti-Sybil védelem
										</li>

										<li className="flex items-center gap-[12px]">
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
											Privát Airdrop Farmer Közösség
										</li>

										<li className="flex items-center gap-[12px]">
											<i>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 16 16"
													className="icon !h-5 !w-6"
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
											Továbbiak hamarosan
										</li>
									</ul>
								</div>
								<div className=" relative z-50 md:whitespace-nowrap">
									{/* <span className="text-white">19 hely maradt a 25-ből.</span> */}
									<span className="text-main-airdrop ml-2">
										Következő ár hamarosan: Ξ0.3
									</span>
								</div>
								<a
									href="/signin"
									className="focus:shadow-outline Button_btn__oCnKT relative z-50 flex h-[46px] items-center justify-center whitespace-nowrap rounded-md border border-[#33323e] bg-transparent px-2.5 px-4 py-2 py-[7px] !text-lg text-base font-medium tracking-tight text-white duration-200 hover:bg-[#211f2d] focus:outline-none active:scale-95"
								>
									<button
										aria-expanded="false"
										aria-haspopup="dialog"
										type="button"
									>
										Próbáld ki most
									</button>
								</a>
							</div>
						</div>

						{/* <div className="plan l:rounded-tl-none l:rounded-bl-none relative rounded-bl-xl rounded-br-xl rounded-tl-xl rounded-tr-xl bg-[#181622]">
							<div className="heyLiniGradient l:rounded-tl-none l:rounded-bl-none rounded-bl-xl rounded-br-xl rounded-tl-xl rounded-tr-xl"></div>
							<div className="heyLiniGrain l:rounded-tl-none l:rounded-br-none rounded-bl-xl rounded-br-xl rounded-tl-xl rounded-tr-xl"></div>
							<div className="relative z-50 text-left text-[32px] text-white">
								Prémium
							</div>
							<p className="text-main-airdrop relative z-50 mb-8 text-left">
								Professzionális airdrop farmereknek.
							</p>
							<span className="text-main-airdrop relative z-50 mb-8 flex gap-[8px]">
								<strong className="text-[48px] font-semibold text-white">
									Ξ4
								</strong>{' '}
								/ egyszeri
							</span>
							<hr />
							<div className="text-main-airdrop relative z-50 mt-4 text-left">
								<span>Tartalmazza a következőket</span>
								<ul className="mt-4 flex min-h-[328px] flex-col gap-4">
									<li className="flex items-center gap-[12px]">
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
										<div>
											Minden a <span className="text-main-color">PRO</span>{' '}
											csomagból
										</div>
									</li>
									<li className="flex items-center gap-[12px]">
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
										<div>
											Akár <span className="text-main-color">1000</span> tárcáig
										</div>
									</li>
									<li className="flex items-center gap-[12px]">
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
										Kiemelt támogatás
									</li>
									<li className="flex items-center gap-[12px]">
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
													className="fill-main-airdrop h-4 w-4"
												>
													<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
													<path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
												</svg>
											</div>
										</span>
									</li>
									<li className="flex items-center gap-[12px]">
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
										Személyes segítség a csapattól
									</li>
									<li className="flex items-center gap-[12px]">
										<i>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 16 16"
												className="icon !h-5 !w-6"
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
										Továbbiak hamarosan
									</li>
								</ul>
							</div>
							<a href={`/signin`}>
								<button
									aria-expanded="false"
									aria-haspopup="dialog"
									className="focus:shadow-outline Button_btn__oCnKT relative z-50 flex h-[46px] w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border border-[#33323e] border-[#33323e] bg-transparent px-2.5 px-4 py-2 py-[7px] !text-lg text-base font-medium tracking-tight text-white duration-200 duration-200 hover:bg-[#211f2d] hover:opacity-80 focus:outline-none active:scale-95"
									type="button"
								>
									Próbáld ki most
								</button>
							</a>
						</div> */}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ChooseYour
