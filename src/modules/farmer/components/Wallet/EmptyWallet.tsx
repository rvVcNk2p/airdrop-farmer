import { AddNewWalletModal } from '@modules/farmer/components/Wallet/AddNewWalletModal'
import { Cube } from '@phosphor-icons/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { cn } from '@utils'

export const EmptyWallet = ({ classes }: { classes?: string }) => {
	return (
		<AddNewWalletModal>
			<button
				type="button"
				className={cn(
					'relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none',
					classes ? classes : null,
				)}
			>
				<div className="mx-auto flex w-full flex-col items-center justify-center">
					<div className="flex items-center justify-center">
						<Cube weight="light" size={32} />
					</div>
					<span className="mt-2 flex items-center text-sm font-medium">
						<PlusIcon
							className="mr-2 h-4 w-4 shrink-0 stroke-2"
							aria-hidden="true"
						/>
						Add new wallet
					</span>
				</div>
			</button>
		</AddNewWalletModal>
	)
}
