import { Card } from '@modules/shared/components/ui/card'

type WorkspaceContentProps = {
	children: React.ReactNode
}

export const WorkspaceContent = ({ children }: WorkspaceContentProps) => {
	return (
		<Card className="p-4 w-full h-[450px] overflow-y-scroll flex gap-2 flex-col">
			{children}
		</Card>
	)
}
