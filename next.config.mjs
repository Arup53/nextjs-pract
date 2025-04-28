/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN], // <-- add your Supabase domain here
  },
};

export default nextConfig;
