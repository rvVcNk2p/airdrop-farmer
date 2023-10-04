import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient<Database>()

export const fetchPlanByLoggedInUser = async (): Promise<Plan[] | null> => {
	try {
		const { data } = await supabase.from('plans').select()
		return Promise.resolve(data)
	} catch (error) {
		console.error('Error fetching session:', error)
		return Promise.resolve(null)
	}
}
