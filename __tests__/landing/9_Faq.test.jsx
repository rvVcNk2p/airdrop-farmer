import Faq from '@/modules/landing/components/9_Faq/Faq'
import { render, screen, waitFor } from '@testing-library/react'

describe('Faq', () => {
	test.each([
		[
			'Do you keep my private keys?',
			'Introducing our unique farming option that ensures',
		],
	])(
		`should render %s title and %s description`,
		(expectedTitle, expectedDescription) => {
			// ARRANGE
			render(<Faq />)
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
