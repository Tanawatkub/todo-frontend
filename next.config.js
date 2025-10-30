/** @type {import('next').NextConfig} */
const repoName = 'todo-frontend';

// ตรวจว่าอยู่โหมด production หรือไม่
const isProd = process.env.NODE_ENV === 'production';
console.log(`🧭 Running in ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

const nextConfig = {
  // ✅ ใช้ static export (แทน next export)
  output: 'export',

  // ✅ สำหรับ GitHub Pages จะใช้ basePath และ assetPrefix ตามชื่อ repo
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',

  // ✅ ปิด optimization ของ images เพื่อให้ใช้ได้กับ static export
  images: {
    unoptimized: true,
  },

  // ✅ ให้ URL ทุกหน้ามี trailing slash (เช่น /about/)
  trailingSlash: true,

  // ❌ ถ้าใช้ App Router (src/app/) ไม่ต้องเปิด experimental.appDir แล้ว
  // ถ้าเปิดจะเตือนว่า invalid experimental key
  // experimental: {
  //   appDir: true,
  // },
};

export default nextConfig;
