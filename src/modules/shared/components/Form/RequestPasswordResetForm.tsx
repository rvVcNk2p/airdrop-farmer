import { DefaultTooltip } from '@modules/shared/components/atoms/DefaultTooltip'
import { useI18n } from '@modules/shared/hooks/useI18n'
import { ArrowRight } from '@phosphor-icons/react'

export const RequestPasswordResetForm = ({
	password,
	isLoading,
	isSuccessful,
	errorMsg,
	onPasswordChange,
	onSubmit,
}: {
	password: string
	isLoading: boolean
	isSuccessful: boolean
	errorMsg: string | null
	onPasswordChange: (e: string) => void
	onSubmit: (e: Event) => void
}) => {
	const { t } = useI18n()

	return (
		<>
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
					{t('signin:change_password')}
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
								{t('shared:password')}
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
								id="password"
								name="password"
								onChange={(e) => onPasswordChange(e.target.value)}
								value={password}
								type="password"
								autoComplete="off"
								required
								className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-valid sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						{isSuccessful ? (
							<p className="text-valid">
								Your new password has been modified successfully! Will be
								redirected to the &apos;Farmer&apos; page in a few seconds.
							</p>
						) : (
							<>
								<button
									disabled={isLoading}
									onClick={(e) => onSubmit(e)}
									type="submit"
									className="flex w-full justify-center items-center rounded-md bg-valid px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valid"
								>
									{t('signin:save')} <ArrowRight className="ml-2" />
								</button>
								<div>
									{errorMsg && (
										<p className="text-red-500 text-sm">{errorMsg}</p>
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
