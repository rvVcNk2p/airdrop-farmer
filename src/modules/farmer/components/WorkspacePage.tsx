'use client'

import { useParams } from 'next/navigation'

export const WorkspacePage = () => {
	const params = useParams()
	console.log(params)

	return (
		<div className="flex min-h-screen flex-col items-center justify-between p-8 xl:p-16 pt-[7rem] gap-4">
			WorkspacePage
		</div>
	)
}
