import Image from 'next/image'
import Link from 'next/link'

const GotYouCovered = () => {
	return (
		<section
			className="relative z-10 px-4 py-12 md:px-8 lg:py-28"
			id="token-modal-with-purchase"
		>
			<div className="mx-auto max-w-5xl">
				<div className="mb-8 flex w-full flex-col items-center text-center lg:mb-16">
					<h1 className="mb-6 text-center text-3xl font-semibold text-white md:text-5xl ">
						<span className="mr-4">We&apos;ve Got</span>
						<span className="fancyText bg-clip-text text-transparent">
							You Covered
						</span>
					</h1>
					<div className="text-main-airdrop animate-reveal-description max-w-[700px] text-center text-xl md:text-2xl">
						Here, we value the safety and security of your crypto assets just
						like you do. That&apos;s why we&apos;ve gone the extra mile to
						develop an airdrop farming autopilot that you can trust completely.
					</div>
				</div>
				<div className="heyLiniAfter flex w-full flex-col items-center">
					<div className="flex flex-col items-center gap-8 lg:gap-16">
						<div className="relative flex flex-col gap-8 md:flex-row lg:gap-16">
							<div className="relative w-full overflow-hidden rounded-xl border border-[#33323e] bg-[#13121d] p-10">
								<div className="heyLiniGrain rounded-xl"></div>
								<div className="heyLiniGradient"></div>
								<div className="relative z-10">
									<p className="fancyText -mt-8 mb-6 bg-clip-text text-8xl font-bold leading-none text-transparent">
										∞
									</p>
									<div className="mb-8">
										<p className="text-3xl font-medium text-white">
											1-Click Auto Refill
										</p>
										<p className="text-main-airdrop text-sm">
											(this feature is in progress)
										</p>
									</div>
									<p className="text-main-airdrop text-lg">
										Sit back and relax - we&apos;ve got it all covered! Just top
										up your wallet once, and we&apos;ll take care of
										automatically refilling it with native tokens on all farming
										chains. No more tedious manual work, saving you days of
										effort.
									</p>
								</div>
							</div>
							<div className="relative w-full overflow-hidden rounded-xl border border-[#33323e] bg-[#13121d] p-10">
								<div className="heyLiniGradient rounded-xl"></div>
								<div className="heyLiniGrain rounded-xl"></div>
								<div className="relative z-10">
									<div className="mb-[33px] overflow-hidden drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]">
										<Image
											src="/images/gyc_b_randomization.png"
											width={1000}
											height={1000}
											className="w-3/4 rounded-xl"
											alt="Randomization of actions for airdrop farming"
										/>
									</div>
									<p className="mb-8 text-3xl font-medium text-white">
										<span className="fancyText bg-clip-text text-transparent">
											Don&apos;t
										</span>
										<span> Become a Sybil</span>
										<sup className="text-main-color relative -top-3 left-1 text-xs">
											<a className="cursor-pointer" href="#can-i-become-sybil">
												[1]
											</a>
											<Link href="/blog/sybil-protection"> [2]</Link>
										</sup>
									</p>
									<p className="text-main-airdrop text-lg">
										Our system ensures complete randomization of actions
										performed by your wallets, preventing any possibility of
										them being identified as Sybil. Each wallet has distinct
										timings, orders, and amounts, forming a diverse and
										unpredictable strategy that avoids sybil detection.
									</p>
								</div>
							</div>
						</div>
						<div className="liniGradient relative flex flex-col items-center gap-10 rounded-xl px-10 py-12 md:flex-row md:gap-20 md:px-32">
							<div className="w-full overflow-hidden drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] md:w-3/5">
								<Image
									src="/images/gyc_c_add-your-private-keys.png"
									width={1000}
									height={1000}
									alt="Private Keys Stay Private"
									className="w-full rounded-xl"
								/>
							</div>
							<div className="w-full text-center md:w-2/5 md:text-left">
								<p className="mb-8 text-3xl font-medium text-white">
									We Value
									<span className="xs:inline-block block">Your Privacy</span>
								</p>
								<p
									className="text-lg"
									style={{ color: 'hsla(0, 0%, 100%, 0.8)' }}
								>
									Your privacy is our top priority. We do not store any data
									about your keys, everything is stored encrypted in your
									session. Only you have access to your private keys.
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
