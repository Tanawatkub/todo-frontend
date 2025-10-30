/** @type {import('next').NextConfig} */
const repoName = 'todo-frontend';

const isProd = process.env.NODE_ENV === 'production';
console.log(`🧭 Running in ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

const nextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',       // ✅ auto switch
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  // ✅ เพิ่ม optional experimental สำหรับ app router
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
