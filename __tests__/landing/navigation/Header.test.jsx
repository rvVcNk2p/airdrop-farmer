import Header from '@/modules/landing/components/Navigation/Header'
import { discordLink } from '@/modules/shared/constants/social'
import { render, screen, waitFor } from '@testing-library/react'

vi.mock('next/navigation', async (importOriginal) => {
	const actual = await importOriginal()
	return {
		/// ...actual,
		useRouter: vi.fn().mockReturnValue({
			route: '/',
		}),
		usePathname: vi.fn().mockReturnValue('/'),
	}
})

vi.mock('@supabase/auth-helpers-nextjs', () => {
	return {
		createClientComponentClient: vi.fn().mockReturnValue({
			from: () => {
				return {
					select: vi.fn().mockReturnValue({
						data: [
							{
								id: 1,
								quota: 20,
								tier: 'free',
								used_quota: 3,
								wallet: '0x12345671312312312389',
							},
						],
					}),
				}
			},
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
		}),
	}
})

describe('Header', () => {
	test(`shows the correct link with logged in user`, async () => {
		// ARRANGE
		render(<Header />)
		// ACT - ASSERT
		await expect(screen.getByRole('link', { name: 'Join Discord' })).toEqual(
			expect.objectContaining({
				href: discordLink,
			}),
		)
		await waitFor(() =>
			expect(
				screen
					.getByRole('link', { name: 'Airdrop Farmer' })
					.getAttribute('href'),
			).toEqual(expect.stringContaining('/farmer')),
		)
	})
})
