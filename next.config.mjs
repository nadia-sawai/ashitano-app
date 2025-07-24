import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */

const withPWA = nextPWA({
  dest: 'public', // ビルド時に設定ファイルなどを出力するディレクトリ（デプロイ先に合わせる必要あり）
  register: true, // 生成されたservice-worker.jsを自動で登録する
  skipWaiting: true, // 新しいService Worker（SW）が登録されると即座にactivateされる（例：trueの場合は別タブで開いたら即座にactivate。その前のものは古いSWを使用する）
  disable: process.env.NODE_ENV === 'development', // 開発中は無効化
});

const nextConfig = withPWA({
  reactStrictMode: false,
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
});

export default nextConfig;