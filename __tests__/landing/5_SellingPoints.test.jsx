import { render, screen } from '@testing-library/react'

import SellingPoints from '../../src/modules/landing/components/5_SellingPoints/SellingPoints'

describe('SellingPoints', () => {
	test.each([
		'Metamask Signing',
		'Auto Expense Tracking',
		'Consolidation & Withdrawal',
	])(
		`
		should render a heading with text '%s'
		`,
		(text) => {
			// ARRANGE
			render(<SellingPoints />)
			// ACT
			const heading = screen.getByRole('heading', {
				name: text,
			})
			// ASSERT
			expect(heading).toBeDefined()
		},
	)

	test.each([
		'After your goal achieved, money',
		'An exclusive opportunity',
		'You no longer need to keep',
	])(
		`
		should render a paragraph with text '%s'
		`,
		(text) => {
			// ARRANGE
			render(<SellingPoints />)
			// ACT
			const paragraph = screen.getByText(new RegExp(`${text}`, 'i'))
			// ASSERT
			expect(paragraph).toBeDefined()
		},
	)

	test.each([
		'Metamask Signing',
		'Private Keys Stay Private',
		'Consolidation Withdrawal',
	])(
		`
		should render an image with alt text '%s'
		`,
		(alt) => {
			// ARRANGE
			render(<SellingPoints />)
			// ACT
			const image = screen.getByAltText(alt)
			// ASSERT
			expect(image).toBeDefined()
		},
	)
})
