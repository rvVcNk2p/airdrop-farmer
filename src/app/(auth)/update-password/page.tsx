'use client'

import { RequestPasswordResetForm } from '@modules/shared/components/Form/RequestPasswordResetForm'
import LoadingSpinner from '@modules/shared/components/atoms/LoadingSpinner/LoadingSpinner'
import { useIsMounted } from '@modules/shared/hooks'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const UpdatePasswordPage = () => {
	const router = useRouter()
	const supabase = createClientComponentClient<Database>()

	const [newPassword, setNewPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccessful, setIsSuccessful] = useState(false)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	const handlePasswordReset = async (e: Event) => {
		e.preventDefault()

		setIsLoading(true)
		setErrorMsg(null)

		const { data, error } = await supabase.auth.updateUser({
			password: newPassword,
		})

		if (data) {
			setIsSuccessful(true)
			setTimeout(() => {
				router.push('/farmer')
			}, 3000)
		}
		if (error !== null) {
			setErrorMsg(error.message)
		}

		setIsLoading(false)
	}

	return (
		<>
			{useIsMounted() ? (
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
					<RequestPasswordResetForm
						password={newPassword}
						isLoading={isLoading}
						isSuccessful={isSuccessful}
						errorMsg={errorMsg}
						onPasswordChange={(email: string) => setNewPassword(email)}
						onSubmit={handlePasswordReset}
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

export default UpdatePasswordPage
