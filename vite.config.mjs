import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

import { excludedCoveragePathAliases } from './excludedPathsAliases.ts'

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		coverage: {
			exclude: excludedCoveragePathAliases,
		},
	},
	coverage: {
		provider: 'v8',
		reporter: ['text', 'json'],
	},
})
