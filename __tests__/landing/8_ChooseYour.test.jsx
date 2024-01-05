import { render, screen } from '@testing-library/react'

import ChooseYour from '../../src/modules/landing/components/8_ChooseYour/Faq'

describe('ChooseYour', () => {
	test.each([['Pricing', 'Eager to boost your profits']])(
		`should render heading and description`,
		(text, desc) => {
			// ARRANGE
			render(<ChooseYour />)
			// ACT
			const heading = screen.getByRole('heading', { name: text })
			const description = screen.getByText(new RegExp(`${desc}`, 'i'))
			// ASSERT
			expect(heading).toBeDefined()
			expect(description).toBeDefined()
		},
	)

	test.each([
		['Monthly', 'Best option for', '100', '11/25 claimed. Next price: $200'],
		['Lifetime', 'Designed for', '300', '6/25 claimed. Next price: $600'],
	])(
		`should render %s period with %s description, %s price and %s information`,
		(
			expectedPeriod,
			expectetDescription,
			expectedPrice,
			expectedInformation,
		) => {
			// ARRANGE
			render(<ChooseYour />)
			// ACT
			const period = screen.getByText(expectedPeriod)
			const description = screen.getByText(
				new RegExp(`${expectetDescription}`, 'i'),
			)
			const price = screen.getByText(new RegExp(`${expectedPrice}`, 'i'))
			const information = screen.getByText(expectedInformation)
			// ASSERT
			expect(period).toBeDefined()
			expect(description).toBeDefined()
			expect(price).toBeDefined()
			expect(information).toBeDefined()
		},
	)
})
