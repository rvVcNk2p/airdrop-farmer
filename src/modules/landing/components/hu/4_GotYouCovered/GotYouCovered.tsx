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
						<span className="mr-4">Mi</span>
						<span className="fancyText mr-4 bg-clip-text text-transparent">
							Gondoskodunk
						</span>
						<span>Rólad</span>
					</h1>
					<div className="text-main-airdrop animate-reveal-description max-w-[700px] text-center text-xl md:text-2xl">
						Itt mi éppúgy értékeljük a kripto eszközök biztonságát és védelmét,
						mint Te. Ezért tettünk meg mindent annak érdekében, hogy
						kifejlesszünk egy teljes mértékben megbízható airdrop farming
						robotpilóta rendszert.
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
											Nincs több kattintgatás
										</p>
										<p className="text-main-airdrop text-sm">
											(ez a funkció jelenleg fejlesztés alatt áll)
										</p>
									</div>
									<p className="text-main-airdrop text-lg">
										Dőlj hátra és pihenj - mi mindenről gondoskodtunk! Csak
										töltsd fel egyszer a tárcákat, és mi gondoskodunk arról,
										hogy natív tokenekkel töltsük fel az összes Airdrop
										farmolásra használandó tárcáidat. Nincs több fárasztó és
										véget nem érő kattintgatás, mert itt minden magától megy.
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
											Ne kerülj {` `}
										</span>
										<span>egy Sybil besorolás alá</span>
										<sup className="text-main-color relative -top-3 left-1 text-xs">
											<a className="cursor-pointer" href="#can-i-become-sybil">
												[1]
											</a>
											<Link href="/blog/sybil-protection"> [2]</Link>
										</sup>
									</p>
									<p className="text-main-airdrop text-lg">
										Rendszerünk teljes mértékben véletlenszerűsíti a pénztárcáid
										által végrehajtott műveleteket, megakadályozva, hogy azokat
										Sybilként azonosíthassák az Airdrop jogusultságokat
										meghatározó Algoritmusok. Minden pénztárcának eltérő
										időzítései, sorrendjei és összegei vannak, kialakítva egy
										sokféle és kiszámíthatatlan stratégiát, amely elkerüli a
										Sybil-észlelést.
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
									Fontos számunkra a biztonság és a
									<span className="xs:inline-block block">
										felhasználóink belénk vetett bizalma
									</span>
								</p>
								<p
									className="text-lg"
									style={{ color: 'hsla(0, 0%, 100%, 0.8)' }}
								>
									Az adatvédelem a legfontosabb számunkra. Nem tárolunk
									semmilyen adatot a megadott tárcák privát kulcsairól. Minden
									adat titkosítva kerül tárolásra a Saját böngésződben. Csak Te
									férsz hozzá a saját privát kulcsaidhoz.
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
