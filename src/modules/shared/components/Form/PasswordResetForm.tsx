import { DefaultTooltip } from '@modules/shared/components/atoms/DefaultTooltip'
import { useI18n } from '@modules/shared/hooks/useI18n'
import { ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'

export const PasswordResetForm = ({
	email,
	hasSent,
	errorMsg,
	onEmailChange,
	onSubmit,
}: {
	email: string
	hasSent: boolean
	errorMsg: string | null
	onEmailChange: (e: string) => void
	onSubmit: (e: MouseEvent) => void
}) => {
	const { t } = useI18n()

	return (
		<>
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
					{t('signin:password_forgotten')}
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
				<form className="space-y-6" action="#" method="POST">
					<div>
						<div className="flex">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-white"
							>
								{t('shared:email')}
								<DefaultTooltip
									content={
										'Enter the email address you used to register and we will email you what to do!'
									}
									size={14}
								/>
							</label>
						</div>
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

					{/* TODO: Add 'Back' button  */}

					<div className="flex flex-col gap-2">
						{hasSent ? (
							<p className="text-valid">
								If the provided address is in our database, we will send you a
								reset email shortly!
							</p>
						) : (
							<>
								<button
									disabled={hasSent}
									onClick={(e) => onSubmit(e as unknown as MouseEvent)}
									type="submit"
									className="flex w-full items-center justify-center rounded-md bg-valid px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valid"
								>
									{t('signin:request_new_password')}{' '}
									<ArrowRight className="ml-2" />
								</button>
								<div>
									{errorMsg && (
										<p className="text-sm text-red-500">{errorMsg}</p>
									)}
								</div>
							</>
						)}
					</div>
				</form>
			</div>
		</>
	)
}
