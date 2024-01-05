import Footer from '@/modules/landing/components/Navigation/Footer'
import { discordLink } from '@/modules/shared/constants/social'
import { render, screen } from '@testing-library/react'

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
