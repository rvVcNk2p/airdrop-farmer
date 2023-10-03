'use client'

import type { Database } from '@/supabase.types'
import LoadingSpinner from '@modules/shared/components/atoms/LoadingSpinner/LoadingSpinner'
import { useIsMounted } from '@modules/shared/hooks'
import { CircleNotch } from '@phosphor-icons/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SignupPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()
	const supabase = createClientComponentClient<Database>()
	const [isLoading, setIsLoading] = useState(false)

	const [isError, setIsError] = useState(false)

	const handleSignUp = async () => {
		setIsError(false)
		setIsLoading(true)

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		})

		console.log(data, error)

		if (error === null) {
			// TODO: https://supabase.com/docs/reference/javascript/select
			// const newSubscription = {
			// 	id: uuidv4(),
			// 	valid_until: moment(new Date()).add(1, 'M'),
			// 	user_id: result.data.user?.id,
			// }

			// const { error } = await supabase
			// 	.from('subscription')
			// 	.insert(newSubscription)
			router.push('/farmer')
		} else {
			setIsLoading(false)
			setIsError(true)
		}
	}

	return (
		<>
			{useIsMounted() ? (
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
							Sign up a new account
						</h2>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form className="space-y-6" action="#" method="POST">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-white"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										suppressHydrationWarning={true}
										id="email"
										name="email"
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										type="email"
										autoComplete="off"
										required
										placeholder="you@example.com"
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-valid sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label
										htmlFor="password"
										className="block text-sm font-medium leading-6 text-white"
									>
										Password
									</label>
								</div>
								<div className="mt-2">
									<input
										suppressHydrationWarning={true}
										id="password"
										type="password"
										name="password"
										onChange={(e) => setPassword(e.target.value)}
										value={password}
										autoComplete="off"
										placeholder="••••••••"
										required
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-valid sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<button
									disabled={isLoading}
									onClick={handleSignUp}
									type="submit"
									className="flex w-full justify-center rounded-md bg-valid px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valid"
								>
									{isLoading && (
										<CircleNotch className="animate-spin ml-2 h-6 w-6" />
									)}
									{!isLoading && 'Sign up'}
								</button>
								<div>
									{isError && (
										<p className="text-red-500 text-sm">
											User already registered.
										</p>
									)}
								</div>
							</div>
						</form>
					</div>
				</div>
			) : (
				<div className="text-center w-full">
					<LoadingSpinner />
				</div>
			)}
		</>
	)
}

export default SignupPage
