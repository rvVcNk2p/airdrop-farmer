import { cn } from '@utils'

import { Card } from '../ui/card'

interface CardTemplateProps {
	children: React.ReactNode
	title?: string
	classes?: string
}

export const CardTemplate = ({
	title,
	children,
	classes,
}: CardTemplateProps) => {
	return (
		<Card
			className={cn('w-full p-4 flex flex-col gap-4', classes ? classes : null)}
		>
			{title && <h1 className="text-2xl font-bold">{title}</h1>}
			<div>{children}</div>
		</Card>
	)
}
