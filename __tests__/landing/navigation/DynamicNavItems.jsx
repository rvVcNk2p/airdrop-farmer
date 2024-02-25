import DynamicNavItems from '@/modules/landing/components/Navigation/DynamicNavItems'
import { render, screen, waitFor } from '@testing-library/react'

vi.mock('next/navigation', async (importOriginal) => {
	const actual = await importOriginal()
	return {
		/// ...actual,
		useRouter: vi.fn().mockReturnValue({
			route: '/',
		}),
		usePathname: vi.fn().mockReturnValue('/farmer'),
	}
})

vi.mock('@supabase/auth-helpers-nextjs', () => {
	return {
		createClientComponentClient: vi.fn().mockReturnValue({
			from: vi.fn().mockReturnValue({
				select: vi.fn().mockReturnValue({
					data: [
						{
							id: 1,
							quota: 10,
							selectedPlan: 'FREE',
							used_quota: 0,
							wallet: '0x12345671312312312389',
						},
					],
				}),
			}),
			auth: {
				signOut: vi.fn().mockReturnValue(undefined),
				onAuthStateChange: vi.fn().mockReturnValue({
					data: {
						subscription: {
							unsubscribe: vi.fn().mockReturnValue(undefined),
						},
					},
				}),
				getSession: vi.fn().mockReturnValue({
					data: {
						session: {
							user: {
								email: 'test@gmail.com',
							},
						},
					},
				}),
			},
			channel: vi.fn().mockReturnValue({
				on: vi.fn().mockReturnValue({
					subscribe: vi.fn().mockReturnValue({
						unsubscribe: vi.fn().mockReturnValue(undefined),
					}),
				}),
			}),
		}),
	}
})

describe('DynamicNavItems', () => {
	test(`shows the correct link with a logged user`, async () => {
		// ARRANGE
		render(<DynamicNavItems />)
		// ACT - ASSERT
		await waitFor(() =>
			expect(
				screen.getByRole('link', { name: 'Logout' }).getAttribute('href'),
			).toEqual(expect.stringContaining('#')),
		)
		expect(screen.getByText(new RegExp('Tier: free', 'i'))).toBeDefined()
		expect(screen.getByText(new RegExp('Quota: 0 / 10', 'i'))).toBeDefined()
	})

	// TODO: Check the logged out states
})
