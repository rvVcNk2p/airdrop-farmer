import HeroSection from '@/modules/landing/components/1_HeroSection/HeroSection'
import { render, screen } from '@testing-library/react'

describe('HeroSection', () => {
	test('should renders the hero title with text "Automate Your"', () => {
		// ARRANGE
		render(<HeroSection />)
		// ACT
		const heroTitle1 = screen.getByText(/Automate Your/i)
		const heroTitle2 = screen.getByRole('heading', {
			name: 'Automate Your LayerZero Airdrop Farming',
		})
		// ASSERT
		expect(heroTitle1).toBeDefined()
		expect(heroTitle2).toBeDefined()
	})

	test('should renders the hero description', () => {
		// ARRANGE
		render(<HeroSection />)
		// ACT
		const heroDescription = screen.getByText(/Maximize your airdrop/i)
		// ASSERT
		expect(heroDescription).toBeDefined()
	})
})

// await waitFor(() => expect(mockApi.getTasks)).toHaveBeenCalled())
// fireEvent.click(screen.getText('Text 1'))
// await waitFor(() => expect(mockApi.markTaskAsCompleted)).toHaveBeenCalledWith(1))
