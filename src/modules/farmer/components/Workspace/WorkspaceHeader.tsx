import { Badge } from '@modules/shared/components/ui/badge'
import { Skeleton } from '@modules/shared/components/ui/skeleton'
import { capitalize } from '@modules/shared/utils'
import { ArrowLeft } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

import { WorkspaceHeaderProps } from '../../types'

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
	headerState,
	strategy,
	wallets,
	isLoading,
}: WorkspaceHeaderProps) => {
	const router = useRouter()

	return (
		<div className="flex flex-col items-start w-full gap-4">
			<ArrowLeft
				onClick={() => router.push('/farmer')}
				className="hover:opacity-60 flex gap-1 justify-center items-center cursor-pointer text-xl"
			/>
			<div className="flex justify-start w-full gap-2">
				<HeaderElement title="Transactions">
					{isLoading ? (
						<Skeleton className="w-[25px] h-[10px]" />
					) : (
						`${headerState.transactions}/${strategy?.mainnet.txsNumberPerWallet}`
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
						`${headerState.volume} / $0.00`
					)}
				</HeaderElement>

				<HeaderElement title="Wallets:">
					{isLoading ? <Skeleton className="w-[25px] h-[10px]" /> : wallets}
				</HeaderElement>
			</div>
		</div>
	)
}
