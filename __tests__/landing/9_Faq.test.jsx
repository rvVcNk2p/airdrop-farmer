import { render, screen, waitFor } from '@testing-library/react'

import Faq from '../../src/modules/landing/components/9_Faq/Faq'

describe('Faq', () => {
	test.each([
		[
			'Do you keep my private keys?',
			'Introducing our unique farming option that ensures',
		],
		[
			'Can I become sybil due to the bot activity?',
			'To be identified as Sybil you need to do ',
		],
		[
			'Does the bot make the interval between transactions?',
			'Absolutely, our bot implement',
		],
		[
			'Is there a minimum amount that must be in the wallet?',
			'Yes, the script outcomes are',
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
