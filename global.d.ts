import { Database } from '@/supabase.types'

declare global {
	type Plan = Database['public']['Tables']['plans']['Row']
}
