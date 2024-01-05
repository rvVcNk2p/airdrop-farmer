import SellingPoints from '@/modules/landing/components/5_SellingPoints/SellingPoints'
import { render, screen } from '@testing-library/react'

describe('SellingPoints', () => {
	test.each([
		'Metamask Signing',
		'Auto Expense Tracking',
		'Consolidation & Withdrawal',
	])(`should render a heading with text '%s'`, (expectedText) => {
		// ARRANGE
		render(<SellingPoints />)
		// ACT
		const heading = screen.getByRole('heading', {
			name: expectedText,
		})
		// ASSERT
		expect(heading).toBeDefined()
	})

	test.each([
		'After your goal achieved, money',
		'An exclusive opportunity',
		'You no longer need to keep',
	])(`should render a paragraph with text '%s'`, (expectedText) => {
		// ARRANGE
		render(<SellingPoints />)
		// ACT
		const paragraph = screen.getByText(new RegExp(`${expectedText}`, 'i'))
		// ASSERT
		expect(paragraph).toBeDefined()
	})

	test.each([
		'Metamask Signing',
		'Private Keys Stay Private',
		'Consolidation Withdrawal',
	])(`should render an image with alt text '%s'`, (expectedAlt) => {
		// ARRANGE
		render(<SellingPoints />)
		// ACT
		const image = screen.getByAltText(expectedAlt)
		// ASSERT
		expect(image).toBeDefined()
	})
})
