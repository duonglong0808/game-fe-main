/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:9999/api',
    API_URL_DICE: 'http://localhost:9991/api',
    API_URL_WSK: 'https://game.wsk.vk169.net',
    URL_GAME: 'https://game.vk169.net',
    HOST_KU: 'https://vn.vc3559k.net/api',
  },
};

export default nextConfig;
