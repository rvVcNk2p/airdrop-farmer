import { CircleNotch } from '@phosphor-icons/react'
import Link from 'next/link'

export enum LoginOptions {
	SIGN_UP = 'SIGN_UP',
	SIGN_IN = 'SIGN_IN',
}

export const LoginForm = ({
	type,
	email,
	password,
	isLoading,
	isError,
	onEmailChange,
	onPasswordChange,
	onSubmit,
}: {
	type: LoginOptions.SIGN_IN | LoginOptions.SIGN_UP
	email: string
	password: string
	isLoading: boolean
	isError: boolean
	onEmailChange: (e: string) => void
	onPasswordChange: (e: string) => void
	onSubmit: () => void
}) => {
	return (
		<>
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
					{type === LoginOptions.SIGN_IN
						? 'Sign in to your account'
						: 'Create a new account'}
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
								onChange={(e) => onEmailChange(e.target.value)}
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
								onChange={(e) => onPasswordChange(e.target.value)}
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
							onClick={onSubmit}
							type="submit"
							className="flex w-full justify-center rounded-md bg-valid px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valid"
						>
							{isLoading && (
								<CircleNotch className="animate-spin ml-2 h-6 w-6" />
							)}
							{!isLoading && type === LoginOptions.SIGN_IN
								? 'Sign in'
								: 'Sign up'}
						</button>
						<div>
							{isError && (
								<p className="text-red-500 text-sm">
									Invalid email or password.
								</p>
							)}
						</div>
					</div>
				</form>

				{type === LoginOptions.SIGN_IN && (
					<p className="mt-10 text-center text-sm text-gray-400">
						Not a member?{' '}
						<Link
							href="/signup"
							className="font-semibold leading-6 text-valid hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valid"
						>
							Start a free acocunt today!
						</Link>
					</p>
				)}
				{type === LoginOptions.SIGN_UP && (
					<p className="mt-10 text-center text-sm text-gray-400">
						Already has an account?{' '}
						<Link
							href="/signin"
							className="font-semibold leading-6 text-valid hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valid"
						>
							Log in here!
						</Link>
					</p>
				)}
			</div>
		</>
	)
}
