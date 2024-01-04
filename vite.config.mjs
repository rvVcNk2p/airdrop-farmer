import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

import excludedCoveragePathAliases from './excludedPathsAliases.ts'

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./setupTests.ts'],
		coverage: {
			exclude: excludedCoveragePathAliases,
		},
	},
	coverage: {
		provider: 'v8',
		reporter: ['text', 'json', 'html'],
	},
})
