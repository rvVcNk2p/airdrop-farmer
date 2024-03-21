'use client'

import {
	ArrowLeftStartOnRectangleIcon,
	WalletIcon,
	CreditCardIcon,
	Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useGetPlan } from '@modules/shared/hooks/useGetPlan'

const navigation = [
	{
		name: 'LayerZero',
		href: '/farmer/layer-zero',
		logo: '/images/layer-zero-logo-vector_1.svg',
		height: 35,
		width: 24,
		disabled: false,
		alt: 'LayerZero logo',
		py: 2,
		label: 'LayerZero',
	},
	{
		name: 'ZkSync',
		href: '/farmer/zksync',
		logo: '/images/zksync-logo-vector_1.svg',
		height: 25,
		width: 25,
		disabled: false,
		alt: 'ZkSync logo',
		label: 'ZkSync',
		py: 3,
	},
	{
		name: 'Scroll',
		href: '/farmer/scroll',
		logo: '/images/scroll-logo.png',
		height: 25,
		width: 25,
		disabled: false,
		alt: 'Scroll logo',
		label: 'Scroll',
	},
]
const supportItems = [
	{
		id: 1,
		name: 'Wallets',
		href: '/wallets',
		icon: WalletIcon,
	},
	{
		id: 2,
		name: 'Billing',
		href: '/billing',
		icon: CreditCardIcon,
	},
	{
		id: 3,
		name: 'Settings',
		href: '/settings',
		icon: Cog6ToothIcon,
		disabled: true,
	},
]

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export default function SidebarLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathName = usePathname()

	const isActivePage = (href: string) => pathName === href

	const supabase = createClientComponentClient<Database>()
	const router = useRouter()

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		router.refresh()
	}

	const defiHungatyReferral = 'DEFI_HUNGARY'
	const { referredBy } = useGetPlan()

	return (
		<>
			{referredBy === defiHungatyReferral && (
				<style
					dangerouslySetInnerHTML={{
						__html: `:root {--valid: 351, 100%, 63%;}`,
					}}
				/>
			)}
			<div className="fixed inset-y-0 z-50 flex w-24 flex-col">
				<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6 text-foreground">
					<div className="mx-auto flex h-16 shrink-0 items-center">
						{referredBy === defiHungatyReferral && (
							<Image
								className="h-8 w-auto"
								alt="Defi Hungary Logo"
								src="/defi_hungary_logo.png"
								width={32}
								height={32}
							/>
						)}
					</div>
					<nav className="flex flex-1 flex-col">
						<ul role="list" className="flex flex-1 flex-col">
							<li className="flex justify-center border-b pb-4">
								<ul role="list" className="-mx-2 space-y-4">
									{navigation.map((item) => (
										<li key={item.name}>
											<Link
												aria-disabled={item.disabled}
												tabIndex={item.disabled ? -1 : undefined}
												href={item.href}
												className={`${item.disabled ? 'pointer-events-none opacity-50' : ''} group flex justify-center gap-x-3 rounded-md px-2 text-sm font-semibold leading-6`}
											>
												<span
													className={classNames(
														isActivePage(item.href)
															? 'border-valid text-valid'
															: 'hover:border-valid hover:text-valid',
														`flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-2 py-${item.py}`,
													)}
												>
													<Image
														className="text-valid"
														src={item.logo}
														height={item.height}
														width={item.width}
														alt={item.alt}
													/>
												</span>
											</Link>
										</li>
									))}
								</ul>
							</li>

							<li className="flex justify-center">
								<ul role="list" className="-mx-2 mt-4 space-y-4">
									{supportItems.map((supportItem) => (
										<li key={supportItem.name}>
											<Link
												aria-disabled={supportItem.disabled}
												tabIndex={supportItem.disabled ? -1 : undefined}
												href={supportItem.href}
												className={`${supportItem.disabled ? 'pointer-events-none opacity-50' : ''} group flex gap-x-3 rounded-md px-2 text-sm font-semibold leading-6`}
											>
												<span
													className={classNames(
														isActivePage(supportItem.href)
															? 'border-valid text-white'
															: 'hover:border-valid hover:text-white',
														'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-2 text-[0.625rem] font-medium text-gray-400',
													)}
												>
													<supportItem.icon
														className="h-6 w-6 shrink-0"
														aria-hidden="true"
													/>
												</span>
											</Link>
										</li>
									))}
								</ul>
							</li>

							<li className="-mx-6 mt-auto flex justify-center">
								{/* Add logout functionality here */}
								<Link
									href="/"
									className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6"
									onClick={handleSignOut}
								>
									<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-4 text-[0.625rem] font-medium text-gray-400 hover:border-valid hover:text-white">
										<ArrowLeftStartOnRectangleIcon
											className="h-6 w-6 shrink-0"
											aria-hidden="true"
										/>
									</span>
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>

			<main className="py-10 pl-24">
				<div className="px-8">{children}</div>
			</main>
		</>
	)
}
