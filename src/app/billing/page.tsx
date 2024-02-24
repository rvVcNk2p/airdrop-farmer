'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import type { Connector } from 'wagmi'
import { useHandleSubscription, useIsMounted } from '@modules/shared/hooks'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Input } from '@modules/shared/components/ui/input'
import { Button } from '@modules/shared/components/ui/button'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline'
import { useGetPlan } from '@/modules/shared/hooks/useGetPlan'
import { toast } from '@/modules/shared/hooks/useToast'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import {
	TierIndexTypes,
	TierTypes,
} from '@modules/shared/hooks/useHandleSubscription'
import { formatUnits } from 'viem'

const BillingPage = () => {
	const { getTiers, subscribe, updateDiscountPercentageOnChain } =
		useHandleSubscription()
	const supabase = createClientComponentClient<Database>()
	const {
		discountCode,
		discountValue,
		referredBy,
		isLoading: isPlanFetching,
		updateCoupon,
		isCouponAlreadyActivated,
	} = useGetPlan()

	const { address, status: accountStatus } = useAccount()
	const { connectors, connect, error } = useConnect()
	const { disconnect } = useDisconnect()

	const isUserConnected = () => accountStatus === 'connected'

	const ConnectMetamask = () => {
		return (
			<div className="mt-10">
				{isUserConnected() && (
					<div className="flex flex-col">
						<div className="flex items-center justify-between">
							<div>
								<span className="">Welcome, </span> {address}
								<span className="">!</span>
							</div>

							{isUserConnected() && (
								<div className="mt-2 h-full w-auto">
									<button
										className="rounded-full bg-valid px-4 py-2 font-semibold text-white hover:opacity-90"
										type="button"
										onClick={() => disconnect()}
									>
										Disconnect
									</button>
								</div>
							)}
						</div>
					</div>
				)}

				{!isUserConnected() && (
					<div>
						<MetamaskButton />
						<div>{error?.message}</div>
					</div>
				)}
			</div>
		)
	}

	const MetamaskButton = () => {
		const metamaskConnector = connectors.find(
			(connector: Connector) => connector.name === 'MetaMask',
		)

		if (!metamaskConnector) return null

		return (
			<div className="flex items-center justify-between">
				<h2>Connect your wallet, with the button at the end of the line. </h2>
				<button
					className="rounded-full bg-valid px-4 py-2 font-semibold text-white hover:opacity-90"
					onClick={() => connect({ connector: metamaskConnector })}
					type="button"
				>
					{metamaskConnector.name}
				</button>
			</div>
		)
	}

	useEffect(() => {
		// Refactor this to a custom hook
		const updateAddress = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser()

			if (user?.id) {
				await supabase
					.from('plans')
					.update({ wallet: address })
					.eq('user_id', user?.id)
			}
		}

		if (isUserConnected()) {
			updateAddress()
			console.log('Connected')
		}
	}, [address])

	const checkCouponValidityInDefiHungary = async (couponCode: string) => {
		// TODO: Fetch coupon validity from the DeFi Hungary API
		await new Promise((resolve, reject) =>
			// setTimeout(() => reject({ message: 'Invalid coupon code!' }), 1000),
			setTimeout(() => resolve({}), 1000),
		)
		// await fetch(
		// 	`https://api.defihungary.com/v1/coupons/${couponCode}`,
		// )
	}

	const PlanValidity = () => {
		// TODO: Fetch plan validity from the blockchain
		// TODO: Error handling

		return (
			<div>
				<h1>Validity</h1>
				<p>Valid until 2023-12-31</p>
			</div>
		)
	}

	const CouponSection = () => {
		const [couponCode, setCouponCode] = useState('')
		const [error, setError] = useState<string | null>(null)
		const [isLoadin, setIsLoading] = useState(false)

		const COUPON_VALUE = 20
		const COUPON_TYPE = 'PERCENTAGE'
		const refferal = 'DEFI_HUNGARY'

		const validateAndUpdateCoupon = async () => {
			setError(null)
			setIsLoading(true)
			try {
				await isCouponAlreadyActivated(couponCode)
				await checkCouponValidityInDefiHungary(couponCode)
				if (address) {
					await updateDiscountPercentageOnChain(address, COUPON_VALUE)
				}
				await updateCoupon(
					couponCode,
					COUPON_TYPE,
					COUPON_VALUE.toString(),
					refferal,
				)
				toast({
					title: '🎁 Coupon activated!',
					description: `You got ${COUPON_VALUE}% off! Referred by: DeFi Hungary.`,
				})
				setIsLoading(false)
			} catch (error: any) {
				if (error) {
					setError(error?.message)
					setIsLoading(false)
				}
			}
		}

		const activatedCouponMessage = `Coupon activated! You got ${discountValue}% off! Your coupon code is: ${discountCode}. Referred by: ${referredBy}.`

		return (
			<>
				{isPlanFetching ? (
					<Skeleton className="h-4 w-full" />
				) : (
					<>
						{discountCode && <p>{activatedCouponMessage}</p>}
						{!discountCode && (
							<>
								<div className="flex items-center gap-4">
									<h1>Coupon</h1>
									<Input
										placeholder="Enter your coupon code"
										autoComplete="off"
										value={couponCode}
										disabled={isLoadin}
										onChange={(e) => setCouponCode(e.target.value)}
										className={error ? '!border-invalid' : undefined}
									/>
									<Button
										variant="outline"
										className="flex w-full px-2 sm:w-fit"
										disabled={isLoadin}
										onClick={() => validateAndUpdateCoupon()}
									>
										<ArrowPathRoundedSquareIcon className="h-6 w-6 shrink-0" />
									</Button>
								</div>
								<div className="text-invalid">{error}</div>
							</>
						)}
					</>
				)}
			</>
		)
	}

	const SubscriptionSection = () => {
		const [isLoading, setIsLoading] = useState(false)
		const [selectedTier, setSelectedTier] = useState<TierTypes | null>(null)
		const [tiers, setTiers] = useState<any>([])

		useEffect(() => {
			const fetchTiers = async () => {
				const tiers = await getTiers()
				setTiers(tiers)
				console.log('tiers', tiers)
			}
			fetchTiers()
		}, [])

		const deductDiscount = (price: bigint) => {
			return price - (price * BigInt(discountValue + '')) / BigInt(100)
		}

		return (
			<>
				<h1>Subscriptions</h1>
				{/* Add Skeleton for loading */}
				<div className="flex gap-4">
					{tiers.map((tier: any) => (
						<div
							key={tier.type}
							className={`flex flex-col gap-2 rounded-md border border-gray-200 p-4 ${
								selectedTier === tier.type ? 'border-valid' : ''
							}`}
						>
							<h2>{tier.type}</h2>
							<p className="line-through">{formatUnits(tier.price, 18)} ETH</p>
							<p>{formatUnits(deductDiscount(tier.price), 18)} ETH</p>
							<Button
								variant="outline"
								disabled={isLoading}
								onClick={() => {
									setSelectedTier(tier.type)
									subscribe(tier.type, deductDiscount(tier.price))
								}}
							>
								{isLoading ? 'Subscribing...' : 'Subscribe'}
							</Button>
						</div>
					))}
				</div>
			</>
		)
	}

	// useEffect(() => {
	// 	const fetchTiers = async () => {
	// 		const tiers = await getTiers()
	// 		console.log('tiers', tiers)
	// 	}
	// 	fetchTiers()

	// }, [])

	return (
		<>
			{useIsMounted() && (
				<>
					<ConnectMetamask />
					{address && (
						<>
							<hr className="my-4" />
							<PlanValidity />

							<hr className="my-4" />
							<CouponSection />

							<hr className="my-4" />
							<SubscriptionSection />
						</>
					)}
				</>
			)}
		</>
	)
}

export default BillingPage
