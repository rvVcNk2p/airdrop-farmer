'use client'

import { EmptyStrategy } from '@modules/farmer/components/Strategy/EmptyStrategy'
import { NewLayerZeroStrategyModal } from '@modules/farmer/components/Strategy/NewLayerZeroStrategyModal'
import { NewZksynStrategyModal } from '@modules/farmer/components/Strategy/NewZksynStrategyModal'
import { useUserStrategies } from '@modules/farmer/stores'
import { CardTemplate } from '@modules/shared/components/templates/CardTemplate'
import { Button } from '@modules/shared/components/ui/button'
import { useIsMounted } from '@modules/shared/hooks'
import { toast } from '@modules/shared/hooks/useToast'
import {
	WorkspaceStatusType,
	useActionHistory,
} from '@modules/farmer/stores/useActionHistory'

import { AirdropTypes, UserStrategyType } from '@modules/farmer/types'
import { statusColor } from '../helpers/status'
import { useRouter } from 'next/navigation'
import {
	PlayIcon,
	TrashIcon,
	PencilSquareIcon,
} from '@heroicons/react/24/outline'

interface ModalByTypeProps {
	type: AirdropTypes
	children: React.ReactNode
	selectedStrategy?: UserStrategyType | undefined
}

export const StrategySection = ({ type }: { type: AirdropTypes }) => {
	// Will keep the strategiesByType fresh by re-rendering the component
	const router = useRouter()
	const workspaces = useActionHistory((state) => state.workspaces)

	useUserStrategies((state) => state.userStrategies)

	const getStrategiesByType = useUserStrategies(
		(state) => state.getStrategiesByType,
	)

	const getStrategy = useUserStrategies((state) => state.getStrategy)
	const setSelectedStrategy = useUserStrategies(
		(state) => state.setSelectedStrategy,
	)

	const deleteStrategy = useUserStrategies((state) => state.deleteStrategy)

	const handleDeleteStrategy = (uid: string, name: string) => {
		// TODO: Add confirmation
		deleteStrategy(uid)
		toast({
			title: '❌ Strategy deleted!',
			description: name,
			duration: 5000,
		})
	}

	const getWorkspaceByUid = (strategyUid: string) =>
		workspaces.find((w) => w.uid === strategyUid)?.status ||
		WorkspaceStatusType.IDLE

	const EditStrategyModalByType = ({ type, children }: ModalByTypeProps) => {
		switch (type) {
			case AirdropTypes.LAYER_ZERO:
				return (
					<>
						<NewLayerZeroStrategyModal>{children}</NewLayerZeroStrategyModal>
					</>
				)
			case AirdropTypes.ZK_SYNC:
				return <NewZksynStrategyModal>{children}</NewZksynStrategyModal>
			default:
		}
	}

	return (
		<CardTemplate title={`[${type}] Strategies`}>
			{useIsMounted() ? (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
					{getStrategiesByType(type).map((strategy) => (
						<CardTemplate
							key={strategy.uid}
							rootClasses="min-h-[200px]"
							contentClasses="flex flex-col justify-between items-between h-full"
						>
							<div className="flex cursor-pointer items-center">
								{strategy.name}
								<span
									className={`${statusColor(
										getWorkspaceByUid(strategy.uid),
									)} ml-2 block h-3 w-3 rounded-full`}
								/>
							</div>
							<div className="flex w-full justify-between gap-4">
								{/* TODO: Add disabled state while running */}
								<Button
									variant="outline"
									className="flex w-full sm:w-fit"
									onClick={() =>
										handleDeleteStrategy(strategy.uid, strategy.name)
									}
								>
									<TrashIcon className="h-4 w-4 shrink-0" />
								</Button>
								<Button
									variant="outline"
									className="flex w-full sm:w-fit"
									disabled={strategy.wallets.length === 0}
									onClick={() => router.push(`/workspace/${strategy.uid}`)}
								>
									<PlayIcon className="h-4 w-4 shrink-0" />
								</Button>
								{/* TODO: Add disabled state while running */}
								<EditStrategyModalByType type={type}>
									<div
										className="flex h-10 w-full items-center rounded-md border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground sm:w-fit"
										onClick={() => {
											setSelectedStrategy(getStrategy(strategy.uid))
										}}
									>
										<PencilSquareIcon className="h-4 w-4 shrink-0" />
									</div>
								</EditStrategyModalByType>
							</div>
						</CardTemplate>
					))}

					<EmptyStrategy type={type} classes="min-h-[200px]" />
				</div>
			) : (
				'Loading...'
			)}
		</CardTemplate>
	)
}
