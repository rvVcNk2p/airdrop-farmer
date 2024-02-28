'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import type { Connector } from 'wagmi'
import { useHandleSubscription, useIsMounted } from '@modules/shared/hooks'
import { useEffect, useState } from 'react'
import { Input } from '@modules/shared/components/ui/input'
import { Button } from '@modules/shared/components/ui/button'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline'
import { useGetPlan } from '@/modules/shared/hooks/useGetPlan'
import { toast } from '@/modules/shared/hooks/useToast'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { TierTypes } from '@modules/shared/hooks/useHandleSubscription'
import { formatUnits } from 'viem'
import moment from 'moment'
import { arbitrum, sepolia } from 'viem/chains'

const BillingPage = ({ managerPrivatekey }: { managerPrivatekey: any }) => {
	const {
		getTiers,
		subscribe,
		updateDiscountPercentageOnChain,
		getOnChainSubscription,
	} = useHandleSubscription({ managerPrivatekey })
	const {
		wallet,
		discountCode,
		discountValue,
		referredBy,
		isLoading: isPlanFetching,
		updatePlan,
		updateCoupon,
		isCouponAlreadyActivated,
		getIsAddressAlreadyUsed,
	} = useGetPlan()

	const { address, status: accountStatus, chainId } = useAccount()
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

	const checkCouponValidityInDefiHungary = async (couponCode: string) => {
		const selfHostedCorsAnywhere = '' //'https://cors-anywhere-s2tm.onrender.com/'
		const response = await fetch(
			`${selfHostedCorsAnywhere}https://www.defihungary.com/api/airdrop/${couponCode}`,
		)
		const { status, error } = await response.json()
		if (!status) {
			throw new Error(error)
		}
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
					await updateCoupon(
						address,
						couponCode,
						COUPON_TYPE,
						COUPON_VALUE.toString(),
						refferal,
					)
				}

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
						{discountValue && <p>{activatedCouponMessage}</p>}
						{!discountValue && (
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
										disabled={isLoadin || !couponCode}
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
		const [tiers, setTiers] = useState<any>([])
		const [isLoading, setIsLoading] = useState(false)

		const [selectedTier, setSelectedTier] = useState<TierTypes>(TierTypes.FREE)
		const [expiry, setExpiry] = useState<Date | null>(null)

		useEffect(() => {
			const fetchTiers = async () => {
				const tiers = await getTiers()
				setTiers(tiers)
			}
			fetchTiers()
			const fetchOnChainSubscription = async () => {
				if (!address) return
				const result = await getOnChainSubscription(address)
				const { tier, expiry } = result
				setSelectedTier(tier)
				if (expiry !== null) {
					setExpiry(new Date(expiry * 1000))
				}
			}
			fetchOnChainSubscription()
		}, [])

		const deductDiscount = (price: bigint) => {
			return price - (price * BigInt(discountValue ?? 0 + '')) / BigInt(100)
		}

		const handleSubscribe = async (tierType: TierTypes, price: bigint) => {
			setIsLoading(true)
			try {
				setSelectedTier(tierType)
				await subscribe(tierType, price)
				if (address) {
					await updatePlan(tierType, address)
				}
				toast({
					title: '🎉 Subscribed!',
					description: `You have successfully subscribed to ${tierType}!`,
				})
				setIsLoading(false)
			} catch (e: any) {
				setSelectedTier(TierTypes.FREE)
				toast({
					title: '🚨 Error!',
					description: e?.message,
				})
				setIsLoading(false)
			}
		}

		return (
			<>
				<h1>Subscriptions</h1>
				<div className="mt-4 grid grid-cols-4 gap-4">
					{isPlanFetching || tiers.length === 0 ? (
						<>
							<Skeleton className="h-40 w-full" />
							<Skeleton className="h-40 w-full" />
							<Skeleton className="h-40 w-full" />
							<Skeleton className="h-40 w-full" />
						</>
					) : (
						<>
							{tiers.map((tier: any) => (
								<div
									key={tier.type}
									className={`flex flex-col gap-2 rounded-md border border-gray-200 p-4 ${
										selectedTier === tier.type ? 'border-valid' : ''
									}`}
								>
									<div className="flex h-full flex-col gap-2">
										<h2>{tier.type}</h2>
										<p>
											<span className={discountValue ? 'line-through' : ''}>
												{formatUnits(tier.price, 18)} ETH
											</span>
											{discountValue && (
												<span>
													{' '}
													- {formatUnits(deductDiscount(tier.price), 18)} ETH
												</span>
											)}
										</p>
										{tier.type === selectedTier && expiry !== null && (
											<>
												<p>Active: {moment(expiry).format('YYYY MMMM DD.')}</p>
											</>
										)}
									</div>

									<Button
										variant="outline"
										disabled={isLoading || selectedTier !== TierTypes.FREE}
										onClick={() =>
											handleSubscribe(tier.type, deductDiscount(tier.price))
										}
									>
										{isLoading && selectedTier === tier.type
											? 'Subscribing...'
											: selectedTier === tier.type
												? 'Subscribed'
												: 'Subscribe'}
									</Button>
								</div>
							))}
						</>
					)}
				</div>
			</>
		)
	}

	const correctNetworkNetwork =
		process.env.NEXT_PUBLIC_TARGET_NETWORK === 'SEPOLIA'
			? sepolia.id
			: arbitrum.id

	const isSelectedNetworkCorrect = chainId === correctNetworkNetwork

	const correctNetwork =
		process.env.NEXT_PUBLIC_TARGET_NETWORK === 'SEPOLIA'
			? sepolia.name
			: arbitrum.name

	const [isAddressAlreadyUsed, setIsAddressAlreadyUsed] = useState(false)

	useEffect(() => {
		const checkIfAddressAlreadyInIse = async () => {
			if (!address) return false
			setIsAddressAlreadyUsed(await getIsAddressAlreadyUsed(address))
		}
		checkIfAddressAlreadyInIse()
	}, [address, getIsAddressAlreadyUsed])

	return (
		<>
			{useIsMounted() && (
				<>
					<ConnectMetamask />
					{
						<>
							{address && (
								<>
									{isSelectedNetworkCorrect ? (
										<>
											{isAddressAlreadyUsed ? (
												<div className="mt-10">
													This wallet is already binded to another user. Please
													use another wallet.
												</div>
											) : (
												<>
													{wallet && wallet === address ? (
														<>
															<hr className="my-4" />
															<SubscriptionSection />

															<hr className="my-4" />
															<CouponSection />
														</>
													) : wallet && wallet !== address ? (
														<>
															<div className="mt-10">
																You have already subscribed or applied a coupon
																code with another wallet. Please use that
																wallet.
															</div>
															<div>HINT: {wallet}</div>
														</>
													) : (
														<>
															<hr className="my-4" />
															<SubscriptionSection />

															<hr className="my-4" />
															<CouponSection />
														</>
													)}
												</>
											)}
										</>
									) : (
										<>
											<div className="mt-10">
												<p>Wrong network, please switch to {correctNetwork}.</p>
											</div>
										</>
									)}
								</>
							)}
						</>
					}
				</>
			)}
		</>
	)
}

export default BillingPage
