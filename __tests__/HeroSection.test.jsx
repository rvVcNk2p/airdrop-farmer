import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, clearAllMocks, describe, expect, test, vi } from 'vitest'

import HeroSection from '../src/modules/landing/components/1_HeroSection/HeroSection'

// https://testing-library.com/docs/react-testing-library/api

describe('HeroSection', () => {
	// ARRANGE
	render(<HeroSection />)

	test('should renders the hero title with text "Automate Your"', () => {
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
		// ACT
		const heroDescription = screen.getByText(/Maximize your airdrop/i)
		// ASSERT
		expect(heroDescription).toBeDefined()
	})
})

// await waitFor(() => expect(mockApi.getTasks)).toHaveBeenCalled())
// fireEvent.click(screen.getText('Text 1'))
// await waitFor(() => expect(mockApi.markTaskAsCompleted)).toHaveBeenCalledWith(1))

// const mockApi = {
// 	getTasks: vi.fn().mockReturnValue([
// 		{
// 			id: 1,
// 			title: 'Task 1',
// 			completed: false,
// 		},
// 	]),
// 	markTaskAsCompleted: vi.fn().mockReturnValue(undefined),
// }