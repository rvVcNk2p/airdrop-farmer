'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import type { Connector } from 'wagmi'
import { useIsMounted } from '@modules/shared/hooks'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Input } from '@modules/shared/components/ui/input'
import { Button } from '@modules/shared/components/ui/button'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline'
import { useGetPlan } from '@/modules/shared/hooks/useGetPlan'
import { toast } from '@/modules/shared/hooks/useToast'

const BillingPage = () => {
	const supabase = createClientComponentClient<Database>()
	const {
		discountCode,
		discountValue,
		referredBy,
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

		const validateAndUpdateCoupon = async () => {
			setError(null)
			try {
				await new Promise((resolve, reject) =>
					// setTimeout(() => reject({ message: 'Invalid coupon code!' }), 1000),
					setTimeout(() => resolve({}), 1000),
				)
				// TODO: Fetch coupon validity from the DeFi Hungary API
				// await fetch(
				// 	`https://api.defihungary.com/v1/coupons/${couponCode}`,
				// )
				await isCouponAlreadyActivated(couponCode)
				// TODO: Update the coupon code in the blockchain
				await updateCoupon(couponCode, 'PERCENTAGE', '20', 'DEFI_HUNGARY')
				toast({
					title: '🎁 Coupon activated!',
					description: `You got 20% off! Referred by: DeFi Hungary.`,
				})
			} catch (error: any) {
				if (error) {
					setError(error?.message)
				}
			}
		}

		const activatedCouponMessage = `Coupon activated! You got ${discountValue}% off! Your coupon code is: ${discountCode}. Referred by: ${referredBy}.`

		return (
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
								onChange={(e) => setCouponCode(e.target.value)}
								className={error ? '!border-invalid' : undefined}
							/>
							<Button
								variant="outline"
								className="flex w-full px-2 sm:w-fit"
								onClick={() => validateAndUpdateCoupon()}
							>
								<ArrowPathRoundedSquareIcon className="h-6 w-6 shrink-0" />
							</Button>
						</div>
						<div className="text-invalid">{error}</div>
					</>
				)}
			</>
		)
	}

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
						</>
					)}
				</>
			)}
		</>
	)
}

export default BillingPage
