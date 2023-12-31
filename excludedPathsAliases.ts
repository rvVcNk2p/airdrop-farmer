const excludedCoveragePathAliases = [
	// Sentry
	'src/app/sentry-example-page/page.jsx',
	'next.config.js',
	'sentry.client.config.ts',
	'src/app/global-error.jsx',
	'sentry.edge.config.ts',
	'sentry.server.config.ts',
	'src/app/api/sentry-example-api/route.js',
	// Other
	'src/modules/shared/utils/remToPx.ts',
	'src/modules/shared/utils/index.ts',
	'src/modules/shared/utils/tailwind-merge.ts',
	'excludedPathsAliases.ts',
	'global.d.ts',
	'middleware.ts',
	'postcss.config.js',
	'tailwind.config.js',
	'supabase.types.ts',
	'src/modules/supabase/server-utils.ts',
	'src/modules/landing/components/index.ts',
	'src/modules/farmer/constants/**/*.ts',
	'src/app/blog/layout.tsx',
]

export default excludedCoveragePathAliases
