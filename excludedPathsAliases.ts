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
]

export default excludedCoveragePathAliases
