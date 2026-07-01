/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 改成 false，強制關閉尾隨斜線的 308 跳轉
  trailingSlash: false, 

  // 2. 注意：如果是在 Vercel 部署動態 API，必須移除或註冊掉 output: 'export'
};

export default nextConfig;