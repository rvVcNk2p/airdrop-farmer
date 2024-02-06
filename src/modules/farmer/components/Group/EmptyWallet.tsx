import { AddNewWalletModal } from '@modules/farmer/components/Group/AddNewWalletModal'
import { Cube, Plus } from '@phosphor-icons/react'
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
				<div className="mx-auto w-full flex flex-col justify-center items-center">
					<div className="flex justify-center items-center">
						<Cube weight="light" size={32} />
					</div>
					<span className="mt-2 flex text-sm font-medium items-center">
						<Plus weight="regular" className="mr-1" size={12} />
						Add new wallet
					</span>
				</div>
			</button>
		</AddNewWalletModal>
	)
}
