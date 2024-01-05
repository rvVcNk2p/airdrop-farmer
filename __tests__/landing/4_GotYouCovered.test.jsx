import GotYouCovered from '@/modules/landing/components/4_GotYouCovered/GotYouCovered'
import { render, screen } from '@testing-library/react'

describe('GotYouCovered', () => {
	test.each([
		[
			'/images/gyc_b_randomization.png',
			'Randomization of actions for airdrop farming',
		],
		['/images/gyc_c_add-your-private-keys.png', 'Private Keys Stay Private'],
	])(
		`should render an image with src '%s' and alt text '%s'`,
		(expectedImg, expectedAltText) => {
			// ARRANGE
			render(<GotYouCovered />)
			// ACT
			const imageWithAlt = screen.getByAltText(expectedAltText)
			// ASSERT
			expect(imageWithAlt).toBeDefined()
		},
	)

	test.each([
		['You Covered', 'Here, we value the'],
		['Zero Risk', 'Our system ensures'],
	])(
		`should render a paragraph with text '%s' and '%s'`,
		(expectedTitle, expectedDescription) => {
			// ARRANGE
			render(<GotYouCovered />)
			// ACT
			const titleParagraph = screen.getByText(
				new RegExp(`${expectedTitle}`, 'i'),
			)
			const descriptionParagraph = screen.getByText(
				new RegExp(`${expectedDescription}`, 'i'),
			)
			// ASSERT
			expect(titleParagraph).toBeDefined()
			expect(descriptionParagraph).toBeDefined()
		},
	)
})
