import { Card } from '@modules/shared/components/ui/card'

type WorkspaceContentProps = {
	children: React.ReactNode
}

export const WorkspaceContent = ({ children }: WorkspaceContentProps) => {
	return <Card className="p-2 flex-grow">{children}</Card>
}
