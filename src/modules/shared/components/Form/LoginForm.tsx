import { DefaultTooltip } from '@modules/shared/components/atoms/DefaultTooltip'
import { useI18n } from '@modules/shared/hooks/useI18n'
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
	errorMsg,
	onEmailChange,
	onPasswordChange,
	onSubmit,
}: {
	type: LoginOptions.SIGN_IN | LoginOptions.SIGN_UP
	email: string
	password: string
	isLoading: boolean
	errorMsg: string | null
	onEmailChange: (e: string) => void
	onPasswordChange: (e: string) => void
	onSubmit: () => void
}) => {
	const { t, i18n } = useI18n()

	const title =
		type === LoginOptions.SIGN_IN ? t('signin:title') : t('signup:title')
	const button_text =
		!isLoading && type === LoginOptions.SIGN_IN
			? t('signin:signin')
			: t('signup:signup')

	const changeLanguage = () => {
		if (i18n.language === 'es') {
			i18n.changeLanguage('en')
		} else {
			i18n.changeLanguage('es')
		}
	}
	const getLanguageFlag = () => {
		if (i18n.language === 'es') {
			return '🇬🇧'
		} else {
			return '🇪🇸'
		}
	}

	return (
		<>
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
					{title}
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
				<form className="space-y-6" action="#" method="POST">
					<div>
						<div className="flex justify-between">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-white"
							>
								{t('shared:email')}
							</label>
							<span className="cursor-pointer" onClick={changeLanguage}>
								{getLanguageFlag()}
							</span>
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

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-white"
							>
								{t('shared:password')}
							</label>
							<DefaultTooltip
								content={<p>{t('shared:error:password_min_length')}</p>}
								size={14}
							/>
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
							{button_text}
						</button>
						<div>
							{errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
						</div>
					</div>
				</form>

				{type === LoginOptions.SIGN_IN && (
					<p className="mt-10 text-center text-sm text-gray-400">
						{t('signin:not_a_member')}{' '}
						<Link
							href="/signup"
							className="font-semibold leading-6 text-valid hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valid"
						>
							{t('signin:start_free_account')}
						</Link>
					</p>
				)}
				{type === LoginOptions.SIGN_UP && (
					<p className="mt-10 text-center text-sm text-gray-400">
						{t('signup:already_has_account')}{' '}
						<Link
							href="/signin"
							className="font-semibold leading-6 text-valid hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valid"
						>
							{t('signup:log_in_here')}
						</Link>
					</p>
				)}
			</div>
		</>
	)
}
