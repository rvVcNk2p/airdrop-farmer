import { GroupSection } from '@modules/farmer/components/Group/GroupSection'
import { StrategySection } from '@modules/farmer/components/StrategySection'

export const FarmerPage = () => {
	return (
		<div className="flex-col items-center gap-4 flex">
			{/* <GroupSection /> */}
			<StrategySection />
		</div>
	)
}
