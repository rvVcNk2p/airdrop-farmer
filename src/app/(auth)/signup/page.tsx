'use client'

import {
	LoginForm,
	LoginOptions,
} from '@/modules/shared/components/Form/LoginForm'
import LoadingSpinner from '@modules/shared/components/atoms/LoadingSpinner/LoadingSpinner'
import { useIsMounted } from '@modules/shared/hooks'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SignupPage = () => {
	const supabase = createClientComponentClient<Database>()
	const router = useRouter()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleSignUp = async () => {
		setError(null)
		setIsLoading(true)

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		})

		if (error === null) {
			await supabase.from('plans').insert({ user_id: data.user?.id })
			router.refresh()
		} else {
			setIsLoading(false)
			setError(error?.message)
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
						isError={error !== null}
						onEmailChange={(email: string) => setEmail(email)}
						onPasswordChange={(password) => setPassword(password)}
						onSubmit={handleSignUp}
					/>
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
