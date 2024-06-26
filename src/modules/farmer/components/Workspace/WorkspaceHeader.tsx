import { statusColor } from '@modules/farmer/helpers/status'
import { useActionHistory, useUserStrategies } from '@modules/farmer/stores'
import { WorkspaceStatusType } from '@modules/farmer/stores/useActionHistory'
import { AirdropTypes, WorkspaceHeaderProps } from '@modules/farmer/types'
import { DefaultTooltip } from '@modules/shared/components/atoms/DefaultTooltip'
import { Badge } from '@modules/shared/components/ui/badge'
import { Button } from '@modules/shared/components/ui/button'
import { Skeleton } from '@modules/shared/components/ui/skeleton'
import { capitalize } from '@modules/shared/utils'
import { ArrowLeft } from '@phosphor-icons/react'
import { Play } from '@phosphor-icons/react'
import Link from 'next/link'

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
	const workspaces = useActionHistory((state) => state.workspaces)
	const workspace = workspaces.find((w) => w.uid === workspaceUid)
	const workspaceStatus =
		workspaces.find((w) => w.uid === workspaceUid)?.status ||
		WorkspaceStatusType.IDLE
	const doneTransaction =
		(workspace?.transactions.finished ?? 0) +
		(workspace?.transactions.failed ?? 0)

	const aggregatedVolume = workspace?.aggregatedValue ?? 0
	const aggregatedBridgeVolume = workspace?.aggregatedBridgeValue ?? 0

	const TransactionDetails = () => {
		return (
			<div className="flex flex-col gap-1">
				<div className="flex gap-2">
					<div className="text-gray-500">Finished:</div>
					<div>{workspace?.transactions.finished}</div>
				</div>
				<div className="flex gap-2">
					<div className="text-gray-500">Failed:</div>
					<div>{workspace?.transactions.failed}</div>
				</div>
			</div>
		)
	}

	const DynamicFields = () => {
		switch (strategy?.airdropType) {
			case AirdropTypes.LAYER_ZERO:
				return (
					<HeaderElement title="Chains:">
						{isLoading ? (
							<Skeleton className="h-[10px] w-[125px]" />
						) : (
							// @ts-ignore
							strategy?.mainnet.networks
								// @ts-ignore
								.map((network) => capitalize(network))
								.join(', ')
						)}
					</HeaderElement>
				)
			case AirdropTypes.ZK_SYNC:
				return (
					<HeaderElement title="Bridge volume:">
						{isLoading ? (
							<Skeleton className="h-[10px] w-[125px]" />
						) : (
							`$ ${aggregatedBridgeVolume}`
						)}
					</HeaderElement>
				)
			default:
				return null
		}
	}

	const getStrategy = useUserStrategies((state) => state.getStrategy)
	let backHref = `/farmer/`

	if (workspace) {
		const strategy = getStrategy(workspace?.uid)
		switch (strategy?.airdropType) {
			case AirdropTypes.LAYER_ZERO:
				backHref += 'layer-zero'
				break
			case AirdropTypes.ZK_SYNC:
				backHref += 'zksync'
				break
			case AirdropTypes.SCROLL:
				backHref += 'scroll'
				break
		}
	}

	return (
		<div className="flex w-full flex-col items-start gap-4">
			<Link
				href={backHref}
				className="flex cursor-pointer items-center justify-center gap-1 hover:opacity-60"
			>
				<ArrowLeft className="text-xl" />
			</Link>
			<h1 className="w-full text-3xl font-bold">
				{isLoading ? (
					<Skeleton className="h-[20px] w-[30px]" />
				) : (
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center justify-center gap-2 ">
							{title}{' '}
							<span
								className={`${statusColor(
									workspaceStatus,
								)} block h-3 w-3 rounded-full`}
							/>
						</div>
						<Button
							variant="outline"
							size="sm"
							disabled={workspaceStatus === WorkspaceStatusType.RUNNING}
						>
							<Play size={16} onClick={startWorkspace} />
						</Button>
					</div>
				)}
			</h1>
			<div className="flex w-full justify-start gap-2">
				<HeaderElement title="Successful txs:">
					{isLoading ? (
						<Skeleton className="h-[10px] w-[25px]" />
					) : (
						<div className="flex gap-1">
							<div>{doneTransaction}</div>
							<DefaultTooltip content={<TransactionDetails />} size={14} />
						</div>
					)}
				</HeaderElement>

				<HeaderElement title="Txs goals:">
					{isLoading ? (
						<Skeleton className="h-[10px] w-[25px]" />
					) : (
						<div className="flex gap-1">
							<div>{strategy?.txsGoal}</div>
							{/* <DefaultTooltip content={<TransactionDetails />} size={14} /> */}
						</div>
					)}
				</HeaderElement>

				<HeaderElement title="Volume:">
					{isLoading ? (
						<Skeleton className="h-[10px] w-[25px]" />
					) : (
						`$ ${aggregatedVolume}`
					)}
				</HeaderElement>

				<DynamicFields />

				<HeaderElement title="Wallets:">
					{isLoading ? <Skeleton className="h-[10px] w-[25px]" /> : wallets}
				</HeaderElement>
			</div>
		</div>
	)
}
