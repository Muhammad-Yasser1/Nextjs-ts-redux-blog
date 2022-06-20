/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/articles',
				permanent: false,
			},
			{
				source: '/blog',
				destination: '/articles',
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
