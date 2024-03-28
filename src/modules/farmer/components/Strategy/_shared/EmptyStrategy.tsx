import { NewLayerZeroStrategyModal } from '@modules/farmer/components/Strategy/NewLayerZeroStrategyModal'
import { NewZksynStrategyModal } from '@modules/farmer/components/Strategy/NewZksynStrategyModal'
import { NewScrollStrategyModal } from '@modules/farmer/components/Strategy/NewScrollStrategyModal'
import { Plus, Strategy } from '@phosphor-icons/react'
import { cn } from '@utils'
import { AirdropTypes } from '@modules/farmer/types'

interface EmptyStrategyProps {
	type: AirdropTypes
	classes?: string
}
interface ModalByTypeProps {
	type: AirdropTypes
	children: React.ReactNode
}

const DefaultAddNewStrategy = ({ classes }: { classes?: string }) => {
	return (
		<div
			className={cn(
				'relative flex w-full flex-col justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none',
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
		</div>
	)
}

const ModalByType = ({ type, children }: ModalByTypeProps) => {
	switch (type) {
		case AirdropTypes.LAYER_ZERO:
			return <NewLayerZeroStrategyModal>{children}</NewLayerZeroStrategyModal>
		case AirdropTypes.ZK_SYNC:
			return <NewZksynStrategyModal>{children}</NewZksynStrategyModal>
		case AirdropTypes.SCROLL:
			return <NewScrollStrategyModal>{children}</NewScrollStrategyModal>
		default:
	}
}

export const EmptyStrategy = ({ type, classes }: EmptyStrategyProps) => {
	return (
		<ModalByType type={type}>
			<DefaultAddNewStrategy classes={classes} />
		</ModalByType>
	)
}
