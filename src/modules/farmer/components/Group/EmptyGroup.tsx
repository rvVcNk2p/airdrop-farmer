import { AddNewGroupModal } from '@modules/farmer/components/Group/AddNewGroupModal'
import { Cube, Plus } from '@phosphor-icons/react'
import { cn } from '@utils'

interface EmptyGroupProps {
	classes?: string
}

export const EmptyGroup = ({ classes }: EmptyGroupProps) => {
	return (
		<AddNewGroupModal>
			<button
				type="button"
				className={cn(
					'relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none',
					classes ? classes : null,
				)}
			>
				<div className="mx-auto flex w-full flex-col items-center justify-center">
					<div className="flex items-center justify-center">
						<Cube weight="light" size={32} />
					</div>
					<span className="mt-2 flex items-center text-sm font-medium">
						<Plus weight="regular" className="mr-1" size={12} />
						Add new group
					</span>
				</div>
			</button>
		</AddNewGroupModal>
	)
}
