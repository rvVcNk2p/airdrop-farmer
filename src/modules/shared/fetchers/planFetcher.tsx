import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient<Database>()

export const fetchPlanByLoggedInUser = async (): Promise<Plan[] | null> => {
	try {
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user?.id) return Promise.resolve(null)

		const { data } = await supabase
			.from('plans')
			.select()
			.eq('user_id', user?.id)
		return Promise.resolve(data)
	} catch (error) {
		console.error('Error fetching session:', error)
		return Promise.resolve(null)
	}
}
