'use client'

import { WorkspaceContent } from '@modules/farmer/components/Workspace/WorkspaceContent'
import { WorkspaceHeader } from '@modules/farmer/components/Workspace/WorkspaceHeader'
import { useActionsCoordinator } from '@modules/farmer/hooks/workspace/useActionsCoordinator'
import {
	useActionHistory,
	useUserGroups,
	useUserStrategies,
} from '@modules/farmer/stores'
import { Skeleton } from '@modules/shared/components/ui/skeleton'
import { shortenerAddress } from '@modules/shared/utils'
import parse from 'html-react-parser'
import moment from 'moment'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { WorkspaceStatusType } from '../stores/useActionHistory'
import type { UserGroupType, UserStrategyType } from '../types'

export const WorkspacePage = () => {
	const params = useParams()
	const getGroupByUid = useUserGroups((state) => state.getGroupByUid)
	const getStrategy = useUserStrategies((state) => state.getStrategy)

	const [group, setGroup] = useState<UserGroupType | undefined>(undefined)
	const [strategy, setStrategy] = useState<UserStrategyType | undefined>(
		undefined,
	)

	useEffect(() => {
		const initialize = async () => {
			const group = await getGroupByUid(params.groupUid)
			setGroup(group)

			if (!group?.strategyUid) return
			const strategy = await getStrategy(group?.strategyUid)
			setStrategy(strategy)
		}
		initialize()
	}, [params.groupUid, getGroupByUid, getStrategy])

	const isLoading = !strategy || !group?.wallets.length

	// LOGIC
	const history = useActionHistory((state) => state.history)
	const initWorkspace = useActionHistory((state) => state.initWorkspace)
	const resetWorkspace = useActionHistory((state) => state.resetWorkspace)
	const resetHistory = useActionHistory((state) => state.resetHistory)
	const updateWorkspaceStatus = useActionHistory(
		(state) => state.updateWorkspaceStatus,
	)

	const { coordinateActions } = useActionsCoordinator()

	useEffect(() => {
		if (!strategy) return
		if (!group) return
		const groupUid = group.uid
		initWorkspace(groupUid)
	}, [group, strategy, initWorkspace])

	const startWorkspace = () => {
		if (!group) return
		if (!strategy) return
		const groupUid = group.uid

		resetWorkspace(groupUid)
		resetHistory()

		updateWorkspaceStatus(groupUid, WorkspaceStatusType.RUNNING)

		coordinateActions({
			iteration: strategy?.mainnet.txsNumberPerWallet || 0,
			group: group,
			selectedNetworks: strategy?.mainnet.networks || [],
		})
	}

	const messagesEndRef = useRef<null | HTMLDivElement>(null)

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [history])

	return (
		<div className="flex flex-col min-h-screen items-center p-8 xl:p-16 pt-[3rem] gap-4">
			<WorkspaceHeader
				title={group?.name || ''}
				workspaceUid={group?.uid}
				strategy={strategy}
				wallets={group?.wallets.length}
				isLoading={isLoading}
				startWorkspace={startWorkspace}
			/>
			{isLoading ? (
				<Skeleton className="p-2 flex-grow w-full" />
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
							<div className="text-sm">{shortenerAddress(step.wallet)}</div>
							<div className="text-sm flex justify-center">{step.status}</div>
							<div className="text-sm">{parse(step.message)}</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</WorkspaceContent>
			)}
		</div>
	)
}
