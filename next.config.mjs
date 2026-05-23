/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  images: {
    // The site serves images via plain <img> (the Next optimizer returns
    // blank frames for these assets), so the /_next/image optimizer is unused.
    // Disabling it removes that attack surface (image-optimizer DoS / cache /
    // content-injection advisories) with zero visual impact.
    unoptimized: true,
  },
};

export default nextConfig;
