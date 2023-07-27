import secureLocalStorage from 'react-secure-storage'
import { StateStorage } from 'zustand/middleware'

// https://www.npmjs.com/package/react-secure-storage
export const SecureLocalStorage: StateStorage = {
	getItem: async (name: string): Promise<string | null> => {
		return (await secureLocalStorage.getItem(name)?.toString()) || null
	},
	setItem: async (name: string, value: string): Promise<void> => {
		await secureLocalStorage.setItem(name, value)
	},
	removeItem: async (name: string): Promise<void> => {
		await secureLocalStorage.removeItem(name)
	},
}
