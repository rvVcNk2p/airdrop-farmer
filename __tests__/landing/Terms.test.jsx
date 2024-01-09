import Terms from '@/app/terms/page.tsx'
import { render, screen, waitFor } from '@testing-library/react'

describe('Faq', () => {
	test.each([
		['Purpose of the Website', 'The Website is provided for the purpose o'],
		['Recording Transactions', 'Transactions that occur on the Platform are '],
		[
			'Wallet and private key management',
			'You have full control over the crypto',
		],
		['Gas Usage', 'Smart contracts on blockchain ne'],
		['Prohibited Actions', 'Cause harm to the Website, overload it, or '],
	])(
		`should render %s title and %s description`,
		(expectedTitle, expectedDescription) => {
			// ARRANGE
			render(<Terms />)
			// ACT
			const title = screen.getByText(new RegExp(`${expectedTitle}`, 'i'))
			// ASSERT
			expect(title).toBeDefined()
			waitFor(() =>
				expect(
					screen.getByText(new RegExp(`${expectedDescription}`, 'i')),
				).toBeDefined(),
			)
		},
	)
})
