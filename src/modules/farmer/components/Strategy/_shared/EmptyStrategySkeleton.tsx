import { cn } from '@utils'
import { Skeleton } from '@modules/shared/components/ui/skeleton'

export const EmptyStrategySkeleton = ({ classes }: { classes?: string }) => {
	return (
		<div
			className={cn(
				'relative rounded-lg border bg-card  p-4 text-center text-card-foreground shadow-sm focus:outline-none',
				classes ? classes : null,
			)}
		>
			<div className="mx-auto flex h-full flex-col items-start justify-between">
				<span className="mt-2 flex items-start space-x-4 text-sm font-medium">
					<div className="space-y-2">
						<Skeleton className="h-4 w-[100px]" />
					</div>
				</span>
				<div className="flex w-full items-center justify-between">
					<Skeleton className="h-10 w-12 " />
					<Skeleton className="h-10 w-12 " />
					<Skeleton className="h-10 w-12 " />
				</div>
			</div>
		</div>
	)
}
