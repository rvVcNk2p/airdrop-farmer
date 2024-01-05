import { render, screen, waitFor } from '@testing-library/react'

import LandingPage from '../../src/modules/landing/components/LandingPage'

describe('LandingPage', () => {
	test(`check if every section is rendered`, () => {
		// ARRANGE
		const { container } = render(<LandingPage />)
		// ACT
		const heroTitle1 = screen.getByText(/Automate Your/i)
		const breaker = container.getElementsByClassName('starry-sky-airdrop')
		const imageWithAlt = screen.getByAltText('Create Strategy')
		const titleParagraph = screen.getByText(new RegExp(`You Covered`, 'i'))
		// TODO: add more sections
		// ASSERT
		expect(heroTitle1).toBeDefined()
		expect(breaker[0]).toBeTruthy()
		expect(imageWithAlt).toBeDefined()
		expect(titleParagraph).toBeDefined()
	})
})
