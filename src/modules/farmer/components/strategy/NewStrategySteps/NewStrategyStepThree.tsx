import {
	AlertDialogDescription,
	AlertDialogTitle,
} from '@modules/shared/components/ui/alert-dialog'
import { Label } from '@modules/shared/components/ui/label'
import { ScrollArea } from '@modules/shared/components/ui/scroll-area'

import './NewStrategyStep.scss'

interface NewStrategyStepOneProps {
	selectedNetworks: string[]
}

// TODO: Find all the available token addresses
const activeTokens = [
	{ network: 'Polygon', tokenName: 'USDC' },
	{ network: 'Polygon', tokenName: 'USDT' },
	{ network: 'BSC', tokenName: 'USDT' },
	{ network: 'Arbitrum', tokenName: 'USDC' },
	{ network: 'Arbitrum', tokenName: 'USDT' },
	{ network: 'Avalanche', tokenName: 'USDC' },
	{ network: 'Avalanche', tokenName: 'USDT' },
	{ network: 'Optimism', tokenName: 'USDC' },
]

const ActiveTokenLabel = ({
	network,
	tokenName,
}: {
	network: string
	tokenName: string
}) => {
	return (
		<div className="dot">
			{network} <span className="text-valid">{tokenName}</span>
		</div>
	)
}

export const NewStrategyStepThree = ({
	selectedNetworks,
}: NewStrategyStepOneProps) => {
	const concatenatedNetworks = selectedNetworks.join(',')

	return (
		<>
			<AlertDialogTitle className="mb-6 flex justify-center text-3xl">
				Important
			</AlertDialogTitle>
			<AlertDialogDescription asChild={true}>
				<ScrollArea className="h-[400px] w-full">
					<Label>
						Make sure you met all the criteria from the list below before you
						start:
					</Label>
					<div className="mt-4 flex flex-col gap-2">
						<Label>1. All your wallets are not connected to each other.</Label>

						<Label>
							2. You have native currency balance in {concatenatedNetworks}.
						</Label>

						<Label>
							3. You have USDT or USDC in one of these tokens:
							<div className="flex flex-col mt-2 gap-1">
								{activeTokens.map((activeToken) => (
									<ActiveTokenLabel
										key={activeToken.network + activeToken.tokenName}
										network={activeToken.network}
										tokenName={activeToken.tokenName}
									/>
								))}
							</div>
						</Label>
					</div>
				</ScrollArea>
			</AlertDialogDescription>
		</>
	)
}
