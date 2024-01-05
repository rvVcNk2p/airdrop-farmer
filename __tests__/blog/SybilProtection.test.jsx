import SybilProtection from '@/app/blog/sybil-protection/page.tsx'
import { render, screen } from '@testing-library/react'

describe('SybilProtection', () => {
	test.each([
		[
			"What's the Buzz All About?",
			'In the ever-evolving realm of digital assets',
		],
		[
			'Participation with Randomized Strategies',
			'As you venture into the world of airdrop farming',
		],
		[
			'Airdrop Farming Experience Made Easy',
			'Participating in airdrop farming should be an exciting',
		],
	])(
		`
		Should render the given titles and descriptions of the page
	`,
		(expectedTitle, expectedDescription) => {
			// ARRANGE
			render(<SybilProtection />)
			// ACT
			const title = screen.getByText(new RegExp(expectedTitle, 'i'))
			const description = screen.getByText(
				new RegExp(`${expectedDescription}`, 'i'),
			)
			// ASSERT
			expect(title).toBeDefined()
			expect(description).toBeDefined()
		},
	)
})
