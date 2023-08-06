'use client'

import { Gear, Key, Play, Wallet } from '@phosphor-icons/react'
import Image from 'next/image'
import { useState } from 'react'

const HowItWorks = () => {
	const [activeStep, setActiveStep] = useState(0)

	const steps = [
		{
			title: 'Select a Strategy',
			img: '1_a_create-strategy.png',
			icon: () => <Gear />,
		},
		{
			title: 'Add Private Keys',
			img: '2_edit-and-add-group.png',
			icon: () => <Key />,
		},
		{
			title: 'Add funds to your wallet',
			img: '3_top-up-wallet.png',
			icon: () => <Wallet />,
		},
		{
			title: 'Run the Farmer',
			img: '4_in-action-logs.png',
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
		<section className="relative z-10 px-4 md:px-8 py-12 lg:py-28">
			<div className="max-w-6xl mx-auto">
				<div className="w-full flex flex-col items-center heyLiniAfter">
					<div className="flex flex-col items-center w-full text-center mb-8 lg:mb-16">
						<h1 className="max-w-[800px] font-semibold text-3xl md:text-5xl text-white text-center mb-4 md:mb-8">
							<span className="mr-4">How</span>
							<span className="text-transparent bg-clip-text fancyText">
								It Works
							</span>
						</h1>
						<p className="max-w-[800px] text-xl md:text-2xl text-main-airdrop text-center">
							Set your goals: decide how much you want to transact, pick
							activities, quantity, and customize extra settings like randomness
							level.
						</p>
					</div>
					<div className="w-full relative">
						<div className="flex flex-col w-full min-[h-auto] rounded-xl overflow-hidden bg-[#181622] heyLini p-[1px] min-h-[initial] lm:min-h-[691px]">
							<div className="heyLiniGradient rounded-xl"></div>
							<div className="heyLiniGrain rounded-xl"></div>
							<div className="hidden lg:flex w-full items-center justify-between p-2.5 border-none rounded-t-xl z-10 gap-4">
								{steps.map((step, index) => (
									<button
										key={index}
										className={`text-white text-lg flex-1 justify-center ${
											activeStep === index ? 'bg-[#35323e] rounded-lg' : ''
										}`}
										onClick={() => setActiveStep(index)}
									>
										<span className="flex justify-center items-center py-1.5 px-5 rounded-lg whitespace-nowrap">
											{step.title}
										</span>
									</button>
								))}
							</div>
							<div className="flex lg:hidden w-full items-center justify-between py-2 px-4 border-none rounded-t-xl z-10">
								<button
									className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-gray-2 rounded-full hover:opacity-75"
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
										className="w-4 h-4 md:w-5 md:h-5 text-white rotate-90"
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
								<button className="flex items-center py-1 px-2 md:py-2 md:px-4 md:text-lg font-semibold text-white whitespace-nowrap">
									<span className="mr-2">{steps[activeStep].icon()}</span>
									{steps[activeStep].title}
								</button>
								<button
									className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-gray-2 rounded-full hover:opacity-75"
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
										className="w-4 h-4 md:w-5 md:h-5 text-white -rotate-90"
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
								<div className="relative bg-gray-1 opacity-100 block animate-image-appear rounded-b-xl">
									<Image
										src={`/images/${steps[activeStep].img}`}
										alt="Create Task"
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
