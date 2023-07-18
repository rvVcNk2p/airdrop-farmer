'use client'

import { useUserGroups, useUserStrategies } from '@modules/farmer/stores'
import { Skeleton } from '@modules/shared/components/ui/skeleton'
import { shortenerAddress } from '@modules/shared/utils'
import parse from 'html-react-parser'
import moment from 'moment'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { usePerformAllowanceAndBridge } from '../hooks/workspace/actions/usePerformAllowanceAndBridge'
import { useActivityHistory } from '../hooks/workspace/useActivityHistory'
import { usePerformActions } from '../hooks/workspace/usePerformActions'
import type { HeaderStateType, UserGroupType, UserStrategyType } from '../types'
import { WorkspaceContent } from './Workspace/WorkspaceContent'
import { WorkspaceHeader } from './Workspace/WorkspaceHeader'

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
		return () => {
			// cleanup
		}
	}, [params.groupUid, getGroupByUid, getStrategy])

	const [headerState, setHeaderState] = useState<HeaderStateType>({
		transactions: 0,
		volume: 0,
	})

	const isLoading = !strategy || !headerState || !group?.wallets.length

	// LOGIC

	const { history, addHistory } = useActivityHistory()
	const { actions, setActions } = usePerformActions()

	const { generateAllowanceAndBridge } = usePerformAllowanceAndBridge({
		selectedNetworks: strategy?.mainnet.networks || [],
		wallet: group?.wallets[0] || '0x', // TODO: Add support for multiple wallets
		loggerFn: addHistory,
	})

	useEffect(() => {
		if (!group) return
		if (!strategy) return

		setActions([
			...actions,
			{
				uid: uuidv4(),
				type: 'ALLOWANCE_AND_BRIDGE',
				status: 'QUEUED',
				action: generateAllowanceAndBridge,
			},
		])
		// setTimeout(() => {
		// 	setActions([
		// 		...actions,
		// 		{
		// 			uid: uuidv4(),
		// 			type: 'ALLOWANCE',
		// 			status: 'QUEUED',
		// 			action: generateAllowance,
		// 		},
		// 	])
		// }, 15000)
	}, [group, strategy])

	useEffect(() => {
		if (!history) return
		console.log('== HISTORY ==', history)
	}, [history])

	return (
		<div className="flex flex-col min-h-screen items-center p-8 xl:p-16 pt-[3rem] gap-4">
			<WorkspaceHeader
				title={group?.name || ''}
				headerState={headerState}
				strategy={strategy}
				wallets={group?.wallets.length}
				isLoading={isLoading}
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
					{/* {JSON.stringify(strategy, null, 2)} */}
				</WorkspaceContent>
			)}
		</div>
	)
}
