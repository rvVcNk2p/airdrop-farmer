'use client'

import {
	LoginForm,
	LoginOptions,
} from '@/modules/shared/components/Form/LoginForm'
import LoadingSpinner from '@modules/shared/components/atoms/LoadingSpinner/LoadingSpinner'
import { useIsMounted } from '@modules/shared/hooks'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

const SignupPage = () => {
	const supabase = createClientComponentClient<Database>()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState<
		boolean | null
	>(null)

	const handleSignUp = async () => {
		setErrorMsg(null)
		setIsLoading(true)

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		})

		if (error === null) {
			setIsRegistrationSuccessful(true)
			setIsLoading(false)
		} else {
			setIsLoading(false)
			setErrorMsg(error?.message)
		}
	}

	return (
		<>
			{useIsMounted() ? (
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
					<LoginForm
						type={LoginOptions.SIGN_UP}
						email={email}
						password={password}
						isLoading={isLoading}
						isRegistrationSuccessful={isRegistrationSuccessful}
						errorMsg={errorMsg}
						onEmailChange={(email: string) => setEmail(email)}
						onPasswordChange={(password) => setPassword(password)}
						onSubmit={handleSignUp}
					/>
				</div>
			) : (
				<div className="w-full text-center">
					<LoadingSpinner />
				</div>
			)}
		</>
	)
}

export default SignupPage
