'use client'

import { GroupSection } from './Group/GroupSection'
import { StrategySection } from './Strategy/StrategySection'

export const FarmerPage = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between p-8 xl:p-16 pt-[7rem] gap-4">
			<StrategySection />
			<GroupSection />
		</div>
	)
}
