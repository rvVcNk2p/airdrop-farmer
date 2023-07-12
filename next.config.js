/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		}
		return config
	},
	experimental: {
		serverActions: true,
	},
	redirects() {
		return [
			// {
			// 	source: '/',
			// 	destination: '/farmer',
			// 	permanent: true,
			// },
		]
	},
}

module.exports = nextConfig
