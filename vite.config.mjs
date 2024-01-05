import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

import excludedCoveragePathAliases from './excludedPathsAliases.ts'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@modules': path.resolve(__dirname, 'src/modules'),
			'@types': path.resolve(__dirname, 'src/modules/shared/types'),
			'@utils': path.resolve(__dirname, 'src/modules/shared/utils'),
		},
	},
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
