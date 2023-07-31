import { LayerZeroNetworks } from '@modules/farmer/types/userStrategy'
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
	{
		network: LayerZeroNetworks.ETHEREUM,
		tokenName: 'USDC',
		nativeCurrency: 'ETH',
	},
	{
		network: LayerZeroNetworks.ETHEREUM,
		tokenName: 'USDT',
		nativeCurrency: 'ETH',
	},
	{
		network: LayerZeroNetworks.POLYGON,
		tokenName: 'USDC',
		nativeCurrency: 'MATIC',
	},
	{
		network: LayerZeroNetworks.POLYGON,
		tokenName: 'USDT',
		nativeCurrency: 'MATIC',
	},
	{ network: LayerZeroNetworks.BSC, tokenName: 'USDT', nativeCurrency: 'BNB' },
	{
		network: LayerZeroNetworks.ARBITRUM,
		tokenName: 'USDC',
		nativeCurrency: 'ETH',
	},
	{
		network: LayerZeroNetworks.ARBITRUM,
		tokenName: 'USDT',
		nativeCurrency: 'ETH',
	},
	{
		network: LayerZeroNetworks.AVALANCHE,
		tokenName: 'USDC',
		nativeCurrency: 'AVAX',
	},
	{
		network: LayerZeroNetworks.AVALANCHE,
		tokenName: 'USDT',
		nativeCurrency: 'AVAX',
	},
	{
		network: LayerZeroNetworks.OPTIMISM,
		tokenName: 'USDC',
		nativeCurrency: 'ETH',
	},
	{
		network: LayerZeroNetworks.FANTOM,
		tokenName: 'USDC',
		nativeCurrency: 'FTM',
	},
]

const findNativeCurrency = (network: string) => {
	return (
		selectableTokens.find(
			(token) => token.network.toUpperCase() === network,
		) || { nativeCurrency: 'ETH' }
	)
}

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
	const concatenatedNetworks = selectedNetworks.reduce(
		(acc, network, index) => {
			return (
				acc +
				`${index === 0 ? '' : ', '}` +
				network +
				` (${findNativeCurrency(network).nativeCurrency})`
			)
		},
		'',
	)

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
						Make sure you met all the criteria from the list before you start:
					</Label>
					<div className="mt-4 flex flex-col gap-2">
						<Label>1. All your wallets are not connected to each other.</Label>

						<Label className="leading-6">
							2. You have minimum $10 worth of native currency in{' '}
							{concatenatedNetworks}.
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
