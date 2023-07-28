import { StrategySection } from '@modules/farmer/components/StrategySection'
import { GroupSection } from '@modules/farmer/components/group/GroupSection'

export const FarmerPage = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between p-8 xl:p-16 pt-[7rem] gap-4">
			<GroupSection />
			<StrategySection />
		</div>
	)
}
