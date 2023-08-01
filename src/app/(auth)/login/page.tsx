'use client'

import { useIsMounted } from '@modules/shared/hooks'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()
	const supabase = createClientComponentClient()
	const [loading, isLoading] = useState(false)

	const handleSignIn = async () => {
		isLoading(true)
		const result = await supabase.auth.signInWithPassword({
			email,
			password,
		})
		isLoading(false)

		if (result.error === null) {
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
		}
	}

	return (
		<>
			{useIsMounted() ? (
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						{/* <img
							className="mx-auto h-10 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
							alt="Your Company"
						/> */}
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
							Sign in to your account
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
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
									{/* <div className="text-sm">
										<a
											href="#"
											className="font-semibold text-indigo-400 hover:text-indigo-300"
										>
											Forgot password?
										</a>
									</div> */}
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
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<button
									disabled={loading}
									onClick={handleSignIn}
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
								>
									Sign in
								</button>
							</div>
						</form>

						{/* <p className="mt-10 text-center text-sm text-gray-400">
							Not a member?{' '}
							<a
								href="#"
								className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
							>
								Start a 14 day free trial
							</a>
						</p> */}
					</div>
				</div>
			) : (
				<div className="text-center w-full">Loading...</div>
			)}
		</>
	)
}

export default LoginPage
