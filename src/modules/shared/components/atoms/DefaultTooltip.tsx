import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@modules/shared/components/ui/tooltip'
import { Info } from '@phosphor-icons/react'

type DefaultTooltipProps = {
	children?: React.ReactNode
	content: React.ReactNode
	size?: number
}

export const DefaultTooltip = ({
	children,
	content,
	size,
}: DefaultTooltipProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					{children ?? <Info size={size ?? 16} />}
				</TooltipTrigger>
				<TooltipContent>{content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
