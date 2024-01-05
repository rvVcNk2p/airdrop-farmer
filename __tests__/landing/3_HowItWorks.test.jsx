import HowItWorks from '@/modules/landing/components/3_HowItWorks/HowItWorks'
import { render, screen } from '@testing-library/react'

describe('HowItWorks', () => {
	test.each([
		['1_create-strategy.png', 'Create Strategy'],
		['2_edit-and-add-group.png', 'Edit and Add group'],
		['3_top-up-wallet.png', 'Top up wallet'],
		['4_in-action-logs.png', 'In action logs'],
	])(
		`should render an image with src '%s' and alt text '%s'`,
		(expextedImg, expectedAlt) => {
			// ARRANGE
			render(<HowItWorks />)
			// ACT
			const imageWithAlt = screen.getByRole('img', {
				src: expextedImg,
				alt: expectedAlt,
			})
			// ASSERT
			expect(imageWithAlt).toBeDefined()
		},
	)
	// https://testing-library.com/docs/guide-disappearance#2-using-waitfor
	// TODO: Appearance and disappearance of the image
	// TODO: Check if the active image is visible in the viewport
})
