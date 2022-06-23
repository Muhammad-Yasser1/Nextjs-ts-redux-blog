/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		images: {
			layoutRaw: true,
		},
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/articles',
				permanent: false,
			},
			{
				source: '/home',
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
