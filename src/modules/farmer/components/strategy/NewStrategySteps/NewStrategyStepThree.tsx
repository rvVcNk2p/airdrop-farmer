import { LayerZeroNetworks } from '@/modules/farmer/types/userStrategy'
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

const selectableTokens = [
	{ network: LayerZeroNetworks.ETHEREUM, tokenName: 'USDC' },
	{ network: LayerZeroNetworks.ETHEREUM, tokenName: 'USDT' },
	{ network: LayerZeroNetworks.POLYGON, tokenName: 'USDC' },
	{ network: LayerZeroNetworks.POLYGON, tokenName: 'USDT' },
	{ network: 'BSC', tokenName: 'USDT' },
	{ network: LayerZeroNetworks.ARBITRUM, tokenName: 'USDC' },
	{ network: LayerZeroNetworks.ARBITRUM, tokenName: 'USDT' },
	{ network: LayerZeroNetworks.AVALANCHE, tokenName: 'USDC' },
	{ network: LayerZeroNetworks.AVALANCHE, tokenName: 'USDT' },
	{ network: LayerZeroNetworks.OPTIMISM, tokenName: 'USDC' },
	{ network: LayerZeroNetworks.OPTIMISM, tokenName: 'USDT' },
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

	const activeTokens = selectableTokens.filter((token) =>
		selectedNetworks.includes(token.network.toUpperCase()),
	)

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
