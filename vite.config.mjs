import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./setupTests.ts'],
		coverage: {
			exclude: [
				'src/modules/shared/utils/remToPx.ts',
				'src/modules/shared/utils/index.ts',
				'src/modules/shared/utils/tailwind-merge.ts',
			],
		},
	},
	coverage: {
		provider: 'v8',
		reporter: ['text', 'json', 'html'],
	},
})
