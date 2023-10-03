import { Database as DB } from '@/supabase.types'

declare global {
	type Database = DB
	type Plan = Database['public']['Tables']['plans']['Row']
}
