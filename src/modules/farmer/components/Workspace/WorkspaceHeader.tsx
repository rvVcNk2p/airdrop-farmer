import { useActionHistory } from '@modules/farmer/stores'
import type { WorkspaceHeaderProps } from '@modules/farmer/types'
import { Badge } from '@modules/shared/components/ui/badge'
import { Button } from '@modules/shared/components/ui/button'
import { Skeleton } from '@modules/shared/components/ui/skeleton'
import { capitalize } from '@modules/shared/utils'
import { ArrowLeft } from '@phosphor-icons/react'
import { Play } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

import { WorkspaceStatusType } from '../../stores/useActionHistory'

type HeaderElementProps = {
	title: string
	children: React.ReactNode
}

const HeaderElement = ({ title, children }: HeaderElementProps) => {
	return (
		<Badge variant="square">
			<span className="text-gray-500">{title}</span>
			<span className="ml-1">{children}</span>
		</Badge>
	)
}

export const WorkspaceHeader = ({
	title,
	workspaceUid,
	strategy,
	wallets,
	isLoading,
	startWorkspace,
}: WorkspaceHeaderProps) => {
	const router = useRouter()

	const workspaces = useActionHistory((state) => state.workspaces)
	const workspace = workspaces.find((w) => w.uid === workspaceUid)
	const workspaceStatus =
		workspaces.find((w) => w.uid === workspaceUid)?.status ||
		WorkspaceStatusType.IDLE
	const donetransaction =
		(workspace?.transactions.finished ?? 0) +
		(workspace?.transactions.failed ?? 0)

	const statusColor = () => {
		switch (workspaceStatus) {
			case WorkspaceStatusType.RUNNING:
				return 'bg-valid animate-pulse'
			case WorkspaceStatusType.IDLE:
				return 'bg-gray-500'
			case WorkspaceStatusType.FINISHED:
				return 'bg-green-900'
			case WorkspaceStatusType.FAILED:
				return 'bg-destructive'
			default:
				return 'bg-gray-500'
		}
	}

	return (
		<div className="flex flex-col items-start w-full gap-4">
			<ArrowLeft
				onClick={() => router.push('/farmer')}
				className="hover:opacity-60 flex gap-1 justify-center items-center cursor-pointer text-xl"
			/>
			<h1 className="text-3xl font-bold w-full">
				{isLoading ? (
					<Skeleton className="w-[30px] h-[20px]" />
				) : (
					<div className="flex gap-2 justify-between items-center">
						<div className="flex gap-2 justify-center items-center ">
							{title}{' '}
							<span className={`${statusColor()} rounded-full h-4 w-4 block`} />
						</div>
						<Button
							variant="outline"
							size="sm"
							disabled={workspaceStatus !== WorkspaceStatusType.IDLE}
						>
							<Play size={16} onClick={startWorkspace} />
						</Button>
					</div>
				)}
			</h1>
			<div className="flex justify-start w-full gap-2">
				<HeaderElement title="Transactions">
					{isLoading ? (
						<Skeleton className="w-[25px] h-[10px]" />
					) : (
						`${donetransaction}/${strategy?.mainnet.txsNumberPerWallet}`
					)}
				</HeaderElement>

				<HeaderElement title="Chains:">
					{isLoading ? (
						<Skeleton className="w-[125px] h-[10px]" />
					) : (
						strategy?.mainnet.networks
							.map((network) => capitalize(network))
							.join(', ')
					)}
				</HeaderElement>

				<HeaderElement title="Volume:">
					{isLoading ? (
						<Skeleton className="w-[25px] h-[10px]" />
					) : (
						// `${headerState.volume} / $0.00`
						`${0} / $0.00`
					)}
				</HeaderElement>

				<HeaderElement title="Wallets:">
					{isLoading ? <Skeleton className="w-[25px] h-[10px]" /> : wallets}
				</HeaderElement>
			</div>
		</div>
	)
}
