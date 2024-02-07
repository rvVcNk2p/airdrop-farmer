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
				className="flex h-[450px] w-full flex-col gap-2 overflow-y-scroll p-4"
			>
				{children}
			</Card>
		</>
	)
}
