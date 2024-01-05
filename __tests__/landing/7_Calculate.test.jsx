import { render, screen } from '@testing-library/react'

import Calculate from '../../src/modules/landing/components/7_Calculate/Calculate'

describe('Calculate', () => {
	test.each([["Let's Do The Math", 'What would be your']])(
		`should render heading and description`,
		(expectedText, expectedDescription) => {
			// ARRANGE
			render(<Calculate />)
			// ACT
			const heading = screen.getByRole('heading', { name: expectedText })
			const description = screen.getByText(
				new RegExp(`${expectedDescription}`, 'i'),
			)
			// ASSERT
			expect(heading).toBeDefined()
			expect(description).toBeDefined()
		},
	)

	test.each([
		['1', '10 hours', '2,342'],
		['10', '3 minutes', '23,420'],
		['100', '30 minutes', '234,000'],
	])(
		`should render a card with inputs '%s', '%s', '%s'`,
		(expectedAccount, expectedTimeSpent, expectedProfit) => {
			// ARRANGE
			render(<Calculate />)
			// ACT
			const accountElement = screen.getByText(
				new RegExp(`${expectedAccount} account`, 'i'),
			)
			const timeSpentElement = screen.getByText(
				new RegExp(`${expectedTimeSpent}`, 'i'),
			)
			const profitElement = screen.getByText(
				new RegExp(`${expectedProfit}`, 'i'),
			)
			// ASSERT
			expect(accountElement).toBeDefined()
			expect(timeSpentElement).toBeDefined()
			expect(profitElement).toBeDefined()
		},
	)
})
