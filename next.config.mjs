/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages && repoName ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
