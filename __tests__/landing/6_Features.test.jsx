import { render, screen } from '@testing-library/react'

import Features from '../../src/modules/landing/components/6_Features/Features'

describe('Features', () => {
	test.each([
		['l0', 'Layerzero'],
		['zksync', 'Zksync'],
		['starknet', 'Starknet'],
	])(`should render an image with src '%s' and alt text '%s'`, (img, alt) => {
		// ARRANGE
		render(<Features />)
		// ACT
		const image = screen.getByAltText(`${alt} logo`)
		// ASSERT
		expect(image.src).toContain(`f_${img}-logo.png`)
	})

	test.each(['LayerZero', 'ZkSync', 'Starknet'])(
		`should render an paragrah with text '%s'`,
		(text) => {
			// ARRANGE
			render(<Features />)
			// ACT
			const paragraph = screen.getByText(text)
			// ASSERT
			expect(paragraph).toBeDefined()
		},
	)
})
