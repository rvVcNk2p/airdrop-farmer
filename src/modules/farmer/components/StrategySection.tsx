'use client'

import { EmptyStrategy } from '@modules/farmer/components/Strategy/EmptyStrategy'
import { NewStrategyModal } from '@modules/farmer/components/Strategy/NewStrategyModal'
import { useUserStrategies } from '@modules/farmer/stores'
import { CardTemplate } from '@modules/shared/components/templates/CardTemplate'
import { Button } from '@modules/shared/components/ui/button'
import { useIsMounted } from '@modules/shared/hooks'
import { toast } from '@modules/shared/hooks/useToast'
import { useState } from 'react'
import {
	WorkspaceStatusType,
	useActionHistory,
} from '@modules/farmer/stores/useActionHistory'

import { UserStrategyType } from '../types'
import { statusColor } from '../helpers/status'
import { useRouter } from 'next/navigation'
import {
	PlayIcon,
	TrashIcon,
	PencilSquareIcon,
} from '@heroicons/react/24/outline'

export const StrategySection = () => {
	const userStrategies = useUserStrategies((state) => state.userStrategies)
	const getStrategy = useUserStrategies((state) => state.getStrategy)
	const deleteStrategy = useUserStrategies((state) => state.deleteStrategy)
	const [selectedStrategy, setSelectedStrategy] = useState<
		UserStrategyType | undefined
	>()

	const handleDeleteStretegy = (uid: string, name: string) => {
		// TODO: Add confirmation
		deleteStrategy(uid)
		toast({
			title: '❌ Strategy deleted!',
			description: name,
			duration: 5000,
		})
	}

	const handleStrategySelect = (uid: string) => {
		setSelectedStrategy(getStrategy(uid))
	}

	const workspaces = useActionHistory((state) => state.workspaces)

	const getWorkspaceByUid = (strategyUid: string) =>
		workspaces.find((w) => w.uid === strategyUid)?.status ||
		WorkspaceStatusType.IDLE

	const router = useRouter()

	return (
		<CardTemplate title="Strategies">
			{useIsMounted() ? (
				<>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
						{userStrategies.map((strategy) => (
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
									<Button
										variant="outline"
										className="flex w-full sm:w-fit"
										onClick={() =>
											handleDeleteStretegy(strategy.uid, strategy.name)
										}
									>
										<TrashIcon className="h-4 w-4 shrink-0" />
									</Button>
									<Button
										variant="outline"
										className="flex w-full sm:w-fit"
										onClick={() => router.push(`workspace/${strategy.uid}`)}
									>
										<PlayIcon className="h-4 w-4 shrink-0" />
									</Button>
									<NewStrategyModal selectedStrategy={selectedStrategy}>
										<Button
											variant="outline"
											className="flex w-full sm:w-fit"
											onClick={() => handleStrategySelect(strategy.uid)}
										>
											<PencilSquareIcon className="h-4 w-4 shrink-0" />
										</Button>
									</NewStrategyModal>
								</div>
							</CardTemplate>
						))}

						<EmptyStrategy classes="min-h-[200px]" />
					</div>
				</>
			) : (
				'Loading...'
			)}
		</CardTemplate>
	)
}
