'use client'

import {
	ArrowLeftStartOnRectangleIcon,
	Cog6ToothIcon,
	WalletIcon,
	CreditCardIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

const navigation = [
	{
		name: 'LayerZero',
		href: '/farmer',
		logo: '/images/layer-zero-logo-vector_1.svg',
		height: 35,
		width: 24,
		alt: 'LayerZero logo',
		py: 2,
		label: 'LayerZero',
		current: true,
	},
	{
		name: 'ZkSync',
		href: '/farmer',
		logo: '/images/zksync-logo-vector_1.svg',
		height: 25,
		width: 25,
		alt: 'ZkSync logo',
		label: 'ZkSync',
		current: false,
		py: 3,
	},
]
const supportItems = [
	{
		id: 1,
		name: 'Wallets',
		href: '/wallets',
		icon: WalletIcon,
		current: false,
	},
	{
		id: 2,
		name: 'Billing',
		href: '/billing',
		icon: CreditCardIcon,
		current: false,
	},
	{ id: 3, name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
]

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export default function SidebarLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<div className="fixed inset-y-0 z-50 flex w-24 flex-col">
				<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6 text-foreground">
					<div className="flex h-16 shrink-0 items-center">
						<img
							className="h-8 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
							alt="Your Company"
						/>
					</div>
					<nav className="flex flex-1 flex-col">
						<ul role="list" className="flex flex-1 flex-col">
							<li className="flex justify-center border-b pb-2">
								<ul role="list" className="-mx-2 space-y-2">
									{navigation.map((item) => (
										<li key={item.name}>
											<a
												href={item.href}
												className={`group flex justify-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6`}
											>
												<span
													className={classNames(
														item.current
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
											</a>
										</li>
									))}
								</ul>
							</li>

							<li className="flex justify-center">
								<ul role="list" className="-mx-2 mt-2 space-y-1">
									{supportItems.map((supportItem) => (
										<li key={supportItem.name}>
											<a
												href={supportItem.href}
												className={
													'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
												}
											>
												<span
													className={classNames(
														supportItem.current
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
											</a>
										</li>
									))}
								</ul>
							</li>

							<li className="-mx-6 mt-auto flex justify-center">
								<a
									href="#"
									className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6"
								>
									<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-4 text-[0.625rem] font-medium text-gray-400 hover:border-valid hover:text-white">
										<ArrowLeftStartOnRectangleIcon
											className="h-6 w-6 shrink-0"
											aria-hidden="true"
										/>
									</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>

			<main className="py-10 pl-20">
				<div className="px-8">{children}</div>
			</main>
		</>
	)
}
