'use client'

import { PasswordResetForm } from '@modules/shared/components/Form/PasswordResetForm'
import LoadingSpinner from '@modules/shared/components/atoms/LoadingSpinner/LoadingSpinner'
import { useIsMounted } from '@modules/shared/hooks'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

const SinginPage = () => {
	const supabase = createClientComponentClient<Database>()

	const [email, setEmail] = useState('')
	const [hasSent, setHasSent] = useState(false)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	const handlePasswordReset = async (e: Event) => {
		e.preventDefault()

		setHasSent(true)
		setErrorMsg(null)

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${process.env.NEXT_PUBLIC_BASE_PATH}/update-password`,
		})

		if (error !== null) {
			setHasSent(false)
			setErrorMsg(error.message)
		}
	}

	return (
		<>
			{useIsMounted() ? (
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
					<PasswordResetForm
						email={email}
						hasSent={hasSent}
						errorMsg={errorMsg}
						onEmailChange={(email: string) => setEmail(email)}
						onSubmit={handlePasswordReset}
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
