import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "fugvavcdkqda2ylw.public.blob.vercel-storage.com",
			},
		],
	},
};

export default nextConfig;
