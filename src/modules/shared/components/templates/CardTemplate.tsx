import { cn } from '@utils'

import { Card } from '../ui/card'

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
				'w-full p-4 flex flex-col gap-4',
				rootClasses ? rootClasses : null,
			)}
		>
			{title && <h1 className="text-2xl font-bold">{title}</h1>}
			<div className={contentClasses ? contentClasses : ''}>{children}</div>
		</Card>
	)
}
