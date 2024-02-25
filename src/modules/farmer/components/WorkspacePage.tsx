'use client'

import { WorkspaceContent } from '@modules/farmer/components/Workspace/WorkspaceContent'
import { WorkspaceHeader } from '@modules/farmer/components/Workspace/WorkspaceHeader'
import { useActionsCoordinator } from '@modules/farmer/hooks/workspace/useActionsCoordinator'
import { useActionHistory, useUserStrategies } from '@modules/farmer/stores'
import { Skeleton } from '@modules/shared/components/ui/skeleton'
import { shortenerAddress } from '@modules/shared/utils'
import parse from 'html-react-parser'
import moment from 'moment'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { WorkspaceStatusType } from '../stores/useActionHistory'
import type { UserStrategyType } from '../types'
import { useHandleSubscription } from '@modules/shared/hooks'
import { useGetPlan } from '@/modules/shared/hooks/useGetPlan'
import { Address } from 'viem'

export const WorkspacePage = () => {
	const params = useParams()
	const getStrategy = useUserStrategies((state) => state.getStrategy)
	const { getIsSubscriptionActive } = useHandleSubscription()
	const { wallet } = useGetPlan()

	const [strategy, setStrategy] = useState<UserStrategyType | undefined>(
		undefined,
	)

	useEffect(() => {
		const initialize = async () => {
			if (!params.strategyUid) return
			const strategy = await getStrategy(params.strategyUid as string)
			setStrategy(strategy)
		}
		initialize()
	}, [params.strategyUid, getStrategy])

	const isLoading = !strategy

	// LOGIC
	const initWorkspace = useActionHistory((state) => state.initWorkspace)
	const resetWorkspace = useActionHistory((state) => state.resetWorkspace)
	const resetHistoryByStrategyUid = useActionHistory(
		(state) => state.resetHistoryByStrategyUid,
	)
	const updateWorkspaceStatus = useActionHistory(
		(state) => state.updateWorkspaceStatus,
	)

	const histories = useActionHistory((state) => state.history)
	const history = histories.filter((h) => h.strategyUid === strategy?.uid)

	const [hasValidSubscription, setHasValidSubscription] = useState(false)
	const { coordinateActions } = useActionsCoordinator()

	useEffect(() => {
		const fetchSubscriptionStatus = async () => {
			if (wallet) {
				const result = await getIsSubscriptionActive({
					userAddress: wallet as Address,
				})
				setHasValidSubscription(result)
			}
		}
		fetchSubscriptionStatus()
	}, [wallet, getIsSubscriptionActive])

	useEffect(() => {
		if (!strategy) return
		const strategyUid = strategy.uid
		initWorkspace(strategyUid)
	}, [strategy, initWorkspace])

	const startWorkspace = () => {
		if (!strategy) return
		const strategyUid = strategy.uid

		resetWorkspace(strategyUid)
		resetHistoryByStrategyUid(strategyUid)
		updateWorkspaceStatus(strategyUid, WorkspaceStatusType.RUNNING)

		// This will start the workspace
		coordinateActions({ strategy, hasValidSubscription })
	}

	return (
		<div className="flex min-h-screen flex-col items-center gap-4 p-8 pt-[3rem] xl:p-16">
			<WorkspaceHeader
				title={strategy?.name}
				workspaceUid={strategy?.uid}
				strategy={strategy}
				wallets={strategy?.wallets.length}
				isLoading={isLoading}
				startWorkspace={startWorkspace}
			/>
			{isLoading ? (
				<Skeleton className="w-full flex-grow p-2" />
			) : (
				<WorkspaceContent>
					{history?.map((step, index) => (
						<div
							key={index}
							className="grid grid-cols-[1fr_0.5fr_0.5fr_4fr] gap-2"
						>
							<div className="text-sm">
								{moment(step.timestamp).format('DD dddd, hh:mm:ss')}
							</div>
							<div className="text-sm">
								{step.wallet && shortenerAddress(step.wallet)}
							</div>
							<div className="flex justify-center text-sm">{step.status}</div>
							<div className="text-sm">{parse(step.message)}</div>
						</div>
					))}
				</WorkspaceContent>
			)}
		</div>
	)
}
