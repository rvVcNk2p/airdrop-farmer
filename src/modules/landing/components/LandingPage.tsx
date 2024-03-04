import HeroSection from '@/modules/landing/components/1_HeroSection/HeroSection'
import SectionBreaker from '@/modules/landing/components/2_SectionBreaker/SectionBreaker'
import HowItWorks from '@/modules/landing/components/3_HowItWorks/HowItWorks'
import GotYouCovered from '@/modules/landing/components/4_GotYouCovered/GotYouCovered'
import Features from '@/modules/landing/components/6_Features/Features'
import Calculate from '@/modules/landing/components/7_Calculate/Calculate'
import ChooseYourPlan from '@/modules/landing/components/8_ChooseYour/ChooseYour'
import Faq from '@/modules/landing/components/9_Faq/Faq'

import './landing.scss'

const LandingPage = () => {
	return (
		<div className="flex flex-col items-center justify-between overflow-hidden">
			<HeroSection />
			<SectionBreaker />
			<HowItWorks />
			<GotYouCovered />
			<Features />
			<Calculate />
			<ChooseYourPlan />
			<SectionBreaker className="!-mt-40 rotate-180" />
			<Faq />
		</div>
	)
}

export default LandingPage
