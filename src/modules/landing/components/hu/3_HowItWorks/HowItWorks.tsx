'use client'

import { Gear, Key, Play, Wallet } from '@phosphor-icons/react'
import Image from 'next/image'
import { useState } from 'react'

const HowItWorks = () => {
	const [activeStep, setActiveStep] = useState(0)

	const steps = [
		{
			title: 'Válassz stratégiát',
			img: '1_create-strategy.png',
			alt: 'Create Strategy',
			icon: () => <Gear />,
		},
		// TODO: Rework image
		{
			title: 'Adj hozzá kulcsot',
			img: '2_edit-and-add-group.png',
			alt: 'Edit and Add strategy',
			icon: () => <Key />,
		},
		{
			title: 'Töltsd fel a tárcádat',
			img: '3_top-up-wallet.png',
			alt: 'Top up wallet',
			icon: () => <Wallet />,
		},
		{
			title: 'Futtasd a robotot',
			img: '4_in-action-logs.png',
			alt: 'In action logs',
			icon: () => <Play />,
		},
	]

	const nextStep = () => {
		if (activeStep === steps.length - 1) {
			setActiveStep(0)
		} else {
			setActiveStep(activeStep + 1)
		}
	}

	const previouseStep = () => {
		if (activeStep === 0) {
			setActiveStep(steps.length - 1)
		} else {
			setActiveStep(activeStep - 1)
		}
	}

	return (
		<section className="relative z-10 px-4 py-12 md:px-8 lg:py-28">
			<div className="mx-auto max-w-6xl">
				<div className="heyLiniAfter flex w-full flex-col items-center">
					<div className="mb-8 flex w-full flex-col items-center text-center lg:mb-16">
						<h1 className="mb-4 max-w-[800px] text-center text-3xl font-semibold text-white md:mb-8 md:text-5xl">
							<span className="mr-4">Hogyan</span>
							<span className="fancyText bg-clip-text text-transparent">
								Működik?
							</span>
						</h1>
						<p className="text-main-airdrop max-w-[800px] text-center text-xl md:text-2xl">
							Szabj személyre mindent: Döntsd el Te, hogy mennyi tranzakciót,
							milyen paramáterekkel és milyen tevékenységet hajtson végre a
							robot. (Legyen az hidalás, likviditás elhelyzése, stakelés, DeFi
							kölcsön adás stb.) Termékünk bonyolult és időigényes műveleteket
							automatizál számodra, hogy Neked ne ezekre menjen el az értékes
							időd és energiád. Alkalmazz akár több 10 vagy később akár több 100
							tárcát, amiket személyre szabottan konfigurálhatsz és
							randomizálhatsz, hogy a lehető legnagyobb esélyed legyen az összes
							tárcára Airdropot kapni.
						</p>
					</div>
					<div className="relative w-full">
						<div className="min-[h-auto] heyLini lm:min-h-[691px] flex min-h-[initial] w-full flex-col overflow-hidden rounded-xl bg-[#181622] p-[1px]">
							<div className="heyLiniGradient rounded-xl"></div>
							<div className="heyLiniGrain rounded-xl"></div>
							<div className="z-10 hidden w-full items-center justify-between gap-4 rounded-t-xl border-none p-2.5 lg:flex">
								{steps.map((step, index) => (
									<button
										key={index}
										className={`flex-1 justify-center text-lg text-white ${
											activeStep === index ? 'rounded-lg bg-[#35323e]' : ''
										}`}
										onClick={() => setActiveStep(index)}
									>
										<span className="flex items-center justify-center whitespace-nowrap rounded-lg px-5 py-1.5">
											{step.title}
										</span>
									</button>
								))}
							</div>
							<div className="z-10 flex w-full items-center justify-between rounded-t-xl border-none px-4 py-2 lg:hidden">
								<button
									className="bg-gray-2 flex h-9 w-9 items-center justify-center rounded-full hover:opacity-75 md:h-10 md:w-10"
									onClick={previouseStep}
								>
									<svg
										stroke="currentColor"
										fill="currentColor"
										strokeWidth="0" // stroke-width
										viewBox="0 0 512 512"
										height="1em"
										width="1em"
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 rotate-90 text-white md:h-5 md:w-5"
									>
										<path
											fill="none"
											strokeLinecap="round" // stroke-linecap
											strokeLinejoin="round" // stroke-linejoin
											strokeWidth="48" // stroke-width
											d="M112 184l144 144 144-144"
										></path>
									</svg>
								</button>
								<button className="flex items-center whitespace-nowrap px-2 py-1 font-semibold text-white md:px-4 md:py-2 md:text-lg">
									<span className="mr-2">{steps[activeStep].icon()}</span>
									{steps[activeStep].title}
								</button>
								<button
									className="bg-gray-2 flex h-9 w-9 items-center justify-center rounded-full hover:opacity-75 md:h-10 md:w-10"
									onClick={nextStep}
								>
									<svg
										stroke="currentColor"
										fill="currentColor"
										strokeWidth="0" // stroke-width
										viewBox="0 0 512 512"
										height="1em"
										width="1em"
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 -rotate-90 text-white md:h-5 md:w-5"
									>
										<path
											fill="none"
											strokeLinecap="round" // stroke-linecap
											strokeLinejoin="round" // stroke-linejoin
											strokeWidth="48" // stroke-width
											d="M112 184l144 144 144-144"
										></path>
									</svg>
								</button>
							</div>
							<div className="relative block h-full overflow-hidden">
								<div className="bg-gray-1 animate-image-appear relative block rounded-b-xl opacity-100">
									<Image
										src={`/images/${steps[activeStep].img}`}
										alt={`${steps[activeStep].alt}`}
										width={1200}
										height={691}
										className="w-full rounded-b-xl"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowItWorks
