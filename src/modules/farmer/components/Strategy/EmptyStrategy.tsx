import { NewStrategyModal } from '@modules/farmer/components/Strategy/NewStrategyModal'
import { Plus, Strategy } from '@phosphor-icons/react'
import { cn } from '@utils'

interface EmptyStrategyProps {
	classes?: string
}

export const EmptyStrategy = ({ classes }: EmptyStrategyProps) => {
	return (
		<NewStrategyModal>
			<button
				type="button"
				className={cn(
					'relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none',
					classes ? classes : null,
				)}
			>
				<div className="mx-auto flex w-full flex-col items-center justify-center">
					<div className="flex items-center justify-center">
						<Strategy weight="light" size={32} />
					</div>
					<span className="mt-2 flex items-center text-sm font-medium">
						<Plus weight="regular" className="mr-1" size={12} />
						Add new strategy
					</span>
				</div>
			</button>
		</NewStrategyModal>
	)
}
