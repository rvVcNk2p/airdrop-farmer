import { useUserWallets } from '@modules/farmer/stores'
import { FormMultipleSelectWrapper } from '@modules/shared/components/Form/FormMultipleSelectWrapper'
import MultipleSelector from '@modules/shared/components/ui/multiple-selector'
import { toast } from '@modules/shared/hooks/useToast'

export const FormMultipleWalletSelect = ({
	name,
	form,
}: {
	name: string
	form: any
}) => {
	const userWallets = useUserWallets((state) => state.userWallets)

	const walletOptions = userWallets.map((wallet) => ({
		label: wallet.name,
		value: wallet.uid,
	}))

	// TODO: Fetch tier and show only wallets that are in the paid tier
	const maxSelectedWallets = 10

	return (
		<FormMultipleSelectWrapper name={name} label="Wallets" form={form}>
			{({ field, error }) => (
				<MultipleSelector
					className={`${error && '!border-invalid'}`}
					maxSelected={maxSelectedWallets}
					onMaxSelected={(maxLimit) => {
						toast({
							title: `You have reached max selected limit: ${maxLimit}`,
						})
					}}
					options={walletOptions}
					placeholder={'Select wallet'}
					emptyIndicator={
						<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
							no results found.
						</p>
					}
					value={field.value}
					onChange={(value) => form.setValue(field.name, value)}
				/>
			)}
		</FormMultipleSelectWrapper>
	)
}
