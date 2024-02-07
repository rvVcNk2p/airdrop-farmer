import { GroupSection } from '@modules/farmer/components/Group/GroupSection'
import { StrategySection } from '@modules/farmer/components/StrategySection'

export const FarmerPage = () => {
	return (
		<div className="flex-col items-center  flex gap-4">
			{/* <GroupSection /> */}
			<StrategySection />
		</div>
	)
}
