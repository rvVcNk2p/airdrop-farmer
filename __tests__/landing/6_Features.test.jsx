import Features from '@/modules/landing/components/6_Features/Features'
import { render, screen } from '@testing-library/react'

describe('Features', () => {
	test.each([
		['l0', 'Layerzero'],
		['zksync', 'Zksync'],
		['starknet', 'Starknet'],
	])(
		`should render an image with src '%s' and alt text '%s'`,
		(expectedImg, expectedAlt) => {
			// ARRANGE
			render(<Features />)
			// ACT
			const image = screen.getByAltText(`${expectedAlt} logo`)
			// ASSERT
			expect(image.src).toContain(`f_${expectedImg}-logo.png`)
		},
	)

	test.each(['LayerZero', 'ZkSync', 'Starknet'])(
		`should render an paragrah with text '%s'`,
		(expectedText) => {
			// ARRANGE
			render(<Features />)
			// ACT
			const paragraph = screen.getByText(expectedText)
			// ASSERT
			expect(paragraph).toBeDefined()
		},
	)
})
