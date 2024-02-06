'use client'

import { EmptyStrategy } from '@modules/farmer/components/Strategy/EmptyStrategy'
import { NewStrategyModal } from '@modules/farmer/components/Strategy/NewStrategyModal'
import { useUserStrategies } from '@modules/farmer/stores'
import { CardTemplate } from '@modules/shared/components/templates/CardTemplate'
import { Button } from '@modules/shared/components/ui/button'
import { useIsMounted } from '@modules/shared/hooks'
import { toast } from '@modules/shared/hooks/useToast'
import { Pencil, Trash } from '@phosphor-icons/react'
import { useState } from 'react'

import { UserStrategyType } from '../types'

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

	return (
		<CardTemplate title="Strategies">
			{useIsMounted() ? (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{userStrategies.map((strategy) => (
							<CardTemplate
								key={strategy.uid}
								rootClasses="min-h-[200px]"
								contentClasses="flex flex-col justify-between items-between h-full"
							>
								<div className="cursor-pointer">{strategy.name}</div>
								<div className="flex justify-between gap-4 w-full">
									<Button
										variant="outline"
										className="flex w-full sm:w-fit"
										onClick={() =>
											handleDeleteStretegy(strategy.uid, strategy.name)
										}
									>
										<Trash size={18} />
									</Button>
									<NewStrategyModal selectedStrategy={selectedStrategy}>
										<Button
											variant="outline"
											className="flex w-full sm:w-fit"
											onClick={() => handleStrategySelect(strategy.uid)}
										>
											<Pencil size={16} />
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
