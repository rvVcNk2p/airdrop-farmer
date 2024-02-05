import { Card } from '@modules/shared/components/ui/card'
import { useRef } from 'react'

type WorkspaceContentProps = {
	children: React.ReactNode
}

export const WorkspaceContent = ({ children }: WorkspaceContentProps) => {
	const historyRef = useRef<null | HTMLDivElement>(null)

	if (historyRef.current) {
		setTimeout(() => {
			historyRef.current?.scrollTo({
				top: historyRef.current.scrollHeight,
				behavior: 'smooth',
			})
		}, 100)
	}

	return (
		<>
			<Card
				ref={historyRef}
				className="p-4 w-full h-[450px] overflow-y-scroll flex gap-2 flex-col"
			>
				{children}
			</Card>
		</>
	)
}
