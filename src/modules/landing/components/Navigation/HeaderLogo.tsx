'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function HeaderLogo() {
	const pathName = usePathname()
	const isDefiHungary = pathName.indexOf('/defi-hungary') !== -1

	return (
		<>
			{isDefiHungary && (
				<Image
					src="/defi_hungary_logo.png"
					alt="Defi Hungary logo"
					width={40}
					height={40}
					className="cursor-pointer"
					priority
				/>
			)}
		</>
	)
}
