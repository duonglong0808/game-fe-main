/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:9999/api',
    API_URL_DICE: 'http://localhost:9991/api',
    API_URL_WSK: 'http://localhost:8089',
    URL_GAME: 'http://localhost:3000',
    HOST_KU: 'https://vn.vc3559k.net/api',
  },

  // Production environment
  // env: {
  //   API_URL: 'https://api.vk169.net/api',
  //   API_URL_DICE: 'https://game.api.vk169.net/api',
  //   API_URL_WSK: 'https://game.wsk.vk169.net',
  //   URL_GAME: 'https://game.vk169.net',
  //   HOST_KU: 'https://vn.vc3559k.net/api',
  // },
  images: {
    domains: ['storage.googleapis.com', "api.vietqr.io"],
  },
};

export default nextConfig;
