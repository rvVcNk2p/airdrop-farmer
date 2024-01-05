import { render, screen } from '@testing-library/react'

import Footer from '../../../src/modules/landing/components/navigation/Footer'
import { discordLink } from '../../../src/modules/shared/constants/social'

describe('Footer', () => {
	test(`shows the correct link: ${discordLink}`, () => {
		// ARRANGE
		render(<Footer />)
		// ACT - ASSERT
		expect(screen.getByRole('link', { name: 'Contact us' })).toEqual(
			expect.objectContaining({
				href: discordLink,
			}),
		)
	})
	test(`shows the correct link: '/'`, () => {
		// ARRANGE
		render(<Footer />)
		// ACT - ASSERT
		expect(
			screen.getByRole('link', { name: 'Terms of use & Privacy policy' }),
		).toEqual(
			expect.objectContaining({
				target: '_blank',
			}),
		)
	})
})
