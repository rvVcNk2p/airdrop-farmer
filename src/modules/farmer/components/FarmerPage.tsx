import { StrategySection } from '@modules/farmer/components/StrategySection'
import { AirdropTypes } from '@modules/farmer/types'

export const FarmerPage = ({ type }: { type: AirdropTypes }) => {
	return (
		<div className="mt-12 flex flex-col items-center gap-4">
			<StrategySection type={type} />
		</div>
	)
}
