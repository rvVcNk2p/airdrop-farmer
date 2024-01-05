import { render } from '@testing-library/react'

import SectionBreaker from '../../src/modules/landing/components/2_SectionBreaker/SectionBreaker'

describe('SectionBreaker', () => {
	test(`should renders the section breaker with class 'starry-sky-airdrop'`, async () => {
		// ARRANGE
		const { container } = render(<SectionBreaker />)
		// ACT
		const alma = container.getElementsByClassName('starry-sky-airdrop')
		// ASSERT
		expect(alma[0]).toBeTruthy()
	})

	test(`should renders the section breaker with class 'rotate-180'`, async () => {
		// ARRANGE
		const { container } = render(<SectionBreaker className="rotate-180" />)
		// ACT
		const alma = container.getElementsByClassName(
			'starry-sky-airdrop rotate-180',
		)
		// ASSERT
		expect(alma[0]).toBeTruthy()
	})
})
