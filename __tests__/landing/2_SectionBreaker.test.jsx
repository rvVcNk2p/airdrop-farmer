import SectionBreaker from '@/modules/landing/components/2_SectionBreaker/SectionBreaker'
import { render } from '@testing-library/react'

describe('SectionBreaker', () => {
	test(`should renders the section breaker with class 'starry-sky-airdrop'`, async () => {
		// ARRANGE
		const { container } = render(<SectionBreaker />)
		// ACT
		const breaker = container.getElementsByClassName('starry-sky-airdrop')
		// ASSERT
		expect(breaker[0]).toBeTruthy()
	})

	test(`should renders the section breaker with class 'rotate-180'`, async () => {
		// ARRANGE
		const { container } = render(<SectionBreaker className="rotate-180" />)
		// ACT
		const breaker = container.getElementsByClassName(
			'starry-sky-airdrop rotate-180',
		)
		// ASSERT
		expect(breaker[0].classList).toEqual(
			expect.objectContaining(['starry-sky-airdrop', 'rotate-180']),
		)
		expect(breaker[0].classList).toEqual(
			expect.not.objectContaining(['undefined']),
		)
	})
})
