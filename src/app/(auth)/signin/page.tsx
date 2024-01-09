'use client'

import {
	LoginForm,
	LoginOptions,
} from '@modules/shared/components/Form/LoginForm'
import LoadingSpinner from '@modules/shared/components/atoms/LoadingSpinner/LoadingSpinner'
import { useIsMounted } from '@modules/shared/hooks'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SinginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()
	const supabase = createClientComponentClient<Database>()
	const [isLoading, setIsLoading] = useState(false)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	const handleSignIn = async () => {
		setErrorMsg(null)
		setIsLoading(true)
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error === null) {
			router.refresh()
		} else {
			setIsLoading(false)
			console.log(error)
			setErrorMsg(error.message)
		}
	}

	return (
		<>
			{useIsMounted() ? (
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
					<LoginForm
						type={LoginOptions.SIGN_IN}
						email={email}
						password={password}
						isLoading={isLoading}
						errorMsg={errorMsg}
						onEmailChange={(email: string) => setEmail(email)}
						onPasswordChange={(password) => setPassword(password)}
						onSubmit={handleSignIn}
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

export default SinginPage
