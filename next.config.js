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

  // ❌ ไม่ต้องใช้ experimental.appDir แล้ว
  // experimental: {
  //   appDir: true,
  // },
};

// ✅ Export แบบ CommonJS เพื่อให้ GitHub Actions build ผ่านแน่นอน
module.exports = nextConfig;