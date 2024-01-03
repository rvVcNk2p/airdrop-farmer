export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			plans: {
				Row: {
					created_at: string
					id: number
					quota: number
					tier: string | null
					updated_at: string
					used_quota: number
					user_id: string | null
					wallet: string | null
				}
				Insert: {
					created_at?: string
					id?: number
					quota?: number
					tier?: string | null
					updated_at?: string
					used_quota?: number
					user_id?: string | null
					wallet?: string | null
				}
				Update: {
					created_at?: string
					id?: number
					quota?: number
					tier?: string | null
					updated_at?: string
					used_quota?: number
					user_id?: string | null
					wallet?: string | null
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
