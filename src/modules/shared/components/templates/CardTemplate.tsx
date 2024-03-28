import { cn } from '@utils'

import { Card } from '../ui/card'
import { AirdropTypes } from '@/modules/farmer/types'

interface CardTemplateProps {
	children: React.ReactNode
	title?: string
	rootClasses?: string
	contentClasses?: string
}

export const CardTemplate = ({
	title,
	children,
	rootClasses,
	contentClasses,
}: CardTemplateProps) => {
	return (
		<Card
			className={cn(
				'flex w-full flex-col gap-4 p-4',
				rootClasses ? rootClasses : null,
			)}
		>
			{title && (
				<h1 className="flex justify-between text-2xl font-bold">
					{title}
					<span>
						{title?.includes(AirdropTypes.SCROLL) && (
							<span className="text-sm">
								{' '}
								*Alpha version, use at your own risk!
							</span>
						)}
					</span>
				</h1>
			)}
			<div className={contentClasses ? contentClasses : ''}>{children}</div>
		</Card>
	)
}
